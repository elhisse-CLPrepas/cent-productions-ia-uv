from pathlib import Path
import hashlib, json, re, shutil, zipfile
import xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parents[2]
APP = ROOT / 'livre-cent-ateliers-vite'
SOURCE = ROOT / 'guide-cent-ateliers-projets-ln-IA.docx'
NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with zipfile.ZipFile(SOURCE) as z:
    xml = ET.fromstring(z.read('word/document.xml'))
paragraphs = [''.join(n.text or '' for n in p.findall('.//w:t', NS)).strip()
              for p in xml.findall('.//w:body//w:p', NS)]
titles = ['Enseigner et apprendre', 'Organiser et gérer un projet',
    'Communiquer et présenter', 'Produire des documents',
    'Créer un mini-site ou une application', 'Analyser des données',
    'Entreprendre et développer une activité', 'Résoudre un problème numérique',
    'Développer ses compétences', 'Agir de manière responsable avec l’IA']
descriptions = [
    'Transformer un objectif pédagogique en ressource testée avec un apprenant.',
    'Clarifier le travail collectif et conserver les décisions qui permettent de le suivre.',
    'Rendre un message compréhensible et adapté au public sans fabriquer de preuves.',
    'Créer des documents utilisables dont les sources et les versions restent identifiables.',
    'Construire des outils locaux simples puis préparer leur diffusion après recette.',
    'Produire des constats vérifiables à partir de données documentées et non sensibles.',
    'Formaliser une offre et tester son utilité sans inventer un marché ou des clients.',
    'Diagnostiquer à partir de symptômes et préserver les fichiers pendant les essais.',
    'Organiser une progression personnelle fondée sur des réalisations et des retours.',
    'Rendre les contrôles et les limites explicites avant de diffuser une production.']
shorts = ['Apprendre', 'Organiser', 'Communiquer', 'Documenter', 'Construire',
          'Analyser', 'Entreprendre', 'Résoudre', 'Progresser', 'Vérifier']
categories = [dict(id=i+1, title=t, short=shorts[i], description=descriptions[i],
                   pilot=i+1 in [1,2,3,4,8]) for i,t in enumerate(titles)]
reviews = [paragraphs[i+1] for i,t in enumerate(paragraphs[:-1]) if t == 'Conseil pour la relecture']
assert len(reviews) == 10
for category, advice in zip(categories,reviews):
    category['reviewAdvice'] = advice
projects = []
labels = ['Rôle et objectif', 'Contexte et données à compléter', 'Livrable et méthode',
          'Sources et précautions', 'Contrôles et preuves', 'Livraison et validation humaine']
for i,text in enumerate(paragraphs):
    match = re.match(r'^(G\d{3})\s+(.+)$',text)
    if not match or i+1 >= len(paragraphs) or not paragraphs[i+1].startswith('Catégorie '):
        continue
    block = paragraphs[i:i+16]
    meta = re.match(r'Catégorie (\d+)\s+•\s+(.+?)\s+•\s+Première version\s*:\s*(.+)',block[1])
    assert meta,block[1]
    prompt = block[7:13]
    assert len(prompt)==6 and prompt[0].startswith('Tu es'),match.group(1)
    inputs = re.findall(r'\[([^\]]+)\]',block[5])
    placeholders = list(dict.fromkeys(re.findall(r'\[([^\]]+)\]','\n'.join(prompt))))
    method = prompt[2].split('Méthode spécifique : ',1)[1]
    checks = prompt[4].split('Prépare la recette suivante : ',1)[1].split('. Pour chaque contrôle',1)[0]
    projects.append(dict(id=match.group(1),title=match.group(2),category=int(meta.group(1)),
        level=meta.group(2),duration=meta.group(3),audience=block[2].removeprefix('Public '),
        need=block[3].removeprefix('Besoin '),deliverable=block[4].removeprefix('Livrable attendu '),
        inputs=inputs,placeholders=placeholders,method=method,checks=checks,
        prompt=[dict(title=label,text=txt) for label,txt in zip(labels,prompt)],review=block[14]))
assert len(projects)==100
assert [p['id'] for p in projects]==[f'G{i:03}' for i in range(1,101)]
assert all(sum(p['category']==c['id'] for p in projects)==10 for c in categories)
book = dict(title='Guide des cent ateliers et projets LN IA',author='Prof. Abderrahman EL HISSE',
    edition='Édition du 27 septembre 2026',subtitle='100 productions utiles et vérifiables',
    repository='https://github.com/elhisse-CLPrepas/cent-productions-ia-uv',
    projectUrl='https://github.com/users/elhisse-CLPrepas/projects/4',categories=categories,
    projects=projects,sourceSha256=hashlib.sha256(SOURCE.read_bytes()).hexdigest())
(APP/'src'/'book.json').write_text(json.dumps(book,ensure_ascii=False,indent=2),encoding='utf-8')
shutil.copy2(ROOT/'Image ChatGPT 27 sept. 2026, 23_15_09.png',APP/'public'/'couverture.png')
(ROOT/'tmp'/'pdfs'/'source-paragraphs.json').write_text(json.dumps(paragraphs,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(dict(projects=len(projects),categories=len(categories),
    placeholders=sum(len(p['placeholders']) for p in projects),
    promptWords=[min(sum(len(s['text'].split()) for s in p['prompt']) for p in projects),
    max(sum(len(s['text'].split()) for s in p['prompt']) for p in projects)],
    sourceSha256=book['sourceSha256']),ensure_ascii=False))
