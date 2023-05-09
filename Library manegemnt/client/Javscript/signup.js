document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get form values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var role = document.getElementById("role").value;

    // Validate role selection
  if (role === "") {
    alert("Please select a role.");
    return;
  }
    
    // Send signup request
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, password: password, role: role })
    })
    .then(function(response) {
      if (response.ok) {
        alert("Signup successful!");
        // Redirect to login page
        window.location.href = "../Html/login.html";
      } else {
        alert("Signup failed.");
      }
    })
    .catch(function(error) {
      console.log(error);
      alert("An error occurred during signup.");
    });
  });
  