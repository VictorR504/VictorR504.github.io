function sendMessage(event) {
  if (event.key === "Enter") {
    // Get the user's input
    let userInput = document.getElementById("user-input").value;

    // Clear the input field
    document.getElementById("user-input").value = "";

    // Append the user's message to the chat
    appendMessage("User", userInput);

    // Send the message to the server
    sendToServer(userInput);
  }
}

function sendToServer(message) {
  fetch("http://192.168.0.2:80", {
    // Replace with your server's address and port
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Process the response from the server (if needed)
      console.log("Server response:", data);
    })
    .catch((error) => {
      console.error("Error sending message to server:", error);
    });
}

function appendMessage(sender, message) {
  // Get the messages container
  let messagesContainer = document.getElementById("messages");

  // Create a new message element
  let messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;

  // Append the message to the container
  messagesContainer.appendChild(messageElement);

  // Scroll to the bottom to show the latest message
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
