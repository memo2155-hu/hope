console.log("JS working");

const taskInput=document.getElementById("taskInput");
const hwInput=document.getElementById("hwInput");
const noteInput=document.getElementById("noteInput");

const taskList=document.getElementById("taskList");
const hwList=document.getElementById("hwList");
const noteList=document.getElementById("noteList");

const taskCount=document.getElementById("taskCount");
const hwCount=document.getElementById("hwCount");
const noteCount=document.getElementById("noteCount");

/* NAV */
document.querySelectorAll(".nav-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
    document.getElementById(btn.dataset.sec).classList.remove("hidden");

    document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
  });
});

/* ITEM */
function createItem(text){
  let li=document.createElement("li");

  let span=document.createElement("span");
  span.textContent=text;

  span.onclick=()=>li.classList.toggle("done");

  let del=document.createElement("button");
  del.textContent="Delete";
  del.className="delete";

  del.onclick=()=>{li.remove(); update();};

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

/* UPDATE */
let chart;

function update(){
  taskCount.textContent="Tasks: "+taskList.children.length;
  hw
