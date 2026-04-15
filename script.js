function login(btn){

animate(btn);

let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

if(u==="admin" && p==="1234"){
localStorage.setItem("login","true");
showApp();
}else{
document.getElementById("msg").innerText="❌ خطأ في البيانات";
}
}

function showApp(){
document.getElementById("loginPage").classList.add("hidden");
document.getElementById("app").classList.remove("hidden");

document.getElementById("welcome").innerText="👋 أهلاً "+localStorage.getItem("user");

showSection("home");
}

function logout(){
localStorage.clear();
location.reload();
}

function showSection(id){
document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

/* ADD TASK */
function addTask(btn){
animate(btn);
let input=document.getElementById("taskInput");
if(!input.value)return;

let li=document.createElement("li");
li.innerText="✅ "+input.value;

document.getElementById("taskList").appendChild(li);
input.value="";
}

/* ADD HOMEWORK */
function addHomework(btn){
animate(btn);
let input=document.getElementById("hwInput");
if(!input.value)return;

let li=document.createElement("li");
li.innerText="📚 "+input.value;

document.getElementById("hwList").appendChild(li);
input.value="";
}

/* ADD NOTE */
function addNote(btn){
animate(btn);
let input=document.getElementById("noteInput");
if(!input.value)return;

let li=document.createElement("li");
li.innerText="📝 "+input.value;

document.getElementById("notesList").appendChild(li);
input.value="";
}

/* CLEAR LIST */
function clearList(id){
document.getElementById(id).innerHTML="";
}

/* ANIMATION CLICK */
function animate(el){
el.style.transform="scale(0.9)";
setTimeout(()=>el.style.transform="scale(1)",150);
}
