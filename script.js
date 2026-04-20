function key(type){
  return "user_"+localStorage.getItem("user")+"_"+type;
}

function showApp(){
  let u = localStorage.getItem("user") || "guest";
  welcome.innerText = "Welcome " + u;

  showSection("home");

  renderTasks();
  renderHomeworks();
  renderNotes();
  updateStats();
  drawChart();
}

function showSection(id){
  document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* TASKS */
function addTask(){
  let t = taskInput.value.trim();
  if(!t) return;

  let arr = JSON.parse(localStorage.getItem(key("tasks")) || "[]");
  arr.push({text:t,date:new Date().toLocaleDateString()});

  localStorage.setItem(key("tasks"), JSON.stringify(arr));
  taskInput.value="";
  renderTasks();
  updateStats();
}

function renderTasks(){
  taskList.innerHTML="";
  let arr = JSON.parse(localStorage.getItem(key("tasks")) || "[]");
  let search = (searchTask.value || "").toLowerCase();

  arr.forEach((item,i)=>{
    if(!item.text.toLowerCase().includes(search)) return;

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
}

/* CHART */
let chart;
function drawChart(){
  let t=JSON.parse(localStorage.getItem(key("tasks"))||"[]").length;
  let h=JSON.parse(localStorage.getItem(key("homeworks"))||"[]").length;
  let n=JSON.parse(localStorage.getItem(key("notes"))||"[]").length;

  let ctx=document.getElementById("chart").getContext("2d");
  if(chart) chart.destroy();

  chart=new Chart(ctx,{
    type:"doughnut",
    data:{
      labels:["Tasks","Homeworks","Notes"],
      datasets:[{
        data:[t,h,n],
        backgroundColor:["#4CAF50","#2196F3","#FF9800"]
      }]
    }
  });
}

/* CLEAR */
function clearList(type){
  if(confirm("Are you sure?")){
    localStorage.removeItem(key(type));

    if(type==="tasks") renderTasks();
    if(type==="homeworks") renderHomeworks();
    if(type==="notes") renderNotes();

    updateStats();
  }
}

/* START */
window.onload=()=>{
  localStorage.setItem("user","guest");
  showApp();
};
