#!/usr/bin/env python3
# One-shot transform: give the flat sections of views.html a photographic ground.
# Every replacement is asserted to hit exactly once, so a silent miss is impossible.
import io, sys

P = '/root/seller-site/views.html'
S = open(P, encoding='utf-8').read()
orig = S

def media(key):
    return ('\n    <div class="pbg-media"><img class="pbg-img" src="__IMG_%s__" srcset="__SET_%s__" '
            'sizes="100vw" alt="" aria-hidden="true" loading="lazy" decoding="async"></div>'
            '\n    <div class="pbg-wash"></div>' % (key, key))

def sub(old, new, why):
    global S
    n = S.count(old)
    assert n == 1, 'anchor %r matched %d times (%s)' % (old[:70], n, why)
    S = S.replace(old, new)

# (anchor, replacement-open-tag, image key, mid?)  — anchors chosen to be unique
JOBS = [
    # ---- HOME ----
    ('<section id="hero"><div class="wrap">\n    <div class="eyebrow rv">',
     '<section id="hero" class="pbg">', 'HEROSTREET', False),

    ('<section class="sec paper"><div class="wrap">\n    <div class="kick rv">Who calls us</div>',
     '<section class="sec pbg">', 'STREET1', False),

    ('<section class="sec"><div class="wrap narrow">\n    <div class="kick rv">How it works</div>',
     '<section class="sec pbg mid">', 'CONVERSATION', True),

    ('<section class="sec paper"><div class="wrap">\n    <div class="kick rv">Straight talk about the number</div>',
     '<section class="sec pbg">', 'STANDOUTHOME', False),

    ('<section class="sec"><div class="wrap">\n    <div class="kick rv">Our promises</div>',
     '<section class="sec pbg mid">', 'WATERFRONT', True),

    ('<section class="sec tight"><div class="wrap narrow">\n    <div class="honest rv">\n      <div class="q">We\'re a business',
     '<section class="sec tight pbg mid">', 'AVENUE', True),

    ('<section class="sec tight"><div class="wrap">\n    <div class="kick rv">After you hit send</div>',
     '<section class="sec tight pbg">', 'STREET2', False),

    ('<section id="offer"><div class="wrap narrow">',
     '<section id="offer" class="pbg mid">', 'SIGNING', True),

    # ---- HOW ----
    ('<section class="phero"><div class="wrap">\n    <div class="kick rv">The process</div>',
     '<section class="phero pbg">', 'AVENUE', False),

    ('<section class="sec tight"><div class="wrap narrow">\n    <div class="tl" id="tl2">',
     '<section class="sec tight pbg mid">', 'STREET2', True),

    ('<section class="sec tight"><div class="wrap narrow">\n    <div class="honest rv">\n      <div class="q">What we need from you is small.',
     '<section class="sec tight pbg mid">', 'HANDSHAKE', True),

    ('<section><div class="wrap"><div class="band rv">\n    <h2>Want to see',
     '<section class="pbg mid">', 'WATERFRONT', True),

    # ---- ABOUT ----
    ('<section class="phero"><div class="wrap">\n    <div class="kick rv">About us</div>',
     '<section class="phero pbg">', 'SKYLINE', False),

    ('<section class="sec tight"><div class="wrap">\n    <div class="kick rv">Why we do it this way</div>',
     '<section class="sec tight pbg">', 'CONVERSATION', False),

    ('<section class="sec tight"><div class="wrap narrow">\n    <div class="honest rv">\n      <div class="q">Where we buy</div>',
     '<section class="sec tight pbg mid">', 'WATERFRONT', True),

    # ---- FAQ ----
    ('<section class="phero"><div class="wrap">\n    <div class="kick rv">Questions</div>',
     '<section class="phero pbg">', 'STANDOUTHOME', False),

    ('<section class="sec tight" style="padding-top:34px;"><div class="wrap narrow"><div class="faqlist">',
     '<section class="sec tight pbg mid" style="padding-top:34px;">', 'PORCHHOME', True),

    ('<section><div class="wrap"><div class="band rv">\n    <h2>Still have a',
     '<section class="pbg mid">', 'HANDSHAKE', True),
]

for anchor, opentag, key, mid in JOBS:
    # everything after the original <section ...> tag stays exactly as it was
    tail = anchor[anchor.index('>') + 1:]
    sub(anchor, opentag + media(key) + '\n    ' + tail, key)

# ---- two new cinematic interstitials, on the Unsplash frames ----
def cband(cls, key, kicker, head, note='Stock photo. Not a home we’ve purchased.'):
    return ('''  <section class="cband %s" data-cband>
    <div class="cband-media">
      <img class="cband-img" src="__IMG_%s__" srcset="__SET_%s__" sizes="100vw" alt="" aria-hidden="true" loading="lazy" decoding="async">
    </div>
    <div class="cband-scrim"></div>
    <div class="cband-gold"></div>
    <div class="cband-grain" aria-hidden="true"></div>
    <div class="cband-rule"></div>
    <div class="cband-copy">
      <span class="bk">%s</span>
      <h2>%s</h2>
    </div>
    <div class="cband-note">%s</div>
  </section>

''' % (cls, key, key, kicker, head, note))

# HOME — between "Straight talk about the number" and "Our promises"
sub('\n  <section class="sec pbg mid">\n    <div class="pbg-media"><img class="pbg-img" src="__IMG_WATERFRONT__"',
    '\n' + cband('short', 'SKYLINE', 'Where we buy',
                 'Cleveland and the suburbs around it. That’s the whole map.')
    + '  <section class="sec pbg mid">\n    <div class="pbg-media"><img class="pbg-img" src="__IMG_WATERFRONT__"',
    'HOME skyline interstitial')

# HOW — just before the closing CTA band
sub('\n  <section class="pbg mid">\n    <div class="pbg-media"><img class="pbg-img" src="__IMG_WATERFRONT__"',
    '\n' + cband('short', 'SIGNING', 'One agreement',
                 'One price, one signature, one neutral title company.')
    + '  <section class="pbg mid">\n    <div class="pbg-media"><img class="pbg-img" src="__IMG_WATERFRONT__"',
    'HOW signing interstitial')

open(P, 'w', encoding='utf-8').write(S)
print('views.html: %d -> %d bytes, %d grounds, %d bands'
      % (len(orig), len(S), S.count('pbg-media'), S.count('class="cband')))
