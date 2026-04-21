function showSection(id,btn){

  document.querySelectorAll(".section").forEach(s=>{
    s.classList.add("hidden");
  });

  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(b=>{
    b.classList.remove("active");
  });

  btn.classList.add("active");
}

/* create item */
function createItem(text){
  let li=document.createElement("li");

  let span=document.createElement("span");
  span.innerText=text;

  let del=document.createElement("button");
  del.classList.add("delete-btn");
  del.innerText="🗑 Delete";

  del.onclick=()=>{
    li.remove();
    update();
  };

  li.append(span,del);
  return li;
}

/* add */
function addTask(){
  let input=document.getElementById("taskInput");
  if(!input.value) return;

  taskList.appendChild(createItem(input.value));
  input.value="";
  update();
}

function addHomework(){
  let input=document.getElementById("hwInput");
  if(!input.value) return;

  hwList.appendChild(createItem(input.value));
  input.value="";
  update();
}

function addNote(){
  let input=document.getElementById("noteInput");
  if(!input.value) return;

  noteList.appendChild(createItem(input.value));
  input.value="";
  update();
}

/* stats */
function update(){

  taskCount.innerText="Tasks: "+taskList.children.length;
  hwCount.innerText="Homeworks: "+hwList.children.length;
  noteCount.innerText="Notes: "+noteList.children.length;

  draw();
}

/* chart */
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

/* start */
window.onload=()=>{
  draw();
};
