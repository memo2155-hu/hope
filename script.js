
/* NAV */
function showSection(id,btn){
  document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}

/* CREATE ITEM */
function createItem(text){

  let li=document.createElement("li");
  li.draggable=true;

  let span=document.createElement("span");
  span.innerText=text;

  span.onclick=()=>{
    let newText=prompt("Edit",span.innerText);
    if(newText){
      span.innerText=newText;
      update();
    }
  };

  let del=document.createElement("button");
  del.className="delete-btn";
  del.innerText="🗑";

  del.onclick=()=>{
    li.remove();
    update();
  };

  li.append(span,del);

  li.addEventListener("dragstart",()=>li.classList.add("dragging"));
  li.addEventListener("dragend",()=>{
    li.classList.remove("dragging");
    update();
  });

  return li;
}

/* ADD */
function addTask(){
  if(!taskInput.value) return;
  taskList.appendChild(createItem(taskInput.value));
  taskInput.value="";
  update();
}

function addHomework(){
  if(!hwInput.value) return;
  hwList.appendChild(createItem(hwInput.value));
  hwInput.value="";
  update();
}

function addNote(){
  if(!noteInput.value) return;
  noteList.appendChild(createItem(noteInput.value));
  noteInput.value="";
  update();
}

/* DRAG */
document.querySelectorAll("ul").forEach(list=>{
  list.addEventListener("dragover",e=>{
    e.preventDefault();
    const dragging=document.querySelector(".dragging");
    list.appendChild(dragging);
  });
});

/* CLEAR */
function clearList(type){
  if(type==="tasks") taskList.innerHTML="";
  if(type==="homeworks") hwList.innerHTML="";
  if(type==="notes") noteList.innerHTML="";
  update();
}

/* UPDATE + SAVE */
function update(){

  localStorage.setItem("tasks", taskList.innerHTML);
  localStorage.setItem("homeworks", hwList.innerHTML);
  localStorage.setItem("notes", noteList.innerHTML);

  taskCount.innerText="Tasks: "+taskList.children.length;
  hwCount.innerText="Homeworks: "+hwList.children.length;
  noteCount.innerText="Notes: "+noteList.children.length;

  draw();
}

/* LOAD */
function load(){
  taskList.innerHTML = localStorage.getItem("tasks") || "";
  hwList.innerHTML = localStorage.getItem("homeworks") || "";
  noteList.innerHTML = localStorage.getItem("notes") || "";
}

/* CHART */
let chart;

function draw(){

  let t=taskList.children.length;
  let h=hwList.children.length;
  let n=noteList.children.length;

  let ctx=document.getElementById("chart").getContext("2d");

  if(chart) chart.destroy();

  chart=new Chart(ctx,{
    type:"doughnut",
    data:{
      labels:["Tasks","Homeworks","Notes"],
      datasets:[{
        data:[t,h,n],
        backgroundColor:["#00b4d8","#ff9800","#4caf50"]
      }]
    }
  });
}

/* START */
window.onload=()=>{
  load();
  update();
};
