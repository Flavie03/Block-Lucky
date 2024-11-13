// Fonction pour ouvrir le popup de paiement
function openModal() {
  document.getElementById('paymentModal').style.display = 'flex';
}

// Fonction pour fermer le popup de paiement
function closeModal() {
  document.getElementById('paymentModal').style.display = 'none';
}

// Fonction pour traiter le paiement
function processPayment() {
  alert('Paiement en cours...');
  closeModal(); // Ferme le popup après le paiement
}

// Fonction pour rafraîchir le solde
function refreshBalance() {
  const balanceElement = document.getElementById('balance');
  balanceElement.textContent = (Math.random() * 100).toFixed(2) + ' €';
}
