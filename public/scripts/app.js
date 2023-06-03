// Client facing scripts here

$(document).ready(function() {
  let selectedCategory = 0;

  $(".category-list-item").click(function() {
    selectedCategory = $(this).attr("data-id");
    console.log(selectedCategory);
    $("body").css("background-image", `url(/images/${selectedCategory}.jpg)`)

    // Filter tasks based on the selected category
    filterTasks(selectedCategory);
  });

  function filterTasks(categoryId) {
    // Show all tasks if the selected category is 'All'
    if (categoryId === "0") {
      $('#list-table tr').show();
    } else {
      // Hide tasks that don't belong to the selected category
      $('#list-table tr').each(function() {
        let taskCategory = $(this).data('task-category');
        if (taskCategory != categoryId) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    }
  }

  // AJAX functions for CRUD operations
  function createTask(task) {
    return $.ajax({
      url: '/api/notes',
      method: 'POST',
      data: { task: task },
      success: function(response) {
        // Handle success response
        console.log('Task created successfully:', response);
      },
      error: function(error) {
        // Handle error response
        console.error('Error creating task:', error);
      }
    });
  }

  function getAllTasks() {
    $.ajax({
      url: '/api/notes',
      method: 'GET',
      success: function(response) {
        // Handle success response
        console.log('All tasks:', response);
      },
      error: function(error) {
        // Handle error response
        console.error('Error fetching tasks:', error);
      }
    });
  }

  function getTaskById(taskId) {
    $.ajax({
      url: '/api/notes/' + taskId,
      method: 'GET',
      success: function(response) {
        // Handle success response
        console.log('Task details:', response);
      },
      error: function(error) {
        // Handle error response
        console.error('Error fetching task details:', error);
      }
    });
  }

  // function updateTask(taskId, updatedTask) {
  //   $.ajax({
  //     url: '/api/notes/' + taskId + '/edit',
  //     method: 'POST',
  //     data: { task: updatedTask },
  //     success: function(response) {
  //       // Handle success response
  //       console.log('Task updated successfully:', response);
  //     },
  //     error: function(error) {
  //       // Handle error response
  //       console.error('Error updating task:', error);
  //     }
  //   });
  // }

  function deleteTask(taskId) {
    $.ajax({
      url: '/api/notes/' + taskId + '/delete',
      method: 'POST',
      success: function(response) {
        // Handle success response
        console.log('Task deleted successfully:', response);
      },
      error: function(error) {
        // Handle error response
        console.error('Error deleting task:', error);
      }
    });
  }

  // Submit button click event handler
  $('#submit-button').click(function() {
    let task = $('#input-box').val();
    createTask(task)
    .then(() => {
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
    })
  });

  // Fetch all tasks on page load
  getAllTasks();

  // Edit button click event handler
  $('#list-table').on('click', '.edit-button', function() {
    // Get the parent row (tr) of the clicked edit button
    let row = $(this).closest('tr');

    // Get the task ID from the row's data attribute
    let taskId = row.data('task-id');

    // Retrieve task data from the server using the task ID
    getTaskById(taskId)
      .done(function(task) {
        // Redirect to the edit route with the task ID
        window.location.href = '/notes/' + taskId;
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
