// Client facing scripts here

$(document).ready(function () {

  let username = null;

  // Register button click event
  $('#register-button').click(function () {
    // Retrieve user input values
    const email = $('#email-input').val();
    const password = $('#password-input').val();

    // Create the user object
    const user = {
      email: email,
      password: password
    };

    // Send the AJAX request to register the user
    $.ajax({
      method: 'POST',
      url: '/api/auth/register',
      data: user,
      success: function (response) {
        // Handle successful registration
        console.log('User registered:', response);
      },
      error: function (error) {
        // Handle registration error
        console.error('Registration error:', error);
      }
    });
  });

  // Login button click event
  $('#login-button').click(function () {
    // Retrieve user input values
    const email = $('#email-input').val();
    const password = $('#password-input').val();

    // Create the user object
    const user = {
      email: email,
      password: password
    };

    // Send the AJAX request to log in the user
    $.ajax({
      method: 'POST',
      url: '/api/auth/login',
      data: user,
      success: function (response) {
        username = response.email;
        // Handle successful login
        console.log('User logged in:', response);
      },
      error: function (error) {
        // Handle login error
        console.error('Login error:', error);
      }
    });
  });

  if (username) {
    // Update the header to display "Logged in as: username"
    $('#login-link').hide();
    $('#register-link').hide();
    $('#logout-link').show().html('<a href="#">Logout</a>');
    $('<li id="user-link">Logged in as: ' + username + '</li>').insertAfter('#logout-link');
  } else {
    // User is not logged in, display the "Login" and "Register" buttons
    $('#login-link').show();
    $('#register-link').show();
    $('#logout-link').hide();
    $('#user-link').remove();
  }

  // Logout button click event
  $('#logout-link a').click(function (e) {
    e.preventDefault();
    // Send the AJAX request to log out the user
    $.ajax({
      method: 'POST',
      url: '/api/auth/logout',
      success: function (response) {
        // Handle successful logout
        console.log('User logged out:', response);
      },
      error: function (error) {
        // Handle logout error
        console.error('Logout error:', error);
      }
    });
  });
});
