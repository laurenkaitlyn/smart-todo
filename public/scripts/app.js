$(document).ready(function() {
  // Edit button click event handler
  $('#list-table').on('click', '.edit-button', function() {
    // Get the parent row (tr) of the clicked edit button
    var row = $(this).closest('tr');

    // Get the task content from the second column of the row
    var task = row.find('td:nth-child(2)').text();

    // Redirect to the edit route with the task ID or other relevant identifier
    window.location.href = '/api/notes/' + taskId + '/edit';
  });

  // Delete button click event handler
  $('#list-table').on('click', '.delete-button', function() {
    // Get the parent row (tr) of the clicked delete button
    var row = $(this).closest('tr');

    // Remove the entire row from the table
    row.remove();
  });

  // Task cell click event handler
  $('#list-table').on('click', '.task-cell', function(event) {
    // Check if the clicked element is the checkbox or the task text
    if ($(event.target).is('input[type="checkbox"]') || $(event.target).is('.task-text')) {
      var checkbox = $(this).find('input[type="checkbox"]');
      var taskText = $(this).find('.task-text');

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

  // Submit button click event handler
  $('#submit-button').click(function() {
    var task = $('#input-box').val();

    if (task.trim() === '') {
      alert("The input is empty, please type something.");
    } else {
      var newRow = $('<tr>');

      // Add task cell with checkbox
      var taskCell = $('<td class="task-cell">');
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
});
