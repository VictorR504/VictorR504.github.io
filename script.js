
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    // Perform login validation (example)
    if (username === "admin" && password === "password") {
      alert("Login successful!");
      // Redirect to another page or perform other actions
      window.location.href = "personal-page.html";
    } else {
      alert("Invalid username or password!");
    }
  });