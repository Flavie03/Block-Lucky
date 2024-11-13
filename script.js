function refreshBalance() {
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = (Math.random() * 100).toFixed(2) + " €"; // Exemple de mise à jour avec une valeur aléatoire
  }
  