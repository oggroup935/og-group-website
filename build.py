#!/usr/bin/env python3
import base64
FS='node_modules/@fontsource'
def b64(p): return base64.b64encode(open(p,'rb').read()).decode()
def font(css,w): return b64(f'{FS}/{css}/files/{css}-latin-{w}-normal.woff2')
FACES=[]
for fam,css,ws in [('Fraunces','fraunces',[400,600,900]),('Sora','sora',[600,700,800]),
                   ('Archivo','archivo',[300,400,500,600]),('JetBrains Mono','jetbrains-mono',[400,600])]:
    for w in ws: FACES.append(f"@font-face{{font-family:'{fam}';font-weight:{w};font-style:normal;font-display:swap;src:url(data:font/woff2;base64,{font(css,w)}) format('woff2');}}")
FONTCSS="\n".join(FACES)

# ---------- SKYLINE ----------
def bld(x,w,h,fill,stroke='none',win=None,winop=0.0,dense=60,seed=1):
    y=440-h; s=f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}"'
    if stroke!='none': s+=f' stroke="{stroke}" stroke-width="1.2"'
    s+='/>'
    if win and h>44 and w>18:
        cols=max(1,int(w//15)); rows=max(1,int(h//19)); rng=seed*2654435761 & 0x7fffffff
        for r in range(rows):
            for c in range(cols):
                rng=(rng*1103515245+12345)&0x7fffffff
                if (rng>>16)%100<dense:
                    wx=x+6+c*15; wy=y+9+r*19
                    if wx<x+w-7 and wy<y+h-9:
                        op=winop if winop<=1 else round(0.25+((rng>>8)%60)/100,2)
                        s+=f'<rect x="{wx}" y="{wy}" width="4.5" height="6.5" fill="{win}" opacity="{op}"/>'
    return s

def layer(defs, fill, stroke, win, winop, dense):
    return "".join(bld(x,w,h,fill,stroke,win,winop,dense,seed=i+1) for i,(x,w,h) in enumerate(defs))

# far filler buildings (behind)
FAR=[(0,110,150),(105,80,120),(190,66,96),(250,58,140),(300,54,168),(352,60,120),(408,52,150),
     (455,70,110),(1030,58,150),(1085,44,118),(1130,50,132),(1178,40,150),(1300,26,110),(1355,52,150),
     (1400,70,120),(1470,58,150),(1520,90,110),(1150,60,96),(960,44,120),(915,40,150)]
# near landmark + mid buildings (front)
NEAR=[(150,120,120),(215,66,150),(465,72,150),(540,54,150),
      (600,46,182),(648,58,120),      # around Terminal Tower zone
      (755,42,206),(800,48,132),       # Key Tower zone
      (985,42,150),(1095,44,168),(1236,62,150),(1330,46,182),(1380,72,150),(1455,62,150)]

def skyline(night):
    if night:
        far=layer(FAR,'#0d1420','none',None,0,0)
        near=layer(NEAR,'#0a0d14','rgba(201,164,92,.4)','#d6b876',9,58)  # winop>1 => varied gold
        # landmark extras (spire/antenna) in gold-outlined dark
        extra='''<rect x="606" y="240" width="34" height="20" fill="#0a0d14" stroke="rgba(201,164,92,.4)" stroke-width="1.2"/><rect x="613" y="222" width="20" height="18" fill="#0a0d14"/><rect x="619" y="206" width="8" height="16" fill="#0a0d14"/><line x1="623" y1="206" x2="623" y2="192" stroke="rgba(201,164,92,.6)" stroke-width="2"/>
<path d="M755 234 L776 200 L797 234 Z" fill="#0a0d14" stroke="rgba(201,164,92,.4)" stroke-width="1.2"/><line x1="776" y1="200" x2="776" y2="182" stroke="rgba(201,164,92,.6)" stroke-width="2"/>'''
        glow='<rect x="0" y="120" width="1600" height="320" fill="url(#gn)"/>'
        return f'<svg class="skl" id="sklNight" viewBox="0 0 1600 440" preserveAspectRatio="xMidYMax slice"><defs><radialGradient id="gn" cx="50%" cy="100%" r="70%"><stop offset="0%" stop-color="rgba(201,164,92,.10)"/><stop offset="60%" stop-color="transparent"/></radialGradient></defs>{glow}{far}{near}{extra}</svg>'
    else:
        far=layer(FAR,'#c2ccda','none','#aab6c8',0.5,40)
        near=layer(NEAR,'#8592a6','rgba(255,255,255,.35)','#6f7d92',1,55)
        extra='''<rect x="606" y="240" width="34" height="20" fill="#8592a6"/><rect x="613" y="222" width="20" height="18" fill="#8592a6"/><rect x="619" y="206" width="8" height="16" fill="#8592a6"/><line x1="623" y1="206" x2="623" y2="190" stroke="#8592a6" stroke-width="2.5"/>
<path d="M755 234 L776 198 L797 234 Z" fill="#8592a6"/><line x1="776" y1="198" x2="776" y2="180" stroke="#8592a6" stroke-width="2.5"/>'''
        haze='<rect x="0" y="120" width="1600" height="320" fill="url(#hz)"/>'
        return f'<svg class="skl" id="sklDay" viewBox="0 0 1600 440" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="hz" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(240,235,220,.5)"/><stop offset="55%" stop-color="transparent"/></linearGradient></defs>{far}{haze}{near}{extra}</svg>'

SKN=skyline(True); SKD=skyline(False)

# ---------- assets ----------
def clip(p): return "data:video/mp4;base64,"+b64(f'/root/clips/{p}')
def jpg(p): return "data:image/jpeg;base64,"+b64(f'/root/clips/{p}')
SUB={
 '__FONTCSS__':FONTCSS,
 '__LOGO__':"data:image/png;base64,"+open('/tmp/logo_b64.txt').read(),
 '__SKYLINE_NIGHT__':SKN,'__SKYLINE_DAY__':SKD,
 '__VIEWS__':open('views.html').read(),
 '__JS__':open('app.js').read(),
 '__VFIELD__':clip('use-field.mp4'),'__VNET__':clip('use-net.mp4'),'__VREHAB__':clip('use-rehab.mp4'),
 '__P1__':jpg('poster1.jpg'),'__P2__':jpg('poster2.jpg'),'__P3__':jpg('poster3.jpg'),
 '__DVPHOTO__':'data:image/webp;base64,'+b64('/root/seller-site/assets/close.webp'),
}
H=open('template.html').read()
# inject JS/video refs first (they contain __VFIELD__ etc inside app.js), then everything
H=H.replace('__JS__',SUB['__JS__'])  # app.js placeholders replaced below
for k,v in SUB.items():
    if k=='__JS__': continue
    H=H.replace(k,v)
open('og-site-v3.html','w').write(H)
print('built og-site-v3.html', round(len(H)/1e6,2),'MB')
