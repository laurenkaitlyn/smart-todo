// Client facing scripts here

$(document).ready(function() {
  // Submit button click event handler
  $('#submit-button').click(function() {
    var task = $('#input-box').val();

    if (task.trim() === '') {
      alert("The input is empty, please type something.");
    } else {
      var newRow = $('<tr>');
      newRow.append('<td>' + task + '</td>');
      newRow.append('<td><button class="edit-button">Edit</button></td>');
      newRow.append('<td><button class="delete-button">Delete</button></td>');

      $('#list-table').append(newRow);
      $('#input-box').val('');
    }
  });

  // Edit button click event handler
  $('#list-table').on('click', '.edit-button', function() {
    // Get the parent row (tr) of the clicked edit button
    var row = $(this).closest('tr');

    // Get the task content from the first column of the row
    var task = row.find('td:first-child').text();

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
});
