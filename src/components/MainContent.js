import React from 'react';
import Dashboard from './Dashboard';
import WalletConnect from './WalletConnect';
import BookReadingDialog from './BookReadingDialog';
import { sampleBooks } from '../utils/helpers';

const MainContent = ({
  isConnected,
  account,
  stakeAmount,
  setStakeAmount,
  handleConnectWallet,
  handleStakeTokens,
  hasStaked,
  booksRead,
  handleClaimReward,
  handleBookClick,
  completedBooks,
  selectedBook,
  readingDialogOpen,
  closeReadingDialog,
  currentPage,
  handlePageChange,
  handleBookCompletion
}) => {
  return (
    <>
      {!isConnected ? (
        <WalletConnect onConnect={handleConnectWallet} />
      ) : (
        <Dashboard
          account={account}
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
    </>
  );
};

export default MainContent; 