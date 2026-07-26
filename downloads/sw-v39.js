const CACHE='lumi-mobile-v39-23-36';
const SHELL=[
  './Lumi_Clinica_Mobile_V39_23_36_LUMI_STORE_INTEGRADA.html',
  './manifest.webmanifest',
  './mobile-00.part','./mobile-01.part','./mobile-02.part','./mobile-03.part','./mobile-04.part',
  '../assets/lumi-mark.svg'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(fetch(event.request).then(response=>{
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    return response;
  }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./Lumi_Clinica_Mobile_V39_23_36_LUMI_STORE_INTEGRADA.html'))));
});
