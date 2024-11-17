# Lottery Smart Contract with Web3.js

Ce projet implémente un contrat intelligent de loterie avec Chainlink VRF pour générer des numéros aléatoires sécurisés. Il est intégré dans une dApp permettant aux utilisateurs d'acheter des tickets et de participer à la loterie via leur portefeuille MetaMask.

## Table des matières

- [Description](#description)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Déploiement du contrat](#déploiement-du-contrat)
- [Utilisation de la dApp](#utilisation-de-la-dapp)
- [Structure du projet](#structure-du-projet)
- [Contributeurs](#contributeurs)
- [Licence](#licence)

## Description

Ce projet consiste en un contrat intelligent déployé sur la blockchain Ethereum qui permet aux utilisateurs d'acheter des tickets pour participer à une loterie. Une fois que 10 000 tickets ont été vendus, le contrat sélectionne un gagnant de manière aléatoire grâce à l'oracle Chainlink VRF. Les utilisateurs peuvent interagir avec le contrat via une interface front-end connectée à MetaMask.

## Prérequis

Avant de commencer, assure-toi d'avoir les éléments suivants installés sur ta machine :

- **Node.js** (version 16 ou supérieure)
- **MetaMask** (pour connecter ton portefeuille Ethereum)
- **Hardhat** ou **Truffle** (selon la méthode que tu utilises pour déployer le contrat)
- **Ganache** ou un autre fournisseur de réseau Ethereum local pour tester les transactions
- **Web3.js** ou **Ethers.js** (pour interagir avec la blockchain dans le front-end)

## Installation

### Cloner ce dépôt

```bash
git clone https://github.com/ton-username/ton-projet.git
cd ton-projet
