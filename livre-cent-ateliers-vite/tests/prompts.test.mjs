import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {escapeHtml, normalize, completeText, promptText, unresolved, atelierLink} from '../src/prompt-utils.js';
const book=JSON.parse(fs.readFileSync(new URL('../src/book.json',import.meta.url),'utf8'));
const map=JSON.parse(fs.readFileSync(new URL('../src/page-map.json',import.meta.url),'utf8'));
test('100 unique complete workshops and 600 source prompt blocks',()=>{
 assert.equal(book.projects.length,100);
 assert.equal(new Set(book.projects.map(p=>p.id)).size,100);
 for(const p of book.projects){assert.equal(p.prompt.length,6);assert.ok(p.inputs.length>0);assert.ok(map.projectPages[p.id].prompt>map.projectPages[p.id].brief);}
});
test('all placeholders can be completed without losing instructions',()=>{
 for(const p of book.projects){
  const values=Object.fromEntries(p.placeholders.map((x,i)=>[x,'Valeur '+i+' avec $& et <texte>']));
  assert.equal(unresolved(p,values).length,0);
  for(const s of p.prompt){assert.doesNotMatch(completeText(s.text,values),/\[[^\]]+\]/);}
  const txt=promptText(p,values);
  assert.equal(txt.split(/\n\n\d\. /).length,6);
  assert.match(txt,/Ne publie rien et ne fusionne aucune branche/);
 }
});
test('missing or blank fields stay explicit',()=>{
 assert.equal(completeText('Bonjour [nom], [public].',{nom:'  Alice  ',public:'  '}),'Bonjour Alice, [public].');
 const p=book.projects[0];assert.deepEqual(unresolved(p,{}),p.placeholders);
});
test('personal values are escaped and literal replacements preserved',()=>{
 assert.equal(escapeHtml('<img src=x onerror="x">'),'&lt;img src=x onerror=&quot;x&quot;&gt;');
 assert.equal(completeText('[a] [b]',{a:'$& <script>',b:'valeur'}),'$& <script> valeur');
 assert.equal(normalize('Pédagogique ÉTÉ'),'pedagogique ete');
});

test('workshop sharing preserves the Pages base and excludes query data',()=>{
 const url=atelierLink('https://elhisse-clprepas.github.io/cent-productions-ia-uv/?note=prive#catalogue','G041');
 assert.equal(url,'https://elhisse-clprepas.github.io/cent-productions-ia-uv/#atelier/G041');
 assert.equal(atelierLink('http://localhost:5173/#sommaire','G001'),'http://localhost:5173/#atelier/G001');
});
