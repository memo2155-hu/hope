// وظائف الوصول (Accessibility)
function toggleDark() { document.body.classList.toggle("dark"); }
function toggleContrast() { document.body.classList.toggle("high-contrast"); }
function increaseText() { document.body.classList.toggle("large-text"); }

function speak() {
    window.speechSynthesis.cancel();
    const text = document.querySelector('main').innerText;
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'ar-SA';
    window.speechSynthesis.speak(msg);
}

// وظائف تسجيل الدخول (Modal)
function openLogin() { 
    const modal = document.getElementById("loginModal");
    modal.style.display = "block"; 
    // إضافة تأخير بسيط لتفعيل حركة الـ Fade In الخاصة بالـ CSS
    setTimeout(() => modal.style.opacity = "1", 10);
}

function closeLogin() { 
    const modal = document.getElementById("loginModal");
    modal.style.opacity = "0";
    // الانتظار حتى تنتهي الحركة قبل إخفاء العنصر تماماً
    setTimeout(() => modal.style.display = "none", 400);
}

// إغلاق النافذة عند الضغط خارجها
window.onclick = function(event) {
    if (event.target == document.getElementById("loginModal")) { closeLogin(); }
}

// فلترة الخدمات بالبحث
function filterServices() {
    let input = document.getElementById('serviceSearch').value.toLowerCase();
    let services = document.getElementsByClassName('service-item');
    for (let service of services) {
        let text = service.innerText.toLowerCase();
        service.style.display = text.includes(input) ? "block" : "none";
    }
}

// معالجة النماذج (Forms)
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    alert("تم تسجيل الدخول بنجاح!");
    closeLogin();
}

document.getElementById('contactForm').onsubmit = function(e) {
    e.preventDefault();
    alert("شكراً لتواصلك معنا، سنرد عليك قريباً.");
    this.reset();
}

// --- إضافة حركة الظهور عند التمرير (Scroll Animation) ---

// تحديد العناصر التي نريد تحريكها
const scrollElements = document.querySelectorAll('.card, .grid, header');

// دالة للتحقق مما إذا كان العنصر في مجال الرؤية
const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

// دالة لإضافة فئة الحركة
const displayScrollElement = (element) => {
  element.classList.add('animate-in');
};

// الدالة الرئيسية للتحكم بالحركة
const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    }
  })
}

// إضافة فئة CSS المبدئية للعناصر قبل التمرير
scrollElements.forEach(el => el.classList.add('animate-on-scroll'));

// تشغيل الدالة عند التمرير
window.addEventListener('scroll', () => { 
  handleScrollAnimation();
});

// تشغيل الدالة مرة واحدة عند تحميل الصفحة لإظهار العناصر المرئية بالفعل
handleScrollAnimation();
