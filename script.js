const taskInput = document.getElementById("taskInput");
const hwInput = document.getElementById("hwInput");
const noteInput = document.getElementById("noteInput");

const taskList = document.getElementById("taskList");
const hwList = document.getElementById("hwList");
const noteList = document.getElementById("noteList");

const taskCount = document.getElementById("taskCount");
const hwCount = document.getElementById("hwCount");
const noteCount = document.getElementById("noteCount");

/* NAV */
function showSection(id, btn){
  document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}

/* CREATE ITEM */
function createItem(text, done=false){
  let li=document.createElement("li");

  let span=document.createElement("span");
  span.innerText=text;

  if(done) li.classList.add("done");

  span.onclick=()=>{
    li.classList.toggle("done");
    save();
  };

  span.ondblclick=()=>{
    let input=document.createElement("input");
    input.value=span.innerText;

    input.onblur=()=>{
      span.innerText=input.value || span.innerText;
      li.replaceChild(span,input);
      save();
    };

    li.replaceChild(input,span);
    input.focus();
  };

  let del=document.createElement("button");
  del.className="delete-btn";
  del.innerText="Delete";

  del.onclick=()=>{
    li.remove();
    update();
  };

  li.append(span,del);
  return li;
}

/* ADD */
function addTask(){
  if(!taskInput.value.trim()) return;
  taskList.appendChild(createItem(taskInput.value));
  taskInput.value="";
  update();
}

function addHomework(){
  if(!hwInput.value.trim()) return;
  hwList.appendChild(createItem(hwInput.value));
  hwInput.value="";
  update();
}

function addNote(){
  if(!noteInput.value.trim()) return;
  noteList.appendChild(createItem(noteInput.value));
  noteInput.value="";
  update();
}

/* ENTER */
taskInput.addEventListener("keypress", e=>{if(e.key==="Enter") addTask();});
hwInput.addEventListener("keypress", e=>{if(e.key==="Enter") addHomework();});
noteInput.addEventListener("keypress", e=>{if(e.key==="Enter") addNote();});

/* UPDATE */
function update(){
  taskCount.innerText="Tasks: "+taskList.children.length;
  hwCount.innerText="Homeworks: "+hwList.children.length;
  noteCount.innerText="Notes: "+noteList.children.length;

  save();
  draw();
}

/* SAVE */
function save(){
  localStorage.setItem("tasks", taskList.innerHTML);
  localStorage.setItem("homeworks", hwList.innerHTML);
  localStorage.setItem("notes", noteList.innerHTML);
}

/* LOAD */
function load(){
  taskList.innerHTML = localStorage.getItem("tasks") || "";
  hwList.innerHTML = localStorage.getItem("homeworks") || "";
  noteList.innerHTML = localStorage.getItem("notes") || "";

  update();
}

/* CHART */
let chart;

function draw(){
  let t=taskList.children.length;
  let h=hwList.children.length;
  let n=noteList.children.length;

  let ctx=document.getElementById("chart").getContext("2d");

  if(!chart){
    chart=new Chart(ctx,{
      type:"doughnut",
      data:{
        labels:["Tasks","Homeworks","Notes"],
        datasets:[{
          data:[t,h,n],
          backgroundColor:["#2563eb","#f59e0b","#22c55e"]
        }]
      }
    });
  }else{
    chart.data.datasets[0].data=[t,h,n];
    chart.update();
  }
}

load();
