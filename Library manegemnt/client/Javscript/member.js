const token = localStorage.getItem("accessToken");
const userID = localStorage.getItem("userId");
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

function fetchAvailableBooks() {
    fetch("http://localhost:4000/member/viewbooks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch available books.");
        }
      })
      .then(function(data) {
        const booksList = document.getElementById("books-list");
        booksList.innerHTML = "";
  
        data.forEach(function(book) {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${book.book_id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.status}</td>
            <td>
              <button class="borrow-btn" onclick="borrowBook('${book.bookId}')" ${
            book.status === "BORROWED" ? "disabled" : ""
          }>Borrow</button>
            </td>
          `;
          booksList.appendChild(row);
        });
        console.log("${book.bookId}")
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  document.addEventListener("DOMContentLoaded", function() {
    // Fetch available books and populate the table
    fetchAvailableBooks();
  });
  // Function to borrow a book
  function borrowBook(bookId) {
    console.log("Borrowing Book ID:", bookId);
    const currentDate = new Date();
    const borrowedDate = currentDate.toISOString().split('T')[0]; // 
  
    const requestBody = {
      book_id: bookId,
      user_id: userID, 
      borrowed_date: borrowedDate,
    };
  
    // Send a request to the borrow book API with the provided bookId and constraints
    fetch("http://localhost:4000/member/borrowebook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(requestBody),
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to borrow the book.");
        }
      })
      .then(function(data) {
        
        fetchAvailableBooks();
      })
      .catch(function(error) {
        console.log(error);
      });
  }
 
  document.getElementById("books-list").addEventListener("click", function(event) {
    // Check if the clicked element is a Borrow button
    if (event.target.classList.contains("borrow-btn")) {
      // Get the book ID from the data attribute of the parent row
      const bookId = event.target.parentElement.parentElement.querySelector("td:first-child").innerText;
      borrowBook(bookId);
    }
  });
  
  
  function returnBook(bookId) {
   
    fetchAvailableBooks();
  }
  
  fetchAvailableBooks();