"use strict";
console.log("RACING GAME JS LOADED");

// ===============================
// 1. العناصر الأساسية
// ===============================

const $ = id => document.getElementById(id);
const canvas = $("gameCanvas");
const ctx = canvas.getContext("2d");

const TOTAL_LEVELS = 1000;
let gameSoundEnabled = true;

const cars = [
    { name: "السيارة الزرقاء", price: 0, speed: 1, emoji: "🚙", color: "#2196f3" },
    { name: "السيارة الحمراء", price: 500, speed: 1.15, emoji: "🏎️", color: "#f44336" },
    { name: "السيارة الخضراء", price: 1000, speed: 1.3, emoji: "🚗", color: "#4caf50" },
    { name: "السيارة الذهبية", price: 1800, speed: 1.5, emoji: "🚘", color: "#ffd700" }
];

cars.push(
    { name: "سيارة البرق", price: 2500, speed: 1.65, emoji: "🏎️", color: "#00e5ff" },
    { name: "سيارة النار", price: 3500, speed: 1.8, emoji: "🔥", color: "#ff5722" },
    { name: "سيارة الأسطورة", price: 5000, speed: 2, emoji: "🚀", color: "#e040fb" },
    { name: "Falcon GT", price: 6500, speed: 2.1, emoji: "🏎️", color: "#00bcd4" },
    { name: "Royal Phantom", price: 7200, speed: 2.2, emoji: "🚘", color: "#673ab7" },
    { name: "Venom S", price: 8000, speed: 2.3, emoji: "🐍", color: "#8bc34a" },
    { name: "Blue Storm", price: 8800, speed: 2.4, emoji: "🌪️", color: "#2979ff" },
    { name: "Raptor X", price: 9600, speed: 2.5, emoji: "🚙", color: "#795548" },
    { name: "Desert King", price: 10500, speed: 2.55, emoji: "🏜️", color: "#c49a3a" },
    { name: "Black Shadow", price: 11500, speed: 2.65, emoji: "🖤", color: "#424242" },
    { name: "Titan SUV", price: 12500, speed: 2.7, emoji: "🚜", color: "#607d8b" },
    { name: "Red Bullet", price: 13500, speed: 2.8, emoji: "🔴", color: "#e53935" },
    { name: "Silver Arrow", price: 14500, speed: 2.9, emoji: "🏹", color: "#b0bec5" },
    { name: "Storm Racer", price: 15500, speed: 3.0, emoji: "⚡", color: "#00acc1" },
    { name: "Golden Beast", price: 17000, speed: 3.05, emoji: "🦁", color: "#ffb300" },
    { name: "Turbo Max", price: 18500, speed: 3.15, emoji: "💨", color: "#ec407a" },
    { name: "Phantom Z", price: 20000, speed: 3.25, emoji: "👻", color: "#7e57c2" },
    { name: "Lightning", price: 22000, speed: 3.35, emoji: "🌩️", color: "#ffee58" },
    { name: "Dragon GT", price: 24500, speed: 3.45, emoji: "🐉", color: "#d32f2f" },
    { name: "Apex Racer", price: 27000, speed: 3.55, emoji: "🏁", color: "#26a69a" },
    { name: "Ultra Sport", price: 30000, speed: 3.65, emoji: "🚀", color: "#5c6bc0" },
    { name: "Hyper Phantom", price: 34000, speed: 3.75, emoji: "🌌", color: "#ab47bc" },
    { name: "Ultimate Legend", price: 40000, speed: 3.9, emoji: "👑", color: "#ffd700" }
);

const CAR_PHOTOS = [
    { url: "https://images.pexels.com/photos/29772448/pexels-photo-29772448.jpeg?auto=compress&cs=tinysrgb&w=1200", credit: "Alessandro Dal Bosco", page: "https://www.pexels.com/photo/red-sports-car-racing-on-curved-track-29772448/" },
    { url: "https://images.pexels.com/photos/34894518/pexels-photo-34894518.jpeg?auto=compress&cs=tinysrgb&w=1200", credit: "Eric Joseph", page: "https://www.pexels.com/photo/vibrant-red-sports-car-with-alloy-wheel-and-caliper-34894518/" },
    { url: "https://images.pexels.com/photos/28944055/pexels-photo-28944055.jpeg?auto=compress&cs=tinysrgb&w=1200", credit: "GERXRD 25", page: "https://www.pexels.com/photo/high-performance-sports-car-on-racing-track-28944055/" },
    { url: "https://images.pexels.com/photos/28944072/pexels-photo-28944072.jpeg?auto=compress&cs=tinysrgb&w=1200", credit: "GERXRD 25", page: "https://www.pexels.com/photo/high-speed-red-sports-car-on-race-track-28944072/" },
    { url: "https://images.pexels.com/photos/1550611/pexels-photo-1550611.jpeg?auto=compress&cs=tinysrgb&w=1200", credit: "George Sultan", page: "https://www.pexels.com/photo/race-car-on-course-1550611/" },
    { url: "https://images.pexels.com/photos/5273155/pexels-photo-5273155.jpeg?auto=compress&cs=tinysrgb&w=1200", credit: "Jarne Aerts", page: "https://www.pexels.com/photo/a-red-sports-car-parked-on-the-road-5273155/" },
    { url: "https://images.pexels.com/photos/9661417/pexels-photo-9661417.jpeg?auto=compress&cs=tinysrgb&w=1200", credit: "Erik Mclean", page: "https://www.pexels.com/photo/red-sports-car-9661417/" },
    { url: "https://images.pexels.com/photos/12330673/pexels-photo-12330673.jpeg?auto=compress&cs=tinysrgb&w=1200", credit: "Jacob Moore", page: "https://www.pexels.com/photo/a-red-sports-car-on-the-road-12330673/" },
    { url: "https://images.pexels.com/photos/11876710/pexels-photo-11876710.jpeg?auto=compress&cs=tinysrgb&w=1200", credit: "George Sultan", page: "https://www.pexels.com/photo/red-sports-car-on-track-11876710/" },
    { url: "https://images.pexels.com/photos/16767872/pexels-photo-16767872.jpeg?auto=compress&cs=tinysrgb&w=1200", credit: "Caio Renato de Campos", page: "https://www.pexels.com/photo/back-view-on-a-red-sports-car-16767872/" },
    { url: "https://images.pexels.com/photos/31899116/pexels-photo-31899116.jpeg?auto=compress&cs=tinysrgb&w=1200", credit: "Adrien Gambet", page: "https://www.pexels.com/photo/dynamic-red-sports-car-on-racetrack-speeding-31899116/" }
];

cars.forEach((car, index) => {
    const photo = CAR_PHOTOS[index % CAR_PHOTOS.length];
    car.image = photo.url;
    car.imageCredit = photo.credit;
    car.imagePage = photo.page;
});

const defaultSave = {
    coins: 0,
    bestScore: 0,
    selectedCar: 0,
    ownedCars: [0],
    unlockedLevel: 1,
    carColor: "#2196f3",
    controlMode: "buttons",
    upgrades: { speed: 1, nitro: 1, shield: 1 },
    carUpgrades: {},
    levelAttempts: {}
};

function loadSave() {
    try {
        const stored = JSON.parse(localStorage.getItem("racingProSave"));
        if (!stored) return structuredClone(defaultSave);

        return {
            ...structuredClone(defaultSave),
            ...stored,
            ownedCars: Array.isArray(stored.ownedCars) ? stored.ownedCars : [0],
            controlMode: stored.controlMode === "tilt" ? "tilt" : "buttons",
            upgrades: { ...defaultSave.upgrades, ...(stored.upgrades || {}) },
            carUpgrades: stored.carUpgrades && typeof stored.carUpgrades === "object"
                ? stored.carUpgrades
                : {}
        };
    } catch {
        return structuredClone(defaultSave);
    }
}

let save = loadSave();

