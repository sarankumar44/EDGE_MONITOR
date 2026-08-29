import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import {
    getDatabase,
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";



/* =========================================
   FIREBASE CONFIGURATION
   ========================================= */

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



/* =========================================
   INITIALIZE FIREBASE
   ========================================= */

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);



/* =========================================
   FIREBASE DATABASE PATH
   ========================================= */

const liveData = ref(
    db,
    "devices/esp32s3_001/live"
);



/* =========================================
   READ REAL-TIME DATA
   ========================================= */

onValue(liveData, (snapshot) => {

    const data = snapshot.val();


    console.log("Firebase data:", data);


    if (!data) {

        console.log(
            "No data found in Firebase."
        );

        return;
    }



    /* ==============================
       STATUS
       ============================== */

    if (data.status !== undefined) {

        document.getElementById(
            "status"
        ).textContent = data.status;

    }



    /* ==============================
       CONFIDENCE
       ============================== */

    if (data.confidence !== undefined) {

        const confidence =
            Number(data.confidence);


        document.getElementById(
            "confidence"
        ).textContent = confidence;


        document.getElementById(
            "confidenceBar"
        ).style.width =
            Math.min(confidence, 100) + "%";

    }



    /* ==============================
       DETECTIONS
       ============================== */

    if (data.detections !== undefined) {

        document.getElementById(
            "detections"
        ).textContent =
            data.detections;

    }



    /* ==============================
       INFERENCE
       ============================== */

    if (data.inferenceMs !== undefined) {

        document.getElementById(
            "inference"
        ).textContent =
            data.inferenceMs + " ms";

    }



    /* ==============================
       POWER
       ============================== */

    if (data.power !== undefined) {

        document.getElementById(
            "power"
        ).textContent =
            data.power + " mW";

    }



    /* ==============================
       VOLTAGE
       ============================== */

    if (data.voltage !== undefined) {

        document.getElementById(
            "voltage"
        ).textContent =
            data.voltage + " V";

    }



    /* ==============================
       CPU
       ============================== */

    if (data.cpu !== undefined) {

        const cpu =
            Number(data.cpu);


        document.getElementById(
            "cpu"
        ).textContent =
            cpu + "%";


        document.getElementById(
            "cpuBar"
        ).style.width =
            Math.min(cpu, 100) + "%";

    }



    /* ==============================
       RAM
       ============================== */

    if (data.ram !== undefined) {

        const ram =
            Number(data.ram);


        document.getElementById(
            "ram"
        ).textContent =
            ram;


        /*
         * Assuming 256 KB maximum RAM
         */

        const ramPercentage =
            (ram / 256) * 100;


        document.getElementById(
            "ramBar"
        ).style.width =
            Math.min(ramPercentage, 100) + "%";

    }



    /* ==============================
       CURRENT
       ============================== */

    if (data.current !== undefined) {

        const current =
            Number(data.current);


        document.getElementById(
            "current"
        ).textContent =
            current;


        /*
         * Visual bar only.
         * 20 mA is used as a display scale.
         */

        const currentPercentage =
            (current / 20) * 100;


        document.getElementById(
            "currentBar"
        ).style.width =
            Math.min(currentPercentage, 100) + "%";

    }



    /* ==============================
       FALSE ACTIVATIONS
       ============================== */

    if (
        data.falseActivations !== undefined
    ) {

        document.getElementById(
            "falseActivations"
        ).textContent =
            data.falseActivations;

    }



    /* ==============================
       LAST UPDATE
       ============================== */

    const now =
        new Date();


    document.getElementById(
        "lastUpdate"
    ).textContent =
        now.toLocaleTimeString();

});



/* =========================================
   FIREBASE CONNECTION MESSAGE
   ========================================= */

console.log(
    "EdgeKWS dashboard started."
);

console.log(
    "Listening to Firebase:"
);

console.log(
    "devices/esp32s3_001/live"
);
