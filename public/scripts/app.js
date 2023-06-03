// Client facing scripts here

$(document).ready(function() {
  // AJAX functions for CRUD operations

  function createTask(task) {
    // AJAX request for creating a task
  }

  function getAllTasks() {
    // AJAX request for fetching all tasks
  }

  function getTaskById(taskId) {
    // AJAX request for fetching a task by ID
  }

  function updateTask(taskId, updatedTask) {
    // AJAX request for updating a task
  }

  function deleteTask(taskId) {
    // AJAX request for deleting a task
  }

  // Submit button click event handler
  $('#submit-button').click(function() {
    let task = $('#input-box').val();
    createTask(task);

    if (task.trim() === '') {
      alert("The input is empty, please type something.");
    } else {
      let newRow = $('<tr>');

      // Add task cell with checkbox
      let taskCell = $('<td class="task-cell">');
      taskCell.append('<input type="checkbox">');
      taskCell.append(' ');
      taskCell.append('<label class="task-text">' + task + '</label>');
      newRow.append(taskCell);

      // Add edit button cell
      newRow.append('<td><button class="edit-button">Edit</button></td>');

      // Add delete button cell
      newRow.append('<td><button class="delete-button">Delete</button></td>');

      $('#list-table').append(newRow);
      $('#input-box').val('');
    }
  });

  // Fetch all tasks on page load
  getAllTasks();

  // Edit button click event handler
  $('#list-table').on('click', '.edit-button', function() {
    // Get the parent row (tr) of the clicked edit button
    let row = $(this).closest('tr');

    // Get the task ID from the row's data attribute or other relevant identifier
    let taskId = row.data('task-id');

    // Retrieve task data from the server using the task ID
    getTaskById(taskId)
      .done(function(task) {
        // Redirect to the edit route with the task ID or other relevant identifier
        window.location.href = '/api/notes/' + taskId + '/edit';
      })
      .fail(function(error) {
        console.error('Error retrieving task:', error);
      });
  });

  // Delete button click event handler
  $('#list-table').on('click', '.delete-button', function() {
    // Get the parent row (tr) of the clicked delete button
    let row = $(this).closest('tr');

    // Remove the entire row from the table
    row.remove();

    // Get the task ID from the row's data attribute or other relevant identifier
    let taskId = row.data('task-id');

    // Call the deleteTask function with the task ID
    deleteTask(taskId);
  });

  // Task cell click event handler
  $('#list-table').on('click', '.task-cell', function(event) {
    // Check if the clicked element is the checkbox or the task text
    if ($(event.target).is('input[type="checkbox"]') || $(event.target).is('.task-text')) {
      let checkbox = $(this).find('input[type="checkbox"]');
      let taskText = $(this).find('.task-text');

      if (checkbox.prop('checked')) {
        // Uncheck the checkbox and remove the crossed style from the task text
        checkbox.prop('checked', false);
        taskText.removeClass('crossed');
      } else {
        // Check the checkbox and add the crossed style to the task text
        checkbox.prop('checked', true);
        taskText.addClass('crossed');
      }
    }
  });


});
