const users={
mariem:"1234",
nada:"1234",
ahmed:"1234",
adham:"1234",
rahma:"1234"
};

function key(type){
return "user_"+localStorage.getItem("user")+"_"+type;
}

function login(){
let u=username.value.toLowerCase();
let p=password.value;

if(users[u] && users[u]===p){
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

let u=localStorage.getItem("user");
welcome.innerText="Welcome "+u;

showSection("home");

renderTasks();
renderHomeworks();
renderNotes();
updateStats();
drawChart();
updateRanking();
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

let arr=JSON.parse(localStorage.getItem(key("tasks"))||"[]");
arr.push({text:t,date:new Date().toLocaleDateString()});

localStorage.setItem(key("tasks"),JSON.stringify(arr));
taskInput.value="";
renderTasks();
updateStats();
}

function renderTasks(){
taskList.innerHTML="";
let arr=JSON.parse(localStorage.getItem(key("tasks"))||"[]");
let search=(searchTask.value||"").toLowerCase();

arr.forEach((item,i)=>{
if(!item.text.toLowerCase().includes(search))return;

let li=document.createElement("li");

let span=document.createElement("span");
span.innerHTML=item.text+" ("+item.date+")";

let e=document.createElement("button");
e.innerText="Edit";
e.onclick=()=>{
let n=prompt("Edit",item.text);
if(n){
arr[i].text=n;
localStorage.setItem(key("tasks"),JSON.stringify(arr));
renderTasks();updateStats();
}
};

let d=document.createElement("button");
d.innerText="Delete";
d.onclick=()=>{
arr.splice(i,1);
localStorage.setItem(key("tasks"),JSON.stringify(arr));
renderTasks();updateStats();
};

li.append(span,e,d);
taskList.appendChild(li);
});
}

/* HOMEWORKS */
function addHomework(){
let t=hwInput.value.trim();
if(!t)return;

let arr=JSON.parse(localStorage.getItem(key("homeworks"))||"[]");
arr.push(t);
localStorage.setItem(key("homeworks"),JSON.stringify(arr));

hwInput.value="";
renderHomeworks();
updateStats();
}

function renderHomeworks(){
hwList.innerHTML="";
let arr=JSON.parse(localStorage.getItem(key("homeworks"))||"[]");

arr.forEach((t,i)=>{
let li=document.createElement("li");

let span=document.createElement("span");
span.innerText=t;

let e=document.createElement("button");
e.innerText="Edit";
e.onclick=()=>{
let n=prompt("Edit",t);
if(n){
arr[i]=n;
localStorage.setItem(key("homeworks"),JSON.stringify(arr));
renderHomeworks();updateStats();
}
};

let d=document.createElement("button");
d.innerText="Delete";
d.onclick=()=>{
arr.splice(i,1);
localStorage.setItem(key("homeworks"),JSON.stringify(arr));
renderHomeworks();updateStats();
};

li.append(span,e,d);
hwList.appendChild(li);
});
}

/* NOTES */
function addNote(){
let t=noteInput.value.trim();
if(!t)return;

let arr=JSON.parse(localStorage.getItem(key("notes"))||"[]");
arr.push(t);
localStorage.setItem(key("notes"),JSON.stringify(arr));

noteInput.value="";
renderNotes();
updateStats();
}

function renderNotes(){
notesList.innerHTML="";
let arr=JSON.parse(localStorage.getItem(key("notes"))||"[]");

arr.forEach((t,i)=>{
let li=document.createElement("li");

let span=document.createElement("span");
span.innerText=t;

let e=document.createElement("button");
e.innerText="Edit";
e.onclick=()=>{
let n=prompt("Edit",t);
if(n){
arr[i]=n;
localStorage.setItem(key("notes"),JSON.stringify(arr));
renderNotes();updateStats();
}
};

let d=document.createElement("button");
d.innerText="Delete";
d.onclick=()=>{
arr.splice(i,1);
localStorage.setItem(key("notes"),JSON.stringify(arr));
renderNotes();updateStats();
};

li.append(span,e,d);
notesList.appendChild(li);
});
}

/* STATS */
function updateStats(){
taskCount.innerText="Tasks: "+JSON.parse(localStorage.getItem(key("tasks"))||"[]").length;
hwCount.innerText="Homeworks: "+JSON.parse(localStorage.getItem(key("homeworks"))||"[]").length;
noteCount.innerText="Notes: "+JSON.parse(localStorage.getItem(key("notes"))||"[]").length;
drawChart();
updateRanking();
}

/* CHART */
let chart;
function drawChart(){
let t=JSON.parse(localStorage.getItem(key("tasks"))||"[]").length;
let h=JSON.parse(localStorage.getItem(key("homeworks"))||"[]").length;
let n=JSON.parse(localStorage.getItem(key("notes"))||"[]").length;

let ctx=document.getElementById("chart").getContext("2d");
if(chart)chart.destroy();

chart=new Chart(ctx,{
type:"bar",
data:{
labels:["Tasks","Homeworks","Notes"],
datasets:[{data:[t,h,n]}]
}
});
}

/* RANKING */
function updateRanking(){
let names=["mariem","nada","ahmed","adham","rahma"];

let data=names.map(n=>{
let t=JSON.parse(localStorage.getItem("user_"+n+"_tasks")||"[]");
return {name:n,score:t.length};
});

data.sort((a,b)=>b.score-a.score);

let txt="🏆 Ranking<br>";
data.forEach((u,i)=>{
txt+=(i+1)+"."+u.name+"("+u.score+")<br>";
});

ranking.innerHTML=txt;
}

/* PASSWORD */
function changePassword(){
let u=localStorage.getItem("user");

let old=prompt("Old password");
if(users[u]!==old){
alert("Wrong");
return;
}

let np=prompt("New password");
users[u]=np;

alert("Updated");
}

/* CLEAR */
function clearList(type){
localStorage.removeItem(key(type));
renderTasks();renderHomeworks();renderNotes();
updateStats();
}

/* DARK */
function toggleDarkMode(){
document.body.classList.toggle("dark");
}

/* AUTO */
window.onload=()=>{
if(localStorage.getItem("login")) showApp();
};
