"""Build the LN IA book as a linked, bookmarked PDF from the extracted source."""
from pathlib import Path
from xml.sax.saxutils import escape
import json, re, hashlib, shutil
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).resolve().parents[2]
APP = ROOT/'livre-cent-ateliers-vite'
OUT = ROOT/'output'/'pdf'
QA = ROOT/'tmp'/'pdfs'
OUT.mkdir(parents=True,exist_ok=True)
BOOK = json.loads((APP/'src'/'book.json').read_text(encoding='utf-8'))
DEST = OUT/'guide-cent-ateliers-ln-ia-edition-design.pdf'
W,H = 612,792
M = 48
WIDTH = W-2*M
NAVY = colors.HexColor('#102747')
GOLD = colors.HexColor('#987127')
INK = colors.HexColor('#152439')
MUTED = colors.HexColor('#516075')
PALE = colors.HexColor('#f1f4f8')
LINE = colors.HexColor('#d5dce5')
WHITE = colors.white
for name,file in [('Body','calibri.ttf'),('BodyBold','calibrib.ttf'),
                  ('BodyItalic','calibrii.ttf'),('Display','georgia.ttf'),
                  ('DisplayBold','georgiab.ttf'),('Mono','consola.ttf')]:
    pdfmetrics.registerFont(TTFont(name,str(Path('C:/Windows/Fonts')/file)))
pdfmetrics.registerFontFamily('Body',normal='Body',bold='BodyBold',italic='BodyItalic',boldItalic='BodyBold')
pdfmetrics.registerFontFamily('Display',normal='Display',bold='DisplayBold',italic='Display',boldItalic='DisplayBold')

c = canvas.Canvas(str(DEST),pagesize=(W,H),pageCompression=1)
c.setTitle(BOOK['title'])
c.setAuthor(BOOK['author'])
c.setSubject('100 ateliers, prompts structurés, parcours Vite et contribution GitHub')
c.setCreator('LN IA | Édition de lecture et de travail')
c.showOutline()
previous_map = json.loads((APP/'src'/'page-map.json').read_text(encoding='utf-8')) if (APP/'src'/'page-map.json').exists() else {}
page = 0
pages = {}
audit = []
category_pages = {}
project_pages = {}

def clean(s):
    return s.replace('\u00a0',' ').replace('\u202f',' ').replace('\u2011','-')

def markup(s,placeholders=False):
    text = escape(clean(s)).replace('\n','<br/>')
    if placeholders:
        text = re.sub(r'(\[[^\]]+\])',r'<font color="#805c15"><b>\1</b></font>',text)
    return text

def style(font='Body',size=11.6,leading=16.3,color=INK):
    return ParagraphStyle('p',fontName=font,fontSize=size,leading=leading,textColor=color,
                          spaceAfter=0,allowWidows=0,allowOrphans=0)
def para(text,x,y,width=WIDTH,size=11.6,leading=16.3,font='Body',color=INK,raw=False):
    p = Paragraph(text if raw else markup(text),style(font,size,leading,color))
    _,height = p.wrap(width,1000)
    if y-height<57:
        raise RuntimeError(f'Overflow on page {page}: {y-height:.1f} {text[:90]}')
    p.drawOn(c,x,y-height)
    audit.append(dict(page=page,x=round(x,1),top=round(y,1),bottom=round(y-height,1),
                      width=round(width,1),font=size,text=re.sub('<[^>]+>','',text)))
    return y-height

def small(text,x,y,color=MUTED,size=8.6):
    c.setFillColor(color); c.setFont('BodyBold',size)
    c.drawString(x,y,text)

def rule(y,x=M,width=WIDTH):
    c.setStrokeColor(LINE); c.setLineWidth(.6); c.line(x,y,x+width,y)

