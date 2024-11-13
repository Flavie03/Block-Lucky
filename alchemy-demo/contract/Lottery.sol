// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketPurchase {
    address public owner;

    // Event to notify when a ticket is bought
    event TicketBought(address buyer, uint256 amountPaid);

    constructor() {
        owner = msg.sender; // The contract owner is the address that deploys the contract
    }

    // Function to buy a ticket
    function buyTicket() public payable {
        // Ensure the buyer sends exactly 1 Ether
        require(msg.value == 0.01 ether, "You must send exactly 1 Ether to buy a ticket");

        // Emit an event to log the ticket purchase
        emit TicketBought(msg.sender, msg.value);

        // Logic for ticket purchase could go here, such as:
        // - Storing the ticket in a mapping
        // - Transferring funds to the owner
        payable(owner).transfer(msg.value); // Transfer the Ether to the owner
    }
}
