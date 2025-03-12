import Web3 from 'web3';
import Web3NomadContract from '../contracts/Web3NomadContract.json';
import NomadToken from '../contracts/NomadToken.json';

let web3;
let nomadContract;
let tokenContract;

// Kontrat adresleri (deploy edildikten sonra güncellenecek)
const NOMAD_CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const TOKEN_CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

export const initWeb3 = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        nomadContract = new web3.eth.Contract(Web3NomadContract.abi, NOMAD_CONTRACT_ADDRESS);
        tokenContract = new web3.eth.Contract(NomadToken.abi, TOKEN_CONTRACT_ADDRESS);
        return true;
    }
    throw new Error('Lütfen MetaMask yükleyin!');
};

export const connectWallet = async () => {
    if (!web3) await initWeb3();
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        return accounts[0];
    } catch (error) {
        console.error('Bağlantı hatası:', error);
        throw error;
    }
};

export const stakeTokens = async (amount, account) => {
    if (!web3) await initWeb3();
    try {
        const amountWei = web3.utils.toWei(amount.toString(), 'ether');
        
        // Önce token approval
        await tokenContract.methods.approve(NOMAD_CONTRACT_ADDRESS, amountWei)
            .send({ from: account });
            
        // Sonra stake işlemi
        await nomadContract.methods.stake(amountWei)
            .send({ from: account });
            
        return true;
    } catch (error) {
        console.error('Stake hatası:', error);
        throw error;
    }
};

export const unstakeTokens = async (account) => {
    if (!web3) await initWeb3();
    try {
        await nomadContract.methods.unstake()
            .send({ from: account });
        return true;
    } catch (error) {
        console.error('Unstake hatası:', error);
        throw error;
    }
};

export const completeBook = async (bookId, account) => {
    if (!web3) await initWeb3();
    try {
        await nomadContract.methods.completeBook(bookId)
            .send({ from: account });
        return true;
    } catch (error) {
        console.error('Kitap tamamlama hatası:', error);
        throw error;
    }
};

export const claimReward = async (account) => {
    if (!web3) await initWeb3();
    try {
        await nomadContract.methods.claimReward()
            .send({ from: account });
        return true;
    } catch (error) {
        console.error('Ödül talep hatası:', error);
        throw error;
    }
};

// View fonksiyonları
export const getUserInfo = async (account) => {
    if (!web3) await initWeb3();
    try {
        const info = await nomadContract.methods.getUserInfo(account).call();
        return {
            stakedAmount: web3.utils.fromWei(info.stakedAmount, 'ether'),
            booksRead: info.booksRead,
            lastRewardClaim: new Date(info.lastRewardClaim * 1000),
            totalRewardsClaimed: web3.utils.fromWei(info.totalRewardsClaimed, 'ether'),
            isStaking: info.isStaking
        };
    } catch (error) {
        console.error('Kullanıcı bilgisi alma hatası:', error);
        throw error;
    }
};

export const getContractStats = async () => {
    if (!web3) await initWeb3();
    try {
        const stats = await nomadContract.methods.getContractStats().call();
        return {
            totalStaked: web3.utils.fromWei(stats._totalStaked, 'ether'),
            totalRewardsDistributed: web3.utils.fromWei(stats._totalRewardsDistributed, 'ether'),
            totalBooksRead: stats._totalBooksRead,
            totalUsers: stats._totalUsers,
            contractBalance: web3.utils.fromWei(stats._contractBalance, 'ether')
        };
    } catch (error) {
        console.error('Kontrat istatistikleri alma hatası:', error);
        throw error;
    }
};

export const isBookCompleted = async (account, bookId) => {
    if (!web3) await initWeb3();
    try {
        return await nomadContract.methods.isBookCompleted(account, bookId).call();
    } catch (error) {
        console.error('Kitap durumu kontrol hatası:', error);
        throw error;
    }
};

// Token işlemleri
export const getTokenBalance = async (account) => {
    if (!web3) await initWeb3();
    try {
        const balance = await tokenContract.methods.balanceOf(account).call();
        return web3.utils.fromWei(balance, 'ether');
    } catch (error) {
        console.error('Token bakiyesi alma hatası:', error);
        throw error;
    }
}; 