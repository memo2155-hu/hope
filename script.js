
/* ================= LOGIN ================= */
function login() {

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    if (user === "admin" && pass === "1234") {

        localStorage.setItem("login", "true");
        localStorage.setItem("user", user);

        showApp();

    } else {
        msg.innerText = "بيانات غير صحيحة ❌";
    }
}

/* ================= SHOW APP ================= */
function showApp() {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    document.getElementById("welcome").innerText =
        "مرحباً " + localStorage.getItem("user") + " 👋";
}

/* ================= LOGOUT ================= */
function logout() {
    localStorage.clear();
    location.reload();
}

/* ================= NAV ================= */
function showSection(id) {

    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");
}

/* ================= TASKS ================= */
function addTask() {
    const input = document.getElementById("taskInput");
    const list = document.getElementById("taskList");

    if (input.value === "") return;

    const li = document.createElement("li");
    li.innerText = input.value;

    list.appendChild(li);
    input.value = "";
}

/* ================= HOMEWORKS ================= */
function addHomework() {
    const input = document.getElementById("hwInput");
    const list = document.getElementById("hwList");

    if (input.value === "") return;

    const li = document.createElement("li");
    li.innerText = input.value;

    list.appendChild(li);
    input.value = "";
}

/* ================= NOTES ================= */
function addNote() {
    const input = document.getElementById("noteInput");
    const list = document.getElementById("notesList");

    if (input.value === "") return;

    const div = document.createElement("li");
    div.innerText = input.value;

    list.appendChild(div);
    input.value = "";
}

/* ================= AUTO LOGIN ================= */
window.onload = function () {
    if (localStorage.getItem("login") === "true") {
        showApp();
    }
};
