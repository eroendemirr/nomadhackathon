import { useState, useEffect } from 'react';
import {
  connectWallet,
  stakeTokens,
  unstakeTokens,
  completeBook,
  claimReward,
  getUserInfo,
  getContractStats,
  isBookCompleted,
  getTokenBalance
} from '../utils/web3Utils';

export const useBookStore = () => {
  const [account, setAccount] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [booksRead, setBooksRead] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [hasStaked, setHasStaked] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [readingDialogOpen, setReadingDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [completedBooks, setCompletedBooks] = useState(new Set());
  const [tokenBalance, setTokenBalance] = useState('0');
  const [contractStats, setContractStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadUserInfo = async () => {
    if (!account) return;
    
    try {
      setLoading(true);
      const info = await getUserInfo(account);
      setBooksRead(info.booksRead);
      setHasStaked(info.isStaking);
      
      const balance = await getTokenBalance(account);
      setTokenBalance(balance);
      
      const stats = await getContractStats();
      setContractStats(stats);
    } catch (error) {
      console.error('Bilgi yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      loadUserInfo();
    }
  }, [account]);

  const handleConnectWallet = async () => {
    try {
      setLoading(true);
      const userAccount = await connectWallet();
      setAccount(userAccount);
      setIsConnected(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStakeTokens = async () => {
    try {
      setLoading(true);
      await stakeTokens(stakeAmount, account);
      await loadUserInfo();
      alert(`${stakeAmount} token başarıyla stake edildi`);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUnstakeTokens = async () => {
    try {
      setLoading(true);
      await unstakeTokens(account);
      await loadUserInfo();
      alert('Tokenlar başarıyla geri çekildi');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = async (book) => {
    if (!hasStaked) {
      alert('Kitapları okumak için önce token stake etmelisiniz!');
      return;
    }
    
    try {
      const completed = await isBookCompleted(account, book.id);
      setSelectedBook(book);
      setReadingDialogOpen(true);
      setCurrentPage(1);
      
      if (completed) {
        const newCompletedBooks = new Set(completedBooks);
        newCompletedBooks.add(book.id);
        setCompletedBooks(newCompletedBooks);
      }
    } catch (error) {
      alert('Kitap bilgisi yüklenirken hata oluştu');
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleBookCompletion = async (bookId) => {
    if (currentPage !== selectedBook.totalPages) {
      alert('Kitabı tamamlamak için son sayfaya kadar okumalısınız!');
      return;
    }

    try {
      setLoading(true);
      await completeBook(bookId, account);
      
      const newCompletedBooks = new Set(completedBooks);
      newCompletedBooks.add(bookId);
      setCompletedBooks(newCompletedBooks);
      
      await loadUserInfo();
      setReadingDialogOpen(false);
      alert('Tebrikler! Kitabı başarıyla tamamladınız.');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReward = async () => {
    try {
      setLoading(true);
      await claimReward(account);
      await loadUserInfo();
      alert('Tebrikler! Ödülünüz başarıyla talep edildi.');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const closeReadingDialog = () => setReadingDialogOpen(false);

  return {
    account,
    stakeAmount,
    booksRead,
    isConnected,
    hasStaked,
    selectedBook,
    readingDialogOpen,
    currentPage,
    completedBooks,
    tokenBalance,
    contractStats,
    loading,
    setStakeAmount,
    handleConnectWallet,
    handleStakeTokens,
    handleUnstakeTokens,
    handleBookClick,
    handlePageChange,
    handleBookCompletion,
    handleClaimReward,
    closeReadingDialog,
    loadUserInfo
  };
}; 