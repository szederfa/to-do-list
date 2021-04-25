// Selectors
const todoInput = document.querySelector('.to-do-input');
const todoButton = document.querySelector('.to-do-button');
const todoList = document.querySelector('.to-do-list');
const todoCount = document.querySelector('.count');
const todoClear = document.querySelector('.to-do-clear');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
todoClear.addEventListener('click', clearAll);

// Functions
function addTodo(event) {
    event.preventDefault();
    // Validate
    if (todoInput.value.length > 0) {
        // Create to-do DIV
        const newDiv = document.createElement('div');
        newDiv.classList.add('to-do');
        // Create to-do-item LI
        const newLi = document.createElement('li');
        newLi.innerText = todoInput.value;
        newLi.classList.add('to-do-item');
        newDiv.appendChild(newLi);
        // Create to-do-delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-times"></i>';
        deleteButton.classList.add('to-do-delete');
        newDiv.appendChild(deleteButton);
        // Add to do to localstorage
        saveLocalTodo(todoInput.value);
        // Append to list
        todoList.appendChild(newDiv);
        // Clear to-do-input value
        todoInput.value = '';
        // Counting the to-do elements
        const counter = document.querySelectorAll('.to-do').length;
        if(counter <= 1) {
            todoCount.innerText = 'You have ' + counter + ' task.';
        } else {
            todoCount.innerText = 'You have ' + counter + ' tasks.';
        }
    }
}

function deleteTodo(e) {
    const item = e.target;
    // Delete to-do
    if(item.classList[0] === 'to-do-delete') {
        const todo = item.parentElement;
        removeLocalTodo(todo);
        todo.remove();
    }
    // Count when you removing an element
    const counter = document.querySelectorAll('.to-do').length;
    if(counter <= 1) {
        todoCount.innerText = 'You have ' + counter + ' task.';
    } else {
        todoCount.innerText = 'You have ' + counter + ' tasks.';
    }
}

function clearAll(e) {
    // Delete all tasks
    todoList.innerHTML = '';
    todoCount.innerText = 'You have 0 task.';
    // Delete all tasks from local storage
    clearAllLocalTodo();
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        // Create to-do DIV
        const newDiv = document.createElement('div');
        newDiv.classList.add('to-do');
        // Create to-do-item LI
        const newLi = document.createElement('li');
        newLi.innerText = todo;
        newLi.classList.add('to-do-item');
        newDiv.appendChild(newLi);
        // Create to-do-delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-times"></i>';
        deleteButton.classList.add('to-do-delete');
        newDiv.appendChild(deleteButton);
        // Append to list
        todoList.appendChild(newDiv);
        // Counting the to-do elements
        const counter = document.querySelectorAll('.to-do').length;
        if(counter <= 1) {
            todoCount.innerText = 'You have ' + counter + ' task.';
        } else {
            todoCount.innerText = 'You have ' + counter + ' tasks.';
        }
    });
}

function saveLocalTodo(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodo(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function clearAllLocalTodo() {
    localStorage.clear();
}