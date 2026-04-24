
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

  let span=document.createElement("span");
  span.innerText=text;

  /* edit */
  span.ondblclick=()=>{
    let newText=prompt("Edit",span.innerText);
    if(newText){
      span.innerText=newText;
      update();
    }
  };

  /* delete */
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

/* UPDATE */
function update(){
  taskCount.innerText="Tasks: "+taskList.children.length;
  hwCount.innerText="Homeworks: "+hwList.children.length;
  noteCount.innerText="Notes: "+noteList.children.length;

  draw();
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
        backgroundColor:["#2563eb","#f59e0b","#22c55e"]
      }]
    }
  });
}

draw();