def link(text,key,x,y,size=9,color=NAVY):
    c.setFillColor(color); c.setFont('BodyBold',size); c.drawString(x,y,text)
    w=pdfmetrics.stringWidth(text,'BodyBold',size)
    c.linkRect('',key,(x,y-3,x+w,y+size+2),relative=0,thickness=0)
    return w

def start(key,title,section='LE LIVRE',category=None,outline=0):
    global page
    if page:
        c.showPage()
    page += 1
    pages[key]=page
    c.bookmarkPage(key)
    c.addOutlineEntry(title,key,level=outline,closed=outline>0)
    small('LN IA',M,H-31,NAVY,10)
    small(section.upper(),M+62,H-30,MUTED,8.1)
    c.setFillColor(GOLD); c.circle(W-M-3,H-28,3,fill=1,stroke=0)
    if category:
        # A ten-position chapter rail is a functional locator, not decorative artwork.
        for i in range(1,11):
            yy=H-120-(i-1)*25
            c.setFillColor(GOLD if i==category else LINE)
            c.roundRect(W-14,yy,5,17,2,fill=1,stroke=0)
            c.linkRect('',f'cat-{i}',(W-24,yy-2,W,yy+20),thickness=0)
    rule(45)
    link('Sommaire','sommaire',M,29)
    if category:
        link(f'Catégorie {category:02}',f'cat-{category}',M+76,29)
    link('Méthode','methode',W-175,29)
    c.setFillColor(NAVY); c.setFont('BodyBold',10)
    c.drawRightString(W-M,29,f'{page:03}')
    return H-80

def title(text,y=H-83,kicker=None,subtitle=None,size=29):
    if kicker:
        small(kicker.upper(),M,y,GOLD,9.2); y-=24
    y=para(text,M,y,size=size,leading=size*1.19,font='Display',color=NAVY)
    if subtitle:
        y-=14; y=para(subtitle,M,y,size=12.4,leading=17.5,color=MUTED)
    return y-24

def section(label,text,y,number=None):
    if number:
        small(number,M,y-2,GOLD,10)
        x=M+26; width=WIDTH-26
    else:
        x=M; width=WIDTH
    y=para(label,x,y,width,size=12.4,leading=16.5,font='BodyBold',color=NAVY)-6
    return para(text,x,y,width,size=11.5,leading=16.2)-20

def bullets(items,y,size=11.5,gap=10):
    for item in items:
        c.setFillColor(GOLD); c.circle(M+3,y-6,2,fill=1,stroke=0)
        y=para(item,M+17,y,WIDTH-17,size=size,leading=size*1.42)-gap
    return y

# Original supplied cover, no crops or text modifications.
page=1
pages['couverture']=1
c.bookmarkPage('couverture'); c.addOutlineEntry('Couverture','couverture',0,False)
c.drawImage(ImageReader(str(APP/'public'/'couverture.png')),0,0,W,H,preserveAspectRatio=True,anchor='c')
c.linkURL(BOOK['repository'],(30,18,W-30,70),relative=0,thickness=0)

start('titre','Le guide et son usage')
y=title('Cent ateliers.\nDes réalisations à partager.',H-124,'Collection pédagogique LN IA',
        'Guide des cent ateliers et projets LN IA',35)
y=para('100 productions utiles et vérifiables',M,y-5,size=18,leading=24,font='BodyBold',color=GOLD)-28
y=para('Choisir un besoin réel, produire avec l’IA, conserver les contrôles et faire relire le résultat : ce livre accompagne le passage de l’idée à une ressource réutilisable.',M,y,size=13.5,leading=20)-32
y=section('Une édition pour lire et pour agir',
          'Chaque atelier associe une fiche de préparation à un prompt complet. Les champs entre crochets restent à compléter avec vos informations. La version interactive facilite la recherche et la copie des prompts personnalisés.',y)
y=section('Prof. Abderrahman EL HISSE',
          'Professeur agrégé de physique • Formateur et coach\nChallenge 100 Jours • Relance Automne 2026',y)
