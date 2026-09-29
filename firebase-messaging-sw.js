<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAvpwp7EaLE_3PsepWQ8MiG_qG4lOdn1TI",
    authDomain: "iade-eats.firebaseapp.com",
    projectId: "iade-eats",
    storageBucket: "iade-eats.firebasestorage.app",
    messagingSenderId: "26924527992",
    appId: "1:26924527992:web:868e8d37618dcdfc5c588d"
  };

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  window.toggleNotificationsFromBtn = async function() {
    const isCurrentlyOn = localStorage.getItem('iade_eats_push_enabled') === 'true';

    if (!isCurrentlyOn) {
      try {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          // 1. Enregistrement explicite du Service Worker dans le sous-dossier GitHub Pages
          const swRegistration = await navigator.serviceWorker.register('/IADE-eats/firebase-messaging-sw.js');

          // 2. Récupération du token en fournissant l'enregistrement
          const token = await getToken(messaging, { 
            vapidKey: 'BFhgfOIxErLSI9wRwwJQL-w69iAZNgDf2Kqk_tuVC3DsZf_hSkN9Ezce8J4OcYwyu7iETtaikLEl6GgeskPoeN0',
            serviceWorkerRegistration: swRegistration
          });
          
          if (token) {
            await fetch(SCRIPT_URL, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                action: "subscribe_fcm",
                token: token
              }).toString()
            });

            localStorage.setItem('iade_eats_push_enabled', 'true');
            if (typeof updatePushBtnUI === 'function') updatePushBtnUI(true);

            alert("Notifications IADE Eats activées avec succès ! 🔔");
          } else {
            alert("Impossible de générer le jeton de notification.");
          }
        } else {
          alert("Les notifications sont bloquées par votre navigateur ou votre téléphone.");
          localStorage.setItem('iade_eats_push_enabled', 'false');
          if (typeof updatePushBtnUI === 'function') updatePushBtnUI(false);
        }
      } catch (err) {
        console.error("Erreur Firebase FCM :", err);
        alert("Erreur lors de l'activation des notifications : " + err.message);
        localStorage.setItem('iade_eats_push_enabled', 'false');
        if (typeof updatePushBtnUI === 'function') updatePushBtnUI(false);
      }
    } else {
      localStorage.setItem('iade_eats_push_enabled', 'false');
      if (typeof updatePushBtnUI === 'function') updatePushBtnUI(false);
      alert("Notifications désactivées sur cet appareil.");
    }
  };

  onMessage(messaging, (payload) => {
    if (payload.notification) {
      alert(`🚨 ${payload.notification.title}\n${payload.notification.body}`);
    }
  });
</script>
