let importi = [];
const membri = ["Andrea","Gaetano","Margen","Simone","Manuela","Dmitri"];
const API_URL = "https://TUO_BACKEND.onrender.com/invia-mance";

function aggiornaStatistiche() {
  const statBox = document.getElementById('statistiche');
  const msgBox = document.getElementById('messaggio');

  if (importi.length === 0) {
    statBox.textContent = "📊 Nessuna mancia inserita";
    msgBox.value = "";
    return;
  }

  const totale = importi.reduce((a,b)=>a+b,0);
  const perPersona = (totale/membri.length).toFixed(2);

  statBox.innerHTML = `📊 Totale: €${totale}<br>➗ Divisione: €${perPersona} a testa`;

  let messaggio = `📢 Mancia Totale: €${totale}\n\n💸 Divisione:\n`;
  membri.forEach(m => messaggio += `🔹 ${m} → €${perPersona}\n`);
  messaggio += `\n✅ Buon lavoro a tutti!`;

  msgBox.value = messaggio;
}

function aggiungiImporto() {
  const val = parseFloat(document.getElementById('importo').value);
  if (!val) { alert("Inserisci un importo valido"); return; }
  importi.push(val);
  document.getElementById('importo').value = "";
  aggiornaStatistiche();
}

function inviaMance() {
  if (importi.length === 0) { alert("Inserisci almeno un importo"); return; }

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ importi })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("✅ Messaggio inviato al gruppo Telegram!");
      importi = [];
      aggiornaStatistiche();
    } else {
      alert("❌ Errore: " + data.error);
    }
  })
  .catch(err => alert("❌ Errore: " + err.message));
}
