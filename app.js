import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


// =====================================================
// FIREBASE CONFIG
// REPLACE THESE VALUES WITH YOUR FIREBASE WEB APP CONFIG
// =====================================================

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


// =====================================================
// FIREBASE INITIALIZATION
// =====================================================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


// =====================================================
// DATABASE PATH
// =====================================================

const liveDataRef = ref(
    db,
    "devices/esp32s3_001/live"
);


// =====================================================
// HTML ELEMENTS
// =====================================================

const firebaseStatus =
    document.getElementById("firebaseStatus");

const onlineText =
    document.getElementById("onlineText");

const systemBadge =
    document.getElementById("systemBadge");

const deviceState =
    document.getElementById("deviceState");

const status =
    document.getElementById("status");

const confidence =
    document.getElementById("confidence");

const confidenceBar =
    document.getElementById("confidenceBar");

const detections =
    document.getElementById("detections");

const falseActivations =
    document.getElementById("falseActivations");

const inference =
    document.getElementById("inference");

const power =
    document.getElementById("power");

const voltage =
    document.getElementById("voltage");

const current =
    document.getElementById("current");

const cpu =
    document.getElementById("cpu");

const ram =
    document.getElementById("ram");

const cpuText =
    document.getElementById("cpuText");

const ramText =
    document.getElementById("ramText");

const powerText =
    document.getElementById("powerText");

const cpuBar =
    document.getElementById("cpuBar");

const ramBar =
    document.getElementById("ramBar");

const powerBar =
    document.getElementById("powerBar");

const assistantMessage =
    document.getElementById("assistantMessage");

const logs =
    document.getElementById("logs");


// =====================================================
// FIREBASE CONNECTION
// =====================================================

onValue(
    liveDataRef,

    (snapshot) => {

        const data = snapshot.val();

        if (!data) {

            setOffline();

            addLog(
                "FIREBASE",
                "No telemetry data found."
            );

            return;
        }


        // ---------------------------------------------
        // CONNECTION STATUS
        // ---------------------------------------------

        firebaseStatus.textContent =
            "FIREBASE CONNECTED";

        onlineText.textContent =
            "Online";

        systemBadge.textContent =
            "SYSTEM ONLINE";

        deviceState.textContent =
            "ONLINE";


        // ---------------------------------------------
        // STATUS
        // ---------------------------------------------

        status.textContent =
            data.status ?? "--";


        // ---------------------------------------------
        // CONFIDENCE
        // ---------------------------------------------

        const confidenceValue =
            Number(data.confidence ?? 0);

        confidence.textContent =
            confidenceValue + "%";

        confidenceBar.style.width =
            confidenceValue + "%";


        const ring =
            document.querySelector(
                ".confidence-ring"
            );

        ring.style.background =
            `conic-gradient(
                var(--green)
                ${confidenceValue * 3.6}deg,
                #10251f
                ${confidenceValue * 3.6}deg
            )`;


        // ---------------------------------------------
        // DETECTIONS
        // ---------------------------------------------

        detections.textContent =
            data.detections ?? "--";


        // ---------------------------------------------
        // FALSE ACTIVATIONS
        // ---------------------------------------------

        falseActivations.textContent =
            data.falseActivations ?? "--";


        // ---------------------------------------------
        // INFERENCE
        // ---------------------------------------------

        inference.textContent =
            (data.inferenceMs ?? "--") + " ms";


        // ---------------------------------------------
        // POWER
        // ---------------------------------------------

        const powerValue =
            Number(data.power ?? 0);

        power.textContent =
            powerValue;

        powerText.textContent =
            powerValue + " mW";

        powerBar.style.width =
            Math.min(powerValue / 5, 100) + "%";


        // ---------------------------------------------
        // VOLTAGE
        // ---------------------------------------------

        voltage.textContent =
            data.voltage ?? "--";


        // ---------------------------------------------
        // CURRENT
        // ---------------------------------------------

        current.textContent =
            data.current ?? "--";


        // ---------------------------------------------
        // CPU
        // ---------------------------------------------

        const cpuValue =
            Number(data.cpu ?? 0);

        cpu.textContent =
            cpuValue;

        cpuText.textContent =
            cpuValue + "%";

        cpuBar.style.width =
            Math.min(cpuValue, 100) + "%";


        // ---------------------------------------------
        // RAM
        // ---------------------------------------------

        const ramValue =
            Number(data.ram ?? 0);

        ram.textContent =
            ramValue;

        ramText.textContent =
            ramValue + " KB";

        ramBar.style.width =
            Math.min((ramValue / 256) * 100, 100) + "%";


        // ---------------------------------------------
        // FRIDAY MESSAGE
        // ---------------------------------------------

        assistantMessage.textContent =
            `Edge telemetry synchronized. Device ${data.status ?? "unknown"}.`;


        // ---------------------------------------------
        // CONSOLE
        // ---------------------------------------------

        addLog(
            "TELEMETRY",
            `Power ${powerValue} mW | CPU ${cpuValue}% | Confidence ${confidenceValue}%`
        );

    },

    (error) => {

        console.error(
            "Firebase error:",
            error
        );

        setOffline();

        addLog(
            "ERROR",
            error.message
        );

    }
);


// =====================================================
// OFFLINE STATE
// =====================================================

function setOffline() {

    firebaseStatus.textContent =
        "DISCONNECTED";

    firebaseStatus.style.color =
        "#ff4040";

    onlineText.textContent =
        "Offline";

    onlineText.style.color =
        "#ff4040";

    systemBadge.textContent =
        "DATABASE OFFLINE";

    systemBadge.style.color =
        "#ff4040";

    systemBadge.style.borderColor =
        "#ff4040";

    deviceState.textContent =
        "OFFLINE";

}


// =====================================================
// FRIDAY CONSOLE LOG
// =====================================================

function addLog(type, message) {

    const p =
        document.createElement("p");

    p.innerHTML =
        `<span>[${type}]</span> ${message}`;

    logs.appendChild(p);


    while (logs.children.length > 7) {

        logs.removeChild(
            logs.firstChild
        );

    }

}


// =====================================================
// CLOCK
// =====================================================

function updateClock() {

    const now =
        new Date();

    document.getElementById("clock")
        .textContent =
        now.toLocaleTimeString(
            [],
            {
                hour12: false
            }
        );

    document.getElementById("date")
        .textContent =
        now.toLocaleDateString(
            [],
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

}

setInterval(
    updateClock,
    1000
);

updateClock();


// =====================================================
// COMMAND BAR
// =====================================================

const commandInput =
    document.getElementById(
        "commandInput"
    );

const commandButton =
    document.getElementById(
        "commandButton"
    );


function processCommand() {

    const command =
        commandInput.value.trim();

    if (!command)
        return;


    addLog(
        "USER",
        command
    );


    assistantMessage.textContent =
        `Command received: ${command}`;


    commandInput.value = "";


    setTimeout(() => {

        assistantMessage.textContent =
            "F.R.I.D.A.Y. is monitoring the Edge device.";

    }, 2500);

}


commandButton.addEventListener(
    "click",
    processCommand
);


commandInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            processCommand();

        }

    }
);
