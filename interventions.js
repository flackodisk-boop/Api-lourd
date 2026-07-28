requireAuth();

function renderInterventions() {
  const db = getDB();
  const tbody = document.getElementById('table-interventions');
  const select = document.getElementById('inter-client');
  if(!tbody) return;

  // Remplir le dropdown des clients
  if(select) {
    select.innerHTML = '';
    db.clients.forEach(c => {
      select.innerHTML += `<option value="${c.id}">${c.nom}</option>`;
    });
  }

  tbody.innerHTML = '';
  db.interventions.forEach(i => {
    const client = db.clients.find(c => c.id == i.clientId);
    tbody.innerHTML += `
      <tr class="border-b border-slate-100">
        <td class="p-4 font-semibold">${client ? client.nom : 'Inconnu'}</td>
        <td class="p-4">${i.desc}</td>
        <td class="p-4"><span class="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-50 text-blue-600">${i.statut}</span></td>
        <td class="p-4 text-right">
          <button onclick="deleteIntervention(${i.id})" class="text-rose-600 hover:bg-rose-50 p-2 rounded-lg"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>`;
  });
}

function saveIntervention(e) {
  e.preventDefault();
  const db = getDB();
  db.interventions.push({
    id: Date.now(),
    clientId: document.getElementById('inter-client').value,
    desc: document.getElementById('inter-desc').value,
    statut: document.getElementById('inter-statut').value
  });
  saveDB(db);
  e.target.reset();
  renderInterventions();
}

function deleteIntervention(id) {
  const db = getDB();
  db.interventions = db.interventions.filter(i => i.id !== id);
  saveDB(db);
  renderInterventions();
}

document.addEventListener('DOMContentLoaded', renderIntervent
                          ions);
