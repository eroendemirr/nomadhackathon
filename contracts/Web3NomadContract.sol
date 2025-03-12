// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Web3NomadContract is Ownable, ReentrancyGuard, Pausable {
    IERC20 public rewardToken;
    
    // Kullanıcı bilgileri için struct
    struct UserInfo {
        uint256 stakedAmount;
        uint256 booksRead;
        uint256 lastRewardClaim;
        uint256 totalRewardsClaimed;
        bool isStaking;
    }
    
    // Stake için gereken minimum ve maksimum miktar
    uint256 public constant MINIMUM_STAKE_AMOUNT = 100 * 10**18; // 100 token
    uint256 public constant MAXIMUM_STAKE_AMOUNT = 10000 * 10**18; // 10000 token
    
    // Ödül almak için gereken minimum kitap sayısı
    uint256 public constant MINIMUM_BOOKS_FOR_REWARD = 3;
    
    // Ödül miktarı
    uint256 public constant REWARD_AMOUNT = 10 * 10**18; // 10 token
    
    // Toplam istatistikler
    uint256 public totalStaked;
    uint256 public totalRewardsDistributed;
    uint256 public totalBooksRead;
    uint256 public totalUsers;
    
    // Kullanıcı bilgilerini tutan mapping
    mapping(address => UserInfo) public users;
    
    // Tamamlanan kitapları tutan mapping
    mapping(address => mapping(uint256 => bool)) public completedBooks;
    
    // Eventler
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event BookCompleted(address indexed user, uint256 bookId, uint256 totalBooksRead);
    event RewardClaimed(address indexed user, uint256 amount, uint256 totalRewardsClaimed);
    event ContractPaused(address indexed by);
    event ContractUnpaused(address indexed by);
    
    constructor(address _rewardToken) {
        require(_rewardToken != address(0), "Gecersiz token adresi");
        rewardToken = IERC20(_rewardToken);
    }
    
    // Token stake etme fonksiyonu
    function stake(uint256 _amount) external nonReentrant whenNotPaused {
        require(_amount >= MINIMUM_STAKE_AMOUNT, "Yetersiz stake miktari");
        require(_amount <= MAXIMUM_STAKE_AMOUNT, "Cok yuksek stake miktari");
        require(!users[msg.sender].isStaking, "Zaten stake edilmis");
        
        // Transfer işlemi
        require(rewardToken.transferFrom(msg.sender, address(this), _amount), "Transfer basarisiz");
        
        // Yeni kullanıcıysa sayacı artır
        if (users[msg.sender].stakedAmount == 0) {
            totalUsers++;
        }
        
        // Kullanıcı bilgilerini güncelle
        users[msg.sender] = UserInfo({
            stakedAmount: _amount,
            booksRead: 0,
            lastRewardClaim: block.timestamp,
            totalRewardsClaimed: 0,
            isStaking: true
        });
        
        totalStaked += _amount;
        emit Staked(msg.sender, _amount);
    }
    
    // Token unstake etme fonksiyonu
    function unstake() external nonReentrant whenNotPaused {
        UserInfo storage user = users[msg.sender];
        require(user.isStaking, "Stake edilmemis");
        
        uint256 amount = user.stakedAmount;
        
        // Kullanıcı bilgilerini sıfırla
        user.stakedAmount = 0;
        user.isStaking = false;
        totalStaked -= amount;
        
        // Transfer işlemi
        require(rewardToken.transfer(msg.sender, amount), "Transfer basarisiz");
        
        emit Unstaked(msg.sender, amount);
    }
    
    // Kitap tamamlama fonksiyonu
    function completeBook(uint256 _bookId) external whenNotPaused {
        require(users[msg.sender].isStaking, "Once stake etmelisiniz");
        require(!completedBooks[msg.sender][_bookId], "Bu kitap zaten tamamlanmis");
        
        completedBooks[msg.sender][_bookId] = true;
        users[msg.sender].booksRead += 1;
        totalBooksRead += 1;
        
        emit BookCompleted(msg.sender, _bookId, users[msg.sender].booksRead);
    }
    
    // Ödül talep etme fonksiyonu
    function claimReward() external nonReentrant whenNotPaused {
        UserInfo storage user = users[msg.sender];
        require(user.isStaking, "Once stake etmelisiniz");
        require(user.booksRead >= MINIMUM_BOOKS_FOR_REWARD, "Yetersiz kitap sayisi");
        require(block.timestamp >= user.lastRewardClaim + 1 days, "Cok erken");
        
        // Kontrat bakiyesini kontrol et
        require(rewardToken.balanceOf(address(this)) >= REWARD_AMOUNT, "Yetersiz kontrat bakiyesi");
        
        // Ödül transferi
        require(rewardToken.transfer(msg.sender, REWARD_AMOUNT), "Transfer basarisiz");
        
        // İstatistikleri güncelle
        user.lastRewardClaim = block.timestamp;
        user.totalRewardsClaimed += REWARD_AMOUNT;
        totalRewardsDistributed += REWARD_AMOUNT;
        
        emit RewardClaimed(msg.sender, REWARD_AMOUNT, user.totalRewardsClaimed);
    }
    
    // View fonksiyonları
    function getUserInfo(address _user) external view returns (
        uint256 stakedAmount,
        uint256 booksRead,
        uint256 lastRewardClaim,
        uint256 totalRewardsClaimed,
        bool isStaking
    ) {
        UserInfo memory user = users[_user];
        return (
            user.stakedAmount,
            user.booksRead,
            user.lastRewardClaim,
            user.totalRewardsClaimed,
            user.isStaking
        );
    }
    
    function isBookCompleted(address _user, uint256 _bookId) external view returns (bool) {
        return completedBooks[_user][_bookId];
    }
    
    function getContractStats() external view returns (
        uint256 _totalStaked,
        uint256 _totalRewardsDistributed,
        uint256 _totalBooksRead,
        uint256 _totalUsers,
        uint256 _contractBalance
    ) {
        return (
            totalStaked,
            totalRewardsDistributed,
            totalBooksRead,
            totalUsers,
            rewardToken.balanceOf(address(this))
        );
    }
    
    // Admin fonksiyonları
    function pause() external onlyOwner {
        _pause();
        emit ContractPaused(msg.sender);
    }
    
    function unpause() external onlyOwner {
        _unpause();
        emit ContractUnpaused(msg.sender);
    }
    
    // Acil durum fonksiyonu
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = rewardToken.balanceOf(address(this));
        require(balance > totalStaked, "Stake edilmis tokenlari cekemezsiniz");
        uint256 withdrawableAmount = balance - totalStaked;
        require(rewardToken.transfer(owner(), withdrawableAmount), "Transfer basarisiz");
    }
} 