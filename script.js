
/* ===== LOGIN ===== */
function login() {

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    const users = [
        { user: "admin", pass: "1234" },
        { user: "sara", pass: "1111" }
    ];

    const found = users.find(u => u.user === user && u.pass === pass);

    if (found) {

        localStorage.setItem("login", "true");
        localStorage.setItem("user", user);

        showDashboard();

    } else {
        msg.innerText = "بيانات غير صحيحة ❌";
    }
}

/* ===== SHOW DASHBOARD ===== */
function showDashboard() {

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").classList.remove("hidden");

    document.getElementById("welcome").innerText =
        "أهلاً " + localStorage.getItem("user") + " 👋";
}

/* ===== LOGOUT ===== */
function logout() {
    localStorage.clear();
    location.reload();
}

/* ===== AUTO LOGIN ===== */
window.onload = function () {
    if (localStorage.getItem("login") === "true") {
        showDashboard();
    }
};
