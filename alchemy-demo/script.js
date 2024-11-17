let web3;
let contract;
let userAccount;

const contractAddress = '0x2F7Ca7235e033a49518A814f602965046D31FA09'; // Remplacez par l'adresse de votre contrat
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "LotteryReset",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountPaid",
                "type": "uint256"
            }
        ],
        "name": "TicketBought",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "winner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "prizeAmount",
                "type": "uint256"
            }
        ],
        "name": "WinnerSelected",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "buyTicket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getParticipants",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lotteryWallet",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "maxTickets",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "participants",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ticketPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalTicketsSold",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawAccidentalFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];


window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);

        // Demander à l'utilisateur de se connecter à MetaMask
        const connectButton = document.getElementById("connect");
        connectButton.addEventListener('click', async () => {
            try {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                userAccount = accounts[0];
                console.log("Connected:", userAccount);

                contract = new web3.eth.Contract(contractABI, contractAddress);
                console.log("Contract initialized:", contract);

                connectButton.innerText = 'Connected to MetaMask';
            } catch (error) {
                console.error("Connection failed:", error);
            }
        });
    } else {
        alert("Please install MetaMask to use this dApp");
    }
});

// Fonction pour acheter un ticket
const buyButton = document.getElementById("buy-ticket");
buyButton.addEventListener('click', async () => {
    if (!userAccount) {
        alert("Please connect your MetaMask wallet.");
        return;
    }

    if (!contract) {
        alert("Contract is not initialized.");
        return;
    }

    const ticketPrice = web3.utils.toWei('0.01', 'ether'); // Prix du ticket en Wei

    try {
        const receipt = await contract.methods.buyTicket().send({
            from: userAccount,
            value: ticketPrice
        });
        console.log('Transaction successful:', receipt);
    } catch (error) {
        console.error('Error purchasing ticket:', error);
    }
});

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