import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


// ===============================
// FIREBASE CONFIG
// ===============================

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


// ===============================
// FIREBASE INITIALIZATION
// ===============================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// ===============================
// DATABASE PATH
// ===============================

const liveData = ref(
    db,
    "devices/esp32s3_001/live"
);


// ===============================
// REALTIME LISTENER
// ===============================

onValue(
    liveData,

    (snapshot) => {

        const data = snapshot.val();

        console.log("Firebase Data:", data);


        if (!data) {

            setOffline();

            return;
        }


        // ===============================
        // CONNECTION
        // ===============================

        document.getElementById(
            "connectionText"
        ).textContent = "CONNECTED";

        document.getElementById(
            "databaseStatus"
        ).textContent = "CONNECTED";

        document.getElementById(
            "systemState"
        ).textContent = "SYSTEM ONLINE";

        document.getElementById(
            "consoleStatus"
        ).innerHTML =
            "<span>[DATABASE]</span> Realtime telemetry received.";


        // ===============================
        // DEVICE STATUS
        // ===============================

        const status =
            data.status ?? "unknown";

        document.getElementById(
            "deviceStatus"
        ).textContent =
            status.toUpperCase();

        document.getElementById(
            "deviceStatus2"
        ).textContent =
            status.toUpperCase();


        // ===============================
        // CONFIDENCE
        // ===============================

        const confidence =
            Number(data.confidence ?? 0);

        document.getElementById(
            "confidence"
        ).textContent =
            confidence + "%";


        document.getElementById(
            "confidenceBar"
        ).style.width =
            Math.min(confidence, 100) + "%";


        // ===============================
        // DETECTIONS
        // ===============================

        document.getElementById(
            "detections"
        ).textContent =
            data.detections ?? 0;


        // ===============================
        // FALSE ACTIVATIONS
        // ===============================

        document.getElementById(
            "falseActivations"
        ).textContent =
            data.falseActivations ?? 0;


        // ===============================
        // INFERENCE
        // ===============================

        document.getElementById(
            "inference"
        ).textContent =
            (data.inferenceMs ?? "--") + " ms";


        // ===============================
        // POWER
        // ===============================

        const power =
            Number(data.power ?? 0);

        document.getElementById(
            "power"
        ).textContent =
            power;


        document.getElementById(
            "powerValue"
        ).textContent =
            power + " mW";


        // ===============================
        // VOLTAGE
        // ===============================

        document.getElementById(
            "voltage"
        ).textContent =
            data.voltage ?? "--";


        // ===============================
        // CURRENT
        // ===============================

        document.getElementById(
            "current"
        ).textContent =
            data.current ?? "--";


        // ===============================
        // CPU
        // ===============================

        const cpu =
            Number(data.cpu ?? 0);

        document.getElementById(
            "cpu"
        ).textContent =
            cpu;


        document.getElementById(
            "cpuValue"
        ).textContent =
            cpu + "%";


        document.getElementById(
            "cpuBar"
        ).style.width =
            Math.min(cpu, 100) + "%";


        // ===============================
        // RAM
        // ===============================

        const ram =
            Number(data.ram ?? 0);

        document.getElementById(
            "ram"
        ).textContent =
            ram + " KB";


        // Just a visual scale
        // Change 256 if your target RAM is different

        document.getElementById(
            "ramBar"
        ).style.width =
            Math.min((ram / 256) * 100, 100) + "%";


        // ===============================
        // POWER BAR
        // ===============================

        document.getElementById(
            "powerBar"
        ).style.width =
            Math.min((power / 500) * 100, 100) + "%";

    },

    (error) => {

        console.error(
            "Firebase error:",
            error
        );

        setOffline();
    }
);


// ===============================
// OFFLINE STATE
// ===============================

function setOffline() {

    document.getElementById(
        "connectionText"
    ).textContent =
        "OFFLINE";

    document.getElementById(
        "databaseStatus"
    ).textContent =
        "OFFLINE";

    document.getElementById(
        "deviceStatus"
    ).textContent =
        "OFFLINE";

    document.getElementById(
        "systemState"
    ).textContent =
        "DATABASE OFFLINE";

}


// ===============================
// DIGITAL CLOCK
// ===============================

function updateClock() {

    const now = new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");

    document.getElementById(
        "clock"
    ).textContent =
        `${hours}:${minutes}:${seconds}`;
}


setInterval(updateClock, 1000);

updateClock();
