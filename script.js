
const taskInput = document.querySelector('.task__input input');
const taskBox = document.querySelector(".task__box");
const filter = document.querySelectorAll(".filter span");
const clearAll = document.querySelector(".clear__btn");




let editId;
let isEdit = false;


let todos = JSON.parse(localStorage.getItem('todo-list'))

filter.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add('active')
        shwoTodo(btn.id);
    });
}) ;

function shwoTodo(filter){
    let li = ""
    if(todos){
        todos.forEach((todo, id) => {
            let isCompleted = todo.section == "completed" ? "checked" : "";
            if(filter == todo.section || filter == "all"){
                li += `<li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="setting">
                    <i onclick ="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                    <ul class="task__menu">
                        <li onclick="editTask(${id}, '${todo.name}')"><i class="fa-solid fa-pen"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i>Delete</li>
                    </ul>
                </div>
            </li>`
            }
        });
    }
    taskBox.innerHTML = li || `<span>You don't have any task</span>`
}


shwoTodo("all");
 function showMenu(selectMenu){
    let taskMenu = selectMenu.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != selectMenu){
            taskMenu.classList.remove("show");
        }
    });
    
 }
 function editTask(taskId , taskName){
    editId = taskId;
    isEdit = true;
    taskInput.value = taskName;
 }

 function deleteTask(deleteId){
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos))
    shwoTodo("all");
 }

 clearAll.addEventListener("click", ()=>{
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos))
    shwoTodo("all");
 })

 function updateStatus(selectTask){
    let taskName = selectTask.parentElement.lastElementChild;
    if(selectTask.checked){
        taskName.classList.add("checked")
        todos[selectTask.id].section = 'completed'
    }else{
        taskName.classList.remove("checked")
        todos[selectTask.id].section = 'pending'

    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
 }

taskInput.addEventListener("keyup", e =>{
    let userTask = taskInput.value
    if(e.key == "Enter" && userTask){
        if(!isEdit){
            if(!todos){
                todos = [];
                
            }
            let taskInfo = {name: userTask, section: "pending"};
            todos.push(taskInfo);
        }else{
            isEdit = false;
            todos[editId].name = userTask;
             
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos))
        shwoTodo("all")
        
    } 
    
})

