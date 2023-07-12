document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Retrieve tasks from local storage if available
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
          <span class="task-text ${task.completed ? 'completed' : 'not-completed'}">${task.text}</span>
          <span class="task-actions">
            <i class="fas fa-check mark-complete-icon" data-index="${index}"></i>
            <i class="fas fa-edit edit-icon" data-index="${index}"></i>
            <i class="fas fa-trash delete-icon" data-index="${index}"></i>
          </span>
        `;
            taskList.appendChild(listItem);
        });
    }

    // Add a new task
    function addTask() {
        const text = taskInput.value.trim();
        if (text !== '') {
            const task = {
                text: text,
                completed: false
            };
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);

    // Initial render
    renderTasks();
});



