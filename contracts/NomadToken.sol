// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NomadToken is ERC20, Ownable {
    constructor() ERC20("Nomad Token", "NMD") {
        // Başlangıçta 1 milyon token oluştur
        _mint(msg.sender, 1000000 * 10**decimals());
    }
    
    // Gerekirse daha fazla token basmak için
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
} 