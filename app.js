const pages=[...document.querySelectorAll('.page')];
const pageButtons=[...document.querySelectorAll('[data-page]')];
const toast=document.getElementById('toast');
let deferredPrompt=null;
function showPage(name){
  pages.forEach(p=>p.classList.toggle('active',p.id===`page-${name}`));
  pageButtons.forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  history.replaceState(null,'',`#${name}`);
  scrollTo({top:0,behavior:'smooth'});
}
pageButtons.forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.go)));
const first=(location.hash||'#inicio').slice(1);
if(pages.some(p=>p.id===`page-${first}`))showPage(first);
function notify(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}
document.querySelectorAll('[data-soon]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();notify('O arquivo do Windows será publicado na próxima etapa.')}));
const search=document.getElementById('appSearch');
search?.addEventListener('input',()=>{const q=search.value.toLowerCase().trim();document.querySelectorAll('#appCatalog [data-search]').forEach(c=>c.hidden=!c.dataset.search.includes(q))});
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.mod-card').forEach(c=>c.hidden=f!=='all'&&c.dataset.category!==f)}));
const dialog=document.getElementById('detailsDialog');
document.querySelectorAll('[data-details]').forEach(btn=>btn.addEventListener('click',()=>{document.getElementById('dialogContent').innerHTML='<span class="eyebrow">LUMI PARA WINDOWS</span><h2 style="margin-top:12px">Versão V39.23.35</h2><p>Aplicativo de gestão completo para uso no computador. O arquivo final está sendo preparado para publicação segura nesta loja.</p><p><strong>Requisitos:</strong> Windows 10 ou 11, 64 bits e Microsoft Edge WebView2.</p>';dialog.showModal()}));
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.getElementById('installBtn').hidden=false});
document.getElementById('installBtn').addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;document.getElementById('installBtn').hidden=true});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
