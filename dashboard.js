

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

let accountBalance = 0.00;
let totalViews = 0;
let currentVideoIndex = 1;

function retrieveStoredData() {
  const storedBalance = localStorage.getItem('accountBalance');
  const storedViews = localStorage.getItem('totalViews');
  
  // If values are found in localStorage, update the variables and display them
  if (storedBalance !== null) {
      accountBalance = parseFloat(storedBalance);
      document.getElementById('accountBalance').innerText = accountBalance.toFixed(2);
  
    }

  if (storedViews !== null) {
      totalViews = parseInt(storedViews, 10);
      document.getElementById('totalViews').innerText = totalViews;
  }
}

// Function to update balance and views
function updateAccount(price) {
    accountBalance += parseFloat(price);
    totalViews++;
    document.getElementById('accountBalance').innerText = accountBalance.toFixed(2);
    document.getElementById('totalViews').innerText = totalViews;

    localStorage.setItem('accountBalance', accountBalance.toFixed(2));
    localStorage.setItem('totalViews', totalViews);
}

// Function to handle when video ends
function handleVideoEnd() {
    const currentVideoContainer = document.getElementById('video' + currentVideoIndex);
    const videoPrice = currentVideoContainer.getAttribute('data-price');

    // Update account balance and views
    updateAccount(videoPrice);

    // Hide current video and show the next one
    currentVideoContainer.style.display = 'none';
    currentVideoIndex++;
    const nextVideoContainer = document.getElementById('video' + currentVideoIndex);

    if (nextVideoContainer) {
        nextVideoContainer.style.display = 'block'; // Show the next video
    } else {
        alert('You have watched all the videos!');
    }
}

// Only allow credit when the video is fully watched
function handleVideoPlay(videoElement) {
    videoElement.addEventListener('ended', handleVideoEnd);
}

// Function to toggle video controls dynamically
function toggleVideoControls(videoElement) {
  // Ensure controls are removed (no controls will be shown)
  videoElement.removeAttribute("controls");
}

// Initialize the first video and apply event listeners for controls
function initializeVideos() {
    document.getElementById('video1').style.display = 'block'; // Show the first video

    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
        handleVideoPlay(video); // Add event listener for video end
        toggleVideoControls(video); // Toggle controls dynamically
    });
}

window.addEventListener('load', () => {
  retrieveStoredData(); // Load account balance and views from localStorage
  initializeVideos(); // Initialize the videos and event listeners
});
// Call the initialize function when the page loads
initializeVideos();

// Button functionality to play/pause video
const buttons = document.querySelectorAll('button[data-video]');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const videoId = button.getAttribute('data-video');
        // Find the video inside the container with the videoId
        const video = document.querySelector(`#${videoId} video`); // Target the video element inside the container

        if (video.paused) {
            video.play();
        } 
    });
});