/* =========================================================
   EDGE//KWS
   REAL-TIME FIREBASE MONITOR
   ========================================================= */


import { initializeApp }

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import {

    getDatabase,
    ref,
    onValue

}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";



/* =========================================================
   FIREBASE CONFIG
   ========================================================= */

const firebaseConfig = {

    apiKey:
        "AIzaSyCFYKUwaU3P0Kb9fiuEbvGWeGys7_S2bKs",

    authDomain:
        "edge-kws-project.firebaseapp.com",

    databaseURL:
        "https://edge-kws-project-default-rtdb.firebaseio.com",

    projectId:
        "edge-kws-project",

    storageBucket:
        "edge-kws-project.firebasestorage.app",

    messagingSenderId:
        "1022052279122",

    appId:
        "1:1022052279122:web:b9aa5789db98526dd9908b",

    measurementId:
        "G-8NGL9NFBHL"

};



/* =========================================================
   FIREBASE INITIALIZATION
   ========================================================= */

const app =
    initializeApp(firebaseConfig);


const db =
    getDatabase(app);



/* =========================================================
   DATABASE PATH
   ========================================================= */

const liveData =

    ref(
        db,
        "devices/esp32s3_001/live"
    );



/* =========================================================
   TELEMETRY HISTORY
   ========================================================= */

const history = {

    power: [],
    cpu: [],
    confidence: []

};


const MAX_POINTS = 30;



/* =========================================================
   HELPER
   ========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}



/* =========================================================
   REALTIME FIREBASE LISTENER
   ========================================================= */

onValue(

    liveData,

    (snapshot) => {


        const data =
            snapshot.val();


        console.log(
            "Firebase Data:",
            data
        );



        /* =================================================
           NO DATA
           ================================================= */

        if (!data) {

            setOffline();

            return;

        }



        /* =================================================
           CONNECTION
           ================================================= */

        document.body.classList.remove(
            "offline"
        );


        setText(
            "connectionText",
            "FIREBASE CONNECTED"
        );


        setText(
            "databaseStatus",
            "CONNECTED"
        );


        setText(
            "systemState",
            "SYSTEM ONLINE"
        );


        setText(
            "welcomeStatus",
            "ONLINE"
        );


        setText(
            "statusWorking",
            "WORKING"
        );


        document.getElementById(
            "connectionDot"
        ).style.background =
            "#00ff66";



        /* =================================================
           DEVICE STATUS
           ================================================= */

        const status =
            data.status ?? "ONLINE";


        setText(
            "deviceStatus",
            status.toUpperCase()
        );


        setText(
            "deviceStatus2",
            status.toUpperCase()
        );


        const deviceCard =
            document.querySelector(
                ".device-card"
            );


        if (deviceCard) {

            deviceCard.classList.remove(
                "offline"
            );

            deviceCard.classList.add(
                "online"
            );

        }



        /* =================================================
           CONFIDENCE
           ================================================= */

        const confidence =

            Number(
                data.confidence ?? 0
            );


        setText(
            "confidence",
            confidence + "%"
        );


        const confidenceBar =
            document.getElementById(
                "confidenceBar"
            );


        if (confidenceBar) {

            confidenceBar.style.width =
                Math.min(
                    confidence,
                    100
                ) + "%";

        }



        /* =================================================
           DETECTIONS
           ================================================= */

        const detections =
            data.detections ?? 0;


        setText(
            "detections",
            detections
        );



        /* =================================================
           FALSE ACTIVATIONS
           ================================================= */

        const falseActivations =
            Number(
                data.falseActivations ?? 0
            );


        setText(
            "falseActivations",
            falseActivations
        );


        setText(
            "falseResource",
            falseActivations
        );



        /* =================================================
           INFERENCE
           ================================================= */

        const inference =
            data.inferenceMs ?? "--";


        setText(
            "inference",
            inference + " ms"
        );



        /* =================================================
           PHRASE
           ================================================= */

        const phrase =

            data.phrase ??
            data.keyword ??
            data.detectedPhrase ??
            "Dear Folk";


        setText(
            "detectedPhrase",
            '"' + phrase + '"'
        );


        /* =================================================
           ASSISTANT MESSAGE
           ================================================= */

        if (
            data.keyword ||
            data.phrase ||
            data.detectedPhrase
        ) {

            setText(
                "assistantMessage",
                "Keyword detected: " +
                phrase
            );

            setText(
                "listeningText",
                "KEYWORD DETECTED"
            );

        }



        /* =================================================
           POWER
           ================================================= */

        const power =
            Number(
                data.power ?? 0
            );


        setText(
            "power",
            power
        );


        setText(
            "powerValue",
            power + " mW"
        );


        setText(
            "holoPower",
            power + " mW"
        );


        const powerBar =
            document.getElementById(
                "powerBar"
            );


        if (powerBar) {

            powerBar.style.width =

                Math.min(
                    (power / 500) * 100,
                    100
                ) + "%";

        }



        /* =================================================
           VOLTAGE
           ================================================= */

        const voltage =
            data.voltage ?? "--";


        setText(
            "voltage",
            voltage
        );


        setText(
            "holoVoltage",
            voltage + " V"
        );



        /* =================================================
           CURRENT
           ================================================= */

        const current =
            Number(
                data.current ?? 0
            );


        setText(
            "current",
            current
        );


        setText(
            "holoCurrent",
            current + " mA"
        );


        setText(
            "currentResource",
            current + " mA"
        );


        const currentBar =
            document.getElementById(
                "currentBar"
            );


        if (currentBar) {

            currentBar.style.width =

                Math.min(
                    (current / 20) * 100,
                    100
                ) + "%";

        }



        /* =================================================
           CPU
           ================================================= */

        const cpu =
            Number(
                data.cpu ?? 0
            );


        setText(
            "cpu",
            cpu
        );


        setText(
            "cpuValue",
            cpu + "%"
        );


        setText(
            "holoCpu",
            cpu + " %"
        );


        const cpuBar =
            document.getElementById(
                "cpuBar"
            );


        if (cpuBar) {

            cpuBar.style.width =

                Math.min(
                    cpu,
                    100
                ) + "%";

        }



        /* =================================================
           RAM
           ================================================= */

        const ram =
            Number(
                data.ram ?? 0
            );


        setText(
            "ram",
            ram + " KB"
        );


        const ramBar =
            document.getElementById(
                "ramBar"
            );


        if (ramBar) {

            ramBar.style.width =

                Math.min(
                    (ram / 256) * 100,
                    100
                ) + "%";

        }



        /* =================================================
           TEMPERATURE
           ================================================= */

        const temperature =

            Number(
                data.temperature ??
                data.temp ??
                0
            );


        if (temperature > 0) {

            setText(
                "temperatureValue",
                temperature
            );

            setText(
                "deviceTemp",
                temperature + "°"
            );

        }



        /* =================================================
           LAST EVENT
           ================================================= */

        const eventTime =

            data.timestamp ??
            data.lastEvent ??
            new Date().toLocaleTimeString();


        setText(
            "lastEvent",
            String(eventTime)
        );



        /* =================================================
           UPDATE TELEMETRY HISTORY
           ================================================= */

        addHistory(
            history.power,
            power
        );


        addHistory(
            history.cpu,
            cpu
        );


        addHistory(
            history.confidence,
            confidence
        );


        drawChart();



        /* =================================================
           CONSOLE
           ================================================= */

        updateConsole(

            status,
            confidence,
            inference,
            power,
            voltage
        );

    },


    /* =====================================================
       FIREBASE ERROR
       ===================================================== */

    (error) => {

        console.error(
            "Firebase error:",
            error
        );

        setOffline();

    }

);



