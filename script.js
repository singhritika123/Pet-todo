document.addEventListener('DOMContentLoaded', function() {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  // Mock API with local storage
  const api = {
      fetchTodos: function() {
          return JSON.parse(localStorage.getItem('todos')) || [];
      },
      saveTodos: function(todos) {
          localStorage.setItem('todos', JSON.stringify(todos));
      }
  };

  // Load existing todos on page load
  function loadTodos() {
      const todos = api.fetchTodos();
      todos.forEach(todo => addTodoToDOM(todo));
  }

  // Add new todo
  todoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const todoText = todoInput.value.trim();
      if (todoText === '') return;

      const todo = {
          id: Date.now(),
          text: todoText
      };

      const todos = api.fetchTodos();
      todos.push(todo);
      api.saveTodos(todos);
      
      addTodoToDOM(todo);
      todoInput.value = '';
  });

  // Add todo to DOM
  function addTodoToDOM(todo) {
      const li = document.createElement('li');
      li.textContent = todo.text;
      li.dataset.id = todo.id;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
          deleteTodo(todo.id);
      });

      li.appendChild(deleteButton);
      todoList.appendChild(li);
  }

  // Delete todo
  function deleteTodo(id) {
      let todos = api.fetchTodos();
      todos = todos.filter(todo => todo.id !== id);
      api.saveTodos(todos);

      const todoElement = document.querySelector(`li[data-id='${id}']`);
      if (todoElement) {
          todoList.removeChild(todoElement);
      }
  }

  // Initial load
  loadTodos();
});
