$(document).ready(function() {
  // Function to update the task
  function updateTask(taskId, updatedTask) {
    $.ajax({
      url: '/api/notes/' + taskId + '/edit',
      method: 'POST',
      data: { task: updatedTask },
      success: function(response) {
        console.log('Task updated successfully:', response);
      },
      error: function(error) {
        console.error('Error updating task:', error);
      }
    });
  }

  // Get the task ID from the URL
  let url = window.location.href;
  let taskId = url.substring(url.lastIndexOf('/') + 1);

  // Retrieve the existing task content from the server using the task ID
  let existingTask = getTaskById(taskId);

  // Set the task content in the input field
  $('#task-input').val(existingTask);

  // Save button click event handler
  $('#save-button').click(function() {
    var updatedTask = $('#task-input').val();

    // Call the updateTask function with the task ID and updated task content
    updateTask(taskId, updatedTask);
  });
});
