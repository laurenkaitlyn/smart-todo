// Client facing scripts here

$(document).ready(function () {
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
        // Handle successful login
        console.log('User logged in:', response);
      },
      error: function (error) {
        // Handle login error
        console.error('Login error:', error);
      }
    });
  });

  // Logout button click event
  $('#logout-button').click(function () {
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
