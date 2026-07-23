const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",allTodosEverywhere);
    filterInput.addEventListener("keyup",filter);
}
function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}
function addTodoToStorage(newTodo){
    checkTodoFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}
function checkTodoFromStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}
function showAlert(type,message){
    setTimeout(function(){
        div.remove();
    }2500);

}
