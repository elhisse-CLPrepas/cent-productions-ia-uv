import './style.css';
import book from './book.json';
import pageMap from './page-map.json';
import {escapeHtml as esc, normalize, completeText, promptText, unresolved, atelierLink} from './prompt-utils.js';

const $ = (s) => document.querySelector(s);
const state = {query:'', category:'', level:'', values:{}, view:'overview'};
const coverUrl = window.__BOOK_COVER__ || './couverture.png';
const pdfUrl = window.__BOOK_PDF__ || './guide-ln-ia.pdf';
const category = (id) => book.categories.find(c=>c.id===Number(id));
const fieldValues = (id) => state.values[id] ||= {};
const pdfLink = (key) => pdfUrl+'#page='+(pageMap.anchors[key] || 1);
const tag = (text, cls='')=>'<span class="tag '+cls+'">'+esc(text)+'</span>';
const icon = (name) => ({arrow:'↗', prev:'←',next:'→',search:'⌕',menu:'☰',close:'×',check:'✓'})[name] || '';
const home = () => '#sommaire';
const catLink = c => '#categorie/'+c.id;
const projectLink = p => '#atelier/'+p.id;
const chapterList = () => book.categories.map(c=>'<a href="'+catLink(c)+'" class="chapter-link"><span>'+String(c.id).padStart(2,'0')+'</span><span>'+esc(c.short)+'</span></a>').join('');

function shell() {
  $('#app').innerHTML = '<header class="mobile-bar"><a href="#sommaire">LN IA <span>Le livre des ateliers</span></a><button id="menu" aria-label="Afficher le sommaire" aria-expanded="false">☰</button></header>'+
    '<aside class="sidebar" aria-label="Navigation principale"><a class="brand" href="#sommaire"><span class="brand-mark">LN<span>IA</span></span><span>COLLECTION PÉDAGOGIQUE</span></a>'+
    '<nav><a class="nav-main" href="#sommaire">Le sommaire <span>↗</span></a><a class="nav-main" href="#catalogue">Les 100 ateliers <span>↗</span></a><p class="nav-label">LES DIX CHAPITRES</p>'+chapterList()+
    '<div class="nav-extra"><a href="#methode">La méthode LN IA</a><a href="#vite">Le parcours Vite</a><a href="#preuves">La fiche de preuve</a></div></nav>'+
    '<div class="sidebar-bottom"><a href="'+pdfUrl+'" download>↓ Télécharger le PDF <small>225 pages · navigation cliquable</small></a><p>Prof. Abderrahman EL HISSE<br>Édition du 27 septembre 2026</p></div></aside>'+
    '<div class="workspace"><header class="topbar"><span id="breadcrumb">LE LIVRE DES CENT ATELIERS</span><a href="'+book.repository+'" target="_blank" rel="noopener">Le dépôt de référence ↗</a></header><main id="content" tabindex="-1"></main><footer class="site-footer"><span>LN IA · L’IA assiste. L’humain vérifie.</span><a href="#sommaire">Retour au sommaire ↑</a></footer></div><div id="toast" role="status" aria-live="polite"></div>';
  $('#menu').onclick=()=>{const open=document.body.classList.toggle('menu-open');$('#menu').setAttribute('aria-expanded',String(open));};
  document.querySelectorAll('.sidebar a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));
}

function setTitle(label){document.title=label+' · LN IA';$('#breadcrumb').textContent=label.toUpperCase();}
function jumpTop(){window.scrollTo({top:0,behavior:'instant'});}
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('visible');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}

