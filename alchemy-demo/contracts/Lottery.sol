// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address public owner;
    uint256 public totalTicketsSold;
    address[] public participants; // Tableau des participants
    uint256 public ticketPrice;

    // Evénement pour notifier l'achat d'un ticket
    event TicketPurchased(address indexed buyer, uint256 ticketCount);

    constructor(uint256 _ticketPrice) {
        owner = msg.sender; // Le propriétaire du contrat est celui qui le déploie
        ticketPrice = _ticketPrice; // Définir le prix du ticket
    }

    // Fonction pour acheter un ticket
    function buyTicket() public payable {
        require(msg.value == ticketPrice, "Ticket price is incorrect");

        totalTicketsSold++;
        participants.push(msg.sender); // Ajouter l'acheteur à la liste des participants

        emit TicketPurchased(msg.sender, 1); // Emit l'événement TicketPurchased
    }

    // Fonction pour récupérer le nombre total de participants
    function getParticipantsCount() public view returns (uint256) {
        return participants.length;
    }

    // Fonction pour récupérer l'adresse du participant à un index donné
    function getParticipant(uint256 index) public view returns (address) {
        require(index < participants.length, "Index out of bounds");
        return participants[index];
    }

    // Fonction pour choisir un gagnant aléatoire
    function selectWinner() public onlyOwner {
        require(totalTicketsSold > 0, "No tickets sold");

        // Calculer un index aléatoire
        uint256 winnerIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % participants.length;

        address winner = participants[winnerIndex];

        // Récompenser le gagnant
        payable(winner).transfer(address(this).balance); // Transférer la balance du contrat au gagnant
    }

    // Fonction pour récupérer le solde du contrat
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Modificateur qui vérifie si l'appelant est le propriétaire du contrat
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Fonction pour récupérer le prix d'un ticket
    function getTicketPrice() public view returns (uint256) {
        return ticketPrice;
    }
}
