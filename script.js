// Fonction pour afficher la section "CHOISISSEZ VOTRE/VOS BILLET(S)"
function showTicketSelection() {
  document.getElementById('ticketSelection').style.display = 'block';
}

// Ajout de l'événement au bouton "NUMÉRO DE RECHERCHE"
document.querySelector('.search-button').addEventListener('click', showTicketSelection);

// Fonction pour afficher la section "MES BILLETS"
function showTicketSummary() {
  document.getElementById('ticketSummary').style.display = 'block';
}

// Ajout de l'événement à tous les boutons "AJOUTER AU PANIER"
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', showTicketSummary);
});

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
  const confirmationModal = document.getElementById('confirmationModal');
  confirmationModal.style.display = 'flex';
}

// Fonction pour soumettre les informations de paiement
function submitInformation() {
  const personName = document.getElementById('personName').value;
  const walletName = document.getElementById('walletName').value;
  const idUpload = document.getElementById('idUpload').files[0];

  if (personName && walletName && idUpload) {
      closeModal();
      showConfirmation();
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
