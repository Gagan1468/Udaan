function sendQuick(text) {
    document.getElementById("userInput").value = text;
    sendMessage();
  }

function toggleMenu() {
  const menu = document.getElementById("dropdown-content");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function logoutUser() {
  localStorage.removeItem('prernaLoggedIn');
  localStorage.removeItem('prernaProfile');
  alert("Logged out successfully!");
  location.reload();
}

// Optional: close menu if clicking outside
window.onclick = function(event) {
  if (!event.target.matches('.dot-menu')) {
    const dropdown = document.getElementById("dropdown-content");
    if (dropdown && dropdown.style.display === "block") {
      dropdown.style.display = "none";
    }
  }
};
