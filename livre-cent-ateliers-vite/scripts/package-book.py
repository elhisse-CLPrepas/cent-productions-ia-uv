from pathlib import Path
import json,base64,zipfile
R=Path(__file__).resolve().parents[2]
A=R/'livre-cent-ateliers-vite'
O=R/'output'
book=json.loads((A/'src/book.json').read_text(encoding='utf-8'))
page_map=json.loads((A/'src/page-map.json').read_text(encoding='utf-8'))
utils=(A/'src/prompt-utils.js').read_text(encoding='utf-8').replace('export ','')
js='\n'.join(line for line in (A/'src/main.js').read_text(encoding='utf-8').splitlines() if not line.startswith('import '))
css=(A/'src/style.css').read_text(encoding='utf-8')
safe_json=lambda x:json.dumps(x,ensure_ascii=False).replace('<','\\u003c')
cover='data:image/png;base64,'+base64.b64encode((A/'public/couverture.png').read_bytes()).decode()
script=utils+'\nconst esc=escapeHtml;\nconst book='+safe_json(book)+';\nconst pageMap='+safe_json(page_map)+';\nwindow.__BOOK_COVER__='+safe_json(cover)+';\nwindow.__BOOK_PDF__="./pdf/guide-cent-ateliers-ln-ia-edition-design.pdf";\n'+js
assert '</script' not in script.lower()
html='<!doctype html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="theme-color" content="#102747"><title>Le livre des cent ateliers · LN IA</title><style>'+css+'</style></head><body><a class="skip" href="#content">Aller au contenu</a><div id="app"></div><script>'+script+'</script></body></html>'
(O/'livre-cent-ateliers-ln-ia.html').write_text(html,encoding='utf-8')
(R/'tmp/pdfs/offline-script.js').write_text(script,encoding='utf-8')
readme='''# Livre des cent ateliers LN IA

## Lire le livre

- PDF : ouvrir pdf/guide-cent-ateliers-ln-ia-edition-design.pdf.
- Livre interactif : ouvrir livre-cent-ateliers-ln-ia.html par un double clic.
- Conserver le fichier HTML et le dossier pdf ensemble pour que les liens du lecteur vers le PDF fonctionnent.

Le lecteur autonome contient les cent fiches, les prompts et la couverture. Aucun serveur ni accès à un service IA n’est nécessaire pour consulter et personnaliser les prompts. Les liens externes vers GitHub et la documentation demandent Internet.

Les informations saisies restent en mémoire pendant la session de lecture. Elles disparaissent à la fermeture ou au rechargement. Utiliser « Télécharger le prompt » pour les conserver. Aucun champ n’est envoyé à une API.

## Développer la version Vite

Le dossier livre-cent-ateliers-vite contient le projet et son fichier de verrouillage des dépendances.

    cd livre-cent-ateliers-vite
    npm ci
    npm run dev

Ouvrir l’adresse locale affichée dans le terminal. Pour préparer une version statique :

    npm run build
    npm run preview

Le résultat est dans dist. Ce dossier se sert par HTTP ; le fichier HTML autonome ci-dessus est prévu pour le double clic.

## Contenu et édition

- 100 ateliers et 10 catégories extraits du Word original.
- 600 blocs d’instructions conservés dans leur ordre.
- 456 champs à personnaliser au total, comptés une fois par atelier.
- PDF de 225 pages avec 225 signets et navigation interne.
- Court parcours pédagogique Vite ajouté aux pages d’accompagnement.
- Aucun statut de validation de production n’est attribué par ce livre.
- Les originaux Word et PNG ne sont pas modifiés.

Les scripts de génération sont fournis pour rendre la fabrication inspectable. Le générateur PDF utilise Python, reportlab, PyMuPDF et Pillow pour les contrôles ; ses polices sont les polices Windows Calibri et Georgia. Les fichiers de polices ne sont pas redistribués. La reconstruction des documents demande les fichiers sources et l’arborescence du dépôt. Le lecteur Vite peut être utilisé indépendamment.

Auteur : Prof. Abderrahman EL HISSE. Édition source du 27 septembre 2026.
Code : MIT. Contenus pédagogiques : CC BY-SA 4.0 avec attribution LN IA, sous réserve des droits des ressources tierces.
'''
(O/'LIRE-LE-LIVRE.md').write_text(readme,encoding='utf-8')

with zipfile.ZipFile(O/'livre-cent-ateliers-ln-ia-complet.zip','w',zipfile.ZIP_DEFLATED) as z:
 for file in [O/'livre-cent-ateliers-ln-ia.html',O/'LIRE-LE-LIVRE.md',O/'pdf/guide-cent-ateliers-ln-ia-edition-design.pdf']:
  z.write(file,file.relative_to(O))
 for path in A.rglob('*'):
  if path.is_file() and not any(x in path.parts for x in ['node_modules','.git','dist']):
   z.write(path,path.relative_to(R))
print(json.dumps(dict(html=str(O/'livre-cent-ateliers-ln-ia.html'),zip=str(O/'livre-cent-ateliers-ln-ia-complet.zip'),htmlBytes=(O/'livre-cent-ateliers-ln-ia.html').stat().st_size),ensure_ascii=False))
