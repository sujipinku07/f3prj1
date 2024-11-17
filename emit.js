const addButton = document.getElementById("add-timer-btn");
const timersList = document.getElementById("timers-list");
const activeTimersDisplay = document.querySelector(".active-timers-display");
const noTimersText = document.querySelector("#no-timer-text");

let activeTimers = [];

// Add new timer
addButton.addEventListener("click", () => {
    const hours = parseInt(document.querySelector("#set-hours").value) || 0;
    const minutes = parseInt(document.querySelector("#set-minutes").value) || 0;
    const seconds = parseInt(document.querySelector("#set-seconds").value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert("Set a valid time!");
        return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const newTimer = {
        id: Date.now(),
        timeLeft: totalSeconds,
        interval: null,
        alarm: new Audio(c:\Users\sujipinky\Downloads\Hey Minnale.mp3),
    };

    activeTimers.push(newTimer);
    addTimerToDOM(newTimer);

    activeTimersDisplay.style.display = "block";
    noTimersText.style.display = "none";
});

// Add timer to DOM
function addTimerToDOM(timer) {
    const timerElement = document.createElement("li");
    timerElement.classList.add("timer-card");
    timerElement.setAttribute("data-id", timer.id);

    timerElement.innerHTML = `
        <span id="remaining-time">Time Remaining:</span>
        <span class="timer-display">${formatTime(timer.timeLeft)}</span>
        <div class="timer-controls">
            <button class="stop-timer-btn">Remove</button>
        </div>
    `;

    timersList.appendChild(timerElement);

    timer.interval = setInterval(() => {
        timer.timeLeft--;

        if (timer.timeLeft <= 0) {
            clearInterval(timer.interval);
            onTimerEnd(timer.id);
        } else {
            updateTimerDisplay(timer.id, timer.timeLeft);
        }
    }, 1000);

    timerElement.querySelector(".stop-timer-btn").addEventListener("click", () => removeTimer(timer.id));
}

// Update timer display
function updateTimerDisplay(timerId, timeLeft) {
    const timerElement = document.querySelector(.timer-card[data-id="${timerId}"]);
    if (timerElement) {
        timerElement.querySelector(".timer-display").textContent = formatTime(timeLeft);
    }
}

// Timer ends
function onTimerEnd(timerId) {
    const timer = activeTimers.find((t) => t.id === timerId);
    const timerElement = document.querySelector(.timer-card[data-id="${timerId}"]);

    if (timerElement) {
        timerElement.classList.add("timer-card-ended");
        timerElement.querySelector(".timer-display").textContent = "Finished!";
        timerElement.style.backgroundColor = "#f0f757";

        if (timer) {
            timer.alarm.play();
        }
    }
}

// Remove timer
function removeTimer(timerId) {
    const timerIndex = activeTimers.findIndex((t) => t.id === timerId);
    if (timerIndex !== -1) {
        const timer = activeTimers[timerIndex];
        clearInterval(timer.interval);

        const timerElement = document.querySelector(.timer-card[data-id="${timerId}"]);
        if (timerElement) {
            timerElement.remove();
        }

        timer.alarm.pause();
        timer.alarm.currentTime = 0;

        activeTimers.splice(timerIndex, 1);

        if (activeTimers.length === 0) {
            activeTimersDisplay.style.display = "none";
            noTimersText.style.display = "block";
        }
    }
}

// Format time in hh:mm:ss
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")};
}