#!/usr/bin/env python3
import base64, os
HERE = os.path.dirname(os.path.abspath(__file__))
FS = '/root/site-audit/node_modules/@fontsource'

# ---------------------------------------------------------------------------
# COMPANY CONFIG — edit these two lines and rebuild. Nothing else to touch.
# ---------------------------------------------------------------------------
# The address every "email us" link and every form submission goes to.
EMAIL = 'og.group.holdings.llc@gmail.com'
# Where the offer form POSTs. Leave '' and the form falls back to opening the
# visitor's own mail app (fragile). Set it to a real endpoint — e.g.
# 'https://formspree.io/f/XXXXXXXX' or 'https://api.web3forms.com/submit' — and
# every submission is delivered server-side, no mail client required.
# FormSubmit needs no account: the FIRST submission from the live domain sends
# an activation link to EMAIL. Click it once and every later lead is delivered.
# ACTIVATED 2026-07-26 for EMAIL above, from origin https://oggroup935.github.io.
# FORM_HASH is the alias FormSubmit issued in the activation email — it routes
# to the same activated inbox but keeps the raw address out of the served HTML,
# so address-harvesting bots scraping the page don't get the real mailbox.
FORM_HASH = 'c46ef7933753685c01ab0f71af26c3b0'
FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + FORM_HASH
# ---------------------------------------------------------------------------

def b64(p): return base64.b64encode(open(p, 'rb').read()).decode()
def font(css, w): return b64(f'{FS}/{css}/files/{css}-latin-{w}-normal.woff2')

FACES = []
for fam, css, ws in [('Fraunces', 'fraunces', [400, 600, 900]),
                     ('Sora', 'sora', [600, 700, 800]),
                     ('Archivo', 'archivo', [300, 400, 500, 600]),
                     ('JetBrains Mono', 'jetbrains-mono', [400, 600])]:
    for w in ws:
        FACES.append(f"@font-face{{font-family:'{fam}';font-weight:{w};font-style:normal;font-display:swap;"
                     f"src:url(data:font/woff2;base64,{font(css,w)}) format('woff2');}}")
FONTCSS = "\n".join(FACES)