save.coins = Number.isFinite(Number(save.coins)) ? Math.max(0, Math.floor(Number(save.coins))) : 0;
save.bestScore = Number.isFinite(Number(save.bestScore)) ? Math.max(0, Math.floor(Number(save.bestScore))) : 0;
save.unlockedLevel = Number.isFinite(Number(save.unlockedLevel))
    ? Math.min(TOTAL_LEVELS, Math.max(1, Math.floor(Number(save.unlockedLevel))))
    : 1;

save.levelAttempts = (
    save.levelAttempts &&
    typeof save.levelAttempts === "object" &&
    !Array.isArray(save.levelAttempts)
) ? save.levelAttempts : {};

for (const [levelKey, attemptsValue] of Object.entries(save.levelAttempts)) {
    const levelNumber = Number(levelKey);
    const attemptsNumber = Number(attemptsValue);

    if (
        !Number.isInteger(levelNumber) ||
        levelNumber < 1 ||
        levelNumber > TOTAL_LEVELS ||
        !Number.isInteger(attemptsNumber) ||
        attemptsNumber < 0 ||
        attemptsNumber > 3
    ) {
        delete save.levelAttempts[levelKey];
    } else {
        save.levelAttempts[levelKey] = attemptsNumber;
    }
}

save.ownedCars = [...new Set(
    save.ownedCars.filter(i => Number.isInteger(i) && i >= 0 && i < cars.length)
)];

if (!save.ownedCars.includes(0)) save.ownedCars.push(0);

if (
    !Number.isInteger(save.selectedCar) ||
    save.selectedCar < 0 ||
    save.selectedCar >= cars.length ||
    !save.ownedCars.includes(save.selectedCar)
) {
    save.selectedCar = 0;
}

save.carColor = cars[save.selectedCar].color;

if (!save.carUpgrades || typeof save.carUpgrades !== "object") {
    save.carUpgrades = {};
}

if (!save.carUpgrades[save.selectedCar]) {
    save.carUpgrades[save.selectedCar] = { ...save.upgrades };
}

function getCarUpgrades(carIndex = save.selectedCar) {
    if (!save.carUpgrades[carIndex]) {
        save.carUpgrades[carIndex] = { speed: 1, nitro: 1, shield: 1 };
    }
    return save.carUpgrades[carIndex];
}

function saveGame() {
    try {
        localStorage.setItem("racingProSave", JSON.stringify(save));
    } catch (error) {
        console.warn("تعذر حفظ التقدم", error);
    }
}

saveGame();

// ===============================
// 2. حالة اللعبة
// ===============================

let selectedLevel = Math.min(TOTAL_LEVELS, Math.max(1, Number(save.unlockedLevel) || 1));
const MAX_ATTEMPTS = 3;
const MAX_HEARTS = 3;
let transitionTimer = null;
let selectedTrack = "day";
let difficultyMultiplier = 1;

function getLevelAttempts(level = selectedLevel) {
    const key = String(level);
    if (!Number.isInteger(save.levelAttempts[key])) {
        save.levelAttempts[key] = MAX_ATTEMPTS;
    }
    return Math.max(0, Math.min(MAX_ATTEMPTS, save.levelAttempts[key]));
}

function setLevelAttempts(level, amount) {
    const key = String(level);
    save.levelAttempts[key] = Math.max(0, Math.min(MAX_ATTEMPTS, Math.floor(amount)));
    saveGame();
    updateAttemptsDisplay();

    const heroLevel = $("heroLevel");
    if (heroLevel) heroLevel.textContent = selectedLevel;

    const shopCoins = $("shopCoins");
    if (shopCoins) shopCoins.textContent = save.coins.toLocaleString("en-US");
}

function ensureAttemptsDisplay() {
    const hud = document.querySelector(".game-hud");
    if (!hud) return null;

    let display = $("attemptsDisplay");
    if (!display) {
        display = document.createElement("span");
        display.id = "attemptsDisplay";
        display.style.gridColumn = "1 / -1";
        display.style.textAlign = "center";
        display.style.color = "#ffd700";
        display.style.fontWeight = "bold";
        hud.appendChild(display);
    }
    return display;
}

function updateAttemptsDisplay() {
    const display = ensureAttemptsDisplay();
    if (!display) return;
    const remaining = getLevelAttempts(selectedLevel);
    display.textContent = `🎟️ المحاولات المتبقية للمرحلة ${selectedLevel}: ${remaining} / ${MAX_ATTEMPTS}`;
}

function ensureHeartsDisplay() {
    const hud = document.querySelector(".game-hud");
    if (!hud) return null;

    let display = $("heartsDisplay");
    if (!display) {
        display = document.createElement("span");
        display.id = "heartsDisplay";
        display.style.gridColumn = "1 / -1";
        display.style.textAlign = "center";
        display.style.color = "#ff6b81";
        display.style.fontWeight = "bold";
        display.style.fontSize = "18px";
        hud.appendChild(display);
    }
    return display;
}

function updateHeartsDisplay() {
    const display = ensureHeartsDisplay();
    if (!display) return;

    const fullHearts = "❤️".repeat(Math.max(0, hearts));
    const emptyHearts = "♡".repeat(Math.max(0, MAX_HEARTS - hearts));
    display.textContent = `القلوب: ${fullHearts}${emptyHearts}`;
    display.setAttribute("aria-label", `القلوب المتبقية: ${hearts} من ${MAX_HEARTS}`);
}

function clearAutomaticTransition() {
    if (transitionTimer !== null) {
        clearTimeout(transitionTimer);
        transitionTimer = null;
    }
}

function scheduleAutomaticStart(delay = 1800) {
    clearAutomaticTransition();
    transitionTimer = setTimeout(() => {
        transitionTimer = null;
        $("resultScreen").classList.add("hidden");
        startGame();
    }, delay);
}

let running = false;
let paused = false;
let finished = false;
let countdownRunning = false;

let score = 0;
let raceCoins = 0;
let timeLeft = 180;

let hearts = MAX_HEARTS;
let collisionInvulnerabilityTimer = 0;

let nitroEnergy = 100;
let nitroTimer = 0;

let shieldActive = false;
let magnetActive = false;
let shieldTimer = 0;
let magnetTimer = 0;
let shieldCharges = 1;

let roadOffset = 0;
let lastTime = 0;
let animationId = null;

let enemyTimer = 0;
let coinTimer = 0;

let enemies = [];
let coins = [];
let particles = [];
let environmentParticles = [];
let nitroEffectParticles = [];

let accelerationEffect = false;

const player = {
    x: 200,
    y: 510,
    width: 38,
    height: 65,
    move: 0
};

let playerName = "";
try { playerName = localStorage.getItem("racingPlayerName") || ""; } catch {}

let multiplayerRoomCode = null;
let multiplayerUid = null;
let multiplayerRoomData = null;
let multiplayerUnsubscribe = null;
let multiplayerStarted = false;
let multiplayerPublishTimer = 0;
let multiplayerFinishing = false;
let multiplayerStartingFromRoom = false;

const racers = [
    { name: "أنت", progress: 0, speed: 1 },
    { name: "Lightning", progress: 0, speed: 1.1 },
    { name: "Shadow", progress: 0, speed: 1.2 },
    { name: "Turbo", progress: 0, speed: 0.95 }
];

racers[0].name = playerName || "أنت";

let records = [];

try {
    records = JSON.parse(localStorage.getItem("racingProRecords")) || [];
    if (!Array.isArray(records)) records = [];
} catch {
    records = [];
}

// ===============================
// 3. الصوت والمؤثرات
// ===============================

let audioContext = null;

function playGameSound(frequency = 440, duration = 0.12, type = "sine") {
    if (!gameSoundEnabled) return;

    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        if (!audioContext) audioContext = new AudioContextClass();

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

        gain.gain.setValueAtTime(0.08, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.warn("الصوت غير متاح", error);
    }
}

// ===============================
// 4. الطقس المتغير
// ===============================

const weatherTypes = [
    { name: "طقس مشمس ☀️", overlay: null },
    { name: "طقس ممطر 🌧️", overlay: "rain" },
    { name: "ضباب 🌫️", overlay: "fog" },
    { name: "ليل هادئ 🌙", overlay: "night" }
];

