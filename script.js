/* LOGIN */
function login(){
let u = username.value.trim();
let p = password.value.trim();

if(u === "admin" && p === "1234"){
    localStorage.setItem("login","true");
    localStorage.setItem("user",u);
    showApp();
}else{
    msg.innerText="❌ خطأ في البيانات";
}
}

function showApp(){
loginPage.classList.add("hidden");
app.classList.remove("hidden");

welcome.innerText="👋 أهلاً " + localStorage.getItem("user");

showSection("home");

renderTasks();
renderHomeworks();
renderNotes();
}

function logout(){
localStorage.clear();
location.reload();
}

function showSection(id){
document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

/* TASKS */
function addTask(){
let text = taskInput.value.trim();
if(!text) return;

let arr = JSON.parse(localStorage.getItem("tasks")||"[]");
arr.push(text);
localStorage.setItem("tasks",JSON.stringify(arr));

taskInput.value="";
renderTasks();
}

function renderTasks(){
taskList.innerHTML="";
let arr = JSON.parse(localStorage.getItem("tasks")||"[]");

arr.forEach((t,i)=>{
let li=document.createElement("li");

let span=document.createElement("span");
span.innerText="✅ "+t;

let e=document.createElement("button");
e.innerText="✏️";
e.onclick=()=>{
let n=prompt("تعديل:",t);
if(n){
arr[i]=n;
localStorage.setItem("tasks",JSON.stringify(arr));
renderTasks();
}
};

let d=document.createElement("button");
d.innerText="❌";
d.onclick=()=>{
arr.splice(i,1);
localStorage.setItem("tasks",JSON.stringify(arr));
renderTasks();
};

li.append(span,e,d);
taskList.appendChild(li);
});
}

/* HOMEWORKS */
function addHomework(){
let text = hwInput.value.trim();
if(!text) return;

let arr = JSON.parse(localStorage.getItem("homeworks")||"[]");
arr.push(text);
localStorage.setItem("homeworks",JSON.stringify(arr));

hwInput.value="";
renderHomeworks();
}

function renderHomeworks(){
hwList.innerHTML="";
let arr = JSON.parse(localStorage.getItem("homeworks")||"[]");

arr.forEach((t,i)=>{
let li=document.createElement("li");

let span=document.createElement("span");
span.innerText="📚 "+t;

let e=document.createElement("button");
e.innerText="✏️";
e.onclick=()=>{
let n=prompt("تعديل:",t);
if(n){
arr[i]=n;
localStorage.setItem("homeworks",JSON.stringify(arr));
renderHomeworks();
}
};

let d=document.createElement("button");
d.innerText="❌";
d.onclick=()=>{
arr.splice(i,1);
localStorage.setItem("homeworks",JSON.stringify(arr));
renderHomeworks();
};

li.append(span,e,d);
hwList.appendChild(li);
});
}

/* NOTES */
function addNote(){
let text = noteInput.value.trim();
if(!text) return;

let arr = JSON.parse(localStorage.getItem("notes")||"[]");
arr.push(text);
localStorage.setItem("notes",JSON.stringify(arr));

noteInput.value="";
renderNotes();
}

function renderNotes(){
notesList.innerHTML="";
let arr = JSON.parse(localStorage.getItem("notes")||"[]");

arr.forEach((t,i)=>{
let li=document.createElement("li");

let span=document.createElement("span");
span.innerText="📝 "+t;

let e=document.createElement("button");
e.innerText="✏️";
e.onclick=()=>{
let n=prompt("تعديل:",t);
if(n){
arr[i]=n;
localStorage.setItem("notes",JSON.stringify(arr));
renderNotes();
}
};

let d=document.createElement("button");
d.innerText="❌";
d.onclick=()=>{
arr.splice(i,1);
localStorage.setItem("notes",JSON.stringify(arr));
renderNotes();
};

li.append(span,e,d);
notesList.appendChild(li);
});
}

/* CLEAR */
function clearList(id){
if(id==="taskList") localStorage.removeItem("tasks");
if(id==="hwList") localStorage.removeItem("homeworks");
if(id==="notesList") localStorage.removeItem("notes");

document.getElementById(id).innerHTML="";
}

/* AUTO LOGIN */
window.onload=()=>{
if(localStorage.getItem("login")==="true"){
showApp();
}
};