y=para('Édition du 27 septembre 2026 • Mise en forme enrichie\nCatalogue pédagogique : G001 à G100. Ces repères ne constituent ni une attribution GitHub ni une validation.',M,y-5,size=10.8,leading=15.5,color=MUTED)-18
y=para('Code : MIT. Contenus pédagogiques : CC BY-SA 4.0, attribution LN IA, conformément au cadrage du dépôt. Les ressources tierces restent soumises à leurs propres droits.',M,y,size=10.5,leading=15,color=MUTED)
c.linkURL(BOOK['repository'],(M,70,W-M,91),thickness=0)
small('github.com/elhisse-CLPrepas/cent-productions-ia-uv',M,78,NAVY,9.4)

start('sommaire','Sommaire des dix catégories')
y=title('Votre carte de lecture',kicker='Sommaire interactif',
    subtitle='Cliquez sur une catégorie, puis choisissez un atelier. Les signets du lecteur PDF donnent accès à toutes les fiches.')
for cat in BOOK['categories']:
    rowh=43
    small(f"{cat['id']:02}",M,y-12,GOLD,15)
    yy=para(cat['title'],M+39,y,WIDTH-125,size=12.2,leading=14.8,font='BodyBold',color=NAVY)
    a=(cat['id']-1)*10+1; b=cat['id']*10
    small(f'G{a:03}–G{b:03}',W-M-74,y-11,MUTED,9.2)
    if previous_map:
        small('PAGE '+str(previous_map['categoryPages'][str(cat['id'])]).zfill(3),W-M-74,y-28,GOLD,8.1)
    c.linkRect('',f"cat-{cat['id']}",(M,y-rowh+3,W-M,y+5),thickness=0)
    y-=rowh; rule(y+7)
y-=10
y=para('Pilote : catégories 01, 02, 03, 04 et 08. Les autres catégories préparent une extension progressive, après qualification.',M,y,size=10.8,leading=15.2,color=MUTED)-18
link('Méthode de travail','methode',M,y)
link('Parcours Vite','vite',M+151,y)
link('Validation et preuves','validation',M+278,y)

start('lire','Se repérer dans le livre')
y=title('Un livre à parcourir\nselon votre besoin',kicker='Mode de lecture')
y=section('01  Choisir',
          'Entrez par l’une des dix catégories. Chaque ouverture de chapitre présente les dix ateliers, leur niveau et leur durée de première version.',y)
y=section('02  Préparer',
          'Sur la première page de l’atelier, définissez le besoin, réunissez les données et écrivez les valeurs à fournir. Le résultat attendu et les contrôles servent de repères communs.',y)
y=section('03  Formuler',
          'Sur la page suivante, copiez les six sections du prompt. Remplacez tous les champs entre crochets. Conservez les contraintes, les demandes de preuves et la validation humaine.',y)
y=section('04  Revenir et avancer',
          'Les liens de bas de page ramènent au sommaire, à la catégorie ou à la méthode. Les dix repères de marge donnent un accès direct aux chapitres. Le cartouche Fiche / Prompt relie les deux pages d’un atelier.',y)
y=section('Dans la version interactive',
          'Recherchez un sujet, filtrez les catégories et les niveaux, puis complétez les champs du prompt. Le bouton de copie conserve les rubriques. Les valeurs saisies restent dans la page ouverte et ne sont pas envoyées à un service d’IA.',y)
y=para('Les niveaux Découverte, Guidé et Autonome décrivent l’accompagnement attendu. Les durées excluent l’apprentissage initial, l’attente de relecture et les corrections demandées.',M,y,size=10.8,leading=15.5,color=MUTED)

