// Protection des pages privées
function requireAuth() {
  const session = localStorage.getItem('jpp_session');
  if (!session) {
    window.location.href = 'login.html';
  }
}

// Connexion avec nettoyage de saisie (insensible à la casse / sans espaces parasites)
function login(e) {
  e.preventDefault();
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
    alert("❌ Identifiants incorrects (Essayer : admin / 1234)");
  }
}

// Inscription d'un nouvel utilisateur
function register(e) {
  e.preventDefault();
  const db = getDB();
  
  const newUser = {
    id: Date.now(),
    nom: document.getElementById('nom').value.trim(),
    email: document.getElementById('email').value.trim(),
    user: document.getElementById('user').value.trim().toLowerCase(),
    pass: document.getElementById('pass').value.trim()
  };

  db.users.push(newUser);
  saveDB(db);

  alert("Compte créé avec succès ! Connectez-vous.");
  window.location.href = 'login.html';
}

function logout() {
  localStorage.removeItem('jpp_session');
  window.location.href = 'login.ht
    ml';
}
