function handleLogin(e) {
  e.preventDefault();
  
  const userInput = document.getElementById('username').value.trim().toLowerCase();
  const passInput = document.getElementById('password').value.trim();

  const db = getDB();
  
  // Flexible username check (case insensitive)
  const userFound = db.users.find(
    u => u.user.toLowerCase() === userInput && u.pass === passInput
  );

  if (userFound) {
    localStorage.setItem('jpp_session', JSON.stringify(userFound));
    window.location.href = 'dashboard.html';
  } else {
    alert("❌ Invalid credentials\n\nUsername: admin\nPassword: 1234");
  }
}

function requireAuth() {
  const session = localStorage.getItem('jpp_session');
  if (!session) {
    window.location.href = 'login.html';
  }
}

function logout() {
  localStorage.removeItem('jpp_session');
  window.location.href = 'login.html'
    ;
}