/* =========================================================
   HISTORY
   ========================================================= */

function addHistory(
    array,
    value
) {

    array.push(
        Number(value) || 0
    );


    if (
        array.length >
        MAX_POINTS
    ) {

        array.shift();

    }

}



/* =========================================================
   OFFLINE
   ========================================================= */

function setOffline() {


    document.body.classList.add(
        "offline"
    );


    setText(
        "connectionText",
        "OFFLINE"
    );


    setText(
        "databaseStatus",
        "OFFLINE"
    );


    setText(
        "deviceStatus",
        "OFFLINE"
    );


    setText(
        "deviceStatus2",
        "OFFLINE"
    );


    setText(
        "statusWorking",
        "WAITING"
    );


    setText(
        "systemState",
        "DATABASE OFFLINE"
    );


    setText(
        "welcomeStatus",
        "OFFLINE"
    );


    setText(
        "listeningText",
        "WAITING FOR DEVICE"
    );


    const dot =
        document.getElementById(
            "connectionDot"
        );


    if (dot) {

        dot.style.background =
            "#ff3650";

    }


    const deviceCard =
        document.querySelector(
            ".device-card"
        );


    if (deviceCard) {

        deviceCard.classList.remove(
            "online"
        );

        deviceCard.classList.add(
            "offline"
        );

    }

}



/* =========================================================
   CONSOLE
   ========================================================= */

