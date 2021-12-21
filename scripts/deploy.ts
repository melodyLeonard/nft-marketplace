import { ethers } from 'hardhat';

async function main() {
  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');
  const nftMarketplace = await NFTMarketplace.deploy();
  await nftMarketplace.deployed();
  console.log('nftMarketplace------>', nftMarketplace.address);

  const NFT = await ethers.getContractFactory('NFT');
  const nft = await NFT.deploy(nftMarketplace.address);
  await nft.deployed();
  console.log('nft------>', nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
