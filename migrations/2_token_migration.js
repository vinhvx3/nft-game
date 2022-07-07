const Token = artifacts.require("Token");

module.exports = async function (deployer) {
  await deployer.deploy(Token, "NFT Game", "NFTG");
  let tokenInstance = await Token.deployed();
  await tokenInstance.mint(1, 100, 100, 100000, 0, 1, 1);
  await tokenInstance.mint(2, 100, 100, 100000, 0, 1, 1);
  await tokenInstance.mint(3, 100, 100, 100000, 0, 1, 1);

  let pets = await tokenInstance.getAllTokens();
  console.log(pets);
};
