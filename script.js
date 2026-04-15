const App = {

    init() {
        this.modal = document.getElementById("loginModal");
        this.search = document.getElementById("serviceSearch");

        this.search?.addEventListener("keyup", () => this.filterServices());
    },

    /* ===== UI ===== */

    toggleDark() {
        document.documentElement.classList.toggle("dark");
    },

    toggleContrast() {
        document.body.classList.toggle("high-contrast");
    },

    increaseText() {
        document.body.classList.toggle("large-text");
    },

    speak() {
        if (!window.speechSynthesis) return;

        const text = document.querySelector("main").innerText;
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = "ar-SA";

        window.speechSynthesis.speak(msg);
    },

    /* ===== Login ===== */

    openLogin() {
        this.modal.style.display = "block";
    },

    closeLogin() {
        this.modal.style.display = "none";
    },

    login() {
        this.closeLogin();
        alert("تم تسجيل الدخول بنجاح");
    },

    /* ===== Search ===== */

    filterServices() {
        const value = this.search.value.toLowerCase();

        document.querySelectorAll(".item").forEach(el => {
            el.style.display = el.innerText.toLowerCase().includes(value)
                ? "block"
                : "none";
        });
    }
};

/* تشغيل */
document.addEventListener("DOMContentLoaded", () => App.init());

/* إغلاق المودال خارج الصندوق */
window.addEventListener("click", (e) => {
    const modal = document.getElementById("loginModal");
    if (e.target === modal) modal.style.display = "none";
});