start('methode','Méthode de travail')
y=title('De l’idée à une preuve',kicker='La méthode LN IA')
steps=[
('Besoin','Décrire le bénéficiaire et la difficulté rencontrée. Formuler un résultat utile et observable.'),
('Qualification','Ouvrir une Issue, vérifier les doublons et convenir du périmètre. Le mainteneur attribue PXXX ; GXXX reste le repère du guide.'),
('Préparation','Réunir les entrées autorisées, choisir les critères d’acceptation et identifier un relecteur.'),
('Production','Personnaliser le prompt, examiner le plan puis fabriquer une version utilisable. L’humain décide et contrôle.'),
('Contrôle et correction','Tester le résultat, conserver attendu et observé, dater les essais, corriger les erreurs et signaler les limites.'),
('Relecture et partage','Ouvrir une PR, obtenir les avis requis, traiter les retours. Le mainteneur fusionne ; le lien public est vérifié après publication.')]
for n,(a,b) in enumerate(steps,1):
    y=section(a,b,y,f'{n:02}')
y=para('Une production principale par PR. Aucun push direct dans main. Un relecteur humain distinct de l’auteur unique ; deux avis favorables pour les contenus sensibles ou à fort impact.',M,y,size=10.6,leading=15,color=MUTED)

start('atelier','Conduire une séance de deux heures')
y=title('Deux heures pour avancer',kicker='Le déroulé d’un atelier',
    subtitle='La séance produit une première version contrôlée. La relecture indépendante est organisée ensuite.')
for duration,label,desc in [
('15 min','Cadrer','Besoin, bénéficiaire, périmètre et critères de réussite.'),
('15 min','Réunir et formuler','Entrées disponibles, sources autorisées et prompt complété.'),
('45 min','Produire','Une version exploitable, avec fichiers sources conservés.'),
('25 min','Contrôler','Cas normal, cas limite utile, attendu et observé.'),
('20 min','Corriger et documenter','Corrections prioritaires, fiche, preuves et demande de review.')]:
    small(duration,M,y-3,GOLD,13)
    yy=para(label,M+76,y,WIDTH-76,size=14,leading=18,font='BodyBold',color=NAVY)-7
    yy=para(desc,M+76,yy,WIDTH-76,size=11.8,leading=16.5)
    y=yy-27
y=section('Les rôles','Le candidat apporte le besoin et les sources. L’IA assiste la production. Le candidat exécute ou vérifie les tests. Le relecteur examine les preuves. Le mainteneur autorisé fusionne.',y)
y=para('Pour commencer : G001, G022 ou G031 au niveau Découverte. G011 et G024 demandent davantage d’accompagnement. G080 est un atelier autonome de 4 à 8 heures : prévoyez plusieurs séances ou qualifiez un périmètre réduit.',M,y,size=10.9,leading=15.5,color=MUTED)

start('prompts','Personnaliser les prompts')
y=title('Un prompt complet,\ndes champs explicites',kicker='Avant la première exécution')
y=section('Remplir sans inventer','Chaque expression entre crochets est une donnée à fournir. Une entrée absente reste à préciser. L’assistant peut poser jusqu’à trois questions ciblées lorsqu’une information indispensable manque.',y)
y=section('Exemple de personnalisation','[discipline] → physique ; [niveau] → première année ; [objectif] → interpréter une courbe de charge ; [durée] → 50 minutes. Ces valeurs illustrent le format attendu : adaptez-les à votre situation.',y)
y=section('Conserver les six rubriques','Rôle et objectif ; contexte et données ; livrable et méthode ; sources et précautions ; contrôles et preuves ; livraison et validation humaine.',y)
y=section('Réutiliser le prompt réellement exécuté','Conservez sa version finale dans votre dossier. Notez l’outil et la version connue, les changements décidés par l’humain et les corrections demandées après les tests.',y)
y=section('Lire les verbes avec précision','Un test demandé est un test à effectuer. Un résultat attendu n’est pas un résultat observé. La mention « validé » reste réservée aux contrôles et aux avis humains effectivement enregistrés.',y)
y=para('Les prompts ci-après reprennent les instructions des fiches sources. Leur découpage en rubriques améliore la lecture sans supprimer les champs à compléter ni les limites imposées.',M,y,size=10.9,leading=15.6,color=MUTED)

