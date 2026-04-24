/* NAV */
document.querySelectorAll(".nav-btn").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
    document.getElementById(btn.dataset.sec).classList.remove("hidden");

    document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
  };
});

/* DATA */
let data={
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  hw: JSON.parse(localStorage.getItem("hw")) || [],
  notes: JSON.parse(localStorage.getItem("notes")) || []
};

/* SAVE */
function save(){
  localStorage.setItem("tasks",JSON.stringify(data.tasks));
  localStorage.setItem("hw",JSON.stringify(data.hw));
  localStorage.setItem("notes",JSON.stringify(data.notes));
}

/* RENDER */
function render(){
  renderList("tasks","taskList");
  renderList("hw","hwList");
  renderList("notes","noteList");
}

function renderList(type,id){
  let ul=document.getElementById(id);
  ul.innerHTML="";

  data[type].forEach((item,i)=>{
    let li=document.createElement("li");

    let span=document.createElement("span");
    span.textContent=item.text+" ("+item.date+")";

    /* pin */
    let pin=document.createElement("button");
    pin.textContent="📌";
    pin.className="pin";
    pin.onclick=()=>{
      let [p]=data[type].splice(i,1);
      data[type].unshift(p);
      save(); render();
    };

    /* edit */
    let edit=document.createElement("button");
    edit.textContent="Edit";
    edit.onclick=()=>{
      let t=prompt("Edit",item.text);
      if(t){item.text=t; save(); render();}
    };

    /* delete */
    let del=document.createElement("button");
    del.textContent="Delete";
    del.className="delete";
    del.onclick=()=>{
      data[type].splice(i,1);
      save(); render();
    };

    li.append(span,pin,edit,del);
    ul.appendChild(li);
  });
}

/* ADD */
function addItem(type){
  let input={
    tasks:"taskInput",
    hw:"hwInput",
    notes:"noteInput"
  }[type];

  let val=document.getElementById(input).value;
  if(!val) return;

  data[type].push({
    text:val,
    date:new Date().toLocaleDateString()
  });

  document.getElementById(input).value="";
  save();
  render();
}

/* SEARCH */
document.getElementById("searchInput").oninput=function(){
  let v=this.value.toLowerCase();

  document.querySelectorAll("li").forEach(li=>{
    li.style.display=li.innerText.toLowerCase().includes(v)?"flex":"none";
  });
};

/* INIT */
render();
