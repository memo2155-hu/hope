
/* ===== LOAD ===== */
function load(key){
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function save(key,data){
  localStorage.setItem(key, JSON.stringify(data));
}

/* ===== TASKS ===== */
function addTask(){
  let input=document.getElementById("taskInput");
  let data=load("tasks");

  data.push(input.value);
  save("tasks",data);

  input.value="";
  render();
}

function renderTasks(){
  let list=document.getElementById("taskList");
  list.innerHTML="";
  let data=load("tasks");

  data.forEach((t,i)=>{
    let li=document.createElement("li");

    let span=document.createElement("span");
    span.innerText=t;

    let edit=document.createElement("button");
    edit.innerText="Edit";
    edit.onclick=()=>{
      let n=prompt("Edit",t);
      if(n){
        data[i]=n;
        save("tasks",data);
        render();
      }
    };

    let del=document.createElement("button");
    del.innerText="Delete";
    del.onclick=()=>{
      data.splice(i,1);
      save("tasks",data);
      render();
    };

    li.append(span,edit,del);
    list.appendChild(li);
  });
}

/* ===== HOMEWORKS ===== */
function addHomework(){
  let input=document.getElementById("hwInput");
  let data=load("homeworks");

  data.push(input.value);
  save("homeworks",data);

  input.value="";
  render();
}

/* ===== NOTES ===== */
function addNote(){
  let input=document.getElementById("noteInput");
  let data=load("notes");

  data.push(input.value);
  save("notes",data);

  input.value="";
  render();
}

/* ===== RENDER ALL ===== */
function render(){
  renderList("tasks","taskList");
  renderList("homeworks","hwList");
  renderList("notes","noteList");
  draw();
}

function renderList(key,id){
  let list=document.getElementById(id);
  list.innerHTML="";
  let data=load(key);

  data.forEach((t,i)=>{
    let li=document.createElement("li");

    let span=document.createElement("span");
    span.innerText=t;

    let del=document.createElement("button");
    del.innerText="Delete";
    del.onclick=()=>{
      data.splice(i,1);
      save(key,data);
      render();
    };

    li.append(span,del);
    list.appendChild(li);
  });
}

/* ===== CHART ===== */
let chart;

function draw(){
  let t=load("tasks").length;
  let h=load("homeworks").length;
  let n=load("notes").length;

  let ctx=document.getElementById("chart").getContext("2d");

  if(chart) chart.destroy();

  chart=new Chart(ctx,{
    type:"bar",
    data:{
      labels:["Tasks","Homeworks","Notes"],
      datasets:[{
        data:[t,h,n],
        backgroundColor:["#00b4d8","#ff9800","#4caf50"]
      }]
    }
  });
}

/* ===== INIT ===== */
function init(){
  render();
}

init();
