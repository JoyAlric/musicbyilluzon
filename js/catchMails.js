
const macro= process.env.SCRAPE;
console.log(`API URL from Vercel: ${macro}`);

// Show the overlay
function showOverlay() {
    document.getElementById("overlay").style.display = "flex";
  }
  
  // Hide the overlay
  function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
  }
  

  function submitEmail() {
    const email = document.getElementById("email-input").value;
    
    // Validate email input
    if (!email || !validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

     // Build the URL with the macro ID
    const url = `https://script.google.com/macros/s/${macro}/exec`;

    // Print the URL to check if it's working
    console.log("Sending request to:", url);

    // Send the email to the Google Apps Script via POST request
    fetch(url, {
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




