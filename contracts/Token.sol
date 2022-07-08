//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC721, Ownable {
    struct Pet {
        uint8 element;
        uint256 damage;
        uint256 defend;
        uint256 lastMeal;
        uint256 endurance;
        uint256 experience;
        uint256 level;
        uint8 isLock;
    }

    uint256 nextId = 0;

    mapping(uint256 => Pet) private _tokenDetails;

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    function mint(
        uint8 element,
        uint256 damage,
        uint256 defend,
        uint256 endurance,
        uint256 experience,
        uint256 level,
        uint8 isLock
    ) public onlyOwner {
        _safeMint(msg.sender, nextId);

        _tokenDetails[nextId] = Pet(
            element,
            damage,
            defend,
            block.timestamp,
            endurance,
            experience,
            level,
            isLock
        );
        nextId++;
    }

    function getTokenDetails(uint256 tokenId) public view returns (Pet memory) {
        return _tokenDetails[tokenId];
    }

    function getAllTokens() public view returns (Pet[] memory) {
        if (nextId == 0) {
            return new Pet[](0);
        } else {
            Pet[] memory result = new Pet[](nextId);

            for (uint256 index = 0; index < nextId; index++) {
                result[index] = _tokenDetails[index];
            }
            return result;
        }
    }

    function unLock(uint256 tokenId) public {
        Pet storage pet = _tokenDetails[tokenId];
        require(pet.isLock == 1);
        pet.isLock = 0;
    }

    function receiveExperience(uint256 tokenId, uint256 exp) public {
        Pet storage pet = _tokenDetails[tokenId];
        require(pet.isLock == 0);
        pet.experience += exp;

        while (true) {
            if (pet.experience >= 100 * pet.level) {
                pet.experience -= 100 * pet.level;
                pet.level++;
                pet.damage = 100 + pet.level * 20;
                pet.defend = 100 + pet.level * 10;
            } else {
                break;
            }
        }
    }

    function feed(uint256 tokenId) public {
        Pet storage pet = _tokenDetails[tokenId];
        require(pet.isLock == 0);
        pet.lastMeal = block.timestamp;
    }

    // function _beforeTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 tokenId
    // ) internal override {
    //     Pet storage pet = _tokenDetails[tokenId];
    //     require(pet.lastMeal + pet.endurance > block.timestamp);
    // }
}