function renderHome(){
  setTitle('Le livre des cent ateliers');
  $('#content').innerHTML='<section class="book-opening"><div class="cover-wrap"><img class="cover" src="'+coverUrl+'" alt="Couverture du Guide des cent ateliers et projets LN IA, édition du 27 septembre 2026." width="950" height="1228"></div>'+
    '<div class="opening-copy"><p class="eyebrow">LE GUIDE À LIRE ET À UTILISER</p><h1>Choisir un projet.<br>Produire une preuve.</h1><p class="intro">Cent ateliers pour transformer un besoin réel en une ressource utile, documentée et relue.</p><div class="book-numbers"><span><b>100</b> ateliers</span><span><b>10</b> catégories</span><span><b>6</b> rubriques par prompt</span></div>'+
    '<div class="opening-actions"><a class="button primary" href="#catalogue">Explorer les ateliers <span>→</span></a><a class="button subtle" href="#methode">Lire la méthode</a></div><p class="quiet">Les champs des prompts se complètent dans le livre. La validation reste humaine.</p></div></section>'+
    '<section class="contents"><div class="section-heading"><div><p class="eyebrow">LA CARTE DU LIVRE</p><h2>Entrez par votre besoin</h2></div><a href="#catalogue">Voir les 100 fiches →</a></div><div class="chapter-grid">'+book.categories.map(c=>'<a class="chapter-card" href="'+catLink(c)+'"><span class="chapter-no">'+String(c.id).padStart(2,'0')+'</span><div><h3>'+esc(c.title)+'</h3><p>'+esc(c.description)+'</p><span class="chapter-meta">G'+String((c.id-1)*10+1).padStart(3,'0')+'–G'+String(c.id*10).padStart(3,'0')+' · '+(c.pilot?'Catégorie du pilote':'Extension progressive')+'</span></div><span class="chapter-arrow">↗</span></a>').join('')+'</div></section>'+
    '<section class="first-step"><span class="eyebrow">POUR UNE PREMIÈRE RÉALISATION</span><h2>Une fiche, un visuel ou un guide.</h2><div>'+['G001','G022','G031'].map(id=>{const p=book.projects.find(p=>p.id===id);return '<a href="'+projectLink(p)+'"><b>'+p.id+'</b> '+esc(p.title)+' <span>→</span></a>';}).join('')+'</div></section>';
}

