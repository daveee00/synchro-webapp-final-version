// Funzione per aggiornare l'ora di sistema con secondi
function updateSystemTime() {
  const now = new Date(); // Prende la data e ora attuale

  // Ottieni ore, minuti e secondi con due cifre
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Formatta come "HH:MM:SS"
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Inserisci il tempo nell'elemento con id "system-time"
  const systemTimeEl = document.getElementById("system-time");
  if (systemTimeEl) {
    systemTimeEl.textContent = formattedTime;
  }
}

// Aggiorna subito l'ora al caricamento della pagina
updateSystemTime();

// Aggiorna ogni secondo per mantenere i secondi in tempo reale
setInterval(updateSystemTime, 1000);
