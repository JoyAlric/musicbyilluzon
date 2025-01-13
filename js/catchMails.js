// Show the overlay
function showOverlay() {
    document.getElementById("overlay").style.display = "flex";
  }
  
  // Hide the overlay
  function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
  }
  

// Function to handle the email submission
function submitEmail() {
    const email = document.getElementById("email-input").value;
    
    // Validate email input
    if (!email || !validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Send the email to the Google Apps Script via POST request
    fetch("https://script.google.com/macros/s/AKfycbz1WJi1jw-GsFN8A-13ALiPTNNPyQmg_0fwvgSyAR6TBt_EhUGAkUJ-FPNnWgsZz3QE/exec", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "email=" + encodeURIComponent(email)  // Encode email value
    })
    .then(response => response.text())
    .then(data => {
        alert("Thank you for subscribing!");
        console.log(data);
        // Optionally, clear the input field
        document.getElementById("email-input").value = '';
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an issue submitting your email.");
    });
}

// Simple email validation function
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Function to hide the overlay (for close button)
function hideOverlay() {
    document.getElementById("overlay").style.display = 'none';
}