let currentWeather = weatherTypes[0];

function chooseWeather() {
    currentWeather = weatherTypes[
        Math.floor(Math.random() * weatherTypes.length)
    ];

    const label = $("weatherName");
    if (label) label.textContent = currentWeather.name;
}

function drawWeatherEffect() {
    if (currentWeather.overlay === "rain") {
        ctx.save();
        ctx.strokeStyle = "rgba(180,220,255,.55)";
        ctx.lineWidth = 1;

        for (let i = 0; i < 55; i++) {
            const x = (i * 73 + roadOffset * 2) % 400;
            const y = (i * 97 + roadOffset * 4) % 600;

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 5, y + 13);
            ctx.stroke();
        }

        ctx.restore();
    }

    if (currentWeather.overlay === "fog") {
        ctx.fillStyle = "rgba(220,235,245,.22)";
        ctx.fillRect(55, 0, 290, 600);
    }

    if (currentWeather.overlay === "night") {
        ctx.fillStyle = "rgba(5,10,35,.34)";
        ctx.fillRect(55, 0, 290, 600);
    }
}

// ===============================
// 5. نظام التحكم
// ===============================

let controlMode = save.controlMode || "buttons";

let tiltEnabled = false;
let tiltBaseline = null;
let tiltCenterX = 200;
let tiltTargetX = 200;

function updateControlInterface() {
    $("controlMode").value = controlMode;

    const leftButton = $("leftBtn");
    const rightButton = $("rightBtn");
    const hint = $("controlHint");

    if (controlMode === "buttons") {
        leftButton.classList.remove("hidden");
        rightButton.classList.remove("hidden");
        hint.textContent = "استخدم أزرار اليمين واليسار للتحرك.";
    } else {
        leftButton.classList.add("hidden");
        rightButton.classList.add("hidden");

        hint.textContent =
            "أمِل الهاتف يمينًا أو يسارًا لتحريك السيارة. " +
            "حافظ على الهاتف في وضع مستقيم عند بداية التحكم.";
    }
}

function stopTiltControl() {
    window.removeEventListener("deviceorientation", handleDeviceOrientation);
    tiltEnabled = false;
    tiltBaseline = null;
}

function handleDeviceOrientation(event) {
    if (!tiltEnabled || controlMode !== "tilt") return;
    if (event.gamma === null || event.gamma === undefined) return;

    const gamma = Number(event.gamma);
    if (!Number.isFinite(gamma)) return;

    if (tiltBaseline === null) {
        tiltBaseline = gamma;
        tiltCenterX = player.x;
        tiltTargetX = player.x;
        return;
    }

    let difference = gamma - tiltBaseline;
    difference = Math.max(-30, Math.min(30, difference));

    tiltTargetX = tiltCenterX + difference * 8;
    tiltTargetX = Math.max(80, Math.min(320, tiltTargetX));
}

async function enableTiltControl() {
    if (!("DeviceOrientationEvent" in window)) {
        alert("مستشعر حركة الهاتف غير مدعوم. سيتم الرجوع إلى الأزرار.");

        controlMode = "buttons";
        save.controlMode = controlMode;
        saveGame();
        updateControlInterface();
        return;
    }

    try {
        if (typeof DeviceOrientationEvent.requestPermission === "function") {
            const permission = await DeviceOrientationEvent.requestPermission();

            if (permission !== "granted") {
                throw new Error("لم يتم السماح باستخدام مستشعر الحركة");
            }
        }

        stopTiltControl();

        tiltBaseline = null;
        tiltCenterX = player.x;
        tiltTargetX = player.x;
        tiltEnabled = true;

        window.addEventListener("deviceorientation", handleDeviceOrientation);

        controlMode = "tilt";
        save.controlMode = "tilt";
        saveGame();
        updateControlInterface();

        $("controlHint").textContent =
            "تم تفعيل التحكم بالإمالة. أمِل الهاتف يمينًا ويسارًا.";
    } catch (error) {
        console.warn("تعذر تشغيل مستشعر الحركة:", error);

        stopTiltControl();
        controlMode = "buttons";
        save.controlMode = "buttons";

        saveGame();
        updateControlInterface();

        alert("لم نتمكن من تفعيل مستشعر الحركة. استخدم الأزرار.");
    }
}

function setControlMode(mode) {
    if (mode === "tilt") {
        enableTiltControl();
        return;
    }

    stopTiltControl();
    controlMode = "buttons";
    save.controlMode = "buttons";

    saveGame();
    updateControlInterface();
}

$("controlMode").addEventListener("change", event => {
    setControlMode(event.target.value);
});

// ===============================
// 6. الصعوبة والمراحل
// ===============================

function levelGoal(level) {
    return 500 + (level - 1) * 2;
}

function setDifficulty(value) {
    if (value === "easy") {
        difficultyMultiplier = 0.65;
    } else if (value === "hard") {
        difficultyMultiplier = 1.4;
    } else {
        difficultyMultiplier = 1;
    }
}

$("difficultySelect").addEventListener("change", event => {
    setDifficulty(event.target.value);
});

function displayLevels() {
    const container = $("levelsList");
    container.innerHTML = "";

    for (let i = 1; i <= TOTAL_LEVELS; i++) {
        const button = document.createElement("button");

        button.className = "level-btn";
        button.textContent = "مرحلة " + i;
        button.disabled = i > save.unlockedLevel;

        if (i === selectedLevel) button.classList.add("active");

        button.addEventListener("click", () => {
            selectedLevel = i;

            if (getLevelAttempts(i) <= 0) {
                setLevelAttempts(i, MAX_ATTEMPTS);
            } else {
                saveGame();
            }

            displayLevels();
            updateAttemptsDisplay();

            $("levelProgress").textContent =
                `هدف المرحلة: ${levelGoal(i)} نقطة`;
        });

        container.appendChild(button);
    }

    $("levelProgress").textContent =
        `المرحلة ${selectedLevel} - الهدف ${levelGoal(selectedLevel)} نقطة`;
}

// ===============================
// 7. تحديث بيانات اللاعب
// ===============================

function updateHeader() {
    $("coins").textContent = save.coins;
    $("bestScore").textContent = save.bestScore;

    $("nitroFill").style.width = nitroEnergy + "%";
    $("nitroText").textContent = Math.floor(nitroEnergy) + "%";

    $("raceCoins").textContent = raceCoins;
    $("score").textContent = Math.floor(score);
    $("raceTime").textContent = Math.ceil(timeLeft);

    const upgrades = getCarUpgrades();

    $("upgradeInfo").textContent =
        `تطويرات ${cars[save.selectedCar].name}: ` +
        `السرعة ${upgrades.speed}/3 | ` +
        `النيترو ${upgrades.nitro}/3 | ` +
        `الدرع ${upgrades.shield}/3`;

    updateAttemptsDisplay();
}

// ===============================
// 8. الجراج
// ===============================

