
/* USERS DATABASE */
const users = {
mariem: "1234",
nada: "1234",
ahmed: "1234",
adham: "1234",
rahma: "1234"
};

/* LOGIN */
function login(){

let u = username.value.trim().toLowerCase();
let p = password.value.trim();

if(users[u] && users[u] === p){

localStorage.setItem("login","true");
localStorage.setItem("user",u);

showApp();

}else{
msg.innerText="❌ Invalid username or password";
}
}

/* GET USER KEY */
function key(type){
let user = localStorage.getItem("user");
return "user_" + user + "_" + type;
}

/* SHOW APP */
function showApp(){

loginPage.classList.add("hidden");
app.classList.remove("hidden");

let user = localStorage.getItem("user");

welcome.innerText =
"👋 Welcome " + user.charAt(0).toUpperCase() + user.slice(1);

showSection("home");

renderTasks();
renderHomeworks();
renderNotes();
updateStats();
drawChart();
}

/* LOGOUT */
function logout(){
localStorage.clear();
location.reload();
}

/* NAV */
function showSection(id){
document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

/* ================= TASKS ================= */
function addTask(){

let t = taskInput.value.trim();
if(!t) return;

let arr = JSON.parse(localStorage.getItem(key("tasks"))||"[]");

arr.push({
text:t,
date:new Date().toLocaleDateString()
});

localStorage.setItem(key("tasks"),JSON.stringify(arr));

taskInput.value="";
renderTasks();
updateStats();
drawChart();
}

function renderTasks(){

taskList.innerHTML="";

let arr = JSON.parse(localStorage.getItem(key("tasks"))||"[]");

arr.forEach((item,i)=>{

let li=document.createElement("li");

let span=document.createElement("span");
span.innerHTML="✔ "+item.text+" <small>("+item.date+")</small>";

let edit=document.createElement("button");
edit.innerText="Edit";
edit.onclick=()=>{

let n=prompt("Edit task",item.text);

if(n){
arr[i].text=n;
localStorage.setItem(key("tasks"),JSON.stringify(arr));
renderTasks();
updateStats();
drawChart();
}

};

let del=document.createElement("button");
del.innerText="Delete";
del.onclick=()=>{

arr.splice(i,1);
localStorage.setItem(key("tasks"),JSON.stringify(arr));
renderTasks();
updateStats();
drawChart();

};

li.append(span,edit,del);
taskList.appendChild(li);

});

}

/* ================= HOMEWORKS ================= */
function addHomework(){

let t = hwInput.value.trim();
if(!t) return;

let arr = JSON.parse(localStorage.getItem(key("homeworks"))||"[]");

arr.push(t);

localStorage.setItem(key("homeworks"),JSON.stringify(arr));

hwInput.value="";
renderHomeworks();
updateStats();
drawChart();

}

function renderHomeworks(){

hwList.innerHTML="";

let arr = JSON.parse(localStorage.getItem(key("homeworks"))||"[]");

arr.forEach((t,i)=>{

let li=document.createElement("li");

let span=document.createElement("span");
span.innerText="📚 "+t;

let edit=document.createElement("button");
edit.innerText="Edit";
edit.onclick=()=>{

let n=prompt("Edit homework",t);

if(n){
arr[i]=n;
localStorage.setItem(key("homeworks"),JSON.stringify(arr));
renderHomeworks();
updateStats();
drawChart();
}

};

let del=document.createElement("button");
del.innerText="Delete";
del.onclick=()=>{

arr.splice(i,1);
localStorage.setItem(key("homeworks"),JSON.stringify(arr));
renderHomeworks();
updateStats();
drawChart();

};

li.append(span,edit,del);
hwList.appendChild(li);

});

}

/* ================= NOTES ================= */
function addNote(){

let t = noteInput.value.trim();
if(!t) return;

let arr = JSON.parse(localStorage.getItem(key("notes"))||"[]");

arr.push(t);

localStorage.setItem(key("notes"),JSON.stringify(arr));

noteInput.value="";
renderNotes();
updateStats();
drawChart();

}

function renderNotes(){

notesList.innerHTML="";

let arr = JSON.parse(localStorage.getItem(key("notes"))||"[]");

arr.forEach((t,i)=>{

let li=document.createElement("li");

let span=document.createElement("span");
span.innerText="📝 "+t;

let edit=document.createElement("button");
edit.innerText="Edit";
edit.onclick=()=>{

let n=prompt("Edit note",t);

if(n){
arr[i]=n;
localStorage.setItem(key("notes"),JSON.stringify(arr));
renderNotes();
updateStats();
drawChart();
}

};

let del=document.createElement("button");
del.innerText="Delete";
del.onclick=()=>{

arr.splice(i,1);
localStorage.setItem(key("notes"),JSON.stringify(arr));
renderNotes();
updateStats();
drawChart();

};

li.append(span,edit,del);
notesList.appendChild(li);

});

}

/* ================= STATS ================= */
function updateStats(){

let t = JSON.parse(localStorage.getItem(key("tasks"))||"[]");
let h = JSON.parse(localStorage.getItem(key("homeworks"))||"[]");
let n = JSON.parse(localStorage.getItem(key("notes"))||"[]");

taskCount.innerText="Tasks: "+t.length;
hwCount.innerText="Homeworks: "+h.length;
noteCount.innerText="Notes: "+n.length;

}

/* ================= CHART ================= */
let myChart;

function drawChart(){

let t = JSON.parse(localStorage.getItem(key("tasks"))||"[]");
let h = JSON.parse(localStorage.getItem(key("homeworks"))||"[]");
let n = JSON.parse(localStorage.getItem(key("notes"))||"[]");

let ctx = document.getElementById("chart").getContext("2d");

if(myChart) myChart.destroy();

myChart = new Chart(ctx,{
type:"bar",
data:{
labels:["Tasks","Homeworks","Notes"],
datasets:[{
label:"Progress",
data:[t.length,h.length,n.length],
backgroundColor:["#00b4d8","#0077b6","#48cae4"]
}]
}
});

}

/* ================= CLEAR ================= */
function clearList(type){
localStorage.removeItem(key(type));
document.getElementById(type==="tasks"?"taskList":type==="homeworks"?"hwList":"notesList").innerHTML="";
}

/* ================= DARK MODE ================= */
function toggleDarkMode(){
document.body.classList.toggle("dark");
}

/* AUTO LOGIN */
window.onload=()=>{
if(localStorage.getItem("login")==="true"){
showApp();
}
};
