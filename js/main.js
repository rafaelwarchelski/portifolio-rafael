const grid = document.getElementById('essayGrid');
const search = document.getElementById('searchInput');
const count = document.getElementById('resultCount');
const noResults = document.getElementById('noResults');
const modal = document.getElementById('essayModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalNumber = document.getElementById('modalNumber');

function renderEssays(term = '') {
  const filtered = window.ESSAYS.map((essay, index) => ({...essay, index}))
    .filter(essay => (essay.title + ' ' + essay.text).toLocaleLowerCase('pt-BR').includes(term.toLocaleLowerCase('pt-BR')));
  grid.innerHTML = '';
  filtered.forEach(essay => {
    const card = document.createElement('article');
    card.className = 'essay-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.innerHTML = `<div class="card-top"><span>REDAÇÃO ${(essay.index + 1).toString().padStart(2,'0')}</span><span>2026</span></div><h3></h3><span class="read-more">LER REDAÇÃO ↗</span>`;
    card.querySelector('h3').textContent = essay.title;
    card.addEventListener('click', () => openEssay(essay.index));
    card.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEssay(essay.index); }});
    grid.appendChild(card);
  });
  count.textContent = `${filtered.length} ${filtered.length === 1 ? 'redação' : 'redações'}`;
  noResults.hidden = filtered.length !== 0;
}
function openEssay(index) {
  const essay = window.ESSAYS[index];
  modalTitle.textContent = essay.title;
  modalNumber.textContent = `REDAÇÃO ${(index + 1).toString().padStart(2,'0')} / 17`;
  modalText.textContent = essay.text;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
search.addEventListener('input', e => renderEssays(e.target.value.trim()));
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target.hasAttribute('data-close')) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
document.getElementById('copyEssay').addEventListener('click', async () => {
  const text = `${modalTitle.textContent}\n\n${modalText.textContent}`;
  const button = document.getElementById('copyEssay');
  try { await navigator.clipboard.writeText(text); button.textContent = 'Copiado!'; }
  catch { button.textContent = 'Não foi possível copiar'; }
  setTimeout(() => button.textContent = 'Copiar redação', 1800);
});
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false');
}));
renderEssays();
