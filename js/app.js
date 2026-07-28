function initDB() {
  let db = localStorage.getItem('jpp_db');
  if (!db) {
    const defaultData = {
      users: [{ id: 1, nom: "Admin", user: "admin", pass: "1234" }],
      clients: [{ id: 1, nom: "Dupont Jean", tel: "0601020304", email: "jean@dupont.fr", adresse: "10 Rue de Paris" }],
      interventions: [{ id: 1, clientId: 1, desc: "Fuite d'eau évier", statut: "En cours" }],
      stock: [{ id: 1, nom: "Joint Teflon", qte: 50, prix: 1.5 }],
      caTotal: 1250.00
    };
    localStorage.setItem('jpp_db', JSON.stringify(defaultData));
  }
}

function getDB() {
  initDB();
  return JSON.parse(localStorage.getItem('jpp_db'));
}

function saveDB(data) {
  localStorage.setItem('jpp_db', JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', initDB);
