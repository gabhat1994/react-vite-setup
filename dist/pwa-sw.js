
// This a service worker file for PWA.

importScripts('/firebase-messaging-sw.js')

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  // This is a dummy event listener
  // just to pass the PWA installation criteria on 
  // some browsers
});
