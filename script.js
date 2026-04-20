function addTask(){
  let input = document.getElementById("taskInput");
  let text = input.value.trim();

  if(text==="") return;

  let li = document.createElement("li");
  li.innerText = text;

  document.getElementById("taskList").appendChild(li);

  input.value="";
}

function addHomework(){
  let input = document.getElementById("hwInput");
  let text = input.value.trim();

  if(text==="") return;

  let li = document.createElement("li");
  li.innerText = text;

  document.getElementById("hwList").appendChild(li);

  input.value="";
}

function addNote(){
  let input = document.getElementById("noteInput");
  let text = input.value.trim();

  if(text==="") return;

  let li = document.createElement("li");
  li.innerText = text;

  document.getElementById("notesList").appendChild(li);

  input.value="";
}