function displayShop() {
    const shop = $("carShop");
    if (!shop) return;

    shop.innerHTML = cars.map((car, index) => {
        const owned = save.ownedCars.includes(index);
        const selected = save.selectedCar === index;
        const photo = car.image || "";
        const className = selected ? "selected" : "";

        let buttonText;
        let buttonClass = "";

        if (selected) {
            buttonText = "✓ السيارة الحالية";
        } else if (owned) {
            buttonText = "اختيار السيارة";
            buttonClass = "owned-action";
        } else {
            buttonText = `شراء السيارة · ${car.price.toLocaleString("en-US")} CR`;
        }

        return `
            <article class="car-card ${className}">
                <div class="car-image-wrap" data-fallback="${car.emoji}">
                    <img class="car-photo"
                         src="${photo}"
                         alt="صورة فوتوغرافية لسيارة ${car.name}"
                         loading="lazy"
                         decoding="async"
                         referrerpolicy="no-referrer">
                    <span class="car-photo-fallback" aria-hidden="true">${car.emoji}</span>
                    <span class="car-image-badge">REAL CAR PHOTO</span>
                    ${selected ? '<span class="car-selected-badge">سيارتك الحالية</span>' : ''}
                </div>
                <div class="car-card-body">
                    <span class="car-card-kicker">RACE MACHINE · ${String(index + 1).padStart(2, "0")}</span>
                    <h3>${car.name}</h3>
                    <div class="car-specs">
                        <div class="car-spec"><span>مؤشر السرعة</span><strong>${car.speed.toFixed(2)}×</strong></div>
                        <div class="car-spec"><span>حالة الملكية</span><strong>${owned ? 'مملوكة' : 'مقفولة'}</strong></div>
                    </div>
                    <div class="car-status">
                        <span>${owned ? 'جاهزة للسباق' : 'افتحها بالعملات'}</span>
                        <span class="car-price">${owned ? 'OWNED' : `${car.price.toLocaleString("en-US")} CR`}</span>
                    </div>
                    <a class="car-photo-credit" href="${car.imagePage}" target="_blank" rel="noopener noreferrer">صورة: ${car.imageCredit} · Pexels</a>
                    <button class="${buttonClass}" data-car="${index}" ${selected ? "disabled" : ""}>
                        ${buttonText}
                    </button>
                </div>
            </article>
        `;
    }).join("");

    shop.querySelectorAll(".car-photo").forEach(image => {
        image.addEventListener("error", () => {
            image.closest(".car-image-wrap")?.classList.add("photo-fallback");
            image.remove();
        }, { once: true });
    });

    shop.querySelectorAll("[data-car]").forEach(button => {
        button.addEventListener("click", () => {
            selectCar(Number(button.dataset.car));
        });
    });

    updateUpgradeButtons();
}

function selectCar(index) {
    const car = cars[index];
    if (!car) return;

    const owned = save.ownedCars.includes(index);

    if (!owned) {
        if (save.coins < car.price) {
            alert("رصيدك من العملات غير كافٍ!");
            return;
        }

        save.coins -= car.price;
        save.ownedCars.push(index);
    }

    save.selectedCar = index;
    save.carColor = car.color;
    getCarUpgrades(index);

    saveGame();
    updateHeader();
    displayShop();
}

// ===============================
// 9. تطوير السيارات
// ===============================

function upgrade(type) {
    const baseCosts = { speed: 300, nitro: 500, shield: 700 };
    if (!baseCosts[type]) return;

    const upgrades = getCarUpgrades();

    if (upgrades[type] >= 3) {
        alert("وصلت هذه السيارة إلى أعلى مستوى للتطوير!");
        return;
    }

    const cost = baseCosts[type] * (upgrades[type] + 1);

    if (save.coins < cost) {
        alert(`تحتاج إلى ${cost} عملة لتطوير هذه السيارة.`);
        return;
    }

    save.coins -= cost;
    upgrades[type]++;
    save.upgrades = { ...upgrades };

    saveGame();
    updateHeader();
    updateUpgradeButtons();

    alert(`تم تطوير ${cars[save.selectedCar].name} بنجاح!`);
}

function updateUpgradeButtons() {
    const upgrades = getCarUpgrades();

    const buttons = [
        ["speedUpgrade", "🚀 تطوير السرعة", "speed", 300],
        ["nitroUpgrade", "⚡ تطوير النيترو", "nitro", 500],
        ["shieldUpgrade", "🛡️ تطوير الدرع", "shield", 700]
    ];

    buttons.forEach(([id, label, type, baseCost]) => {
        const button = $(id);
        if (!button) return;

        const cost = baseCost * (upgrades[type] + 1);

        button.textContent = upgrades[type] >= 3
            ? `${label} - مكتمل ✓`
            : `${label} - ${cost} 🪙`;

        button.disabled = upgrades[type] >= 3;
    });
}

$("speedUpgrade").addEventListener("click", () => upgrade("speed"));
$("nitroUpgrade").addEventListener("click", () => upgrade("nitro"));
$("shieldUpgrade").addEventListener("click", () => upgrade("shield"));

// ===============================
// 10. سجل النتائج
// ===============================

function displayRecords() {
    const list = $("leaderboardList");
    if (!list) return;

    list.replaceChildren();

    if (!records.length) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "لا توجد نتائج حتى الآن";
        list.appendChild(emptyMessage);
        return;
    }

    records.slice(0, 10).forEach((record, index) => {
        const row = document.createElement("div");
        row.className = "ranking-player";

        const level = Number.isFinite(Number(record.level))
            ? Math.max(1, Math.min(TOTAL_LEVELS, Math.floor(Number(record.level))))
            : 1;

        const recordScore = Number.isFinite(Number(record.score))
            ? Math.max(0, Math.floor(Number(record.score)))
            : 0;

        const levelText = document.createElement("span");
        levelText.textContent = `${index + 1}. المرحلة ${level}`;

        const scoreText = document.createElement("strong");
        scoreText.textContent = `${recordScore} نقطة`;

        row.append(levelText, scoreText);
        list.appendChild(row);
    });
}

async function displayOnlineLeaderboard() {
    const list = $("onlineLeaderboard");
    if (!list) return;

    list.textContent = "جاري تحميل النتائج...";

    try {
        if (!window.firebaseDB || typeof window.firebaseDB.getTopScores !== "function") {
            list.textContent = "الاتصال بقاعدة البيانات غير متاح حاليًا.";
            return;
        }

        const results = await window.firebaseDB.getTopScores(10);
        list.innerHTML = "";

        if (!results.length) {
            list.textContent = "لا توجد نتائج أونلاين حتى الآن.";
            return;
        }

        results.forEach((record, index) => {
            const row = document.createElement("div");
            row.className = "ranking-player";

            const playerName = document.createElement("span");
            playerName.textContent = `${index + 1}. ${record.playerName || "متسابق"}`;

            const playerScore = document.createElement("strong");
            playerScore.textContent = `${Number(record.score) || 0} نقطة`;

            row.append(playerName, playerScore);
            list.appendChild(row);
        });
    } catch (error) {
        console.error("خطأ في تحميل المتصدرين أونلاين:", error);
        list.textContent = "تعذر تحميل النتائج. تأكد من اتصال الإنترنت ثم اضغط تحديث.";
    }
}

$("refreshOnlineLeaderboard").addEventListener("click", displayOnlineLeaderboard);

function addRecord(level = selectedLevel) {
    records.push({
        level,
        score: Math.floor(score),
        date: new Date().toLocaleDateString("ar-EG")
    });

    records.sort((a, b) => b.score - a.score);
    records = records.slice(0, 10);

    try {
        localStorage.setItem("racingProRecords", JSON.stringify(records));
    } catch (error) {
        console.warn("تعذر حفظ النتائج", error);
    }

    displayRecords();
}

$("clearRecordsBtn").addEventListener("click", () => {
    if (!confirm("هل تريد مسح كل النتائج؟")) return;

    records = [];

    try {
        localStorage.removeItem("racingProRecords");
    } catch {}

    displayRecords();
});

// ===============================
// 11. المضامير والبيئة
// ===============================

document.querySelectorAll(".track-btn").forEach(button => {
    button.addEventListener("click", () => {
        selectedTrack = button.dataset.track;

        document.querySelectorAll(".track-btn").forEach(btn => {
            btn.classList.toggle("active", btn === button);
        });

        $("menuTrack").value = selectedTrack;
        environmentParticles = [];

        drawGame();
    });
});

function drawEnvironment() {
    if (selectedTrack === "city") {
        drawCityEnvironment();
    } else if (selectedTrack === "desert") {
        drawDesertEnvironment();
    } else if (selectedTrack === "snow") {
        drawSnowEnvironment();
    } else {
        drawDayEnvironment();
    }
}

function drawCityEnvironment() {
    ctx.fillStyle = "#11182d";
    ctx.fillRect(0, 0, 400, 600);

    for (let i = 0; i < 7; i++) {
        const y = ((i * 110 + roadOffset * 0.5) % 700) - 100;

        ctx.fillStyle = "#263653";
        ctx.fillRect(5, y, 42, 75);
        ctx.fillRect(353, y, 42, 75);

        ctx.fillStyle = "#ffe082";

        for (let j = 0; j < 3; j++) {
            ctx.fillRect(12 + j * 12, y + 12, 5, 8);
            ctx.fillRect(360 + j * 12, y + 12, 5, 8);
        }
    }
}