start('vite','Parcours Vite')
y=title('Votre premier projet\navec Vite',kicker='Parcours technique',
    subtitle='Un prolongement pour les ateliers web G041 à G050, après la réalisation d’une première fiche de contenu.')
y=section('Préparer un dossier dédié','Installer une version de Node.js compatible. Vite annonce Node.js 20.19+ ou 22.12+ ; un modèle peut demander davantage. Vérifier la documentation et les avertissements du gestionnaire de paquets.',y)
y=section('Créer et démarrer','Dans un terminal ouvert dans le dossier parent de votre projet, exécuter les commandes suivantes. Choisir un dossier neuf pour préserver les fichiers existants.',y)
commands=['npm create vite@latest mon-atelier -- --template vanilla','cd mon-atelier','npm install','npm run dev']
for cmd in commands:
    y=para(cmd,M+14,y,WIDTH-28,size=10.8,leading=18,font='Mono')-5
y-=17
y=section('Organiser le contenu','Séparer le contenu, la présentation et les interactions. Garder les médias dans public et les fichiers de travail dans src. Conserver des titres compréhensibles et des liens accessibles au clavier.',y)
y=section('Vérifier puis construire','Exécuter npm run build pour créer la version de diffusion. Utiliser npm run preview pour la vérifier localement. Le dossier de sortie habituel est dist ; preview n’est pas un serveur de production.',y)
y=para('Références officielles consultées le 27 septembre 2026 :',M,y,size=10,leading=14,color=MUTED)-10
for label,url in [('Démarrer avec Vite','https://vite.dev/guide/'),('Préparer une diffusion statique','https://vite.dev/guide/static-deploy.html')]:
    yy=y; y=para(label,M,y,size=10.5,leading=15,color=NAVY)-8
    c.linkURL(url,(M,y+5,W-M,yy+3),thickness=0)

start('vite-prompt','Cadrer une réalisation web')
y=title('Le brief d’un atelier web',kicker='Parcours Vite • mise en pratique')
y=section('D’abord le résultat attendu','Choisir une seule tâche utile : consulter une leçon, répondre à un quiz ou parcourir un portfolio. Relier ce besoin à une fiche G041 à G050 et qualifier l’Issue avant de développer.',y)
y=section('Les informations à fournir','[atelier choisi] • [public] • [contenus autorisés] • [fonction principale] • [contraintes d’accessibilité] • [environnement] • [critères de réussite].',y)
y=section('Complément de consigne à joindre au prompt de l’atelier',
    'Pour la réalisation web, utilise Vite dans un dossier dédié. Propose une structure simple adaptée à mon environnement. Préserve les instructions du prompt principal et les fichiers existants. Explique les commandes nécessaires et distingue les contrôles exécutés des contrôles restant à faire. Prépare les fichiers sources, un mode d’emploi et la version de diffusion. Ne publie rien sans autorisation.',y)
y=section('Recette de la version locale','Vérifier le parcours principal, les liens, le clavier, l’affichage sur petit écran et un cas d’entrée incomplet. Noter attendu, observé, date et correction. Un affichage réussi ne suffit pas à prouver l’utilité pédagogique.',y)
y=section('Passage au dépôt','Joindre les fichiers sources, les versions nécessaires, les instructions de reproduction et les preuves. Ouvrir une PR liée à l’Issue. La review humaine et la décision de diffusion restent distinctes de la réussite de la construction.',y)
y=para('Cette consigne complète les ateliers web. Les autres projets restent libres d’utiliser les outils adaptés à leur livrable.',M,y,size=10.8,leading=15.5,color=MUTED)

