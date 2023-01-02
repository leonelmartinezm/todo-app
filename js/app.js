//Selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const $empty = document.querySelector(".empty")

//Listeners
document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)

//Functions
function addTodo(event){
  event.preventDefault()
    

     if (todoInput.value !== ""){
     //Todo DIV
      const todoDiv = document.createElement("div")
      todoDiv.classList.add("todo")
  
      const newTodo = document.createElement("li")
      newTodo.innerHTML = todoInput.value
      newTodo.classList.add("todo-item")
      todoDiv.appendChild(newTodo)

      saveLocalTodos(todoInput.value);
  
      //Check Mark Button
  
      const completedButton = document.createElement("button")
      completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
      completedButton.classList.add("complete-btn")
      todoDiv.appendChild(completedButton)
  
        //Check trash Button
  
        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = '<i class="fa-solid fa-x"></i>'
        deleteButton.classList.add("trash-btn")
        todoDiv.appendChild(deleteButton)
  
        //Append in the List
  
        todoList.appendChild(todoDiv)
        todoInput.value = "";
     }else{
      alert("Agrega una tarea")
      
     }    
}

function deleteCheck(e){
  const item = e.target

  //delete
  if(item.classList[0] === "trash-btn"){
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall")
    removeLocalTodos(todo)
    todo.addEventListener("transitionend",function(){
      todo.remove();

    })
    
  }
//check
  if(item.classList[0]=== "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}


function saveLocalTodos(todo) {
  //Revisar si hay algo en el localStorge

  let todos;
  if(localStorage.getItem("todos") === null){
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos))

}

function getTodos(){
  //Revisar si hay algo en el localStorge
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = []
    
    
   
  
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
    
  }
  todos.forEach(function(todo){
     //Todo DIV
     const todoDiv = document.createElement("div")
     todoDiv.classList.add("todo")
 
     const newTodo = document.createElement("li")
     newTodo.innerHTML = todo
     newTodo.classList.add("todo-item")
     todoDiv.appendChild(newTodo)

 
     //Check Mark Button
 
     const completedButton = document.createElement("button")
     completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
     completedButton.classList.add("complete-btn")
     todoDiv.appendChild(completedButton)
 
       //Check trash Button
 
       const deleteButton = document.createElement("button")
       deleteButton.innerHTML = '<i class="fa-solid fa-x"></i>'
       deleteButton.classList.add("trash-btn")
       todoDiv.appendChild(deleteButton)
 
       //Append in the List
 
       todoList.appendChild(todoDiv)
  })

}

function removeLocalTodos(todo) {
  //Revisar si hay algo en el localStorge
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = []
   
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);

  localStorage.setItem("todos", JSON.stringify(todos))
}