function drawDesertEnvironment() {
    ctx.fillStyle = "#b87936";
    ctx.fillRect(0, 0, 400, 600);

    for (let i = 0; i < 8; i++) {
        const y = ((i * 90 + roadOffset) % 700) - 100;

        ctx.fillStyle = "#e5ae63";

        ctx.beginPath();
        ctx.ellipse(25, y + 30, 35, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(375, y + 55, 38, 20, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawSnowEnvironment() {
    ctx.fillStyle = "#dceaf5";
    ctx.fillRect(0, 0, 400, 600);

    ctx.fillStyle = "#a8c9df";

    for (let i = 0; i < 10; i++) {
        const y = ((i * 80 + roadOffset * 0.5) % 700) - 100;

        ctx.beginPath();
        ctx.arc(20, y, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(380, y + 30, 28, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawDayEnvironment() {
    const gradient = ctx.createLinearGradient(0, 0, 400, 600);
    gradient.addColorStop(0, "#62a94f");
    gradient.addColorStop(1, "#347b39");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 600);

    ctx.fillStyle = "#277234";

    for (let i = 0; i < 10; i++) {
        const y = ((i * 90 + roadOffset * 0.7) % 700) - 100;

        ctx.beginPath();
        ctx.arc(18, y, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(382, y + 35, 18, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ===============================
// 12. رسم الطريق والسيارات
// ===============================

function drawRoad() {
    ctx.fillStyle = "#30343b";
    ctx.fillRect(55, 0, 290, 600);

    ctx.fillStyle = "#f3f3f3";
    ctx.fillRect(55, 0, 5, 600);
    ctx.fillRect(340, 0, 5, 600);

    ctx.fillStyle = "#fff";

    for (let i = 0; i < 12; i++) {
        const y = ((i * 65 + roadOffset) % 780) - 100;
        ctx.fillRect(197, y, 6, 35);
    }

    ctx.fillStyle = "rgba(0,0,0,.12)";
    ctx.fillRect(60, 0, 12, 600);
    ctx.fillRect(328, 0, 12, 600);
}

function drawCar(x, y, width, height, color, isPlayer = false) {
    ctx.save();

    ctx.fillStyle = "rgba(0,0,0,.3)";
    ctx.beginPath();
    ctx.ellipse(x + width / 2, y + height - 2, width / 2 + 4, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#111";
    ctx.fillRect(x - 3, y + 12, 5, 15);
    ctx.fillRect(x + width - 2, y + 12, 5, 15);
    ctx.fillRect(x - 3, y + height - 25, 5, 15);
    ctx.fillRect(x + width - 2, y + height - 25, 5, 15);

    const gradient = ctx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(1, color);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 8);
    ctx.fill();

    ctx.fillStyle = "#172a3a";
    ctx.beginPath();
    ctx.roundRect(x + 6, y + 12, width - 12, 17, 4);
    ctx.fill();

    ctx.fillStyle = "#243c50";
    ctx.beginPath();
    ctx.roundRect(x + 7, y + 34, width - 14, 13, 3);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.fillRect(x + 4, y + 3, 8, 4);
    ctx.fillRect(x + width - 12, y + 3, 8, 4);

    ctx.fillStyle = "#ff3030";
    ctx.fillRect(x + 4, y + height - 6, 8, 4);
    ctx.fillRect(x + width - 12, y + height - 6, 8, 4);

    if (isPlayer) {
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 2, y - 2, width + 4, height + 4);
    }

    ctx.restore();
}

function drawPlayer() {
    const car = cars[save.selectedCar];

    if (shieldActive) {
        ctx.save();
        ctx.strokeStyle = "rgba(0,220,255,.9)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(player.x, player.y + 32, 32, 42, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }

    if (collisionInvulnerabilityTimer > 0 && Math.floor(collisionInvulnerabilityTimer * 10) % 2 === 0) {
        return;
    }

    drawCar(
        player.x - player.width / 2,
        player.y,
        player.width,
        player.height,
        car.color,
        true
    );
}

function drawEnemies() {
    enemies.forEach(enemy => {
        drawCar(
            enemy.x - enemy.width / 2,
            enemy.y,
            enemy.width,
            enemy.height,
            enemy.color
        );
    });
}

function drawCoins() {
    coins.forEach(coin => {
        ctx.save();

        ctx.fillStyle = "#ffd700";
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#fff3a1";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#9a6800";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("$", coin.x, coin.y);

        ctx.restore();
    });
}

function drawParticles() {
    particles.forEach(particle => {
        ctx.globalAlpha = Math.max(0, particle.life);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalAlpha = 1;
}

function drawGame() {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawEnvironment();
    drawRoad();
    drawCoins();
    drawEnemies();
    drawPlayer();
    drawParticles();
    drawWeatherEffect();

    if (magnetActive) {
        ctx.save();
        ctx.strokeStyle = "rgba(255,215,0,.35)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(player.x, player.y + 30, 90, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

// ===============================
// 13. إنشاء العقبات والعملات
// ===============================

const enemyColors = [
    "#e53935",
    "#43a047",
    "#ff9800",
    "#8e24aa",
    "#00acc1",
    "#eeeeee"
];

function createEnemy() {
    const lanes = [105, 155, 205, 255, 305];
    const lane = lanes[Math.floor(Math.random() * lanes.length)];

    enemies.push({
        x: lane,
        y: -80,
        width: 38,
        height: 65,
        speed: (2 + Math.random() * 2) * difficultyMultiplier,
        color: enemyColors[Math.floor(Math.random() * enemyColors.length)]
    });
}

function createCoin() {
    const lanes = [105, 155, 205, 255, 305];

    coins.push({
        x: lanes[Math.floor(Math.random() * lanes.length)],
        y: -20,
        radius: 10,
        speed: 3
    });
}

function createParticles(x, y, color, amount = 10) {
    for (let i = 0; i < amount; i++) {
        particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            size: 2 + Math.random() * 4,
            color,
            life: 1
        });
    }
}

function updateParticles(delta) {
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= delta * 0.9;
        particle.size *= 0.99;
    });

    particles = particles.filter(particle => particle.life > 0);
}

// ===============================
// 14. التصادم والقلوب
// ===============================

function rectanglesCollide(a, b) {
    return (
        a.x - a.width / 2 < b.x + b.width / 2 &&
        a.x + a.width / 2 > b.x - b.width / 2 &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function handleCollision(enemy) {
    if (collisionInvulnerabilityTimer > 0) return;

    if (shieldActive) {
        createParticles(enemy.x, enemy.y + 30, "#00e5ff", 18);
        enemies = enemies.filter(item => item !== enemy);
        playGameSound(700, 0.2, "triangle");
        return;
    }

    hearts = Math.max(0, hearts - 1);
    collisionInvulnerabilityTimer = 1.5;

    createParticles(player.x, player.y + 30, "#ff5252", 20);
    playGameSound(120, 0.3, "sawtooth");

    updateHeartsDisplay();

    enemies = enemies.filter(item => item !== enemy);

    if (hearts <= 0) {
        loseLife();
    }
}

function loseLife() {
    if (!running || finished) return;

    running = false;
    finished = true;

    setLevelAttempts(selectedLevel, getLevelAttempts(selectedLevel) - 1);

    if (getLevelAttempts(selectedLevel) <= 0) {
        showResult(
            "انتهت محاولات المرحلة",
            `لقد استنفدت المحاولات الثلاث في المرحلة ${selectedLevel}. يمكنك إعادة المحاولة من قائمة المراحل.`,
            "💔"
        );
    } else {
        showResult(
            "انتهت المحاولة",
            `باقي لك ${getLevelAttempts(selectedLevel)} محاولة في المرحلة ${selectedLevel}.`,
            "❤️"
        );
    }
}

// ===============================
// 15. جمع العملات
// ===============================

function collectCoin(coin) {
    raceCoins++;
    score += 25;

    save.coins += 5;

    createParticles(coin.x, coin.y, "#ffd700", 10);
    playGameSound(850, 0.1, "sine");

    updateHeader();
    coins = coins.filter(item => item !== coin);
}

// ===============================
// 16. النيترو والدرع والمغناطيس
// ===============================

function activateNitro() {
    if (!running || paused || nitroEnergy <= 0) return;

    if (nitroTimer > 0) return;

    const upgrades = getCarUpgrades();

    nitroTimer = 2 + upgrades.nitro * 0.5;
    nitroEnergy = Math.max(0, nitroEnergy - 25);

    accelerationEffect = true;
    playGameSound(600, 0.2, "sawtooth");
}

function activateShield() {
    if (!running || paused || shieldActive) return;

    const upgrades = getCarUpgrades();

    shieldActive = true;
    shieldTimer = 3 + upgrades.shield;
    shieldCharges = 1;

    playGameSound(500, 0.2, "triangle");
}

function activateMagnet() {
    if (!running || paused || magnetActive) return;

    magnetActive = true;
    magnetTimer = 5;

    playGameSound(900, 0.15, "sine");
}

$("nitroBtn").addEventListener("click", activateNitro);
$("shieldBtn").addEventListener("click", activateShield);
$("magnetBtn").addEventListener("click", activateMagnet);

// ===============================
// 17. تحديث حركة اللعبة
// ===============================

function updateGame(delta) {
    if (!running || paused || finished) return;

    const upgrades = getCarUpgrades();
    const car = cars[save.selectedCar];

    const gameSpeed = (3 + car.speed + upgrades.speed * 0.5) * difficultyMultiplier;
    const nitroBoost = nitroTimer > 0 ? 2.2 : 1;

    roadOffset += gameSpeed * nitroBoost * delta * 60;

    score += delta * 10 * nitroBoost;

    timeLeft -= delta;

    if (timeLeft <= 0) {
        timeLeft = 0;
        completeLevel();
        return;
    }

    if (collisionInvulnerabilityTimer > 0) {
        collisionInvulnerabilityTimer -= delta;
    }

    if (nitroTimer > 0) {
        nitroTimer -= delta;
        if (nitroTimer <= 0) accelerationEffect = false;
    } else {
        nitroEnergy = Math.min(100, nitroEnergy + delta * 3);
    }

    if (shieldTimer > 0) {
        shieldTimer -= delta;
        if (shieldTimer <= 0) shieldActive = false;
    }

    if (magnetTimer > 0) {
        magnetTimer -= delta;
        if (magnetTimer <= 0) magnetActive = false;
    }

    if (controlMode === "tilt" && tiltEnabled) {
        player.x += (tiltTargetX - player.x) * Math.min(1, delta * 12);
    } else {
        player.x += player.move * delta * 260;
    }

    player.x = Math.max(80, Math.min(320, player.x));

    enemyTimer += delta;
    coinTimer += delta;

    if (enemyTimer > Math.max(0.5, 1.5 - selectedLevel * 0.0005)) {
        createEnemy();
        enemyTimer = 0;
    }

    if (coinTimer > 1.1) {
        createCoin();
        coinTimer = 0;
    }

    enemies.forEach(enemy => {
        enemy.y += (enemy.speed + gameSpeed * 0.3) * delta * 60;

        if (rectanglesCollide(
            { x: player.x, y: player.y, width: player.width, height: player.height },
            { x: enemy.x, y: enemy.y, width: enemy.width, height: enemy.height }
        )) {
            handleCollision(enemy);
        }
    });

    enemies = enemies.filter(enemy => enemy.y < 650);

    coins.forEach(coin => {
        coin.y += coin.speed * delta * 60;

        if (magnetActive) {
            coin.x += (player.x - coin.x) * delta * 3;
            coin.y += (player.y + 30 - coin.y) * delta * 3;
        }

        const dx = player.x - coin.x;
        const dy = player.y + 30 - coin.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 32) {
            collectCoin(coin);
        }
    });

    coins = coins.filter(coin => coin.y < 650);

    updateParticles(delta);

    if (multiplayerRoomCode && multiplayerUid && multiplayerStarted) {
        multiplayerPublishTimer += delta;

        if (multiplayerPublishTimer >= 0.15) {
            multiplayerPublishTimer = 0;

            window.racingOnlineDB?.publishPlayer(
                multiplayerRoomCode,
                multiplayerUid,
                {
                    x: player.x,
                    progress: Math.min(99, (score / levelGoal(selectedLevel)) * 100),
                    score,
                    finished: false
                }
            ).catch(error => console.warn("تعذر تحديث بيانات اللاعب:", error));
        }
    }

    updateHeader();

    if (score >= levelGoal(selectedLevel)) {
        completeLevel();
    }
}

// ===============================
// 18. حلقة الرسوم
// ===============================

function gameLoop(timestamp) {
    if (!running || paused || finished) return;

    if (!lastTime) lastTime = timestamp;

    const delta = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;

    updateGame(delta);
    drawGame();

    if (running && !paused && !finished) {
        animationId = requestAnimationFrame(gameLoop);
    }
}

// ===============================
// 19. بدء السباق
// ===============================

function resetRace() {
    score = 0;
    raceCoins = 0;
    timeLeft = 180;

    hearts = MAX_HEARTS;
    collisionInvulnerabilityTimer = 0;

    nitroEnergy = 100;
    nitroTimer = 0;

    shieldActive = false;
    magnetActive = false;
    shieldTimer = 0;
    magnetTimer = 0;

    roadOffset = 0;
    enemyTimer = 0;
    coinTimer = 0;

    enemies = [];
    coins = [];
    particles = [];

    player.x = 200;
    player.move = 0;

    multiplayerPublishTimer = 0;
    multiplayerFinishing = false;

    updateHeartsDisplay();
    updateHeader();
}

function startGame() {
    clearAutomaticTransition();

    if (countdownRunning) return;

    if (getLevelAttempts(selectedLevel) <= 0) {
        alert("لقد انتهت محاولات هذه المرحلة. اختر المرحلة من جديد لبدء محاولة جديدة.");
        return;
    }

    resetRace();

    running = false;
    paused = false;
    finished = false;
    countdownRunning = true;

    $("resultScreen").classList.add("hidden");
    $("pauseOverlay").classList.add("hidden");

    chooseWeather();

    const countdown = $("countdown");
    countdown.classList.remove("hidden");

    let count = 3;
    countdown.textContent = count;

    const timer = setInterval(() => {
        count--;

        if (count > 0) {
            countdown.textContent = count;
            playGameSound(500, 0.1);
        } else {
            clearInterval(timer);

            countdown.classList.add("hidden");
            countdownRunning = false;

            running = true;
            paused = false;
            finished = false;

            lastTime = 0;

            playGameSound(850, 0.2);

            if (animationId) cancelAnimationFrame(animationId);
            animationId = requestAnimationFrame(gameLoop);
        }
    }, 800);
}

// ===============================
// 20. إيقاف واستكمال
// ===============================

function pauseGame() {
    if (!running || finished) return;

    paused = true;
    running = false;

    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }

    $("pauseOverlay").classList.remove("hidden");
}

function resumeGame() {
    if (finished) return;

    paused = false;
    running = true;

    $("pauseOverlay").classList.add("hidden");

    lastTime = 0;
    animationId = requestAnimationFrame(gameLoop);
}

$("pauseBtn").addEventListener("click", pauseGame);
$("resumeBtn").addEventListener("click", resumeGame);

// ===============================
// 21. الفوز وإنهاء المرحلة
// ===============================

async function completeLevel() {
    if (finished) return;

    running = false;
    finished = true;

    score = Math.max(score, levelGoal(selectedLevel));

    const reward = 100 + selectedLevel * 2;

    save.coins += reward;
    save.bestScore = Math.max(save.bestScore, Math.floor(score));

    const completedLevel = selectedLevel;

    if (selectedLevel < TOTAL_LEVELS) {
        selectedLevel++;
        save.unlockedLevel = Math.max(save.unlockedLevel, selectedLevel);
        save.levelAttempts[String(selectedLevel)] = MAX_ATTEMPTS;
    }

    setLevelAttempts(completedLevel, MAX_ATTEMPTS);

    saveGame();
    addRecord(completedLevel);

    if (multiplayerRoomCode && multiplayerUid && multiplayerStarted && !multiplayerFinishing) {
        multiplayerFinishing = true;

        try {
            await window.racingOnlineDB.finishPlayer(
                multiplayerRoomCode,
                multiplayerUid,
                score
            );
        } catch (error) {
            console.error("تعذر تسجيل نهاية السباق الجماعي:", error);
        }
    }

    if (window.firebaseDB) {
        try {
            await window.firebaseDB.saveRaceResult({
                playerName: playerName || "متسابق",
                score: Math.floor(score),
                coins: raceCoins,
                track: selectedTrack
            });
        } catch (error) {
            console.warn("تعذر حفظ النتيجة أونلاين:", error);
        }
    }

    updateHeader();
    displayLevels();

    showResult(
        "🏆 فزت بالمرحلة!",
        `نتيجتك: ${Math.floor(score)} نقطة. حصلت على ${reward} عملة. المرحلة التالية: ${selectedLevel}.`,
        "🥇"
    );

    playGameSound(900, 0.3, "triangle");
}

// ===============================
// 22. شاشة النتائج
// ===============================

function showResult(title, details, medal = "🏁") {
    $("resultTitle").textContent = title;
    $("resultDetails").textContent = details;
    $("medalResult").textContent = medal;

    $("resultScreen").classList.remove("hidden");
    $("pauseOverlay").classList.add("hidden");

    updateHeader();
}

$("restartBtn").addEventListener("click", () => {
    clearAutomaticTransition();

    if (multiplayerRoomCode) {
        alert("في السباق الجماعي، انتظر بدء الجولة التالية من منشئ الغرفة.");
        return;
    }

    if (getLevelAttempts(selectedLevel) <= 0) {
        alert("انتهت محاولات هذه المرحلة. اختر المرحلة من قائمة المراحل.");
        return;
    }

    startGame();
});

$("resultMenuBtn").addEventListener("click", () => {
    clearAutomaticTransition();
    $("resultScreen").classList.add("hidden");
    showPage("homePage");
});

// ===============================
// 23. أزرار الحركة
// ===============================

function moveLeft() {
    if (!running || paused) return;
    player.move = -1;
}

function moveRight() {
    if (!running || paused) return;
    player.move = 1;
}

function stopMove() {
    player.move = 0;
}

$("leftBtn").addEventListener("pointerdown", event => {
    event.preventDefault();
    moveLeft();
});

$("rightBtn").addEventListener("pointerdown", event => {
    event.preventDefault();
    moveRight();
});

["pointerup", "pointerleave", "pointercancel"].forEach(type => {
    $("leftBtn").addEventListener(type, stopMove);
    $("rightBtn").addEventListener(type, stopMove);
});

window.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        event.preventDefault();
        moveLeft();
    }

    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        event.preventDefault();
        moveRight();
    }

    if (event.key === "Escape") {
        if (running) pauseGame();
        else if (paused) resumeGame();
    }

    if (event.code === "Space") {
        event.preventDefault();
        activateNitro();
    }
});

window.addEventListener("keyup", event => {
    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key.toLowerCase() === "a" ||
        event.key.toLowerCase() === "d"
    ) {
        stopMove();
    }
});

$("startBtn").addEventListener("click", startGame);
$("menuPlayBtn").addEventListener("click", () => {
    const name = $("playerNameInput").value.trim();

    playerName = name || "متسابق";

    try {
        localStorage.setItem("racingPlayerName", playerName);
    } catch {}

    racers[0].name = playerName;

    selectedTrack = $("menuTrack").value || "day";

    document.querySelectorAll(".track-btn").forEach(button => {
        button.classList.toggle("active", button.dataset.track === selectedTrack);
    });

    $("mainMenu").classList.add("hidden");
    startGame();
});

// ===============================
// 24. التنقل بين الصفحات
// ===============================

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
        page.classList.remove("active-page");
    });

    const target = $(pageId);

    if (target) {
        target.classList.remove("hidden");
        target.classList.add("active-page");
    }

    document.querySelectorAll(".nav-btn").forEach(button => {
        button.classList.toggle("active", button.dataset.page === pageId);
    });

    if (pageId === "shopPage") {
        displayShop();
        $("shopCoins").textContent = save.coins.toLocaleString("en-US");
    }

    if (pageId === "resultsPage") {
        displayRecords();
        displayOnlineLeaderboard();
    }

    if (pageId === "challengesPage") {
        displayLevels();
    }

    if (pageId === "homePage") {
        updateHeader();
        updateHeartsDisplay();
    }
}

document.querySelectorAll(".nav-btn").forEach(button => {
    button.addEventListener("click", () => {
        showPage(button.dataset.page);
    });
});

// ===============================
// 25. التحدي اليومي
// ===============================

function getDailyKey() {
    return new Date().toISOString().slice(0, 10);
}

function loadDailyChallenge() {
    let daily;

    try {
        daily = JSON.parse(localStorage.getItem("racingDailyChallenge"));
    } catch {
        daily = null;
    }

    if (!daily || daily.date !== getDailyKey()) {
        daily = {
            date: getDailyKey(),
            target: 5,
            progress: 0,
            claimed: false
        };

        try {
            localStorage.setItem("racingDailyChallenge", JSON.stringify(daily));
        } catch {}
    }

    return daily;
}

let dailyChallenge = loadDailyChallenge();

function updateDailyChallenge() {
    const progress = Math.min(
        dailyChallenge.target,
        dailyChallenge.progress
    );

    $("dailyProgressFill").style.width =
        `${(progress / dailyChallenge.target) * 100}%`;

    $("dailyProgressText").textContent =
        `${progress} / ${dailyChallenge.target}`;

    $("dailyClaimBtn").disabled =
        progress < dailyChallenge.target || dailyChallenge.claimed;

    $("dailyStatus").textContent = dailyChallenge.claimed
        ? "تم استلام مكافأة اليوم ✓"
        : progress >= dailyChallenge.target
            ? "أحسنت! يمكنك استلام المكافأة."
            : "اجمع العملات لإكمال التحدي.";
}

function saveDailyChallenge() {
    try {
        localStorage.setItem(
            "racingDailyChallenge",
            JSON.stringify(dailyChallenge)
        );
    } catch {}

    updateDailyChallenge();
}

$("dailyClaimBtn").addEventListener("click", () => {
    if (dailyChallenge.claimed) return;
    if (dailyChallenge.progress < dailyChallenge.target) return;

    dailyChallenge.claimed = true;
    save.coins += 150;

    saveGame();
    saveDailyChallenge();
    updateHeader();

    alert("مبروك! حصلت على 150 عملة.");
});

// ===============================
// 26. تحديث التحدي عند جمع العملات
// ===============================

const originalCollectCoin = collectCoin;

collectCoin = function (coin) {
    originalCollectCoin(coin);

    dailyChallenge.progress = Math.min(
        dailyChallenge.target,
        dailyChallenge.progress + 1
    );

    saveDailyChallenge();
};

// ===============================
// 27. إعدادات الصوت
// ===============================

$("soundToggle").addEventListener("click", () => {
    gameSoundEnabled = !gameSoundEnabled;

    $("soundToggle").textContent = gameSoundEnabled
        ? "🔊 الصوت: تشغيل"
        : "🔇 الصوت: إيقاف";
});

// ===============================
// 28. اللعب الجماعي - المساعدة
// ===============================

function setMultiplayerStatus(message, error = false) {
    const status = $("multiplayerStatus");
    if (!status) return;

    status.textContent = message;
    status.classList.toggle("error", error);
}

function setMultiplayerButtons(enabled) {
    $("startMultiplayerBtn").disabled = !enabled;
    $("leaveMultiplayerBtn").disabled = !enabled;
}

function renderMultiplayerPlayers(room) {
    const container = $("multiplayerPlayers");
    if (!container) return;

    container.innerHTML = "";

    if (!room || !room.players) return;

    const players = Object.values(room.players);

    players.forEach((player, index) => {
        const row = document.createElement("div");
        row.className = "mp-player";

        const name = document.createElement("span");
        name.textContent = `${index + 1}. ${player.name || "متسابق"}`;

        const state = document.createElement("strong");
        state.textContent = player.finished ? "أنهى السباق ✓" : "في الغرفة";

        row.append(name, state);
        container.appendChild(row);
    });
}

function stopWatchingRoom() {
    if (typeof multiplayerUnsubscribe === "function") {
        multiplayerUnsubscribe();
    }

    multiplayerUnsubscribe = null;
}

function clearMultiplayerState() {
    stopWatchingRoom();

    multiplayerRoomCode = null;
    multiplayerUid = null;
    multiplayerRoomData = null;
    multiplayerStarted = false;
    multiplayerFinishing = false;

    setMultiplayerButtons(false);

    const container = $("multiplayerPlayers");
    if (container) container.innerHTML = "";

    setMultiplayerStatus("لست داخل غرفة أونلاين.");
}

function handleRoomUpdate(room) {
    multiplayerRoomData = room;

    if (!room) {
        setMultiplayerStatus("الغرفة لم تعد موجودة.", true);
        clearMultiplayerState();
        return;
    }

    renderMultiplayerPlayers(room);

    const players = Object.values(room.players || {});
    const isHost = room.hostUid === multiplayerUid;

    setMultiplayerButtons(true);

    if (room.status === "waiting") {
        setMultiplayerStatus(
            `كود الغرفة: ${multiplayerRoomCode} | اللاعبون: ${players.length}/${room.maxPlayers}`
        );

        $("startMultiplayerBtn").disabled =
            !isHost || players.length < 2;

        $("startMultiplayerBtn").textContent = isHost
            ? "🚦 ابدأ السباق الجماعي"
            : "بانتظار منشئ الغرفة";
    }

    if (room.status === "racing") {
        setMultiplayerStatus(
            `السباق الجماعي بدأ! كود الغرفة: ${multiplayerRoomCode}`
        );

        $("startMultiplayerBtn").disabled = true;

        if (!multiplayerStarted) {
            multiplayerStarted = true;
            multiplayerStartingFromRoom = true;
            startGame();
            multiplayerStartingFromRoom = false;
        }
    }

    if (room.status === "finished") {
        setMultiplayerStatus("انتهى السباق الجماعي.");
        $("startMultiplayerBtn").disabled = true;
    }
}

function watchMultiplayerRoom(code) {
    stopWatchingRoom();

    multiplayerUnsubscribe = window.racingOnlineDB.watchRoom(
        code,
        handleRoomUpdate
    );
}

// ===============================
// 29. إنشاء غرفة جماعية
// ===============================

async function createMultiplayerRoom(maxPlayers) {
    if (multiplayerRoomCode) {
        alert("أنت داخل غرفة بالفعل. غادرها أولًا.");
        return;
    }

    const playerName = $("playerNameInput").value.trim() || "متسابق";

    setMultiplayerStatus("جاري إنشاء الغرفة... برجاء الانتظار.");
    setMultiplayerButtons(false);

    try {
        const result = await window.racingOnlineDB.createRoom(
            maxPlayers,
            playerName
        );

        multiplayerRoomCode = result.code;
        multiplayerUid = result.uid;

        setMultiplayerStatus(
            `تم إنشاء الغرفة بنجاح! كود الغرفة: ${result.code}`
        );

        watchMultiplayerRoom(result.code);
    } catch (error) {
        console.error("خطأ إنشاء الغرفة:", error);

        setMultiplayerStatus(
            error.message || "تعذر إنشاء الغرفة. حاول مرة أخرى.",
            true
        );

        alert(
            "تعذر إنشاء الغرفة:\n" +
            (error.message || "تحقق من اتصال الإنترنت وإعدادات Firebase.")
        );
    }
}

$("createDuoRoom").addEventListener("click", () => {
    createMultiplayerRoom(2);
});

$("createQuadRoom").addEventListener("click", () => {
    createMultiplayerRoom(4);
});

// ===============================
// 30. الانضمام إلى غرفة
// ===============================

async function joinMultiplayerRoom() {
    if (multiplayerRoomCode) {
        alert("أنت داخل غرفة بالفعل. غادرها أولًا.");
        return;
    }

    const code = $("joinRoomCode").value.trim().toUpperCase();

    if (!/^[A-HJ-NP-Z2-9]{6}$/.test(code)) {
        alert("اكتب كود الغرفة الصحيح المكون من 6 أحرف أو أرقام.");
        return;
    }

    const playerName = $("playerNameInput").value.trim() || "متسابق";

    setMultiplayerStatus("جاري الانضمام إلى الغرفة...");
    setMultiplayerButtons(false);

    try {
        const result = await window.racingOnlineDB.joinRoom(
            code,
            playerName
        );

        multiplayerRoomCode = result.code;
        multiplayerUid = result.uid;

        setMultiplayerStatus(`تم الانضمام إلى الغرفة ${code} بنجاح.`);

        watchMultiplayerRoom(code);
    } catch (error) {
        console.error("خطأ الانضمام إلى الغرفة:", error);

        setMultiplayerStatus(
            error.message || "تعذر الانضمام إلى الغرفة.",
            true
        );

        alert(
            "تعذر الانضمام:\n" +
            (error.message || "تحقق من كود الغرفة والاتصال.")
        );
    }
}

$("joinRoomBtn").addEventListener("click", joinMultiplayerRoom);

$("joinRoomCode").addEventListener("keydown", event => {
    if (event.key === "Enter") joinMultiplayerRoom();
});

// ===============================
// 31. بدء السباق الجماعي
// ===============================

$("startMultiplayerBtn").addEventListener("click", async () => {
    if (!multiplayerRoomCode || !multiplayerUid) return;

    try {
        await window.racingOnlineDB.startRoom(multiplayerRoomCode);
        setMultiplayerStatus("تم إرسال أمر بدء السباق. استعد!");
    } catch (error) {
        console.error("خطأ بدء السباق الجماعي:", error);
        alert(error.message || "تعذر بدء السباق الجماعي.");
    }
});

// ===============================
// 32. مغادرة الغرفة
// ===============================

$("leaveMultiplayerBtn").addEventListener("click", async () => {
    if (!multiplayerRoomCode || !multiplayerUid) return;

    const code = multiplayerRoomCode;
    const uid = multiplayerUid;

    try {
        stopWatchingRoom();

        await window.racingOnlineDB.leaveRoom(code, uid);

        clearMultiplayerState();

        setMultiplayerStatus("غادرت الغرفة بنجاح.");
    } catch (error) {
        console.error("خطأ مغادرة الغرفة:", error);

        alert("تعذر مغادرة الغرفة. حاول مرة أخرى.");
    }
});

// ===============================
// 33. التعامل مع إغلاق الصفحة
// ===============================

window.addEventListener("beforeunload", () => {
    stopWatchingRoom();
    stopTiltControl();
});

// ===============================
// 34. تهيئة اللعبة عند الفتح
// ===============================

function initializeGame() {
    updateHeader();
    displayShop();
    displayRecords();
    displayLevels();

    updateDailyChallenge();
    updateControlInterface();

    updateHeartsDisplay();
    updateAttemptsDisplay();

    setDifficulty($("difficultySelect").value);

    $("heroLevel").textContent = selectedLevel;
    $("shopCoins").textContent = save.coins.toLocaleString("en-US");

    $("playerNameInput").value = playerName;

    drawGame();

    setMultiplayerButtons(false);

    if (playerName) {
        racers[0].name = playerName;
    }
}

initializeGame();

// فتح الصفحة الرئيسية عند تشغيل الموقع
showPage("homePage");