import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getDatabase,
    ref,
    onValue
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


const firebaseConfig = {
    // PUT YOUR FIREBASE CONFIG HERE
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
