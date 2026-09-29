// Importation des SDKs Firebase compatibles Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Configuration avec tes identifiants
const firebaseConfig = {
  apiKey: "AIzaSyAvpwp7EaLE_3PsepWQ8MiG_qG4lOdn1TI",
  authDomain: "iade-eats.firebaseapp.com",
  projectId: "iade-eats",
  storageBucket: "iade-eats.firebasestorage.app",
  messagingSenderId: "26924527992",
  appId: "1:26924527992:web:868e8d37618dcdfc5c588d"
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Réception de la notification quand l'application est en arrière-plan ou fermée
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://i.ibb.co/SX6jDtYm/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
