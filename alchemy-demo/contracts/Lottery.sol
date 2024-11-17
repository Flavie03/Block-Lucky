// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";

contract Lottery is VRFConsumerBaseV2 {
    address public owner;
    address public lotteryWallet = 0x1234567890AbcdEF1234567890aBcdef12345678; // Assure-toi qu'elle est en checksum
    uint256 public ticketPrice = 0.01 ether; // Prix par ticket
    uint256 public totalTicketsSold; // Nombre total de tickets vendus
    uint256 public maxTickets = 10000; // Limite de tickets pour démarrer la loterie

    address[] public participants; // Liste des participants

    // Chainlink VRF
    VRFCoordinatorV2Interface COORDINATOR;
    uint64 s_subscriptionId;
    bytes32 keyHash;
    uint16 requestConfirmations = 3;
    uint32 callbackGasLimit = 100000;
    uint256[] public s_randomWords;
    uint256 public s_requestId;
    address public winner;

    // Événements
    event TicketBought(address indexed buyer, uint256 amountPaid);
    event WinnerSelected(address indexed winner, uint256 prizeAmount);
    event LotteryReset();

    // Modificateur pour restreindre l'accès aux fonctions réservées au propriétaire
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Constructeur
    constructor(uint64 subscriptionId, address vrfCoordinator, bytes32 _keyHash)
        VRFConsumerBaseV2(vrfCoordinator)
    {
        owner = msg.sender;
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        keyHash = _keyHash;
    }

    // Fonction pour acheter un ticket
    function buyTicket() public payable {
        require(msg.value == ticketPrice, "You must send exactly 0.01 Ether to buy a ticket");
        require(totalTicketsSold < maxTickets, "All tickets are sold out!");

        // Ajouter l'acheteur à la liste des participants
        participants.push(msg.sender);
        totalTicketsSold++;

        // Transférer les fonds au wallet de la loterie
        payable(lotteryWallet).transfer(msg.value);

        emit TicketBought(msg.sender, msg.value);

        // Démarrer la loterie si 10,000 tickets sont vendus
        if (totalTicketsSold == maxTickets) {
            pickWinner();
        }
    }

    // Fonction pour démarrer le tirage avec Chainlink VRF
    function pickWinner() private {
        require(totalTicketsSold == maxTickets, "Lottery not ready yet");

        // Demander un numéro aléatoire sécurisé via Chainlink VRF
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            1 // Générer 1 numéro aléatoire
        );
    }

    // Callback de Chainlink VRF pour traiter le numéro aléatoire
    function fulfillRandomWords(uint256, uint256[] memory randomWords) internal override {
        s_randomWords = randomWords;
        uint256 winnerIndex = randomWords[0] % participants.length;
        winner = participants[winnerIndex];

        uint256 prizeAmount = address(this).balance;

        emit WinnerSelected(winner, prizeAmount);

        // Transférer le solde total au gagnant
        payable(winner).transfer(prizeAmount);

        resetLottery();
    }

    // Fonction pour réinitialiser la loterie
    function resetLottery() private {
        totalTicketsSold = 0;
        delete participants;
        winner = address(0);

        emit LotteryReset();
    }

    // Fonction pour récupérer le solde du contrat
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
