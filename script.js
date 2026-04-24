console.log("JS loaded 👍");

/* NAV */
document.querySelectorAll(".nav-btn").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
    document.getElementById(btn.dataset.sec).classList.remove("hidden");

    document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
  };
});

/* ELEMENTS */
const taskList=document.getElementById("taskList");
const hwList=document.getElementById("hwList");
const noteList=document.getElementById("noteList");

/* SAVE */
function save(){
  localStorage.setItem("tasks",taskList.innerHTML);
  localStorage.setItem("hw",hwList.innerHTML);
  localStorage.setItem("notes",noteList.innerHTML);
}

/* LOAD */
function load(){
  taskList.innerHTML=localStorage.getItem("tasks")||"";
  hwList.innerHTML=localStorage.getItem("hw")||"";
  noteList.innerHTML=localStorage.getItem("notes")||"";
}

/* CREATE ITEM */
function createItem(text){
  let li=document.createElement("li");

  let span=document.createElement("span");
  span.textContent=text;

  /* DATE */
  let date=document.createElement("small");
  date.className="date";
  date.textContent=new Date().toLocaleDateString();

  /* PIN */
  let pin=document.createElement("button");
  pin.textContent="📌";
  pin.className="pin";
  pin.onclick=()=>{
    li.parentNode.prepend(li);
    save();
  };

  /* EDIT */
  let edit=document.createElement("button");
  edit.textContent="Edit";
  edit.onclick=()=>{
    let newText=prompt("Edit:",span.textContent);
    if(newText){
      span.textContent=newText;
      save();
    }
  };

  /* DELETE */
  let del=document.createElement("button");
  del.textContent="Delete";
  del.className="delete";
  del.onclick=()=>{
    li.remove();
    save();
  };

  li.append(span,date,pin,edit,del);
  return li;
}

/* ADD */
document.getElementById("addTask").onclick=()=>{
  let v=document.getElementById("taskInput").value;
  if(!v) return;
  taskList.appendChild(createItem(v));
  save();
};

document.getElementById("addHW").onclick=()=>{
  let v=document.getElementById("hwInput").value;
  if(!v) return;
  hwList.appendChild(createItem(v));
  save();
};

document.getElementById("addNote").onclick=()=>{
  let v=document.getElementById("noteInput").value;
  if(!v) return;
  noteList.appendChild(createItem(v));
  save();
};

/* SEARCH */
document.getElementById("searchInput").addEventListener("input",function(){
  let v=this.value.toLowerCase();

  document.querySelectorAll("li").forEach(li=>{
    li.style.display=li.innerText.toLowerCase().includes(v)?"flex":"none";
  });
});

/* INIT */
load();
