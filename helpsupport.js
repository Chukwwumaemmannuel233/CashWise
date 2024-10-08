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

// Get the text and dropdown content elements
const dropdownTexts = document.querySelectorAll(".dropdownText");
const dropdownContents = document.querySelectorAll(".dropdownContent");
const dropdownContainers = document.querySelectorAll(".dropdown");
function closeAllDropdowns() {
  dropdownContainers.forEach((container, index) => {
    container.classList.remove("active");
    dropdownContents[index].classList.remove("show");
  });
}

// Add a click event to show/hide the message
dropdownTexts.forEach((text, index) => {
  text.addEventListener("click", function () {
    const container = dropdownContainers[index];
    const content = dropdownContents[index];

    // If this dropdown is already open, close it
    if (container.classList.contains("active")) {
      container.classList.remove("active");
      content.classList.remove("show");
    } else {
      // Close all other dropdowns
      closeAllDropdowns();

      // Open the clicked dropdown
      container.classList.add("active");
      content.classList.add("show");
    }
  });
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

function toggleSVGIcon() {
  const menuIcon = document.getElementById("set-image");
  const windowWidth = window.innerWidth;

//   if (windowWidth >= 768) {
//     // Assuming 768px or larger is full-screen
//     // menuIcon.style.display = "none"; // Hide the SVG icon
//   } else {
//     // menuIcon.style.display = "block"; // Show the SVG icon for smaller screens
//   }
// }
}
// Call the function on page load
toggleSVGIcon();

// Call the function whenever the window is resized
window.addEventListener("resize", toggleSVGIcon);
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("menu");

  // Check if the page has been scrolled down
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