# Ten sections, with one two-page spread for each of the 100 source projects.
for cat in BOOK['categories']:
    n=cat['id']
    key=f'cat-{n}'
    start(key,cat['title'],'CATALOGUE',n)
    category_pages[n]=page
    y=title(cat['title'],H-91,f"Catégorie {n:02} • {'Pilote du dépôt' if cat['pilot'] else 'Extension progressive'}",
            cat['description'],size=28)
    items=[p for p in BOOK['projects'] if p['category']==n]
    for p in items:
        small(p['id'],M,y-11,GOLD,11)
        para(p['title'],M+47,y,WIDTH-130,size=11.6,leading=14.6,font='BodyBold',color=NAVY)
        small(p['duration'],W-M-70,y-11,MUTED,9)
        small(p['level'],M+47,y-30,MUTED,8.7)
        if previous_map:
            small('P. '+str(previous_map['projectPages'][p['id']]['brief']).zfill(3),W-M-70,y-30,GOLD,8.3)
        c.linkRect('',p['id'],(M,y-39,W-M,y+3),thickness=0)
        y-=46; rule(y+7)
    y-=3
    para('Conseil pour la relecture. '+cat['reviewAdvice'],M,y,size=10.4,leading=14.5,color=MUTED)
    for p in items:
        start(p['id'],p['id']+' • '+p['title'],f"{n:02} / {cat['short']} / PRÉPARER",n,outline=1)
        project_pages[p['id']]=dict(brief=page,prompt=page+1)
        y=title(p['title'],H-82,p['id']+' • Fiche de préparation',size=25)
        small(p['level'].upper(),M,y,GOLD,9.2)
        small('PREMIÈRE VERSION : '+p['duration'].upper(),M+120,y,MUTED,9.2)
        link('Lire le prompt →',p['id']+'-prompt',W-M-97,y,size=9.1)
        y-=26
        y=section('Le besoin',p['need'],y)
        y=section('Pour qui',p['audience'],y)
        y=section('Le livrable attendu',p['deliverable'],y)
        small('DONNÉES À RÉUNIR ET À COMPLÉTER',M,y,GOLD,9.1); y-=18
        for field in p['inputs']:
            y=para('['+field+']',M,y,WIDTH,size=10.8,leading=14.5,font='BodyBold',color=NAVY)
            y-=13; rule(y); y-=13
        y-=1
        y=section('Les contrôles déterminants',p['checks'][0].upper()+p['checks'][1:]+'.',y)
        para('À joindre à la review : le livrable, le prompt adapté, les sources et un journal daté indiquant le résultat attendu, le résultat observé et les limites.',M,y,size=10.5,leading=14.8,color=MUTED)

        start(p['id']+'-prompt',p['id']+' • Prompt complet',f"{n:02} / {cat['short']} / FORMULER",n,outline=2)
        y=title('Le prompt maître',H-81,p['id']+' • À personnaliser puis à copier',size=27)
        link('← Revenir à la fiche',p['id'],M,y+6,size=9.3)
        y-=20
        for idx,block in enumerate(p['prompt'],1):
            small(f'{idx:02}  '+block['title'].upper(),M,y,GOLD,8.5); y-=11
            y=para(markup(block['text'],True),M,y,WIDTH,size=11.2,leading=15.45,raw=True)-17
        y-=2
        rule(y); y-=16
        para('Avant l’exécution : compléter tous les champs entre crochets et relire les données transmises. Après l’exécution : conserver les tests réellement effectués et demander un avis humain.',M,y,size=10.2,leading=14.3,color=MUTED)

