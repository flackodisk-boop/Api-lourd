function handleLogin(e) {
  e.preventDefault();

  if (typeof initDB === "function") initDB();

  // Nettoyage de la saisie (retire les espaces et ignore les majuscules)
  const userInput = document.getElementById('username').value.trim().toLowerCase();
  const passInput = document.getElementById('password').value.trim();

  const db = getDB();
  
  const foundUser = db.users.find(
    u => u.user.toLowerCase() === userInput && u.pass === passInput
  );

  if (foundUser) {
    localStorage.setItem('jpp_session', JSON.stringify(foundUser));
    window.location.href = 'dashboard.html';
  } else {
    alert("❌ Identifiants incorrects\n\nNom d'utilisateur : admin\nMot de passe : 1234");
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
  window.location.href = 'login.html';
}
