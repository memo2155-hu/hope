function login(){
let u=username.value.trim();
let p=password.value.trim();

if(u==="admin" && p==="1234"){
localStorage.setItem("login","true");
localStorage.setItem("user",u);
showApp();
}else{
msg.innerText="❌ Invalid login";
}
}

function showApp(){
loginPage.classList.add("hidden");
app.classList.remove("hidden");

welcome.innerText="👋 Welcome " + localStorage.getItem("user");

showSection("home");

renderTasks();
renderHomeworks();
renderNotes();
updateStats();
drawChart();
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
let t=taskInput.value.trim();
if(!t)return;

let arr=JSON.parse(localStorage.getItem("tasks")||"[]");

arr.push({
text:t,
date:new Date().toLocaleDateString()
});

localStorage.setItem("tasks",JSON.stringify(arr));

taskInput.value="";
renderTasks();
updateStats();
drawChart();
}

function renderTasks(){
taskList.innerHTML="";
let arr=JSON.parse(localStorage.getItem("tasks")||"[]");

arr.forEach((item,i)=>{
let li=document.createElement("li");

let span=document.createElement("span");
span.innerHTML="✔ "+item.text+" <small>("+item.date+")</small>";

let e=document.createElement("button");
e.innerText="Edit";
e.onclick=()=>{
let n=prompt("Edit task",item.text);
if(n){
arr[i].text=n;
localStorage.setItem("tasks",JSON.stringify(arr));
renderTasks();
updateStats();
drawChart();
}
};

let d=document.createElement("button");
d.innerText="Delete";
d.onclick=()=>{
arr.splice(i,1);
localStorage.setItem("tasks",JSON.stringify(arr));
renderTasks();
updateStats();
drawChart();
};

li.append(span,e,d);
taskList.appendChild(li);
});
}

/* HOMEWORKS */
function addHomework(){
let t=hwInput.value.trim();
if(!t)return;

let arr=JSON.parse(localStorage.getItem("homeworks")||"[]");
arr.push(t);

localStorage.setItem("homeworks",JSON.stringify(arr));

hwInput.value="";
renderHomeworks();
updateStats();
drawChart();
}

function renderHomeworks(){
hwList.innerHTML="";
let arr=JSON.parse(localStorage.getItem("homeworks")||"[]");

arr.forEach((t,i)=>{
let li=document.createElement("li");

let span=document.createElement("span");
span.innerText="📚 "+t;

let e=document.createElement("button");
e.innerText="Edit";
e.onclick=()=>{
let n=prompt("Edit homework",t);
if(n){
arr[i]=n;
localStorage.setItem("homeworks",JSON.stringify(arr));
renderHomeworks();
updateStats();
drawChart();
}
};

let d=document.createElement("button");
d.innerText="Delete";
d.onclick=()=>{
arr.splice(i,1);
localStorage.setItem("homeworks",JSON.stringify(arr));
renderHomeworks();
updateStats();
drawChart();
};

li.append(span,e,d);
hwList.appendChild(li);
});
}

/* NOTES */
function addNote(){
let t=noteInput.value.trim();
if(!t)return;

let arr=JSON.parse(localStorage.getItem("notes")||"[]");
arr.push(t);

localStorage.setItem("notes",JSON.stringify(arr));

noteInput.value="";
renderNotes();
updateStats();
drawChart();
}

function renderNotes(){
notesList.innerHTML="";
let arr=JSON.parse(localStorage.getItem("notes")||"[]");

arr.forEach((t,i)=>{
let li=document.createElement("li");

let span=document.createElement("span");
span.innerText="📝 "+t;

let e=document.createElement("button");
e.innerText="Edit";
e.onclick=()=>{
let n=prompt("Edit note",t);
if(n){
arr[i]=n;
localStorage.setItem("notes",JSON.stringify(arr));
renderNotes();
updateStats();
drawChart();
}
};

let d=document.createElement("button");
d.innerText="Delete";
d.onclick=()=>{
arr.splice(i,1);
localStorage.setItem("notes",JSON.stringify(arr));
renderNotes();
updateStats();
drawChart();
};

li.append(span,e,d);
notesList.appendChild(li);
});
}

/* STATS */
function updateStats(){
let t=JSON.parse(localStorage.getItem("tasks")||"[]");
let h=JSON.parse(localStorage.getItem("homeworks")||"[]");
let n=JSON.parse(localStorage.getItem("notes")||"[]");

taskCount.innerText="Tasks: "+t.length;
hwCount.innerText="Homeworks: "+h.length;
noteCount.innerText="Notes: "+n.length;
}

/* CHART */
let myChart;

function drawChart(){

let t=JSON.parse(localStorage.getItem("tasks")||"[]");
let h=JSON.parse(localStorage.getItem("homeworks")||"[]");
let n=JSON.parse(localStorage.getItem("notes")||"[]");

let ctx=document.getElementById("chart").getContext("2d");

if(myChart) myChart.destroy();

myChart=new Chart(ctx,{
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

/* CLEAR */
function clearList(type){
localStorage.removeItem(type);
document.getElementById(type==="tasks"?"taskList":type==="homeworks"?"hwList":"notesList").innerHTML="";
}

/* DARK MODE */
function toggleDarkMode(){
document.body.classList.toggle("dark");
}

/* AUTO LOGIN */
window.onload=()=>{
if(localStorage.getItem("login")==="true"){
showApp();
}
};
