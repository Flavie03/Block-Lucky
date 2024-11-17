const hre = require("hardhat");

async function main() {
    // Récupérer les informations du déployeur
    const [deployer] = await hre.ethers.getSigners();
    console.log("Déploiement effectué par le compte :", deployer.address);

    // Vérifier le solde du compte déployeur
    const balance = await deployer.getBalance();
    console.log("Solde du compte déployeur :", hre.ethers.utils.formatEther(balance), "ETH");

    // Définir les paramètres spécifiques à Chainlink VRF
    const subscriptionId = "18937837101843293801075390789526235411224136465568933661299334245120768564488"; // Remplace par l'ID de ta souscription
    const vrfCoordinator = "0x9ddfaca8183c41ad55329bdeed9f6a8d53168b1b"; // Adresse VRF du réseau cible
    const keyHash = "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae"; // Key hash pour le réseau cible

    // Déployer le contrat Lottery
    const Lottery = await hre.ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy(subscriptionId, vrfCoordinator, keyHash);

    await lottery.deployed();

    console.log("Contrat Lottery déployé à l'adresse :", lottery.address);
}

main().catch((error) => {
    console.error("Erreur lors du déploiement :", error);
    process.exitCode = 1;
});
