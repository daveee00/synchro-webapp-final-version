// Funzione per aggiornare l'ora di sistema
function updateSystemTime() {
  const now = new Date(); // Prende la data e ora attuale

  // Ottieni ore e minuti con due cifre
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  // Formatta come "HH:MM"
  const formattedTime = `${hours}:${minutes}`;

  // Inserisci il tempo nell'elemento con id "system-time"
  const systemTimeEl = document.getElementById("system-time");
  if (systemTimeEl) {
    systemTimeEl.textContent = formattedTime;
  }
}

// Aggiorna subito l'ora al caricamento della pagina
updateSystemTime();

// Aggiorna ogni minuto per mantenerla corretta
setInterval(updateSystemTime, 60000);
