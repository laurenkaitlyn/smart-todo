// Client facing scripts here

$(document).ready(function() {
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
});
