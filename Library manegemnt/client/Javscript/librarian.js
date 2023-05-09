const token = localStorage.getItem("accessToken");
const expirationTime = 60 * 60 * 1000; // 1 hour
const expirationTimestamp = Date.now() + expirationTime;

// Store the expiration timestamp in local storage
localStorage.setItem("expirationTime", expirationTimestamp);

// Function to check if the token is expired
function isTokenExpired() {
  const expirationTimestamp = localStorage.getItem("expirationTime");
  return Date.now() > expirationTimestamp;
}

// Function to clear the token and expiration timestamp
function clearToken() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("expirationTime");
}

// Check if the token is expired when the page loads
if (isTokenExpired()) {
  // Token is expired, clear it
  clearToken();
}
// Set a timer to automatically clear the token after the expiration time
setTimeout(clearToken, expirationTime);

function isAuthenticated() {
  const token = localStorage.getItem("accessToken");
  const expirationTime = localStorage.getItem("expirationTime");

  // Check if the token and expiration time are present and not expired
  return token && expirationTime && Date.now() < expirationTime;
}

function redirectToLogin() {
  window.location.href = "../Html/login.html"; // Replace with the actual login page URL
}

// Check if the user is authenticated when the page loads
if (!isAuthenticated()) {
  // User is not authenticated, redirect to login page
  redirectToLogin();
}

document
  .getElementById("add-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (isAuthenticated()) {
      var title = document.getElementById("book-title").value;
      var author = document.getElementById("book-author").value;

      // Send request to add book
      fetch("http://localhost:4000/librarian/addbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          title: title,
          author: author
        }),
      })
        .then(function (response) {
          if (response.ok) {
            // Book Added successfully
            return response.json(); // Parse the response body as JSON
          } else {
            // Failed to add book
            throw new Error("Failed to add book.");
          }
        })
        .then(function (data) {
          // Print the response data
          console.log(data);
          alert("Book Added!");
        })
        .catch(function (error) {
          console.log(error);
          alert("An error occurred during book adding.");
        });
    } else {
      // User is not authenticated, redirect to login page or display an error message
      redirectToLogin();
    }
  });

document
  .getElementById("update-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var bookId = document.getElementById("update-book-id").value;
    var newTitle = document.getElementById("update-book-title").value;
    var newAuthor = document.getElementById("update-book-author").value;
    var newStatus = document.getElementById("status")

    // Send request to update book
    fetch("http://localhost:4000/librarian/editbook", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        book_Id: bookId,
        title: newTitle,
        author: newAuthor,
        status: newStatus,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          alert("Book details updated!");
        } else {
          alert("Failed to update book detail.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("An error occurred during book data updating.");
      });
  });

document
  .getElementById("remove-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var bookId = document.getElementById("remove-book-id").value;
    // Send request to remove book
    fetch("http://localhost:4000/librarian/deletebook", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        book_id:bookId
      }),
    })
      .then(function (response) {
        if (response.ok) {
          // Book Added successfully
          return response.json(); // Parse the response body as JSON
        } else {
          // Failed to add book
          throw new Error("Failed to remove book.");
        }
      }).then(function (data) {
        // Print the response data
        console.log(data);
        alert("Book removed!");
      })
      .catch(function (error) {
        console.log(error);
        alert("An error occurred during book removing.");
      });
  });

document
  .getElementById("add-member-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("member-name").value;
    var userPassword = document.getElementById("member-password").value;
    let role = "Member";

    // Send request to add member
    fetch("http://localhost:4000/librarian/addmember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        username: username,
        password:userPassword,
        role:role,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          alert("Member added!");
        } else {
          alert("Failed to add member.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("An error occurred during member adding.");
      });
  });

document
  .getElementById("update-member-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var memberId = document.getElementById("update-member-id").value;
    var newName = document.getElementById("update-member-name").value;
    var newPassword = document.getElementById("update-member-password").value;
    var newRole = document.getElementById("update-member-role").value;

    // Send request to update member
    fetch("http://localhost:4000/librarian/updatemember", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        user_id:memberId,
        username:newName,
        password:newPassword,
        role:newRole
      }),
    })
      .then(function (response) {
        if (response.ok) {
          alert("Member updated!");
        } else {
          alert("Failed to update member.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("An error occurred during member updating.");
      });
  });

document
  .getElementById("remove-member-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var memberId = document.getElementById("remove-member-id").value;

    // Send request to remove member
    fetch("http://localhost:4000/librarian/deletemember", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        user_id: memberId
      }),
    })
      .then(function (response) {
        if (response.ok) {
          alert("Member removed!");
        } else {
          alert("Failed to remove member.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("An error occurred during member removing.");
      });
  });
