
// LOGIN
function login(){
let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

if(u==="admin" && p==="1234"){
document.getElementById("loginPage").classList.add("hidden");
document.getElementById("app").classList.remove("hidden");
}else{
document.getElementById("msg").innerText="❌ خطأ في البيانات";
}
}

// NAV
function show(id){
document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

// LOGOUT
function logout(){
location.reload();
}

/* TASKS */
function addTask(){
let i=document.getElementById("taskInput");
if(!i.value)return;

let li=document.createElement("li");
li.innerText="✅ "+i.value;
document.getElementById("taskList").appendChild(li);
i.value="";
}

/* HOMEWORK */
function addHW(){
let i=document.getElementById("hwInput");
if(!i.value)return;

let li=document.createElement("li");
li.innerText="📚 "+i.value;
document.getElementById("hwList").appendChild(li);
i.value="";
}

/* NOTES */
function addNote(){
let i=document.getElementById("noteInput");
if(!i.value)return;

let li=document.createElement("li");
li.innerText="📝 "+i.value;
document.getElementById("noteList").appendChild(li);
i.value="";
}

/* CLEAR */
function clearList(id){
document.getElementById(id).innerHTML="";
}
