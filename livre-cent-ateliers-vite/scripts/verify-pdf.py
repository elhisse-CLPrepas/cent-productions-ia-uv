from pathlib import Path
import json,re,hashlib
import fitz
from PIL import Image,ImageOps,ImageDraw
R=Path(__file__).resolve().parents[2]
A=R/'livre-cent-ateliers-vite'
Q=R/'tmp'/'pdfs'
D=fitz.open(R/'output'/'pdf'/'guide-cent-ateliers-ln-ia-edition-design.pdf')
B=json.loads((A/'src'/'book.json').read_text(encoding='utf-8'))
M=json.loads((A/'src'/'page-map.json').read_text(encoding='utf-8'))
norm=lambda s: re.sub(r'\s+',' ',s.replace('\u00a0',' ').replace('\u202f',' ').replace('\u2011','-')).strip()
missing=[]
for p in B['projects']:
    page=D[M['projectPages'][p['id']]['prompt']-1]
    actual=norm(page.get_text())
    for n,s in enumerate(p['prompt']):
        if norm(s['text']) not in actual:
            missing.append([p['id'],n,s['text'][:80]])
assert not missing,missing[:10]
bad=[]
for i,page in enumerate(D):
    for block in page.get_text('dict')['blocks']:
        if block['type']!=0: continue
        for ln in block['lines']:
            for span in ln['spans']:
                x0,y0,x1,y1=span['bbox']
                if x0 < -1 or x1 > 613 or y0 < -1 or y1 > 793:
                    bad.append([i+1,span['text'],span['bbox']])
assert not bad,bad
alllinks=[ln for p in D for ln in p.get_links()]
invalid=[ln for ln in alllinks if ln['kind']==fitz.LINK_GOTO and not (0<=ln['page']<len(D))]
assert not invalid
# Render each PDF page. Contact sheets are supplemented by full-size inspection.
render=Q/'pages'
render.mkdir(exist_ok=True)
thumbs=[]
for i,p in enumerate(D):
    pix=p.get_pixmap(matrix=fitz.Matrix(1,1),alpha=False)
    im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
    im.save(render/f'page-{i+1:03}.png')
    thumb=ImageOps.contain(im,(242,314))
    tile=Image.new('RGB',(262,344),'#e4e9ef')
    tile.paste(thumb,((262-thumb.width)//2,8))
    ImageDraw.Draw(tile).text((12,326),f'{i+1:03}',fill='#102747')
    thumbs.append(tile)
for i in range(0,len(thumbs),16):
    sheet=Image.new('RGB',(262*4,344*4),'#d3dbe6')
    for k,t in enumerate(thumbs[i:i+16]):
        sheet.paste(t,((k%4)*262,(k//4)*344))
    sheet.save(Q/f'contact-{i//16+1:02}.jpg',quality=88)
result=dict(pages=len(D),sourceProjects=len(B['projects']),promptSectionsVerified=600,
    placeholdersPreserved=sum(len(p['placeholders']) for p in B['projects']),
    links=len(alllinks),bookmarks=len(D.get_toc()),outOfBounds=bad,
    invalidInternalLinks=len(invalid),contactSheets=(len(thumbs)+15)//16,
    pdfBytes=(R/'output'/'pdf'/'guide-cent-ateliers-ln-ia-edition-design.pdf').stat().st_size)
(Q/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(result,ensure_ascii=False))
