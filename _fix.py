#!/usr/bin/env python3
# One-shot, guarded transform of views.html.
#
# WHY: the client looked at five screens and said the photography was showing
# him half a house. Three things were wrong and this file fixes the structural
# two (the third — the crops themselves — was fixed in photos.py):
#
#   1. the macro frames (a window, hydrangeas, a shingle, a porch corner, a
#      drive strip) are deleted outright. A site that sells houses shows houses.
#   2. seven photographic grounds standing behind CONTENT-DENSE sections — two
#      checklists, three honest blocks, the offer form, the FAQ list — are
#      removed. Where a page does not need a photograph it should not have one.
#   3. every remaining band/frame gets a <picture> so phones are served the
#      portrait cut instead of a landscape frame squeezed into a portrait hole.
#
# Located by line index, never by pasted HTML literals: the copy is full of
# typographic apostrophes and a byte mismatch silently matches zero times.
import re

P = 'views.html'
L = open(P, encoding='utf-8').read().split('\n')          # 0-based list of lines
orig_len = len(L)
edits = []                                                # (start, end, newlines)


def at(i):                                                # 1-based -> 0-based
    return i - 1


def find(needle):
    hits = [i for i, ln in enumerate(L) if needle in ln]
    assert len(hits) == 1, 'ANCHOR %r hit %d lines %s' % (needle, len(hits), hits)
    return hits[0]


def section_of(i):
    """(start, end) 0-based inclusive bounds of the <section> containing line i,
    swallowing any comment block immediately above it."""
    a = i
    while not L[a].lstrip().startswith('<section'):
        a -= 1
        assert a >= 0
    b = i
    while '</section>' not in L[b]:
        b += 1
        assert b < len(L)
    c = a - 1
    while c >= 0 and L[c].strip() and not L[c].lstrip().startswith('<!--'):
        c -= 1
    if c >= 0 and L[c].lstrip().startswith('<!--') and '-->' in '\n'.join(L[c:a]):
        a = c
    if a > 0 and L[a - 1].strip() == '':
        a -= 1
    return a, b


def drop_section(anchor, label):
    a, b = section_of(find(anchor))
    edits.append((a, b + 1, []))
    print('  ok  drop    %-27s lines %d-%d' % (label, a + 1, b + 1))


def replace_section(anchor, new_html, label):
    a, b = section_of(find(anchor))
    edits.append((a, b + 1, [''] + new_html.split('\n')))
    print('  ok  rebuild %-27s lines %d-%d' % (label, a + 1, b + 1))


def strip_ground(imgline_1b, key, label):
    """Remove the .pbg-media/.pbg-wash pair and de-class the section."""
    i = at(imgline_1b)
    assert 'pbg-media' in L[i] and '__IMG_%s__' % key in L[i], 'ground %s: %r' % (label, L[i])
    assert 'pbg-wash' in L[i + 1], 'wash %s: %r' % (label, L[i + 1])
    j = i - 1
    while '<section' not in L[j]:
        j -= 1
    tag = L[j]
    assert 'pbg' in tag, 'not a pbg section: %r' % tag
    m = re.search(r'class="([^"]*)"', tag)
    kept = [t for t in m.group(1).split() if t not in ('pbg', 'mid', 'deep')]
    if kept:
        newtag = tag[:m.start()] + 'class="%s"' % ' '.join(kept) + tag[m.end():]
    else:                                                  # e.g. <section class="pbg mid">
        newtag = re.sub(r'\s*class="[^"]*"', '', tag)
    edits.append((j, j + 1, [newtag]))
    edits.append((i, i + 2, []))
    print('  ok  ground  %-27s line %d  (%s)' % (label, imgline_1b, key))


# ---------------------------------------------------------------------------
# 1 · delete the macro photography the client rejected
# ---------------------------------------------------------------------------
drop_section('<div class="mosaic">', 'HOME macro mosaic')
drop_section('<figure class="ph-frame strip rv">', 'HOW drive strip')

# ABOUT: keep every word, throw away the porch close-up beside it.
replace_section('<div class="photorow">', '''  <section class="sec tight"><div class="wrap narrow">
    <div class="kick rv">What we actually buy</div>
    <h2 class="big rv d1">Ordinary houses, bought <span class="em">quietly.</span></h2>
    <p class="lead rv d2">Not mansions and not flips off a spreadsheet — everyday Cleveland houses that someone needs to be done with. Dated kitchens, tired roofs, thirty years of belongings in the basement. None of that is a problem on our side of the table.</p>
    <p class="lead rv d3">Your house is never listed, never advertised, and never shown to strangers. The only people who know it’s for sale are you and us.</p>
    <div class="rv d3" style="margin-top:26px;"><a class="btn-ghost" data-go="offer">Get my cash offer →</a></div>
  </div></section>''', 'ABOUT what we buy')

