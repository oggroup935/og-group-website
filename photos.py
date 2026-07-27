#!/usr/bin/env python3
"""
The site's photographic library.

There is exactly ONE licensed source photograph on disk. Everything below is a
darkroom, not a slideshow: it re-frames, re-lights and re-times that single
negative until the frames stop reading as the same picture. The three levers
that actually break the resemblance, in order of power:

  1. TIME OF DAY.  The sky is a large, bright, easily-keyed region. Replacing
     it — late afternoon, blue hour, dusk, storm — moves the whole frame's
     colour temperature and the viewer reads a different photograph, not a
     filter. With the windows lit at blue hour and the lamps on at dusk the
     same building genuinely is a different picture.
  2. COLOUR IDENTITY.  Each frame gets its own grade so no two sit in the same
     part of the palette.

FRAMING IS NOT ONE OF THE LEVERS. It used to be — a 12% crop of shake shingle
is certainly unrecognisable — but a site that sells houses has to show houses.
Every frame here is the whole property, frac=1.0, and every ratio is measured
from the box that renders it so object-fit has nothing left to cut off.

Drop new files into  Downloads\\og-site-assets\\ , add a SOURCES line, rebuild.
"""
import base64, io, os
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageChops

SRC = '/mnt/user-data/uploads/Downloads/og-site-assets'
OUT = '/root/seller-site/assets'
os.makedirs(OUT, exist_ok=True)

NAVY = (22, 35, 60)
GOLD = (201, 164, 92)

# --- synthetic skies -------------------------------------------------------
# top colour, horizon colour, cloud tint, cloud strength, warmth pushed back
# onto the subject so the light on the house agrees with the sky above it.
SKIES = {
    'dusk':    dict(top=(38, 52, 92),  hor=(238, 186, 118), cloud=(255, 214, 160), cs=.55, cast=(232, 178, 118), ca=.20),
    'blue':    dict(top=(12, 20, 38),  hor=(74, 96, 130),   cloud=(120, 146, 186), cs=.38, cast=(60, 84, 128),   ca=.30),
    'storm':   dict(top=(52, 58, 72),  hor=(150, 158, 170), cloud=(196, 202, 212), cs=.62, cast=(120, 130, 148), ca=.18),
    'morning': dict(top=(176, 196, 206), hor=(240, 240, 232), cloud=(255, 255, 250), cs=.40, cast=(198, 212, 214), ca=.16),
    # late afternoon rather than true dusk: the top stays light. 'dusk' has a
    # near-navy zenith, which on a wide frame with a soft key reads as a dark
    # plume smeared across the sky instead of as evening.
    'gold':    dict(top=(132, 158, 194), hor=(248, 208, 152), cloud=(255, 232, 194), cs=.50, cast=(240, 198, 142), ca=.18),
}


# ---------------------------------------------------------------------------
# noise
# ---------------------------------------------------------------------------
def fbm(w, h, octaves=6, seed=0, persist=.56):
    """Fractal value noise. Small random grids upscaled bicubically and summed —
    cheap, and smooth enough to pass as cloud once it is masked into a sky."""
    rng = np.random.default_rng(seed)
    out = np.zeros((h, w), np.float32)
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        gw = max(2, 2 ** (o + 1))
        gh = max(2, int(round(gw * h / max(1, w))))
        g = (rng.random((gh, gw)) * 255).astype(np.uint8)
        layer = np.asarray(Image.fromarray(g).resize((w, h), Image.BICUBIC), np.float32) / 255.0
        out += layer * amp
        tot += amp
        amp *= persist
    out /= tot
    out -= out.min()
    return out / max(1e-6, out.max())


# ---------------------------------------------------------------------------
# geometry
# ---------------------------------------------------------------------------
def crop_at(im, ratio, cx=.5, cy=.5, frac=1.0):
    """Crop by NORMALISED CENTRE. cx/cy are where the middle of the frame lands
    in the source (0..1); frac is the crop width as a fraction of the source
    width. Far easier to aim than an offset-based crop, which is the whole
    reason the macro frames below can be pointed at a specific window."""
    W, H = im.size
    tw = max(16, int(W * frac))
    th = int(tw / ratio)
    if th > H:
        th = H
        tw = int(th * ratio)
    x = int(W * cx - tw / 2)
    y = int(H * cy - th / 2)
    x = max(0, min(W - tw, x))
    y = max(0, min(H - th, y))
    return im.crop((x, y, x + tw, y + th))


