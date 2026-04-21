function show(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* TASKS */
function addTask(){
  let input=document.getElementById("taskInput");
  if(!input.value) return;

  let li=document.createElement("li");
  li.innerText=input.value;

  document.getElementById("taskList").appendChild(li);

  input.value="";
  updateStats();
}

/* NOTES */
function addNote(){
  let input=document.getElementById("noteInput");
  if(!input.value) return;

  let li=document.createElement("li");
  li.innerText=input.value;

  document.getElementById("noteList").appendChild(li);

  input.value="";
  updateStats();
}

/* STATS */
function updateStats(){
  document.getElementById("taskCount").innerText=
    "Tasks: "+document.querySelectorAll("#taskList li").length;

  document.getElementById("noteCount").innerText=
    "Notes: "+document.querySelectorAll("#noteList li").length;

  draw();
}

/* CHART */
let chart;

function draw(){
  let t=document.querySelectorAll("#taskList li").length;
  let n=document.querySelectorAll("#noteList li").length;

  let ctx=document.getElementById("chart").getContext("2d");

  if(chart) chart.destroy();

  chart=new Chart(ctx,{
    type:"doughnut",
    data:{
      labels:["Tasks","Notes"],
      datasets:[{
        data:[t,n],
        backgroundColor:["#00b4d8","#ff9800"]
      }]
    }
  });
}

draw();
