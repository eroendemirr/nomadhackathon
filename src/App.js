import React from 'react';

// Bileşenler
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import WalletConnect from './components/WalletConnect';
import BookReadingDialog from './components/BookReadingDialog';

// Hooks ve yardımcı fonksiyonlar
import { useBookStore } from './hooks/useBookStore';
import { sampleBooks, truncateAddress } from './utils/helpers';

// Stiller
import { AppContainer, MainContent } from './styles/AppStyles';

function App() {
  const {
    account,
    stakeAmount,
    booksRead,
    isConnected,
    hasStaked,
    selectedBook,
    readingDialogOpen,
    currentPage,
    completedBooks,
    setStakeAmount,
    handleConnectWallet,
    handleStakeTokens,
    handleBookClick,
    handlePageChange,
    handleBookCompletion,
    handleClaimReward,
    closeReadingDialog
  } = useBookStore();

  return (
    <AppContainer>
      <Navbar 
        isConnected={isConnected} 
        userAddress={truncateAddress(account)} 
      />

      <MainContent>
        {!isConnected ? (
          <WalletConnect onConnect={handleConnectWallet} />
        ) : (
          <Dashboard
            account={truncateAddress(account)}
            stakeAmount={stakeAmount}
            onStakeAmountChange={setStakeAmount}
            onStake={handleStakeTokens}
            hasStaked={hasStaked}
            booksRead={booksRead}
            onClaimReward={handleClaimReward}
            books={sampleBooks}
            onBookClick={handleBookClick}
            completedBooks={completedBooks}
          />
        )}
      </MainContent>

      {selectedBook && (
        <BookReadingDialog
          open={readingDialogOpen}
          onClose={closeReadingDialog}
          book={selectedBook}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          isCompleted={completedBooks.has(selectedBook.id)}
          onBookCompletion={handleBookCompletion}
          totalPages={selectedBook.totalPages}
        />
      )}
    </AppContainer>
  );
}

export default App; 