# ---------------------------------------------------------------------------
# light
# ---------------------------------------------------------------------------
def replace_sky(im, kind='dusk', horizon=.58, thresh=150, seed=3, keep=.34, soft=1.0):
    """Key the bright upper region and paint a new sky into it.

    No segmentation model needed: sky here is the brightest thing in the frame
    and it lives above the roofline, so luminance x a vertical falloff is a
    perfectly good mask. `keep` retains some of the original cloud luminance so
    the replacement inherits real structure instead of looking airbrushed, and
    the foliage that overlaps the sky keeps its edges because it is dark and
    therefore masked out.

    `soft` widens the mask's feather. On a wide crop with a low threshold the
    key can terminate mid-sky in a straight horizontal line — a dead giveaway
    that the sky is painted. Feathering it out over a few hundred pixels turns
    that edge into an atmospheric transition instead of a seam."""
    s = SKIES[kind]
    im = im.convert('RGB')
    w, h = im.size
    a = np.asarray(im, np.float32)
    lum = a @ np.array([.299, .587, .114], np.float32)

    # luminance key, soft shoulder
    m = np.clip((lum - thresh) / 78.0, 0, 1) ** 1.15
    # vertical falloff: full strength at the top, gone below the horizon line
    yy = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    m *= np.clip((horizon - yy) / max(.04, horizon * .55), 0, 1)
    m = np.asarray(Image.fromarray((m * 255).astype(np.uint8))
                   .filter(ImageFilter.GaussianBlur(max(1, w / 320 * soft))), np.float32) / 255.0

    # gradient sky
    t = np.clip(yy / max(.05, horizon), 0, 1)
    grad = (np.array(s['top'], np.float32)[None, None, :] * (1 - t)[:, :, None]
            + np.array(s['hor'], np.float32)[None, None, :] * t[:, :, None])
    grad = np.repeat(grad, w, axis=1)

    # cloud
    c = fbm(max(64, w // 3), max(48, h // 3), octaves=6, seed=seed)
    c = np.asarray(Image.fromarray((c * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC),
                   np.float32) / 255.0
    c = np.clip((c - .40) / .48, 0, 1) ** 1.25
    c *= np.clip((horizon * 1.25 - yy) / max(.05, horizon), 0, 1)
    sky = grad * (1 - c[:, :, None] * s['cs']) + np.array(s['cloud'], np.float32)[None, None, :] * (c * s['cs'])[:, :, None]

    # inherit a little of the real cloud shape
    nl = np.clip((lum - thresh) / 105.0, 0, 1)[:, :, None]
    sky = sky * (1 - keep) + sky * (0.62 + 0.66 * nl) * keep

    out = a * (1 - m[:, :, None]) + sky * m[:, :, None]

    # the light on the subject has to agree with the sky above it
    cast = np.array(s['cast'], np.float32)[None, None, :]
    sub = 1.0 - m
    out = out * (1 - (sub * s['ca'])[:, :, None]) + cast * (sub * s['ca'])[:, :, None]
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


def glow(im, spots, color=(255, 206, 138), strength=.85, radius=.09):
    """Warm light poured out of given points — windows at blue hour. Screen
    blended, so it lifts without flattening the blacks around it. spots are
    normalised (x, y, scale)."""
    w, h = im.size
    a = np.asarray(im.convert('RGB'), np.float32)
    xx = np.linspace(0, 1, w, dtype=np.float32)[None, :]
    yy = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    ar = w / float(h)
    acc = np.zeros((h, w), np.float32)
    for (sx, sy, sc) in spots:
        d = np.sqrt(((xx - sx) * ar) ** 2 + (yy - sy) ** 2) / (radius * sc)
        acc = np.maximum(acc, np.clip(1 - d, 0, 1) ** 2.1)
    acc = np.asarray(Image.fromarray((np.clip(acc, 0, 1) * 255).astype(np.uint8))
                     .filter(ImageFilter.GaussianBlur(max(1, w / 190))), np.float32) / 255.0
    acc *= strength
    c = np.array(color, np.float32)[None, None, :]
    out = 255.0 - (255.0 - a) * (255.0 - c * acc[:, :, None]) / 255.0
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


def godray(im, cx=.5, cy=.18, color=(255, 214, 158), strength=.42, spread=.95):
    """A single soft directional bloom. Used where the sun sits behind the
    canopy — it is what makes a backlit frame feel photographed rather than
    graded."""
    w, h = im.size
    a = np.asarray(im.convert('RGB'), np.float32)
    xx = np.linspace(0, 1, w, dtype=np.float32)[None, :]
    yy = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    ar = w / float(h)
    d = np.sqrt(((xx - cx) * ar) ** 2 + (yy - cy) ** 2) / spread
    g = np.clip(1 - d, 0, 1) ** 2.4 * strength
    c = np.array(color, np.float32)[None, None, :]
    out = 255.0 - (255.0 - a) * (255.0 - c * g[:, :, None]) / 255.0
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


def haze(im, amount=.30, color=(206, 214, 224), low=.25, high=1.0):
    """Distance fog, strongest at the bottom of the range. Separates planes and
    is most of what sells a cold morning."""
    w, h = im.size
    a = np.asarray(im.convert('RGB'), np.float32)
    yy = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    g = np.clip((yy - low) / max(.05, high - low), 0, 1) * amount
    c = np.array(color, np.float32)[None, None, :]
    out = a * (1 - g[:, :, None]) + c * g[:, :, None]
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))


def bloom(im, thresh=196, radius=.018, amount=.34):
    """Highlight bleed. Small numbers only — this is seasoning."""
    w, h = im.size
    base = im.convert('RGB')
    a = np.asarray(base, np.float32)
    lum = a @ np.array([.299, .587, .114], np.float32)
    m = np.clip((lum - thresh) / max(1, 255 - thresh), 0, 1)
    hi = (a * m[:, :, None]).astype(np.uint8)
    hi = Image.fromarray(hi).filter(ImageFilter.GaussianBlur(max(1, w * radius)))
    return ImageChops.screen(base, Image.fromarray((np.asarray(hi, np.float32) * amount).astype(np.uint8)))


def duotone(im, dark=(18, 28, 48), light=(226, 200, 154), amount=1.0):
    """Map luminance onto a two-point ramp. At amount<1 it is a strong tint; at
    1.0 the frame stops being a colour photograph entirely, which is exactly
    what a texture band wants."""
    g = np.asarray(im.convert('L'), np.float32)[:, :, None] / 255.0
    d = np.array(dark, np.float32)[None, None, :]
    l = np.array(light, np.float32)[None, None, :]
    duo = d * (1 - g) + l * g
    a = np.asarray(im.convert('RGB'), np.float32)
    return Image.fromarray(np.clip(a * (1 - amount) + duo * amount, 0, 255).astype(np.uint8))


def grain(im, amount=.045, seed=11):
    if amount <= 0:
        return im
    w, h = im.size
    rng = np.random.default_rng(seed)
    n = rng.normal(0, 255 * amount, (h, w, 1)).astype(np.float32)
    a = np.asarray(im.convert('RGB'), np.float32) + n
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


def vignette(im, strength=.55, feather=.78):
    w, h = im.size
    yy = np.linspace(-1, 1, h, dtype=np.float32)[:, None]
    xx = np.linspace(-1, 1, w, dtype=np.float32)[None, :]
    r = np.sqrt(xx ** 2 + yy ** 2) / np.sqrt(2.0)
    t = np.clip((r - feather) / max(.02, 1 - feather), 0, 1) ** 2 * strength
    a = np.asarray(im.convert('RGB'), np.float32)
    dark = np.array((8, 12, 22), np.float32)[None, None, :]
    return Image.fromarray(np.clip(a * (1 - t[:, :, None]) + dark * t[:, :, None], 0, 255).astype(np.uint8))


def grade(im, shadow=.24, warm=.13, sat=.86, contrast=1.10, bright=.93):
    """Pull shadows toward navy and highlights toward gold so photography sits
    inside the palette instead of fighting it."""
    im = im.convert('RGB')
    im = ImageEnhance.Brightness(im).enhance(bright)
    im = ImageEnhance.Color(im).enhance(sat)
    im = ImageEnhance.Contrast(im).enhance(contrast)
    lum = im.convert('L')
    sh = Image.new('RGB', im.size, NAVY)
    hi = Image.new('RGB', im.size, GOLD)
    mask_sh = lum.point(lambda v: int(max(0, 1 - v / 140) * 255 * shadow))
    im = Image.composite(Image.blend(im, sh, 1.0), im, mask_sh)
    mask_hi = lum.point(lambda v: int(max(0, (v - 130) / 125) * 255 * warm))
    im = Image.composite(Image.blend(im, hi, 1.0), im, mask_hi)
    return im


def save(im, name, w, q=74, blur=0):
    im = im.resize((w, max(1, int(im.height * w / im.width))), Image.LANCZOS)
    if blur:
        im = im.filter(ImageFilter.GaussianBlur(blur))
    p = os.path.join(OUT, name + '.webp')
    im.save(p, 'WEBP', quality=q, method=6)
    return p


def b64(path):
    return 'data:image/webp;base64,' + base64.b64encode(open(path, 'rb').read()).decode()


# ---------------------------------------------------------------------------
# SOURCES
#   key    placeholder name  ->  __PH_<KEY>__
#   ratio  target aspect
#   cx cy  NORMALISED CENTRE of the crop in the source
#   frac   crop width as a fraction of the source width  (small = macro)
#   sky    replace the sky: dusk | blue | storm | morning
# ---------------------------------------------------------------------------
H = 'house_hi.webp'

SOURCES = [
    # -----------------------------------------------------------------------
    # ONE RULE, AND IT OVERRIDES EVERYTHING ELSE IN THIS FILE:
    #   every frame shows the WHOLE house.
    #
    # The previous library bought its variety with tight crops — a bay window,
    # a slab of shake shingle, a hydrangea, half a roofline. Cropped that hard
    # a house stops being a house and becomes texture, and a visitor who came
    # here to sell a property sees a site that never once shows them a
    # property. Worse, several frames were cut mid-building by object-fit
    # because the source ratio did not match the box it was poured into.
    #
    # So: frac is 1.0 everywhere. cx sits on the centre of the building. Every
    # ratio below is measured from the box that actually renders it, so cover
    # has nothing left to slice off. Variety now comes from TIME OF DAY and
    # GRADE alone — late afternoon, blue hour, dusk with the lamps lit, and
    # storm light — which is the honest way to do it anyway.
    #
    # Measured geometry of the negative (2600x1672):
    #   house occupies x .258 .. .742   (centre .500)
    #                  y .497 .. .795   (roofline .497, foundation .795)
    #   kerb / road      y .90 .. 1.0
    # A crop must contain all of that. Each ratio below is checked against it.
    # -----------------------------------------------------------------------

    # ---- HOME, the inline establishing shot -------------------------------
    # .ph-frame.wide renders 1072x540, and .ph-move bleeds it to 1072x637 for
    # the parallax — so the real media box is 1.68:1, not the 2.55:1 this
    # frame used to be cut to. That mismatch alone was throwing away a third
    # of the width of the picture. Late afternoon: the warmest, most
    # welcoming version of the house, which is the right note for the first
    # photograph anyone sees.
    dict(key='BAND', ratio=1.68, cx=.50, cy=.550, frac=1.0, width=1500, q=62,
         sky='gold', thresh=168, horizon=.50, seed=3, keep=.18, skysoft=3.0,
         bloom=(206, .018, .22),
         grade=dict(shadow=.24, warm=.24, sat=.92, contrast=1.12, bright=.90)),

    # ---- HOME, the cinematic chapter break --------------------------------
    # .cband is 64vh full-bleed and .cband-media bleeds it -14%, so ~1.95:1 at
    # 1440x900 and ~2.17:1 at 1920x1080. 2.00 sits between them, which means
    # the worst case trims 8% off one axis of a frame that has 10% of clear
    # margin around the building. Blue hour with the windows lit: the single
    # most different-looking frame in the set, and still the whole house.
    dict(key='CHAPTER', ratio=2.00, cx=.44, cy=.568, frac=.88, width=1620, q=58,
         sky='blue', thresh=168, horizon=.44, seed=3, keep=.18, skysoft=3.0,
         # the three lit openings, re-normalised into this crop:
         # bay window, front door + lantern, right french doors.
         glow=[(.382, .692, 1.12), (.623, .701, .96), (.765, .710, 1.00)],
         glow_s=1.05, glow_r=.068,
         grade=dict(shadow=.28, warm=.10, sat=.60, contrast=1.10, bright=.86),
         bloom=(186, .022, .44), vig=.42, grain=.030),

    # ---- ABOUT, the closing band ------------------------------------------
    # .cband.tall is 74vh, bled -14%: ~1.69:1 at 1440x900, ~1.88:1 at 1080p.
    # Dusk, lamps lit, the porch light on. An invitation to talk should look
    # like a house someone is home in.
    dict(key='CLOSE', ratio=1.78, cx=.44, cy=.545, frac=.88, width=1500, q=58,
         sky='dusk', thresh=168, horizon=.48, seed=11, keep=.18, skysoft=3.0,
         glow=[(.382, .701, 1.16), (.623, .709, 1.00), (.765, .717, 1.04)],
         glow_s=1.24, glow_r=.061,
         grade=dict(shadow=.34, warm=.28, sat=.74, contrast=1.18, bright=.78),
         bloom=(190, .024, .42), vig=.52, grain=.036),

    # ---- FAQ, the breath in the middle of the text ------------------------
    # .cband.short is 46vh, bled -14%: ~2.72:1 at 1440x900, ~3.02:1 at 1080p.
    # Storm light. Cool, flat, overcast — nothing in it competes with a wall
    # of questions, and it is the one weather the other three don't use.
    dict(key='QUIET', ratio=2.00, cx=.44, cy=.568, frac=.88, width=1620, q=57,
         sky='morning', thresh=168, horizon=.44, seed=17, keep=.18, skysoft=3.0,
         haze=(.40, (206, 214, 222), .04, 1.0),
         grade=dict(shadow=.26, warm=-.05, sat=.57, contrast=1.06, bright=1.00),
         vig=.40, grain=.038),

    # ---- the mobile cut of all four ---------------------------------------
    # A phone band is a PORTRAIT box. Pouring a 2:1 landscape frame into a
    # 0.88:1 hole and letting cover sort it out is precisely how you end up
    # showing a third of a house on the device most sellers actually use.
    # These are the same four photographs, re-framed vertically: full height
    # of the negative, 56.6% of its width, centred on the building. Served
    # through <picture media="(max-width:860px)">.
    dict(key='BANDM', ratio=.88, cx=.50, cy=.50, frac=.566, width=900, q=62,
         sky='gold', thresh=168, horizon=.55, seed=3, keep=.18, skysoft=2.0,
         bloom=(206, .018, .22),
         grade=dict(shadow=.24, warm=.24, sat=.92, contrast=1.12, bright=.90)),
    dict(key='CHAPTERM', ratio=.88, cx=.50, cy=.50, frac=.566, width=900, q=58,
         sky='blue', thresh=168, horizon=.55, seed=3, keep=.18, skysoft=2.0,
         glow=[(.210, .700, 1.12), (.585, .706, .96), (.806, .712, 1.00)],
         glow_s=1.05, glow_r=.047,
         grade=dict(shadow=.28, warm=.10, sat=.60, contrast=1.10, bright=.86),
         bloom=(186, .022, .44), vig=.42, grain=.030),
    dict(key='CLOSEM', ratio=.88, cx=.50, cy=.50, frac=.566, width=900, q=58,
         sky='dusk', thresh=168, horizon=.55, seed=11, keep=.18, skysoft=2.0,
         glow=[(.210, .700, 1.16), (.585, .706, 1.00), (.806, .712, 1.04)],
         glow_s=1.24, glow_r=.047,
         grade=dict(shadow=.34, warm=.28, sat=.74, contrast=1.18, bright=.78),
         bloom=(190, .024, .42), vig=.48, grain=.036),
    dict(key='QUIETM', ratio=.88, cx=.50, cy=.50, frac=.566, width=900, q=57,
         sky='morning', thresh=168, horizon=.55, seed=17, keep=.18, skysoft=2.0,
         haze=(.40, (206, 214, 222), .04, 1.0),
         grade=dict(shadow=.26, warm=-.05, sat=.57, contrast=1.06, bright=1.00),
         vig=.40, grain=.038),

    # ---- the page backdrop -------------------------------------------------
    # Deliberately tiny and deliberately destroyed. This never reads as a photo;
    # it sits behind the whole document at a few percent opacity so the paper
    # has weather in it instead of being a flat gradient.
    dict(key='WASH', ratio=1.85, cx=.50, cy=.470, frac=.99, width=900, q=52, blur=26,
         sky='dusk', thresh=126, horizon=.92, keep=.20,
         grade=dict(shadow=.30, warm=.24, sat=.90, contrast=1.04, bright=.94)),
    dict(key='WASH2', ratio=1.85, cx=.47, cy=.585, frac=.74, width=900, q=52, blur=26,
         sky='blue', thresh=138, horizon=.60,
         glow=[(.318, .585, 1.00), (.535, .600, .78), (.665, .600, .85)], glow_s=.95, glow_r=.085,
         grade=dict(shadow=.48, warm=.10, sat=.62, contrast=1.06, bright=.68)),

    # ---- LQIP: 1-2 KB placeholders that show instantly and cross-fade -------
    # Blurred to 13px, so the desktop ratio is imperceptible on a phone box.
    dict(key='SOFT', ratio=1.68, cx=.50, cy=.550, frac=1.0, width=520, q=42, blur=15,
         sky='gold', thresh=168, horizon=.50, keep=.18, skysoft=3.0,
         grade=dict(shadow=.26, warm=.18, sat=.84, contrast=1.06, bright=.90)),
    dict(key='CHAPTERSOFT', ratio=2.00, cx=.44, cy=.568, frac=.88, width=460, q=40, blur=13,
         sky='blue', thresh=168, horizon=.44, seed=3, keep=.18, skysoft=3.0,
         grade=dict(shadow=.28, warm=.10, sat=.60, contrast=1.04, bright=.86)),
    dict(key='CLOSESOFT', ratio=1.78, cx=.44, cy=.545, frac=.88, width=460, q=40, blur=13,
         sky='dusk', thresh=168, horizon=.48, seed=11, keep=.18, skysoft=3.0,
         grade=dict(shadow=.34, warm=.28, sat=.74, contrast=1.06, bright=.78)),
    dict(key='QUIETSOFT', ratio=2.00, cx=.44, cy=.568, frac=.88, width=460, q=40, blur=13,
         sky='morning', thresh=168, horizon=.44, seed=17, keep=.18, skysoft=3.0,
         grade=dict(shadow=.26, warm=-.05, sat=.57, contrast=1.04, bright=1.00)),
]


def render(s, src_cache={}):
    p = os.path.join(SRC, s.get('file', H))
    if not os.path.exists(p):
        return None
    if p not in src_cache:
        src_cache[p] = Image.open(p).convert('RGB')
    im = crop_at(src_cache[p], s['ratio'], s['cx'], s['cy'], s['frac'])
    # work at a sane size — every effect below is O(pixels)
    if im.width > 2100:
        im = im.resize((2100, int(im.height * 2100 / im.width)), Image.LANCZOS)
    if s.get('mirror'):
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    if s.get('sky'):
        im = replace_sky(im, s['sky'], horizon=s.get('horizon', .58),
                         thresh=s.get('thresh', 150), seed=s.get('seed', 3),
                         keep=s.get('keep', .34), soft=s.get('skysoft', 1.0))
    if s.get('haze'):
        a, c, lo, hi = s['haze']
        im = haze(im, a, c, lo, hi)
    if s.get('godray'):
        gx, gy, gs, sp = s['godray']
        im = godray(im, gx, gy, strength=gs, spread=sp)
    if s.get('glow'):
        im = glow(im, s['glow'], strength=s.get('glow_s', .85), radius=s.get('glow_r', .09))
    if s.get('duo'):
        d, l, amt = s['duo']
        im = duotone(im, d, l, amt)
    im = grade(im, **s.get('grade', {}))
    if s.get('bloom'):
        t, r, a = s['bloom']
        im = bloom(im, t, r, a)
    if s.get('vig'):
        im = vignette(im, s['vig'])
    if s.get('grain'):
        im = grain(im, s['grain'], seed=abs(hash(s['key'])) % 9999)
    return im


def build():
    out, total = {}, 0
    for s in SOURCES:
        im = render(s)
        if im is None:
            print('  ! missing source - skipping', s['key'])
            continue
        path = save(im, s['key'].lower(), s['width'], s.get('q', 74), s.get('blur', 0))
        kb = os.path.getsize(path) / 1024
        total += kb
        out['__PH_%s__' % s['key']] = b64(path)
        print('  %-12s %-20s %7.0f KB' % (s['key'], os.path.basename(path), kb))
    print('  %-12s %-20s %7.0f KB' % ('', 'TOTAL', total))
    return out


if __name__ == '__main__':
    build()