start('contribuer','Préparer une contribution GitHub')
y=title('Contribuer au dépôt',kicker='Du repère G au numéro P')
for n,(head,body) in enumerate([
('Ouvrir et qualifier une Issue','Décrire besoin, bénéficiaire, livrable et critères. Vérifier les sujets existants. Attendre le numéro PXXX et l’affectation des rôles.'),
('Créer une branche ou un fork','Utiliser contribution/PXXX-titre-court. Copier le modèle officiel dans le dossier de la catégorie, sans remplacer une contribution existante.'),
('Documenter la réalisation','Compléter besoin, public, objectif, entrées, outils, prompt, workflow humain–IA, livrable, contrôles, sources, limites, preuves et conditions de réutilisation.'),
('Ouvrir une Pull Request','Relier la PR à l’Issue. Garder une production principale par PR. Joindre les fichiers, les contrôles et les questions non résolues.'),
('Traiter la review','Corriger les points bloquants et enregistrer les avis humains requis. L’IA ne peut pas déclarer seule une production vérifiée.'),
('Fusionner et vérifier le partage','Le mainteneur autorisé fusionne. Vérifier le lien effectivement consultable, renseigner Lien public et clôturer selon la procédure du dépôt.')],1):
    y=section(head,body,y,f'{n:02}')
y=para('Exemple : contributions/01-enseigner-apprendre/\nPXXX-enseignement-fiche-pedagogique.md\nPXXX doit être remplacé par le numéro attribué. La catégorie 08 conserve le dossier 08-resoudre-probleme-numerique.',M,y,size=10.3,leading=14.5,color=MUTED)

start('validation','Valider la qualité')
y=title('Une validation fondée\nsur des preuves',kicker='Grille de relecture')
for head,body in [
('Utilité','Le besoin et le public sont précis ; un cas d’usage montre un résultat exploitable.'),
('Méthode','Le prompt, les étapes et les fichiers permettent à un tiers de suivre la démarche.'),
('Exactitude et fonctionnement','Les faits, calculs, liens et comportements utiles ont été contrôlés ; les résultats sont conservés.'),
('Confidentialité et droits','Les fichiers et métadonnées ont été examinés. Les ressources tierces disposent de droits compatibles et d’attributions.'),
('Limites','Les incertitudes, cas non couverts et restrictions d’utilisation sont indiqués.'),
('Relecture','Un avis humain motivé figure dans la PR ; les corrections bloquantes ont été traitées.')]:
    y=section(head,body,y)
y=para('Santé, droit, finances, sécurité, données personnelles et décisions à fort impact : deux avis humains favorables. Un exercice fictif touchant ces domaines reste soumis à qualification.',M,y,size=10.8,leading=15.1,color=MUTED)

start('preuves','Journal de contrôles à compléter')
y=title('Conserver la preuve\ndu travail réalisé',kicker='Feuille de recette')
y=para('Une ligne par contrôle déterminant. Laissez les résultats vierges jusqu’à l’exécution du test. Conservez les fichiers ou captures autorisés qui permettent de comprendre votre décision.',M,y,size=12,leading=17)-23
for number in range(1,4):
    small(f'CONTRÔLE {number:02}',M,y,GOLD,10); y-=23
    for label in ['Cas et date','Résultat attendu','Résultat observé','Décision et lien de preuve']:
        small(label,M,y,MUTED,10)
        c.setStrokeColor(LINE);c.line(M+138,y-2,W-M,y-2)
        y-=25
    y-=24
para('Avis du relecteur : À corriger / Validable / Validé.\nNom, date, observations et lien de la PR : à renseigner après la review.',M,y,size=11.2,leading=16,color=MUTED)

start('statuts','Suivre la progression')
y=title('Faire avancer la carte',kicker='GitHub Projects',
    subtitle='Le statut décrit le travail observé et la prochaine action.')
for head,body in [
('Idée proposée → À clarifier','Le besoin est décrit ; les informations manquantes sont identifiées.'),
('Prête à produire → En production','Le périmètre, les entrées, le responsable et les critères sont convenus ; la fabrication commence.'),
('En revue → Corrections demandées','La fiche, le livrable et les preuves sont consultables ; les retours précisent ce qu’il faut corriger.'),
('Validée','Les contrôles et les avis humains requis sont enregistrés ; les blocages sont levés.'),
('Publiée','La fusion et la diffusion sont effectuées ; un lien public réellement consultable a été testé.')]:
    y=section(head,body,y)
