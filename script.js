
/* ===== LOGIN ===== */
function login(btn) {

    animate(btn);

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    const users = [
        { user: "admin", pass: "1234" }
    ];

    const found = users.find(u => u.user === user && u.pass === pass);

    if (found) {

        localStorage.setItem("login", "true");
        localStorage.setItem("user", user);

        showApp();

    } else {
        msg.innerText = "بيانات غير صحيحة ❌";
    }
}

/* ===== SHOW APP ===== */
function showApp() {

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    document.getElementById("welcome").innerText =
        "مرحباً " + localStorage.getItem("user") + " 👋";

    showSection("home");
}

/* ===== LOGOUT ===== */
function logout() {
    localStorage.clear();
    location.reload();
}

/* ===== NAV ===== */
function showSection(id, btn) {

    document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");

    if (btn) animate(btn);
}

/* ===== TASKS ===== */
function addTask(btn) {
    animate(btn);

    const input = document.getElementById("taskInput");
    if (!input.value) return;

    const li = document.createElement("li");
    li.innerText = "✅ " + input.value;

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}

/* ===== HOMEWORK ===== */
function addHomework(btn) {
    animate(btn);

    const input = document.getElementById("hwInput");
    if (!input.value) return;

    const li = document.createElement("li");
    li.innerText = "📚 " + input.value;

    document.getElementById("hwList").appendChild(li);

    input.value = "";
}

/* ===== NOTES ===== */
function addNote(btn) {
    animate(btn);

    const input = document.getElementById("noteInput");
    if (!input.value) return;

    const li = document.createElement("li");
    li.innerText = "📝 " + input.value;

    document.getElementById("notesList").appendChild(li);

    input.value = "";
}

/* ===== CLICK ANIMATION ===== */
function animate(el) {
    el.style.transform = "scale(0.9)";
    setTimeout(() => {
        el.style.transform = "scale(1)";
    }, 150);
}

/* ===== AUTO LOGIN ===== */
window.onload = function () {
    if (localStorage.getItem("login") === "true") {
        showApp();
    }
};
