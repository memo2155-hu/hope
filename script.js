
function addTask(){
  let input=document.getElementById("taskInput");
  if(!input.value) return;

  let li=document.createElement("li");
  li.innerText=input.value;

  document.getElementById("taskList").appendChild(li);

  input.value="";
  update();
}

function addHomework(){
  let input=document.getElementById("hwInput");
  if(!input.value) return;

  let li=document.createElement("li");
  li.innerText=input.value;

  document.getElementById("hwList").appendChild(li);

  input.value="";
  update();
}

function addNote(){
  let input=document.getElementById("noteInput");
  if(!input.value) return;

  let li=document.createElement("li");
  li.innerText=input.value;

  document.getElementById("noteList").appendChild(li);

  input.value="";
  update();
}

/* update stats */
function update(){
  document.getElementById("taskCount").innerText =
    "Tasks: " + document.querySelectorAll("#taskList li").length;

  document.getElementById("hwCount").innerText =
    "Homeworks: " + document.querySelectorAll("#hwList li").length;

  document.getElementById("noteCount").innerText =
    "Notes: " + document.querySelectorAll("#noteList li").length;

  draw();
}

/* chart */
let chart;

function draw(){
  let t=document.querySelectorAll("#taskList li").length;
  let h=document.querySelectorAll("#hwList li").length;
  let n=document.querySelectorAll("#noteList li").length;

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
