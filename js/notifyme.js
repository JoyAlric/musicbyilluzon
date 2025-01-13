// Show the overlay
function showOverlay() {
    document.getElementById("overlay").style.display = "flex";
  }
  
  // Hide the overlay
  function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
  }
  
  // Submit email
  function submitEmail() {
    const email = document.getElementById("email-input").value;

    // const email = 'test@test.com';
  
    if (email) {
      console.log("Email submitted:", email); // Store or send this email to your server
      alert("Thank you! Your email has been recorded.");
      hideOverlay();
    } else {
      alert("Please enter a valid email address.");
    }
  }