requireAuth();

function renderClients() {
  const db = getDB();
  const tbody = document.getElementById('table-clients');
  if(!tbody) return;
  
  tbody.innerHTML = '';
  db.clients.forEach(c => {
    tbody.innerHTML += `
      <tr class="border-b border-slate-100">
        <td class="p-4 font-semibold">${c.nom}</td>
        <td class="p-4">${c.tel}</td>
        <td class="p-4">${c.email}</td>
        <td class="p-4">${c.adresse}</td>
        <td class="p-4 text-right">
          <button onclick="deleteClient(${c.id})" class="text-rose-600 hover:bg-rose-50 p-2 rounded-lg"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>`;
  });
}

function saveClient(e) {
  e.preventDefault();
  const db = getDB();
  
  db.clients.push({
    id: Date.now(),
    nom: document.getElementById('client-nom').value,
    tel: document.getElementById('client-tel').value,
    email: document.getElementById('client-email').value,
    adresse: document.getElementById('client-adresse').value
  });

  saveDB(db);
  e.target.reset();
  renderClients();
}

function deleteClient(id) {
  const db = getDB();
  db.clients = db.clients.filter(c => c.id !== id);
  saveDB(db);
  renderClients();
}

document.addEventListener('DOMContentLoaded', renderClients);
