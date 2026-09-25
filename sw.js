// Écoute des événements Push natifs du système (iOS / Android)
self.addEventListener('push', function(event) {
  let data = { title: "🚨 IADE Eats", body: "Nouvelle demande enregistrée." };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: "🚨 IADE Eats", body: event.data.text() };
    }
  }

  const options = {
    body: data.body || data.message,
    icon: "https://i.ibb.co/SX6jDtYm/logo.png",
    badge: "https://i.ibb.co/SX6jDtYm/logo.png",
    vibrate: [200, 100, 200],
    tag: "relais-alert",
    renotify: true,
    data: { url: "./" }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "🚨 IADE Eats — Demande de relais", options)
  );
});

// Prise de contrôle immédiate lors de l'activation
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Clic sur la notification -> Ouvre ou ramène la WebApp au premier plan
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('./');
    })
  );
});