function card(p) {
  return '<a class="project-card" href="'+projectLink(p)+'"><div class="project-card-top"><span>'+p.id+'</span>'+tag(p.level)+'</div><h3>'+esc(p.title)+'</h3><p>'+esc(p.need)+'</p><div class="project-card-bottom"><span>'+esc(p.duration)+'</span><span>Ouvrir la fiche →</span></div></a>';
}
function filterProjects(){
 const q=normalize(state.query);
 return book.projects.filter(p=>(!state.category||p.category===Number(state.category))&&(!state.level||p.level===state.level)&&(!q||normalize([p.id,p.title,p.need,p.deliverable,category(p.category).title].join(' ')).includes(q)));
}
function updateResults(){
 const results=filterProjects();
 $('#results').innerHTML=results.length?results.map(card).join(''):'<div class="empty"><h3>Aucun atelier ne correspond à cette recherche.</h3><p>Essayez un autre mot ou réinitialisez les filtres.</p><button class="button" id="reset-empty">Réinitialiser les filtres</button></div>';
 $('#result-count').textContent=results.length+' atelier'+(results.length>1?'s':'');
 $('#reset-empty')?.addEventListener('click',resetFilters);
}
function resetFilters(){state.query='';state.category='';state.level='';location.hash='#catalogue';renderCatalogue();}
function renderCatalogue(catId=null){
 if(catId)state.category=String(catId);
 const cat=catId?category(catId):null;
 setTitle(cat?cat.title:'Les cent ateliers');
 $('#content').innerHTML='<section class="catalogue-head"><p class="eyebrow">'+(cat?'CHAPITRE '+String(cat.id).padStart(2,'0'):'LE CATALOGUE COMPLET')+'</p><h1>'+esc(cat?cat.title:'À chaque besoin, un atelier.')+'</h1><p class="intro">'+esc(cat?cat.description:'Recherchez une réalisation utile, préparez ses entrées et ouvrez son prompt complet.')+'</p></section>'+
 '<form class="filters" id="filters"><label class="search-label"><span>Rechercher un atelier</span><input type="search" id="search" placeholder="Un sujet, un besoin, G041…" value="'+esc(state.query)+'"></label><label><span>Catégorie</span><select id="category"><option value="">Les dix catégories</option>'+book.categories.map(c=>'<option value="'+c.id+'" '+(String(c.id)===state.category?'selected':'')+'>'+String(c.id).padStart(2,'0')+' · '+esc(c.short)+'</option>').join('')+'</select></label><label><span>Niveau</span><select id="level"><option value="">Tous les niveaux</option>'+['Découverte','Guidé','Autonome'].map(x=>'<option '+(x===state.level?'selected':'')+'>'+x+'</option>').join('')+'</select></label><button type="button" class="reset" id="reset">Effacer</button></form>'+
 '<div class="results-heading"><span id="result-count" role="status"></span><span>Durées : première version et autocontrôle</span></div><div class="project-grid" id="results"></div>';
 if(cat){const tip=document.createElement('p');tip.className='quiet';tip.textContent='Conseil de relecture : '+cat.reviewAdvice;document.querySelector('.catalogue-head').append(tip);}
 $('#filters').onsubmit=e=>e.preventDefault();
 $('#search').oninput=e=>{state.query=e.target.value;updateResults();};
 $('#category').onchange=e=>{state.category=e.target.value;updateResults();};
 $('#level').onchange=e=>{state.level=e.target.value;updateResults();};
 $('#reset').onclick=resetFilters;
 updateResults();
}
function highlight(text){return esc(text).replace(/\[([^\]]+)\]/g,'<mark>[$1]</mark>');}
function promptBlocks(p){
 return p.prompt.map((s,i)=>'<section class="prompt-section"><h3><span>'+String(i+1).padStart(2,'0')+'</span>'+esc(s.title)+'</h3><p>'+highlight(completeText(s.text,fieldValues(p.id)))+'</p></section>').join('');
}
function refreshPrompt(p){
 $('#prompt-content').innerHTML=promptBlocks(p);
 const n=unresolved(p,fieldValues(p.id)).length;
 $('#completion').textContent=n?n+' champ'+(n>1?'s':'')+' à compléter':'Tous les champs sont renseignés';
 $('#completion').classList.toggle('complete',n===0);
}
async function copyText(text){
 try { await navigator.clipboard.writeText(text); return true; } catch {
  const el=document.createElement('textarea');
  el.value=text;el.style.cssText='position:fixed;left:-10000px';
  document.body.append(el);el.select();
  try { return document.execCommand('copy'); } catch { return false; } finally { el.remove(); }
 }
}
async function copyPrompt(p){
 const success=await copyText(promptText(p,fieldValues(p.id)));
 const n=unresolved(p,fieldValues(p.id)).length;
 toast(success?(n?'Prompt copié avec '+n+' champ(s) encore à compléter.':'Prompt personnalisé copié.'):'Copie indisponible : utilisez « Télécharger le prompt ».');
}
function downloadPrompt(p){
 const blob=new Blob([promptText(p,fieldValues(p.id))],{type:'text/plain;charset=utf-8'});
 const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=p.id+'-prompt.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function renderProject(id){
 const p=book.projects.find(p=>p.id===id);
 if(!p){renderNotFound();return;}
 const cat=category(p.category), idx=book.projects.indexOf(p);
 setTitle(p.id+' · '+p.title);
 const values=fieldValues(p.id);
 $('#content').innerHTML='<nav class="breadcrumbs" aria-label="Fil d’Ariane"><a href="#sommaire">Le livre</a><span>/</span><a href="'+catLink(cat)+'">'+String(cat.id).padStart(2,'0')+' · '+esc(cat.short)+'</a><span>/</span><span>'+p.id+'</span></nav>'+
 '<header class="atelier-title"><p class="eyebrow">'+p.id+' · '+(cat.pilot?'CATÉGORIE DU PILOTE':'EXTENSION PROGRESSIVE')+'</p><h1>'+esc(p.title)+'</h1><div class="atelier-meta">'+tag(p.level)+tag(p.duration+' · première version')+'<a href="'+pdfLink(p.id)+'" target="_blank" rel="noopener">Lire dans le PDF · p. '+pageMap.projectPages[p.id].brief+' ↗</a><button id="share-atelier" class="share-link" type="button">Copier le lien</button></div></header>'+
 '<div class="reading-tabs" role="tablist" aria-label="Pages de l’atelier"><button role="tab" id="tab-overview" aria-controls="panel-overview" aria-selected="'+(state.view==='overview')+'">01 <span>Préparer la réalisation</span></button><button role="tab" id="tab-prompt" aria-controls="panel-prompt" aria-selected="'+(state.view==='prompt')+'">02 <span>Personnaliser le prompt</span></button></div>'+
 '<section id="panel-overview" class="reading-panel" role="tabpanel" aria-labelledby="tab-overview" '+(state.view==='overview'?'':'hidden')+'><div class="brief-grid"><div><p class="eyebrow">LE BESOIN</p><h2>'+esc(p.need)+'</h2><div class="brief-section"><h3>Pour qui</h3><p>'+esc(p.audience)+'</p></div><div class="brief-section"><h3>Le livrable attendu</h3><p>'+esc(p.deliverable)+'</p></div><div class="brief-section"><h3>La méthode spécifique</h3><p>'+esc(p.method)+'</p></div></div><aside class="preparation"><h3>À réunir avant de commencer</h3><ul>'+p.inputs.map(f=>'<li>'+esc(f)+'</li>').join('')+'<p>Utilisez des données précises et autorisées. Gardez une entrée manquante à clarifier.</p><button class="button primary" id="prepare-prompt">Compléter le prompt →</button></aside></div><div class="checks"><p class="eyebrow">LA PREUVE ATTENDUE</p><h3>Les contrôles déterminants</h3><p>'+esc(p.checks)+'.</p><div class="check-bottom"><span>Conserver attendu, observé, date et correction.</span><a href="#preuves">Ouvrir la fiche de preuve ↗</a></div></div><p class="review-note">'+esc(p.review)+'</p></section>'+
 '<section id="panel-prompt" class="prompt-workspace" role="tabpanel" aria-labelledby="tab-prompt" '+(state.view==='prompt'?'':'hidden')+'><aside class="input-panel"><p class="eyebrow">VOS INFORMATIONS</p><h2>Complétez les champs</h2><p class="quiet">Vos réponses restent dans cette page ouverte. Téléchargez le prompt pour les conserver.</p><form id="prompt-form">'+p.placeholders.map((f,i)=>'<label for="field-'+i+'"><span>'+esc(f)+'</span><textarea id="field-'+i+'" data-field="'+esc(f)+'" rows="'+(f.length>40?3:2)+'" placeholder="À compléter…">'+esc(values[f]||'')+'</textarea></label>').join('')+'</form><button id="clear-fields" class="reset">Vider les champs de cet atelier</button></aside><div class="prompt-paper"><div class="prompt-toolbar"><div><p class="eyebrow">PROMPT MAÎTRE · '+p.id+'</p><span id="completion" role="status"></span></div><button id="copy" class="button primary">Copier le prompt</button></div><div id="prompt-content"></div><div class="prompt-bottom"><button id="download" class="button subtle">↓ Télécharger le prompt</button><span>Aucune exécution automatique</span></div></div></section>'+
 '<nav class="previous-next" aria-label="Ateliers précédent et suivant">'+(idx>0?'<a href="'+projectLink(book.projects[idx-1])+'"><span>← ATELIER PRÉCÉDENT</span><b>'+book.projects[idx-1].id+' · '+esc(book.projects[idx-1].title)+'</b></a>':'<a href="#sommaire"><span>← LE LIVRE</span><b>Retour au sommaire</b></a>')+(idx<99?'<a href="'+projectLink(book.projects[idx+1])+'"><span>ATELIER SUIVANT →</span><b>'+book.projects[idx+1].id+' · '+esc(book.projects[idx+1].title)+'</b></a>':'<a href="#preuves"><span>POUR TERMINER →</span><b>Conserver vos preuves</b></a>')+'</nav>';
 function switchTab(view){state.view=view;for(const v of ['overview','prompt']){$('#tab-'+v).setAttribute('aria-selected',String(v===view));$('#tab-'+v).tabIndex=v===view?0:-1;$('#panel-'+v).hidden=v!==view;}}
 $('#tab-overview').onclick=()=>switchTab('overview');
 $('#tab-prompt').onclick=()=>switchTab('prompt');
 document.querySelectorAll('[role="tab"]').forEach(t=>t.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const v=e.key==='Home'?'overview':e.key==='End'?'prompt':state.view==='overview'?'prompt':'overview';switchTab(v);$('#tab-'+v).focus();}});
 $('#prepare-prompt').onclick=()=>{switchTab('prompt');$('#tab-prompt').focus();};
 $('#prompt-form').onsubmit=e=>e.preventDefault();
 $('#prompt-form').oninput=e=>{if(e.target.dataset.field){values[e.target.dataset.field]=e.target.value;refreshPrompt(p);}};
 $('#copy').onclick=()=>copyPrompt(p);$('#download').onclick=()=>downloadPrompt(p);
 $('#clear-fields').onclick=()=>{state.values[p.id]={};renderProject(p.id);};
 $('#share-atelier').onclick=async()=>{
  const success=await copyText(atelierLink(window.location.href,p.id));
  toast(success?'Lien de l’atelier copié.':'Copiez l’adresse de cette page dans votre navigateur.');
 };

 switchTab(state.view);refreshPrompt(p);
}

