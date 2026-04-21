function show(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* TASKS */
function addTask(){
  let input=document.getElementById("taskInput");
  if(!input.value) return;

  let li=document.createElement("li");

  let span=document.createElement("span");
  span.innerText=input.value;

  let del=document.createElement("button");
  del.innerText="Delete";
  del.onclick=()=>{ li.remove(); updateStats(); };

  li.append(span,del);
  taskList.appendChild(li);

  input.value="";
  updateStats();
}

/* HOMEWORKS */
function addHomework(){
  let input=document.getElementById("hwInput");
  if(!input.value) return;

  let li=document.createElement("li");

  let span=document.createElement("span");
  span.innerText=input.value;

  let del=document.createElement("button");
  del.innerText="Delete";
  del.onclick=()=>{ li.remove(); updateStats(); };

  li.append(span,del);
  hwList.appendChild(li);

  input.value="";
  updateStats();
}

/* NOTES */
function addNote(){
  let input=document.getElementById("noteInput");
  if(!input.value) return;

  let li=document.createElement("li");

  let span=document.createElement("span");
  span.innerText=input.value;

  let del=document.createElement("button");
  del.innerText="Delete";
  del.onclick=()=>{ li.remove(); updateStats(); };

  li.append(span,del);
  noteList.appendChild(li);

  input.value="";
  updateStats();
}

/* STATS */
function updateStats(){
  document.getElementById("taskCount").innerText =
    "Tasks: " + taskList.children.length;

  document.getElementById("hwCount").innerText =
    "Homeworks: " + hwList.children.length;

  document.getElementById("noteCount").innerText =
    "Notes: " + noteList.children.length;

  draw();
}

/* CHART */
let chart;

function draw(){
  let t = taskList.children.length;
  let h = hwList.children.length;
  let n = noteList.children.length;

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

draw();
