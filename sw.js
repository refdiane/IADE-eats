const NTFY_TOPIC_URL = 'https://ntfy.sh/iade-eats-nice-relais/sse';

function subscribeToPush() {
  const eventSource = new EventSource(NTFY_TOPIC_URL);

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      // On ne traite que les vrais messages d'alerte
      if (data.event === 'message') {
        self.registration.showNotification("🚨 IADE Eats — Demande de relais", {
          body: data.message,
          icon: "https://i.ibb.co/SX6jDtYm/logo.png",
          badge: "https://i.ibb.co/SX6jDtYm/logo.png",
          vibrate: [200, 100, 200],
          tag: "relais-alert"
        });
      }
    } catch (err) {
      console.error("Erreur réception ntfy :", err);
    }
  };
}

// Activation du Service Worker et lancement de l'écoute
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  subscribeToPush();
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
