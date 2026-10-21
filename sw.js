// Changer le numéro de version à chaque mise à jour des cours
var V="boussole-revisions-2026-10-21";
var FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
// Réseau d'abord (pour recevoir les mises à jour), cache si hors ligne
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(V).then(function(x){x.put(e.request,c)});return r}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match("index.html")})}))});