function editorialPage(type){
 const content={
 methode:{title:'De l’idée à une preuve.',eyebrow:'LA MÉTHODE LN IA',intro:'Une réalisation devient une contribution lorsqu’elle est documentée, testée et relue.',sections:[
 ['01','Définir un besoin réel','Identifier le bénéficiaire et sa difficulté. Choisir un résultat limité, utile et observable.'],
 ['02','Qualifier la contribution','Ouvrir une Issue, vérifier les doublons, convenir du périmètre et des critères. Le mainteneur attribue le numéro PXXX. Les repères G restent ceux du guide.'],
 ['03','Préparer et produire','Réunir les entrées autorisées, compléter le prompt, examiner le plan puis fabriquer une première version. Conserver les décisions humaines.'],
 ['04','Contrôler et corriger','Tester les cas utiles. Dater les essais et distinguer résultat attendu, résultat observé et correction. Indiquer les limites.'],
 ['05','Faire relire','Ouvrir une PR liée à l’Issue. Un relecteur humain distinct de l’auteur unique examine les preuves. Deux avis favorables sont requis pour un contenu sensible ou à fort impact.'],
 ['06','Partager et vérifier','Le mainteneur fusionne après validation. Vérifier le lien public et son mode d’emploi. Une publication effective termine ce parcours.']],
 extra:'<h2>Une séance de deux heures</h2><div class="time-ribbon">'+[['15','Cadrer'],['15','Préparer'],['45','Produire'],['25','Contrôler'],['20','Documenter']].map(([n,t])=>'<div><b>'+n+'<small>min</small></b><span>'+t+'</span></div>').join('')+'</div><p>La relecture indépendante, l’apprentissage des outils et les corrections supplémentaires demandent un temps distinct.</p>'},
 vite:{title:'Du contenu à votre premier projet web.',eyebrow:'LE PARCOURS VITE',intro:'Un prolongement pour les ateliers G041 à G050. Commencez par un besoin et une ressource de contenu utilisable.',sections:[
 ['01','Préparer l’environnement','Vérifier la version de Node.js et les prérequis actuels de Vite. Utiliser un dossier dédié pour préserver les fichiers existants.'],
 ['02','Créer et démarrer','Créer un projet simple, installer ses dépendances et démarrer le serveur local. La commande affiche l’adresse à ouvrir.'],
 ['03','Construire le parcours utile','Séparer les contenus, les styles et les interactions. Relier chaque écran au besoin de l’atelier. Tester le clavier et l’affichage sur petit écran.'],
 ['04','Vérifier la version de diffusion','Exécuter npm run build, puis npm run preview. Conserver les résultats des contrôles et les limites. Preview sert à la vérification locale.'],
 ['05','Préparer une review','Joindre les sources, les versions nécessaires, un mode d’emploi et les preuves à une PR. La réussite du build ne remplace pas les avis humains.']],
 extra:'<h2>Les commandes de départ</h2><pre class="commands"><code>npm create vite@latest mon-atelier -- --template vanilla\ncd mon-atelier\nnpm install\nnpm run dev\n\nnpm run build\nnpm run preview</code></pre><p>Références : <a href="https://vite.dev/guide/" target="_blank" rel="noopener">Démarrer avec Vite ↗</a> · <a href="https://vite.dev/guide/static-deploy.html" target="_blank" rel="noopener">Préparer la diffusion ↗</a></p><a class="button primary" href="#categorie/5">Choisir un atelier web →</a>'},
 preuves:{title:'Documenter ce qui a été vérifié.',eyebrow:'LA FICHE DE PREUVE',intro:'Un contrôle demandé reste à effectuer. Un résultat attendu ne doit jamais être présenté comme un résultat observé.',sections:[
 ['01','Le cas et sa date','Décrire le parcours essayé et les données autorisées utilisées. Choisir un cas normal et un cas limite pertinent.'],
 ['02','Le résultat attendu','Écrire le comportement ou le résultat qui constituerait une réussite.'],
 ['03','Le résultat observé','Après exécution, décrire ce qui s’est réellement produit. Joindre la capture, le fichier ou le journal autorisé.'],
 ['04','La décision et la correction','Indiquer conforme, à corriger ou non vérifié. Décrire la correction et refaire le contrôle si nécessaire.'],
 ['05','L’avis humain','Renseigner le relecteur, la date, les observations et le lien de la PR après la review. Les avis possibles sont À corriger, Validable et Validé.']],
 extra:'<div class="proof-template"><h2>Modèle de journal</h2><pre id="proof-text">Production : [PXXX attribué]\nAuteur : [nom]\nCas testé : [description]\nDate et environnement : [à compléter]\nRésultat attendu : [à compléter]\nRésultat observé : [après le test]\nPreuve : [fichier ou lien]\nDécision : [conforme / à corriger / non vérifié]\nCorrection et nouveau contrôle : [à compléter]\nRelecteur et avis : [après la review]\nPR : [lien]</pre><button class="button primary" id="proof-download">Télécharger ce modèle ↓</button></div>'}
 }[type];
 setTitle(content.eyebrow);
 $('#content').innerHTML='<article class="editorial"><p class="eyebrow">'+content.eyebrow+'</p><h1>'+content.title+'</h1><p class="intro">'+content.intro+'</p><div class="journey">'+content.sections.map(([n,h,p])=>'<section><span class="journey-no">'+n+'</span><div><h2>'+h+'</h2><p>'+p+'</p></div></section>').join('')+'</div><div class="editorial-extra">'+content.extra+'</div><a class="pdf-inline" href="'+pdfLink(type==='preuves'?'preuves':type)+'" target="_blank" rel="noopener">Lire cette partie dans le PDF ↗</a></article>';
 $('#proof-download')?.addEventListener('click',()=>{const a=document.createElement('a'),u=URL.createObjectURL(new Blob([$('#proof-text').textContent],{type:'text/plain;charset=utf-8'}));a.href=u;a.download='journal-de-controles-ln-ia.txt';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);});
}
function renderNotFound(){setTitle('Page introuvable');$('#content').innerHTML='<section class="empty"><h1>Cette page n’existe pas.</h1><a class="button primary" href="#sommaire">Revenir au sommaire</a></section>';}
function route(){
 const [page,id]=location.hash.slice(1).split('/');
 document.querySelectorAll('.sidebar a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===location.hash));
 if(!page||page==='sommaire')renderHome();
 else if(page==='catalogue'){state.category='';renderCatalogue();}
 else if(page==='categorie'&&category(id)){state.query='';state.level='';renderCatalogue(id);}
 else if(page==='atelier'){state.view='overview';renderProject(id);}
 else if(['methode','vite','preuves'].includes(page))editorialPage(page);
 else renderNotFound();
 jumpTop();
}
shell();window.addEventListener('hashchange',route);route();
