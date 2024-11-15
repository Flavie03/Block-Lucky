async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Le prix du ticket est fixé à 0.01 ether (ajustez-le selon vos besoins)
    const ticketPrice = ethers.utils.parseEther("0.01");
  
    // Déploiement du contrat
    const Lottery = await ethers.getContractFactory("Lottery");
    const lottery = await Lottery.deploy(ticketPrice);
  
    console.log("Lottery contract deployed to:", lottery.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  