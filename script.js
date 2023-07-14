document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Retrieve tasks from local storage if available
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
          <span class="task-text ${task.completed ? 'completed' : 'not-completed'}">${task.text}</span>
          <span class="task-actions">
            <i class="fas fa-check mark-complete-icon" data-index="${index}"></i>
            <i class="fas fa-edit edit-icon" data-index="${index}"></i>
            <i class="fas fa-times delete-icon" data-index="${index}"></i>
          </span>
        `;
            taskList.appendChild(listItem);
        });
    }

    // Add a new task
    const addTask = () => {
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

    // Mark a task as completed
    const toggleCompleted = index => {
        console.log(tasks[index].text);
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Edit a task
    const editTask = index => {
        const newText = prompt('Enter the new task text:', tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }

    // Delete a task
    const deleteTask = index => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);

    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-icon')) {
            editTask(parseInt(event.target.getAttribute('data-index')));
        }
        else if (event.target.classList.contains('mark-complete-icon')) {
            toggleCompleted(parseInt(event.target.getAttribute('data-index')));
        }
        else if (event.target.classList.contains('delete-icon')) {
            deleteTask(parseInt(event.target.getAttribute('data-index')));
        }
    });

    // Initial render
    renderTasks();
});



