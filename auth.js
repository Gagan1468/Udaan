// Toggle between login and register
function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
  }
  
  function showLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
  }
  
  // Show login box
  document.getElementById('openLoginBtn').addEventListener('click', function () {
    const loginBox = document.getElementById('loginBox');
    loginBox.style.display = loginBox.style.display === 'none' ? 'block' : 'none';
  });
  
  // Handle Registration
  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
  
    if (localStorage.getItem(username)) {
      alert('Username already exists!');
    } else {
      localStorage.setItem(username, password);
      alert('Registered successfully! Please login.');
      showLogin();
    }
  });
  
  // Handle Login
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const storedPassword = localStorage.getItem(username);
  
    if (storedPassword === password) {
      alert('Login successful! Welcome, ' + username + ' 💖');
      document.getElementById('loginBox').style.display = 'none';
      document.getElementById('openLoginBtn').innerText = 'Logged in as ' + username;
    } else {
      alert('Incorrect username or password.');
    }
  });
  