// demo-script.js

if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    // Request account access
    ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
        console.log('Connected account:', accounts[0]);  // MetaMask address
        document.getElementById('buy-ticket').addEventListener('click', () => {
            const contractAddress = 'YOUR_CONTRACT_ADDRESS';  // Replace with your contract address
            const contractABI = [  // Replace with your contract ABI
                {
                    "inputs": [],
                    "name": "buyTicket",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                }
            ];

            const contract = new web3.eth.Contract(contractABI, contractAddress);
            const userAddress = accounts[0]; // The user's address from MetaMask

            contract.methods.buyTicket().send({ from: userAddress, value: web3.utils.toWei('1', 'ether') })
            .then(receipt => {
                console.log('Transaction receipt:', receipt);
            })
            .catch(error => {
                console.error('Error buying ticket:', error);
            });
        });
    })
    .catch(err => {
        console.error('Error connecting to MetaMask:', err);
    });
} else {
    alert('Please install MetaMask!');
}
