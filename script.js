/* LOGIN */
function login(){

let u = document.getElementById("username").value.trim();
let p = document.getElementById("password").value.trim();

if(u === "admin" && p === "1234"){

    localStorage.setItem("login","true");
    localStorage.setItem("user",u);

    showApp();

}else{
    document.getElementById("msg").innerText="❌ خطأ في البيانات";
}
}

/* SHOW APP */
function showApp(){
document.getElementById("loginPage").classList.add("hidden");
document.getElementById("app").classList.remove("hidden");

document.getElementById("welcome").innerText="👋 أهلاً " + localStorage.getItem("user");

showSection("home");

renderTasks();
renderHomeworks();
renderNotes();
}

/* LOGOUT */
function logout(){
localStorage.clear();
location.reload();
}

/* NAVIGATION */
function showSection(id){
document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

/* TASKS */
function addTask(btn){
animate(btn);

let i = document.getElementById("taskInput");
let text = i.value.trim();

if(!text){
    alert("اكتب مهمة الأول");
    return;
}

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

tasks.push(text);

localStorage.setItem("tasks", JSON.stringify(tasks));

renderTasks();

i.value="";
}

function renderTasks(){
let list = document.getElementById("taskList");
list.innerHTML="";

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

tasks.forEach((t,index)=>{
    let li = document.createElement("li");
    li.innerText = "✅ " + t;

    li.onclick = () => {
        tasks.splice(index,1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    };

    list.appendChild(li);
});
}

/* HOMEWORKS */
function addHomework(btn){
animate(btn);

let i = document.getElementById("hwInput");
let text = i.value.trim();

if(!text){
    alert("اكتب واجب الأول");
    return;
}

let hw = JSON.parse(localStorage.getItem("homeworks") || "[]");

hw.push(text);

localStorage.setItem("homeworks", JSON.stringify(hw));

renderHomeworks();

i.value="";
}

function renderHomeworks(){
let list = document.getElementById("hwList");
list.innerHTML="";

let hw = JSON.parse(localStorage.getItem("homeworks") || "[]");

hw.forEach((h,index)=>{
    let li = document.createElement("li");
    li.innerText = "📚 " + h;

    li.onclick = () => {
        hw.splice(index,1);
        localStorage.setItem("homeworks", JSON.stringify(hw));
        renderHomeworks();
    };

    list.appendChild(li);
});
}

/* NOTES */
function addNote(btn){
animate(btn);

let i = document.getElementById("noteInput");
let text = i.value.trim();

if(!text){
    alert("اكتب ملاحظة");
    return;
}

let notes = JSON.parse(localStorage.getItem("notes") || "[]");

notes.push(text);

localStorage.setItem("notes", JSON.stringify(notes));

renderNotes();

i.value="";
}

function renderNotes(){
let list = document.getElementById("notesList");
list.innerHTML="";

let notes = JSON.parse(localStorage.getItem("notes") || "[]");

notes.forEach((n,index)=>{
    let li = document.createElement("li");
    li.innerText = "📝 " + n;

    li.onclick = () => {
        notes.splice(index,1);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
    };

    list.appendChild(li);
});
}

/* CLEAR */
function clearList(id){

if(id === "taskList"){
    localStorage.removeItem("tasks");
}
if(id === "hwList"){
    localStorage.removeItem("homeworks");
}
if(id === "notesList"){
    localStorage.removeItem("notes");
}

document.getElementById(id).innerHTML="";
}

/* ANIMATION */
function animate(el){
el.style.transform="scale(0.9)";
setTimeout(()=>el.style.transform="scale(1)",150);
}

/* AUTO LOGIN */
window.onload = function(){
if(localStorage.getItem("login") === "true"){
    showApp();
}
};
