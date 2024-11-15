// Fonction pour ouvrir le popup de paiement
function openModal() {
  document.getElementById('paymentModal').style.display = 'flex';
}

// Fonction pour fermer le popup de paiement
function closeModal() {
  document.getElementById('paymentModal').style.display = 'none';
}

// Fonction pour afficher le popup de confirmation
function showConfirmation() {
  document.getElementById('confirmationModal').style.display = 'flex';
}

// Fonction de soumission des informations
function submitInformation() {
  const personName = document.getElementById('personName').value;
  const walletName = document.getElementById('walletName').value;
  const idUpload = document.getElementById('idUpload').files[0];

  if (personName && walletName && idUpload) {
      closeModal(); // Ferme le popup d'information
      showConfirmation(); // Affiche le popup de confirmation
  } else {
      alert('Veuillez remplir tous les champs et télécharger la carte d\'identité.');
  }
}

// Fonction pour poursuivre les achats
function continueShopping() {
  document.getElementById('confirmationModal').style.display = 'none';
  alert("Redirection vers la page d'accueil...");
}

// Fonction pour voir les billets achetés
function viewTickets() {
  document.getElementById('confirmationModal').style.display = 'none';
  alert("Redirection vers vos billets achetés...");
}

// Fonction pour rafraîchir le solde
function refreshBalance() {
  const balanceElement = document.getElementById('balance');
  balanceElement.textContent = (Math.random() * 100).toFixed(2) + ' €';
}
