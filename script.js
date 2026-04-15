
/* ===== LOGIN FUNCTION ===== */
function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    // users demo
    const users = [
        { user: "admin", pass: "1234" },
        { user: "user", pass: "1111" }
    ];

    const found = users.find(u => u.user === username && u.pass === password);

    if (found) {

        localStorage.setItem("login", "true");
        localStorage.setItem("user", username);

        showApp();

    } else {
        msg.style.color = "red";
        msg.innerText = "اسم المستخدم أو كلمة المرور خطأ ❌";
    }
}

/* ===== SHOW APP ===== */
function showApp() {

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";

    document.getElementById("welcome").innerText =
        "أهلاً " + localStorage.getItem("user");
}

/* ===== LOGOUT ===== */
function logout() {
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    location.reload();
}

/* ===== AUTO LOGIN CHECK ===== */
window.onload = function () {
    if (localStorage.getItem("login") === "true") {
        showApp();
    }
};