# ---------- SKYLINE (day only) ----------
def bld(x, w, h, fill, stroke='none', win=None, winop=0.0, dense=60, seed=1):
    y = 440 - h
    s = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"'
    if stroke != 'none': s += f' stroke="{stroke}" stroke-width="1.2"'
    s += '/>'
    if win and h > 44 and w > 18:
        cols = max(1, int(w // 15)); rows = max(1, int(h // 19))
        rng = seed * 2654435761 & 0x7fffffff
        for r in range(rows):
            for c in range(cols):
                rng = (rng * 1103515245 + 12345) & 0x7fffffff
                if (rng >> 16) % 100 < dense:
                    wx = x + 6 + c * 15; wy = y + 9 + r * 19
                    if wx < x + w - 7 and wy < y + h - 9:
                        op = winop if winop <= 1 else round(0.25 + ((rng >> 8) % 60) / 100, 2)
                        s += f'<rect x="{wx}" y="{wy}" width="4.5" height="6.5" fill="{win}" opacity="{op}"/>'
    return s

def layer(defs, fill, stroke, win, winop, dense):
    return "".join(bld(x, w, h, fill, stroke, win, winop, dense, seed=i + 1) for i, (x, w, h) in enumerate(defs))

FAR = [(0,110,150),(105,80,120),(190,66,96),(250,58,140),(300,54,168),(352,60,120),(408,52,150),
       (455,70,110),(1030,58,150),(1085,44,118),(1130,50,132),(1178,40,150),(1300,26,110),(1355,52,150),
       (1400,70,120),(1470,58,150),(1520,90,110),(1150,60,96),(960,44,120),(915,40,150)]
NEAR = [(150,120,120),(215,66,150),(465,72,150),(540,54,150),
        (600,46,182),(648,58,120),
        (755,42,206),(800,48,132),
        (985,42,150),(1095,44,168),(1236,62,150),(1330,46,182),(1380,72,150),(1455,62,150)]

def skyline_day():
    far = layer(FAR, '#cbd4e0', 'none', '#b6c1d0', 0.45, 40)
    near = layer(NEAR, '#93a0b3', 'rgba(255,255,255,.4)', '#7b8899', 1, 55)
    extra = ('<rect x="606" y="240" width="34" height="20" fill="#93a0b3"/>'
             '<rect x="613" y="222" width="20" height="18" fill="#93a0b3"/>'
             '<rect x="619" y="206" width="8" height="16" fill="#93a0b3"/>'
             '<line x1="623" y1="206" x2="623" y2="190" stroke="#93a0b3" stroke-width="2.5"/>'
             '<path d="M755 234 L776 198 L797 234 Z" fill="#93a0b3"/>'
             '<line x1="776" y1="198" x2="776" y2="180" stroke="#93a0b3" stroke-width="2.5"/>')
    haze = '<rect x="0" y="110" width="1600" height="330" fill="url(#hz)"/>'
    return ('<svg class="skl" id="sklDay" viewBox="0 0 1600 440" preserveAspectRatio="xMidYMax slice">'
            '<defs><linearGradient id="hz" x1="0" y1="0" x2="0" y2="1">'
            '<stop offset="0%" stop-color="rgba(246,242,232,.72)"/>'
            '<stop offset="60%" stop-color="transparent"/></linearGradient></defs>'
            f'{far}{haze}{near}{extra}</svg>')

# ---------------------------------------------------------------------------
# SECTION-GROUND PHOTOGRAPHY
# ---------------------------------------------------------------------------
# The five cinematic bands are darkroom prints made here in the build from the
# one negative we hold a licence to. The *sections between* them were flat paper,
# which is what made the page read as "photograph, white page, photograph, white
# page". These are the photographs that stand underneath those sections.
#
# They are the identical Unsplash frames the company's existing production site
# already serves (og-group-website/lib/images.ts) — same photographer IDs, same
# licence, already vetted for commercial use — so nothing new is being taken on
# here. They are referenced by URL rather than embedded: Unsplash serves AVIF/
# WebP and the right width per device, and a visitor with no network simply gets
# the paper page that existed before (see the .pbg contract in template.html).
#
# Two shapes come out of the same photograph. A .pbg ground is washed to near
# paper and its shape genuinely does not matter, so those stay uncropped. A
# .cband is the photograph — there `ratio` is passed and Unsplash does the crop
# on its own servers with crop=entropy, which means the delivered file already
# IS the shape of the box and object-fit:cover has nothing to trim. That is the
# whole fix for the bands the client saw cut in half.
def U(pid, w=1900, ratio=None):
    u = 'https://images.unsplash.com/photo-%s?auto=format&fit=crop&w=%d&q=80' % (pid, w)
    if ratio:
        u += '&h=%d&crop=entropy' % round(w / float(ratio))
    return u

GROUNDS = {
    # place — streets, houses, the city itself
    'HEROSTREET':   '1570129477492-45c003edd2be',
    'STANDOUTHOME': '1600596542815-ffad4c1539a9',
    'SKYLINE':      '1547916721-7469af15e2a3',
    'WATERFRONT':   '1675972013964-0843d80bad06',
    'STREET1':      '1449844908441-8829872d2607',
    'STREET2':      '1564013799919-ab600027ffc6',
    'AVENUE':       '1480714378408-67cf0d13bc1b',
    'PORCHHOME':    '1518780664697-55e3ad937233',
    # people — a conversation, a handshake, a signature. Deliberately no
    # boardrooms and no call-centre desks: this site promises the opposite.
    'CONVERSATION': '1521737604893-d14cc237f11d',
    'HANDSHAKE':    '1521791136064-7986c2920216',
    'SIGNING':      '1554224155-6726b3ff858f',
}
# .cband.short is aspect-ratio 3.6 and .cband-media overscans it by 14% top and
# bottom, so the frame that fills it exactly is 3.6 / 1.28 = 2.81:1. Phones get
# 0.88:1, the same portrait shape photos.py renders our own negatives at.
BAND_R, BANDM_R = 2.81, 0.88

GROUND_SUB = {}
for _k, _id in GROUNDS.items():
    GROUND_SUB['__IMG_%s__' % _k] = U(_id, 1900)
    GROUND_SUB['__SET_%s__' % _k] = ', '.join(
        '%s %dw' % (U(_id, w), w) for w in (760, 1200, 1900, 2600))
    GROUND_SUB['__BAND_%s__' % _k] = U(_id, 1900, BAND_R)
    GROUND_SUB['__BANDSET_%s__' % _k] = ', '.join(
        '%s %dw' % (U(_id, w, BAND_R), w) for w in (1200, 1900, 2600))
    GROUND_SUB['__BANDMSET_%s__' % _k] = ', '.join(
        '%s %dw' % (U(_id, w, BANDM_R), w) for w in (500, 760, 1100))

# ---------- photography (derived from staged sources by photos.py) ----------
import photos
PH = photos.build()
# Every key photos.py declares gets a placeholder, whether or not it rendered.
# Derived from SOURCES rather than hand-maintained, so adding a frame to the
# darkroom is a one-line change there and nothing to remember here.
PH_KEYS = ['__PH_%s__' % s['key'] for s in photos.SOURCES]
for k in PH_KEYS:
    PH.setdefault(k, '')   # a missing source degrades to no image, never a broken build

SUB = {
    '__FONTCSS__': FONTCSS,
    '__LOGO__': "data:image/png;base64," + open('/tmp/logo_b64.txt').read().strip(),
    '__SKYLINE_DAY__': skyline_day(),
    '__VIEWS__': open(os.path.join(HERE, 'views.html')).read(),
    '__EMAIL__': EMAIL,
    '__FORM_ENDPOINT__': FORM_ENDPOINT,
}
SUB.update(PH)   # __PH_*__ resolve after __VIEWS__ has been inlined
SUB.update(GROUND_SUB)   # ditto for __IMG_*__ / __SET_*__ inside views.html
H = open(os.path.join(HERE, 'template.html')).read()
H = H.replace('__JS__', open(os.path.join(HERE, 'app.js')).read())
for k, v in SUB.items():
    H = H.replace(k, v)
out = os.path.join(HERE, 'og-sellers.html')
open(out, 'w').write(H)
left = [p for p in ['__FONTCSS__', '__LOGO__', '__SKYLINE_DAY__', '__VIEWS__', '__JS__',
                    '__EMAIL__', '__FORM_ENDPOINT__'] + PH_KEYS + list(GROUND_SUB) if p in H]
print('built', out, round(len(H) / 1e6, 2), 'MB', '| unresolved:', left or 'none')
