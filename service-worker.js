const CACHE_NAME = 'quiz-shinobi-cache-v1';
const FILES_TO_CACHE = [
  'main.html', // ou 'index.html' si tu renommes
  'style.css',
  'script.js',
  'manifest.json',
  'logo.png',
  'sounds/deep-abstract.mp3',
  'sounds/cascade-breathe.mp3',
  'sounds/embrace.mp3',
  'sounds/running-night.mp3',
  'sounds/tell-me-what.mp3'
];

self.addEventListener('install', event => {
  console.log('📦 Installation du service worker');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
