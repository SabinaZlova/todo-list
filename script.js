const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const cardBody = document.querySelector(".card-body");
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  cardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allTodosEverywhere);
  filterInput.addEventListener("keyup", filter);
}

function addTodo(e) {
  const inpText = addInput.value.trim();
  if (inpText === "" || inpText === null) {
    showAlert("warning", "Zəhmət olmasa dəyər daxil edin");
  } else {
    addTodoToUI(inpText);
    addTodoToStorage(inpText);
    showAlert("success", "Todo uğurla əlavə olundu");
  }
  e.preventDefault();
}

function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;
  const a = document.createElement("a");
  a.className = "delete-item";
  a.href = "#";
  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);
  addInput.value = "";
}

function pageLoaded() {
  checkTodoFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
function addTodoToStorage(newTodo) {
  checkTodoFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function checkTodoFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}
function showAlert(type, message) {
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = message;
  cardBody.appendChild(div);
  setTimeout(function () {
    div.remove();
  }, 2500);
}


function filter(e){
   const filterValue = e.target.value.toLowerCase().trim();
    const toDoSiyahisi = document.querySelectorAll(".list-group-item");
    if (toDoSiyahisi.length > 0) {
        toDoSiyahisi.forEach(function (todo) {
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display:block")
            }else{
                  todo.setAttribute("style","display:none !important")
            }

        })
    }
    else{
        showAlert("warning","Filtirləmək üçün ən azı 1 todo olmalıdır")
    }

}


function allTodosEverywhere() {
    const toDoSiyahisi = document.querySelectorAll(".list-group-item");
    if (toDoSiyahisi.length > 0) {
        //ekrandan silmek
        toDoSiyahisi.forEach(function (todo) {
            todo.remove();
        }
        )
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    else {
        showAlert("warning", "Silmək üçü ən azı 1 element olmalıdır")
    }}


function removeTodoToUI(e){
  if(e.target.className==="fa fa-remove"){
    const todo=e.target.parentElement.parentElement;
    todo.remove();

    //storageden silmek
removeFromStorage(todo.textContent);
showAlert("success","Todo deleted successfully")
  }
}

function removeFromStorage(removeTodo){
  todos.forEach(function(todo,index){
if(removeTodo===todo){
  todos.splice(index,1)
}
localStorage.setItem("todos", JSON.stringify(todos))
  })
}