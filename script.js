function login(btn){

let u=document.getElementById("username").value.trim();
let p=document.getElementById("password").value.trim();

console.log(u,p); // للتأكد

if(u==="admin" && p==="1234"){
    document.getElementById("loginPage").style.display="none";
    document.getElementById("app").style.display="block";
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
let i=document.getElementById("taskInput");
if(!i.value)return;

let li=document.createElement("li");
li.innerText="✅ "+i.value;
document.getElementById("taskList").appendChild(li);
i.value="";
}

/* ADD HOMEWORK */
function addHomework(btn){
animate(btn);
let i=document.getElementById("hwInput");
if(!i.value)return;

let li=document.createElement("li");
li.innerText="📚 "+i.value;
document.getElementById("hwList").appendChild(li);
i.value="";
}

/* ADD NOTE */
function addNote(btn){
animate(btn);
let i=document.getElementById("noteInput");
if(!i.value)return;

let li=document.createElement("li");
li.innerText="📝 "+i.value;
document.getElementById("notesList").appendChild(li);
i.value="";
}

/* CLEAR */
function clearList(id){
document.getElementById(id).innerHTML="";
}

/* ANIMATION */
function animate(el){
el.style.transform="scale(0.9)";
setTimeout(()=>el.style.transform="scale(1)",150);
}

/* AUTO LOGIN */
window.onload=function(){
if(localStorage.getItem("login")==="true"){
showApp();
}
};
