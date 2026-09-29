// Importation des bibliothèques Firebase nécessaires pour le Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Configuration Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAvpwp7EaLE_3PsepWQ8MiG_qG4lOdn1TI",
  authDomain: "iade-eats.firebaseapp.com",
  projectId: "iade-eats",
  storageBucket: "iade-eats.firebasestorage.app",
  messagingSenderId: "26924527992",
  appId: "1:26924527992:web:868e8d37618dcdfc5c588d"
});

const messaging = firebase.messaging();

// Réception des notifications lorsque l'application est en arrière-plan ou fermée
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Notification reçue en arrière-plan :', payload);

  const title = payload.notification ? payload.notification.title : "IADE Eats 🔔";
  const options = {
    body: payload.notification ? payload.notification.body : "Nouvelle mise à jour disponible !",
    icon: "https://i.ibb.co/SX6jDtYm/logo.png"
  };

  self.registration.showNotification(title, options);
});