function updateConsole(
    status,
    confidence,
    inference,
    power,
    voltage
) {


    const consoleBox =
        document.getElementById(
            "console"
        );


    if (!consoleBox) {

        return;

    }


    const time =
        new Date().toLocaleTimeString();


    consoleBox.innerHTML = `

        <p>
            <span>[SYSTEM]</span>
            Edge KWS initialized...
        </p>

        <p>
            <span>[DEVICE]</span>
            ESP32 XIAO S3 →
            ${status}
        </p>

        <p>
            <span>[DATABASE]</span>
            Realtime telemetry received.
        </p>

        <p>
            <span>[KWS]</span>
            Confidence:
            ${confidence}%
        </p>

        <p>
            <span>[KWS]</span>
            Inference:
            ${inference} ms
        </p>

        <p>
            <span>[POWER]</span>
            ${power} mW
        </p>

        <p>
            <span>[VOLTAGE]</span>
            ${voltage} V
        </p>

        <p>
            <span>[TIME]</span>
            ${time}
        </p>

    `;

}



/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {


    const now =
        new Date();


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");


    setText(
        "clock",
        `${hours}:${minutes}:${seconds}`
    );


    setText(
        "date",

        now.toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        ).toUpperCase()

    );

}


setInterval(
    updateClock,
    1000
);


updateClock();



/* =========================================================
   TELEMETRY CANVAS
   ========================================================= */

function drawChart() {


    const canvas =
        document.getElementById(
            "telemetryChart"
        );


    if (!canvas) {

        return;

    }


    const rect =
        canvas.getBoundingClientRect();


    if (
        rect.width === 0 ||
        rect.height === 0
    ) {

        return;

    }


    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        rect.width * dpr;


    canvas.height =
        rect.height * dpr;


    const ctx =
        canvas.getContext("2d");


    ctx.scale(
        dpr,
        dpr
    );


    const width =
        rect.width;


    const height =
        rect.height;


    /* BACKGROUND */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* GRID */

    ctx.strokeStyle =
        "rgba(0,210,255,.10)";

    ctx.lineWidth = 1;


    for (
        let i = 0;
        i <= 5;
        i++
    ) {

        const y =
            15 +
            (
                (height - 35)
                / 5
            ) * i;


        ctx.beginPath();

        ctx.moveTo(
            35,
            y
        );

        ctx.lineTo(
            width - 10,
            y
        );

        ctx.stroke();

    }


    /* Y LABELS */

    ctx.fillStyle =
        "#4c6872";

    ctx.font =
        "8px monospace";


    for (
        let i = 0;
        i <= 5;
        i++
    ) {

        const value =
            100 -
            i * 20;


        const y =
            18 +
            (
                (height - 35)
                / 5
            ) * i;


        ctx.fillText(
            value,
            5,
            y
        );

    }


    drawLine(
        ctx,
        history.power,
        width,
        height,
        "#ff3650"
    );


    drawLine(
        ctx,
        history.cpu,
        width,
        height,
        "#00d9ff"
    );


    drawLine(
        ctx,
        history.confidence,
        width,
        height,
        "#00ff66"
    );

}



/* =========================================================
   DRAW LINE
   ========================================================= */

function drawLine(
    ctx,
    values,
    width,
    height,
    color
) {


    if (
        values.length < 1
    ) {

        return;

    }


    const left = 35;

    const right = 10;

    const top = 15;

    const bottom = 20;


    const chartWidth =
        width -
        left -
        right;


    const chartHeight =
        height -
        top -
        bottom;


    ctx.beginPath();


    values.forEach(
        (value, index) => {


            const x =

                left +

                (
                    index /
                    Math.max(
                        values.length - 1,
                        1
                    )
                ) *

                chartWidth;


            const normalized =

                Math.max(
                    0,
                    Math.min(
                        100,
                        Number(value)
                    )
                );


            const y =

                top +

                chartHeight *

                (
                    1 -
                    normalized / 100
                );


            if (index === 0) {

                ctx.moveTo(
                    x,
                    y
                );

            } else {

                ctx.lineTo(
                    x,
                    y
                );

            }

        }
    );


    ctx.strokeStyle =
        color;

    ctx.lineWidth = 2;

    ctx.shadowBlur = 7;

    ctx.shadowColor =
        color;

    ctx.stroke();

    ctx.shadowBlur = 0;

}



/* =========================================================
   REDRAW CHART ON RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    drawChart
);


setTimeout(
    drawChart,
    500
);
/* =========================================================
   SIDEBAR NAVIGATION
   ========================================================= */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        const page = item.dataset.page;

        /* Remove active from all */
        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        /* Activate selected */
        item.classList.add("active");

        /* Open selected page */
        openSidebarPage(page);

    });

});


function openSidebarPage(page) {

    switch (page) {

        case "dashboard":
            showDashboard();
            break;

        case "voice":
            showVoiceAnalytics();
            break;

        case "telemetry":
            showTelemetry();
            break;

        case "device":
            showDeviceInfo();
            break;

        case "logs":
            showSystemLogs();
            break;

        case "settings":
            showSettings();
            break;

    }

}