# ---------------------------------------------------------------------------
# 2 · the HOW chapter break lost its photograph with the strip. A letterboxed
#     band can honestly hold a street; it cannot hold a house. Give it a street.
# ---------------------------------------------------------------------------
kb = find('url(__PH_KERBSOFT__)')
assert '__PH_KERB__' in L[kb + 1]
edits.append((kb, kb + 2, ['      <img class="cband-img" src="__BAND_STREET1__" srcset="__BANDSET_STREET1__" '
                           'sizes="100vw" alt="" aria-hidden="true" loading="lazy" decoding="async">']))
print('  ok  band     %-27s line %d  (KERB -> STREET1)' % ('HOW no-deadline', kb + 1))

# FAQ: the storm frame was cut to a 2.85:1 letterbox, which is exactly the
# "only a roofline" screenshot. Re-shot at 2.00 in photos.py; the box has to
# become the ordinary .cband to match it.
sa, _ = section_of(find('url(__PH_QUIETSOFT__)'))
si = [i for i in range(sa, sa + 8) if L[i].lstrip().startswith('<section')][0]
assert 'cband short' in L[si], L[si]
edits.append((si, si + 1, [L[si].replace('cband short', 'cband')]))
print('  ok  band     %-27s line %d  (short -> full height)' % ('FAQ quiet', si + 1))

# ---------------------------------------------------------------------------
# 3 · strip the grounds from the sections that are already full of information
# ---------------------------------------------------------------------------
for ln, key, label in [
        (131, 'WATERFRONT', 'HOME our promises'),
        (187, 'AVENUE',     'HOME honest block'),
        (229, 'SIGNING',    'HOME offer form'),
        (331, 'STREET2',    'HOW timeline'),
        (403, 'HANDSHAKE',  'HOW what we need'),
        (491, 'WATERFRONT', 'ABOUT where we buy'),
        (536, 'PORCHHOME',  'FAQ question list')]:
    strip_ground(ln, key, label)

# ---------------------------------------------------------------------------
# apply, descending, so earlier indices stay valid
# ---------------------------------------------------------------------------
edits.sort(key=lambda e: e[0], reverse=True)
for a, b, new in edits:
    L[a:b] = new
s = '\n'.join(L)

# ---------------------------------------------------------------------------
# 4 · <picture>: phones get the portrait negative, not a sliced landscape one
# ---------------------------------------------------------------------------
MQ = '(max-width:860px)'


def pic(old, mob, label):
    global s
    n = s.count(old)
    assert n == 1, 'PICTURE %d :: %s' % (n, label)
    s = s.replace(old, '<picture><source media="%s" srcset="%s">%s</picture>' % (MQ, mob, old))
    print('  ok  picture %-27s -> %s' % (label, mob))


pic('<img class="ph-img" src="__PH_BAND__" alt="A single-family house on a quiet residential street at the end of the day" loading="lazy" decoding="async">',
    '__PH_BANDM__', 'HOME wide frame')
pic('<img class="cband-img" src="__PH_CHAPTER__" alt="" aria-hidden="true" loading="lazy" decoding="async">',
    '__PH_CHAPTERM__', 'HOME chapter band')
pic('<img class="cband-img" src="__PH_CLOSE__" alt="" aria-hidden="true" loading="lazy" decoding="async">',
    '__PH_CLOSEM__', 'ABOUT close band')
pic('<img class="cband-img" src="__PH_QUIET__" alt="" aria-hidden="true" loading="lazy" decoding="async">',
    '__PH_QUIETM__', 'FAQ quiet band')

for key, label in [('SKYLINE', 'HOME where-we-buy band'),
                   ('STREET1', 'HOW no-deadline band'),
                   ('SIGNING', 'HOW closing band')]:
    new = ('<img class="cband-img" src="__BAND_%s__" srcset="__BANDSET_%s__" sizes="100vw" '
           'alt="" aria-hidden="true" loading="lazy" decoding="async">' % (key, key))
    if new not in s:                                       # not yet converted to __BAND_
        old = new.replace('__BAND_%s__' % key, '__IMG_%s__' % key) \
                 .replace('__BANDSET_%s__' % key, '__SET_%s__' % key)
        assert s.count(old) == 1, 'band img %s (%d)' % (key, s.count(old))
        s = s.replace(old, new)
    pic(new, '__BANDMSET_%s__' % key, label)

open(P, 'w', encoding='utf-8').write(s)
print('\nviews.html  %d -> %d lines' % (orig_len, len(s.split('\n'))))
for dead in ['__PH_WINDOW', '__PH_BLOOM', '__PH_SHINGLE', '__PH_STRIP',
             '__PH_KERB', '__PH_DETAIL', 'mosaic', 'photorow', 'ph-frame strip']:
    assert dead not in s, 'STILL PRESENT: %s' % dead
print('dead references: none')
