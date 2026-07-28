// Initialize database in LocalStorage if empty
function initDB() {
  if (!localStorage.getItem('jpp_db')) {
    const defaultData = {
      users: [{ id: 1, nom: "Admin", user: "admin", pass: "1234" }],
      clients: [{ id: 1, nom: "John Doe", tel: "0601020304", email: "john@doe.com", adresse: "10 Main Street" }],
      interventions: [{ id: 1, clientId: 1, desc: "Sink water leak", statut: "In Progress" }],
      stock: [{ id: 1, nom: "Teflon Tape", qte: 50, prix: 1.5 }],
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

document.addEventListener('DOMContentLoaded', initD
                          B);
