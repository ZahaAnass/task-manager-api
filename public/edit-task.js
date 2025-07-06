// Get DOM elements
const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const formAlertDOM = document.querySelector('.form-alert')

// Get the submit button from the form
const editBtnDOM = editFormDOM ? editFormDOM.querySelector('button[type="submit"]') : null

// Get task ID from URL
const params = window.location.search
const id = new URLSearchParams(params).get('id')

// Check if ID is valid
if (!id || id === 'null' || id === 'undefined') {
  console.error('Invalid task ID, redirecting to home page')
  window.location.href = 'index.html'
  throw new Error('Invalid task ID')
}

// Check if required elements exist
if (!editFormDOM || !taskNameDOM || !taskCompletedDOM || !formAlertDOM) {
  console.error('Required form elements not found')
  if (formAlertDOM) {
    formAlertDOM.textContent = 'Error: Could not initialize the form. Please try again.'
    formAlertDOM.classList.remove('hidden')
  }
}

let tempName

const showTask = async () => {
  if (!id) return
  
  try {
    const { data: { task } } = await axios.get(`/api/v1/tasks/${id}`)
    
    if (!task) {
      showError('Task not found')
      return
    }
    
    const { _id: taskID, completed, name } = task
    
    if (taskIDDOM) taskIDDOM.textContent = taskID
    if (taskNameDOM) taskNameDOM.value = name
    tempName = name
    
    if (taskCompletedDOM) {
      taskCompletedDOM.checked = !!completed
    }
  } catch (error) {
    console.error('Error fetching task:', error)
    showError(error.response?.data?.msg || 'Failed to load task')
    
    // Redirect to index page if task is not found or invalid
    if (error.response?.status === 404) {
      setTimeout(() => {
        window.location.href = 'index.html'
      }, 2000)
    }
  }
}

// Helper function to show error messages
const showError = (message) => {
  if (!formAlertDOM) return
  
  formAlertDOM.textContent = message
  formAlertDOM.className = 'form-alert text-sm px-4 py-2 rounded bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300 mb-4 inline-block'
  formAlertDOM.classList.remove('hidden')
  
  // Hide error after 3 seconds
  setTimeout(() => {
    formAlertDOM.classList.add('hidden')
  }, 3000)
}

showTask()

if (editFormDOM) {
  editFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    if (!editBtnDOM || !taskNameDOM || !taskCompletedDOM) {
      console.error('Required form elements not found')
      return
    }
    
    const originalBtnText = editBtnDOM.innerHTML
    editBtnDOM.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Saving...'
    editBtnDOM.disabled = true
    
    // Show loading state
    if (formAlertDOM) {
      formAlertDOM.textContent = 'Saving changes...'
      formAlertDOM.className = 'form-alert text-sm px-4 py-2 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 mb-4 inline-block'
      formAlertDOM.classList.remove('hidden')
    }
    
    try {
      const taskName = taskNameDOM.value.trim()
      const taskCompleted = taskCompletedDOM.checked
      
      if (!taskName) {
        showError('Please provide a task name')
        return
      }
      
      // Make the PATCH request
      const response = await axios.patch(`/api/v1/tasks/${id}`, {
        name: taskName,
        completed: taskCompleted,
      })
      
      console.log('Server response:', response.data) // Debug log
      
      // Handle different response structures
      const task = response.data.task || response.data
      if (!task) {
        throw new Error('Invalid response from server')
      }
      
      const { _id: taskID, completed, name } = task
      
      if (taskIDDOM) taskIDDOM.textContent = taskID
      if (taskNameDOM) taskNameDOM.value = name
      tempName = name
      
      if (taskCompletedDOM) {
        taskCompletedDOM.checked = !!completed
      }
      
      // Show success message
      if (formAlertDOM) {
        formAlertDOM.textContent = 'Task updated successfully! Redirecting...'
        formAlertDOM.className = 'form-alert text-sm px-4 py-2 rounded bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300 mb-4 inline-block'
        formAlertDOM.classList.remove('hidden')
      }
      
      // Redirect back to tasks list after 1 second
      setTimeout(() => {
        window.location.href = 'index.html'
      }, 1000)
      
    } catch (error) {
      console.error('Error updating task:', error)
      let errorMessage = 'Failed to update task. Please try again.'
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data)
        console.error('Error status:', error.response.status)
        errorMessage = error.response.data?.msg || error.response.data?.message || errorMessage
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request)
        errorMessage = 'No response from server. Please check your connection.'
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message)
      }
      
      showError(errorMessage)
      
      // Restore original input value on error
      if (taskNameDOM) taskNameDOM.value = tempName
      
    } finally {
      // Re-enable the submit button
      if (editBtnDOM) {
        editBtnDOM.disabled = false
        editBtnDOM.innerHTML = originalBtnText
      }
      if (editBtnDOM) {
        editBtnDOM.innerHTML = originalBtnText
        editBtnDOM.disabled = false
      }
    }
  })
}
