let web3;
let contract;
let userAccount;
const contractAddress = '0x2F7Ca7235e033a49518A814f602965046D31FA09';  // Remplacez par l'adresse réelle du contrat
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_ticketPrice",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
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
                "name": "ticketCount",
                "type": "uint256"
            }
        ],
        "name": "TicketPurchased",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "buyTicket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    // Continuez à ajouter toutes les autres entrées de l'ABI...
];;

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
