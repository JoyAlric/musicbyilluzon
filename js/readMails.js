async function submitEmail() {
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();
  
    // Clear previous notifications
    const notificationContainer = document.getElementById('notification-container');
    notificationContainer.innerHTML = ''; // Clear the previous notifications
  
    // Validate the email
    if (!email) {
      // If the input is empty, show an error notification
      showNotification('Email address cannot be left blank. Please enter your email.', 'error', '❌');
      return;
    }
  
    // Regular expression to check for a valid email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      // If the email is in the wrong format, show an error notification
      showNotification('Invalid email format. Please check your email address.', 'error', '❌');
      return;
    }
  
    // Replace this with the actual Google Apps Script Web App URL
    const url = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL'; // Replace with your actual URL
  
    try {
      // Send the email to the Google Apps Script Web App via POST request
      const response = await fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ email: email }), // Send the email as form data
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
  
      // Check the response from the Google Apps Script
      const data = await response.json();
  
      // Clear the email input field and show a success notification
      emailInput.value = '';
      showNotification('You have successfully signed up for notifications!', 'success', '✅');
      
    } catch (error) {
      // In case of an error, show an error notification
      showNotification('There was an error. Please try again later.', 'error', '❌');
      console.error('Error:', error);
    }
  }
  
  // Function to show the notification box
  function showNotification(message, type, icon) {
    const notificationContainer = document.getElementById('notification-container');
  
    // Create a new notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`; // Add the appropriate class for success/error
  
    // Create an icon element for the notification
    const iconElement = document.createElement('span');
    iconElement.className = 'notification-icon';
    iconElement.innerText = icon;
  
    // Create a message element for the notification
    const messageElement = document.createElement('span');
    messageElement.innerText = message;
  
    // Create a close button for the notification
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close-btn';
    closeButton.innerText = '×'; // Close button text (cross)
    closeButton.onclick = () => {
      notification.style.opacity = 0; // Fade out the notification
      setTimeout(() => {
        notificationContainer.removeChild(notification); // Remove the notification from the container
      }, 500); // Wait for the fade-out transition
    };
  
    // Append the elements to the notification
    notification.appendChild(iconElement);
    notification.appendChild(messageElement);
    notification.appendChild(closeButton);
  
    // Append the notification to the container
    notificationContainer.appendChild(notification);
  
    // Make the notification visible
    notification.style.display = 'flex';
  
    // Fade out and remove the notification after 5 seconds
    setTimeout(() => {
      notification.style.opacity = 0; // Fade out
      setTimeout(() => {
        notificationContainer.removeChild(notification); // Remove the notification after it disappears
      }, 500); // Delay removal after fade out
    }, 5000); // 5 seconds
  }
  