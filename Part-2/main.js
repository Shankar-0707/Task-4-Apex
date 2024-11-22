class TodoList {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.currentFilter = 'all';
    this.form = document.getElementById('todo-form');
    this.input = document.getElementById('todo-input');
    this.list = document.getElementById('todo-list');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    
    this.initialize();
  }

  initialize() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodo();
    });

    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.setFilter(button.dataset.filter);
      });
    });

    this.renderTodos();
  }

  setFilter(filter) {
    this.currentFilter = filter;
    this.filterButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.filter === filter);
    });
    this.renderTodos();
  }

  getFilteredTodos() {
    switch (this.currentFilter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo() {
    const text = this.input.value.trim();
    if (!text) return;

    const todo = {
      id: Date.now(),
      text,
      completed: false
    };

    this.todos.push(todo);
    this.saveTodos();
    this.renderTodos();
    this.input.value = '';
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
    this.renderTodos();
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.saveTodos();
    this.renderTodos();
  }

  editTodo(id, newText) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    this.saveTodos();
    this.renderTodos();
  }

  createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;
    text.addEventListener('dblclick', () => {
      text.contentEditable = true;
      text.focus();
    });
    text.addEventListener('blur', () => {
      text.contentEditable = false;
      const newText = text.textContent.trim();
      if (newText && newText !== todo.text) {
        this.editTodo(todo.id, newText);
      }
    });
    text.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        text.blur();
      }
    });

    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

    actions.appendChild(deleteBtn);
    li.append(checkbox, text, actions);

    return li;
  }

  renderTodos() {
    this.list.innerHTML = '';
    const filteredTodos = this.getFilteredTodos();
    filteredTodos.forEach(todo => {
      const todoElement = this.createTodoElement(todo);
      this.list.appendChild(todoElement);
    });
  }
}

// Initialize the app
new TodoList();