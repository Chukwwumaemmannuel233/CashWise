function toggleMenu() {
  document.getElementById("menuContent").classList.toggle("show");
}

// function toggleDropdown() {
//   document.getElementById("popupList").classList.toggle("show");
// }

// Close the menu and dropdown if the user clicks outside of them
window.onclick = function (event) {
  if (
    !event.target.matches(".menu-btn") &&
    !event.target.matches(".menu-content a")
  ) {
    var menuContent = document.getElementById("menuContent");
    // var popupList = document.getElementById("popupList");

    if (menuContent.classList.contains("show")) {
      menuContent.classList.remove("show");
    }

    //   if (popupList.classList.contains("show")) {
    //     popupList.classList.remove("show");
    //   }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const settingsIcon = document.getElementById("settingsIcon");
  const settingsPanel = document.getElementById("settingsPanel");
  const toggleSwitch = document.getElementById("modeToggle");

  // Check for saved mode in local storage
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark-mode");
    toggleSwitch.checked = true;
  }

  // Event listener for the settings icon
  settingsIcon.addEventListener("click", () => {
    settingsPanel.style.display =
      settingsPanel.style.display === "block" ? "none" : "block";
  });
  toggleSwitch.addEventListener("change", () => {
    if (toggleSwitch.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("dark-mode", "disabled");
    }
  });

  // Click outside the settings panel to close it
  document.addEventListener("click", (e) => {
    if (!settingsPanel.contains(e.target) && e.target !== settingsIcon) {
      settingsPanel.style.display = "none";
    }
  });
});
// Check if there are saved inputs in local storage
const savedInputs = localStorage.getItem("savedInputs");

if (savedInputs) {
  // Parse the saved inputs from JSON string to an array
  const inputsArray = JSON.parse(savedInputs);
  console.log(inputsArray);

  // Map the values to corresponding form fields
  document.getElementById("firstName").value = inputsArray[0] || ""; // First Name
  document.getElementById("email").value = inputsArray[1] || ""; // Email
}
document.getElementById("copyBtn").addEventListener("click", function (e) {
  // Get the link from the input field

  var link = document.getElementById("linkInput").value;
  e.preventDefault();
  linkInput.select();
  // Copy the link to the clipboard
  navigator.clipboard
    .writeText(link)
    .then(function () {
      // Display a message that the link has been copied
      var message = document.getElementById("message");
      message.style.display = "inline";
      setTimeout(function () {
        message.style.display = "none";
      }, 2000); // Message disappears after 2 seconds
    })
    .catch(function (err) {
      console.error("Failed to copy: ", err);
    });
});
document.getElementById("deleteBtn").addEventListener("click", function () {
  // Clear all saved data in localStorage
  localStorage.clear();

  // Redirect the user to the signup page
  window.location.href = "signup.html";
});
function toggleDropdown(dropdownId) {
  // Check screen size and apply different behavior
  const bigScreen = window.matchMedia("(min-width: 768px)");

  // If it's big screen, don't toggle, just return
  if (bigScreen.matches) {
    return; // Do nothing on large screens
  }

  // Get all dropdowns
  var dropdowns = document.querySelectorAll(".dropdown-content");

  // Close all dropdowns except the one that was clicked
  dropdowns.forEach(function (dropdown) {
    if (dropdown.id !== dropdownId) {
      dropdown.style.display = "none"; // Close others
    }
  });

  // Toggle the clicked dropdown
  var dropdown = document.getElementById(dropdownId);
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none"; // Hide if it's already open
  } else {
    dropdown.style.display = "block"; // Show the clicked dropdown
  }
}

// Detect screen size and apply different JavaScript behavior
function checkScreenSize() {
  const bigScreen = window.matchMedia("(min-width: 768px)");

  // For large screens, always show dropdown content and adjust style
  if (bigScreen.matches) {
    console.log("Big screen dropdown behavior active");

    // Always display the dropdown for big screens
    var dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach(function (dropdown) {
      dropdown.style.display = "block"; // Always show for big screens
      dropdown.style.marginLeft = "100px"; // Example styling for big screens
    });
  } else {
    console.log("Small screen dropdown behavior active");

    // Adjust dropdown for small screens, initially hidden
    var dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach(function (dropdown) {
      dropdown.style.display = "none"; // Hide by default for small screens
      dropdown.style.marginLeft = "0px"; // Adjust for small screens
    });
  }
}

// Call on page load
checkScreenSize();

// Optional: Re-run the function when the window is resized
window.addEventListener("resize", checkScreenSize);
function toggleMenu() {
  const menuContent = document.getElementById("menuContent");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const closeIcon = document.getElementById("closeIcon");
  const overlay = document.getElementById("overlay");

  // Toggle the menu content visibility
  menuContent.classList.toggle("active");
  overlay.classList.toggle("active");

  if (menuContent.classList.contains("active")) {
    // hamburgerIcon.style.display = "none"; // Hide hamburger icon
    closeIcon.style.display = "inline-block"; // Show close icon
  } else {
    closeMenu(); // Call the closeMenu function when the menu is not active
  }
}

// Close the menu and reset icons
function closeMenu() {
  const menuContent = document.getElementById("menuContent");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const closeIcon = document.getElementById("closeIcon");
  const overlay = document.getElementById("overlay");

  menuContent.classList.remove("active"); // Hide menu content
  overlay.classList.remove("active"); // Hide overlay
  // hamburgerIcon.style.display = "inline-block"; // Show hamburger icon
  closeIcon.style.display = "none"; // Hide close icon
}

// Handle clicks outside the menu to close it
window.onclick = function (event) {
  const menuContent = document.getElementById("menuContent");
  const overlay = document.getElementById("overlay");

  // Check if the clicked element is NOT the menu button, the menu content, or the close icon
  if (
    !event.target.closest(".menu-btn") &&
    !menuContent.contains(event.target) &&
    overlay.classList.contains("active")
  ) {
    closeMenu(); // Close the menu if clicked outside
  }
};

// Add event listener to the close icon to close the menu
document.getElementById("closeIcon").addEventListener("click", closeMenu);

// Add event listener for the overlay to close the menu when clicked
document.getElementById("overlay").addEventListener("click", closeMenu);



// Call the function whenever the window is resized
// window.addEventListener("resize", toggleSVGIcon);
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("menu");

  // Check if the page has been scrolled down
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