y=para('Comptez séparément les projets choisis, les premières versions, les productions en revue, validées et publiées. Le nombre de prompts exécutés n’est pas une mesure de compétences acquises.',M,y,size=11.3,leading=16)-22
y=para('Project officiel : Challenge 100J — 100 Productions IA',M,y,size=11.1,leading=16,color=NAVY)
c.linkURL(BOOK['projectUrl'],(M,y-2,W-M,y+20),thickness=0)

start('parcours','Choisir un parcours progressif')
y=title('Trois chemins\npour continuer',kicker='Après votre première production')
for head,body,ids in [
('Enseignant','Passer de la préparation d’une séance à une ressource numérique, en testant chaque étape avec le public visé.',['G001','G003','G008','G041','G010']),
('Coach ou formateur','Clarifier une présentation, accueillir les participants puis organiser leur progression.',['G024','G038','G081','G082','G042']),
('Porteur de projet','Cadrer le besoin, tester une proposition et examiner les retours avant d’élargir la solution.',['G011','G061','G062','G070','G069'])]:
    y=section(head,body,y)
    xx=M
    for ident in ids:
        xx+=link(ident,ident,xx,y,size=12,color=GOLD)+28
    y-=43
y=section('Étendre après vérification','Commencer dans les catégories pilotes. Ouvrir progressivement les autres catégories lorsque les besoins sont qualifiés et que la capacité de relecture est suffisante.',y)
y=para('Chaque étape produit une ressource utilisable séparément. Adaptez la suite au temps disponible, aux bénéficiaires et aux retours obtenus.',M,y,size=11.3,leading=16,color=MUTED)

start('sources','Sources et documents de référence')
y=title('Les références\ndu livre',kicker='Sources et traçabilité')
refs=[
('Présentation du projet','README.md'),
('Architecture et workflow','FICHE-CADRAGE-V2-100-PRODUCTIONS-IA-UTILES-VERIFIEES-LN-IA.md'),
('Décisions validées du pilote','DECISIONS-CADRAGE-V2.md'),
('Parcours de contribution','CONTRIBUTING.md'),
('Modèle de fiche','modeles/MODELE-FICHE-PRODUCTION.md'),
('Critères de qualité','gouvernance/CRITERES-QUALITE.md'),
('Règles de validation','gouvernance/REGLES-VALIDATION.md')]
for head,path in refs:
    y=para(head,M,y,size=12,font='BodyBold',leading=16,color=NAVY)-4
    yy=y
    y=para(path,M,y,size=9.8,leading=13.8,color=MUTED)-17
    c.linkURL(BOOK['repository']+'/blob/main/'+path,(M,y+10,W-M,yy+4),thickness=0)
y=section('Documents de cette édition','Guide source : version 1.0 du 27 septembre 2026. Couverture : image fournie par l’auteur. Les cent fiches constituent un catalogue de réalisations à entreprendre ; les fichiers, avis et décisions du dépôt déterminent les statuts officiels.',y)
y=para('Le parcours Vite et les repères de navigation complètent la présentation du guide. Les instructions des cent prompts et leurs champs à compléter sont conservés. Consultez les règles actuelles du dépôt avant toute contribution.',M,y,size=10.9,leading=15.3,color=MUTED)
c.save()
(QA/'layout-boxes.json').write_text(json.dumps(audit,ensure_ascii=False),encoding='utf-8')
manifest=dict(pages=page,anchors=pages,categoryPages=category_pages,projectPages=project_pages,
              sourceSha256=BOOK['sourceSha256'],pdfSha256=hashlib.sha256(DEST.read_bytes()).hexdigest())
(APP/'src'/'page-map.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
shutil.copy2(DEST,APP/'public'/'guide-ln-ia.pdf')
print(json.dumps(dict(file=str(DEST),pages=page,blocks=len(audit),minBottom=min(b['bottom'] for b in audit)),ensure_ascii=False))
