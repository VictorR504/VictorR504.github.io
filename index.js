function sendMessage(event) {
  if (event.key === "Enter") {
    // Get the user's input
    let userInput = document.getElementById("user-input").value;

    // Clear the input field
    document.getElementById("user-input").value = "";

    // Append the user's message to the chat
    appendMessage("User", userInput);
  }
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
