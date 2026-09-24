// Écoute des demandes de notifications push
self.addEventListener('push', function(event) {
  let data = {};
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { message: event.data.text() };
    }
  }

  const title = data.title || "🚨 IADE Eats — Demande de relais";
  const options = {
    body: data.message || "Un collègue a besoin d'un relais.",
    icon: "https://i.ibb.co/SX6jDtYm/logo.png",
    badge: "https://i.ibb.co/SX6jDtYm/logo.png",
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Action au clic sur la notification : ouvre l'application
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('./');
    })
  );
});
