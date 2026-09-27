export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const normalize = (value) => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export function completeText(text, values = {}) { return text.replace(/\[([^\]]+)\]/g, (token, name) => (values[name] ?? '').trim() || token); }
export function promptText(project, values = {}) { return project.prompt.map((part, index) => (index+1) + '. ' + part.title.toUpperCase() + '\n' + completeText(part.text, values)).join('\n\n'); }
export function unresolved(project, values = {}) { return project.placeholders.filter(name => !(values[name] ?? '').trim()); }

export function atelierLink(currentUrl, id) {
  const url = new URL(currentUrl);
  url.search = '';
  url.hash = 'atelier/' + encodeURIComponent(id);
  return url.href;
}
