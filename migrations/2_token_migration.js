const Token = artifacts.require("Token");

module.exports = async function (deployer) {
  await deployer.deploy(Token, "NFT Game", "NFTG");
  let tokenInstance = await Token.deployed();
  await tokenInstance.mint(100, 300, 100000);
  await tokenInstance.mint(255, 100, 100000);
  let pet = await tokenInstance.getTokenDetails(0);
  console.log(pet);
};
