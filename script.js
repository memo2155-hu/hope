console.log("JS loaded ✅");

/* NAV */
document.querySelectorAll(".nav-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
    document.getElementById(btn.dataset.sec).classList.remove("hidden");

    document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
  });
});

/* ELEMENTS */
const taskInput=document.getElementById("taskInput");
const hwInput=document.getElementById("hwInput");
const noteInput=document.getElementById("noteInput");

const taskList=document.getElementById("taskList");
const hwList=document.getElementById("hwList");
const noteList=document.getElementById("noteList");

const counts=document.getElementById("counts");

/* CREATE ITEM */
function createItem(text){
  let li=document.createElement("li");

  let span=document.createElement("span");
  span.textContent=text;

  span.addEventListener("click",()=>{
    li.classList.toggle("done");
  });

  let del=document.createElement("button");
  del.textContent="Delete";
  del.className="delete";

  del.addEventListener("click",()=>{
    li.remove();
    update();
  });

  li.append(span,del);
  return li;
}

/* ADD */
document.getElementById("addTask").addEventListener("click",()=>{
  if(!taskInput.value.trim()) return;
  taskList.appendChild(createItem(taskInput.value));
  taskInput.value="";
  update();
});

document.getElementById("addHW").addEventListener("click",()=>{
  if(!hwInput.value.trim()) return;
  hwList.appendChild(createItem(hwInput.value));
  hwInput.value="";
  update();
});

document.getElementById("addNote").addEventListener("click",()=>{
  if(!noteInput.value.trim()) return;
  noteList.appendChild(createItem(noteInput.value));
  noteInput.value="";
  update();
});

/* UPDATE */
let chart;

function update(){
  let t=taskList.children.length;
  let h=hwList.children.length;
  let n=noteList.children.length;

  counts.textContent=`Tasks: ${t} | Homeworks: ${h} | Notes: ${n}`;

  draw(t,h,n);
}

/* CHART */
function draw(t=0,h=0,n=0){
  let ctx=document.getElementById("chart");

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
