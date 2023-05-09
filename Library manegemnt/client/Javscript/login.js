document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Send login request
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then(function (response) {
        console.log(response);
        if (response.ok) {
          response.json().then(function (data) {
            let accessToken = data.token;
            let userId = data.userid;

            // Set the token and user ID in local storage
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userId", userId);
            console.log(userId);

            // Get the user role from the token
            let role = data.role;

            // Redirect based on user role
            if (role === "Member") {
              window.location.href = "member.html"; // Redirect to member page
            } else if (role === "Librarian") {
              window.location.href = "../Html/librarian.html"; // Redirect to librarian page
            }
            alert("Login successful!");
          });
        } else {
          alert("Login failed.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("An error occurred during login.");
      });
  });
