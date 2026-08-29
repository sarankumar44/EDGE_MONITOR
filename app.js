import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyCFYKUwaU3P0Kb9fiuEbvGWeGys7_S2bKs",
  authDomain: "edge-kws-project.firebaseapp.com",
  databaseURL: "https://edge-kws-project-default-rtdb.firebaseio.com",
  projectId: "edge-kws-project",
  storageBucket: "edge-kws-project.firebasestorage.app",
  messagingSenderId: "1022052279122",
  appId: "1:1022052279122:web:b9aa5789db98526dd9908b",
  measurementId: "G-8NGL9NFBHL"
};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const liveData = ref(
    db,
    "devices/esp32s3_001/live"
);


onValue(liveData, (snapshot) => {

    const data = snapshot.val();

    console.log(data);

    document.getElementById("status").textContent =
        data.status;

    document.getElementById("confidence").textContent =
        data.confidence + "%";

    document.getElementById("detections").textContent =
        data.detections;

    document.getElementById("inference").textContent =
        data.inferenceMs + " ms";

    document.getElementById("voltage").textContent =
        data.voltage + " V";

    document.getElementById("power").textContent =
        data.power + " mW";
});
