const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todos")

todoButton.addEventListener("click", addTodos);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);//attaching it to document, window

function addTodos(e){
    e.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item")
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    //ADD TO LOCAL STORAGE//
    saveLocalTodos(todoInput.value);
    todoInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn")
    completedButton.innerHTML = `Completed`
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button")
    trashButton.classList.add("trash-btn")
    trashButton.innerHTML = `Delete`
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv);

    
}

function deleteCheck(e){
    
    const item = e.target;
    console.log(item)
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e=>{
            todo.remove();      
        });
    }
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }
}

function filterTodo(e){
    
    const todos = todoList.childNodes;
    todos.forEach(function(todo){

        switch(e.target.value){

            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
            if(todo.classList.contains("completed")){
                todo.style.display = "flex"
                }else{
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
            if(!todo.classList.contains("completed")){
                todo.style.display="flex";
                }else{
                todo.style.display="none";
                }
        }
    })
}


function saveLocalTodos(todo){
    //check, hey do I have anything in there?
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo); //pushing new items to the array todos if it exist
    localStorage.setItem("todos", JSON.stringify(todos));

}   

function getTodos(){
    //check, hey do I have anything in there ?(local storage)
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }//if something is there, save it to local storage
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.forEach(function(todo) {

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item")
    newTodo.innerText = todo; //changed from inputValue.innerText to "todo" which is taken from local storage
    todoDiv.appendChild(newTodo);
    

    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn")
    completedButton.innerHTML = `Completed`
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button")
    trashButton.classList.add("trash-btn")
    trashButton.innerHTML = `Delete`
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    console.log(todo);
    console.log(todo.children);
    console.log(todo.children[0].innerText)
    const todoIndex = todo.children[0].innerText; //first element in todo
    todos.splice(todos.indexOf(todoIndex),1);//todos is spliced by the (todos.indexOf(todoIndex))
    //saving again to local storage
    localStorage.setItem("todos", JSON.stringify(todos));

}
