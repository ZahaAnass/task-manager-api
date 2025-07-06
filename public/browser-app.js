// Get DOM elements with null checks
const tasksDOM = document.getElementById('tasks')
const loadingDOM = document.querySelector('.loading-text')
const noTasksDOM = document.getElementById('no-tasks')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

// Check if required elements exist
if (!tasksDOM || !loadingDOM || !noTasksDOM) {
  console.error('Required elements not found in the DOM. Please check your HTML structure.');
}

// Load tasks from /api/tasks
const showTasks = async () => {
  if (!tasksDOM || !loadingDOM || !noTasksDOM) {
    console.error('Required elements not found. Cannot proceed with showing tasks.');
    return;
  }

  loadingDOM.classList.remove('hidden')
  noTasksDOM.classList.add('hidden')
  
  try {
    const { data: { tasks } } = await axios.get('/api/v1/tasks')
    
    if (!tasks || tasks.length < 1) {
      if (tasksDOM) tasksDOM.innerHTML = ''
      if (noTasksDOM) noTasksDOM.classList.remove('hidden')
      if (loadingDOM) loadingDOM.classList.add('hidden')
      return
    }
    
    const allTasks = tasks.map((task) => {
      const { completed, _id: taskID, name } = task
      return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 transition-all duration-200 hover:shadow-md ${completed ? 'opacity-70' : ''}">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-3">
              <span class="text-green-500">
                <i class="far ${completed ? 'fa-check-circle text-green-500' : 'fa-circle'}"></i>
              </span>
              <h5 class="text-gray-800 dark:text-gray-200 ${completed ? 'line-through text-gray-500' : ''}">${name}</h5>
            </div>
            <div class="flex space-x-2">
              <a href="task.html?id=${taskID}" class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                <i class="fas fa-edit"></i>
              </a>
              <button type="button" class="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-gray-700 transition-colors delete-btn" data-id="${taskID}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `
    }).join('')
    
    tasksDOM.innerHTML = allTasks
    
  } catch (error) {
    console.error('Error fetching tasks:', error)
    tasksDOM.innerHTML = `
      <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <i class="fas fa-exclamation-circle text-red-500"></i>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700 dark:text-red-300">
              There was an error loading tasks. Please try again later.
            </p>
          </div>
        </div>
      </div>
    `
  }
  
  loadingDOM.classList.add('hidden')
}

showTasks()

// Delete task /api/tasks/:id
document.addEventListener('click', async (e) => {
  // Handle delete button click
  const deleteBtn = e.target.closest('.delete-btn')
  if (deleteBtn) {
    const id = deleteBtn.dataset.id
    if (id) {
      loadingDOM.classList.remove('hidden')
      try {
        await axios.delete(`/api/v1/tasks/${id}`)
        showTasks()
      } catch (error) {
        console.error('Error deleting task:', error)
        // Show error message
        const alert = document.createElement('div')
        alert.className = 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4'
        alert.innerHTML = `
          <div class="flex">
            <div class="flex-shrink-0">
              <i class="fas fa-exclamation-circle text-red-500"></i>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700 dark:text-red-300">
                Failed to delete task. Please try again.
              </p>
            </div>
          </div>
        `
        tasksDOM.prepend(alert)
        setTimeout(() => alert.remove(), 3000)
      } finally {
        loadingDOM.classList.add('hidden')
      }
    }
  }
})

// Form submission
if (formDOM) {
  formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = taskInputDOM.value.trim()
    
    if (!name) {
      formAlertDOM.textContent = 'Please provide a task name'
      formAlertDOM.className = 'form-alert text-sm px-4 py-2 rounded bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300 mb-4'
      formAlertDOM.classList.remove('hidden')
      return
    }
    
    try {
      await axios.post('/api/v1/tasks', { name })
      showTasks()
      taskInputDOM.value = ''
      
      // Show success message
      formAlertDOM.textContent = 'Task added successfully!'
      formAlertDOM.className = 'form-alert text-sm px-4 py-2 rounded bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300 mb-4'
      formAlertDOM.classList.remove('hidden')
      
    } catch (error) {
      console.error('Error adding task:', error)
      formAlertDOM.textContent = 'Error adding task. Please try again.'
      formAlertDOM.className = 'form-alert text-sm px-4 py-2 rounded bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300 mb-4'
      formAlertDOM.classList.remove('hidden')
    }
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      formAlertDOM.classList.add('hidden')
    }, 3000)
  })
}