import React from 'react';
import { Grid, Typography, CardContent, Box } from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import styled from '@mui/material/styles/styled';
import StakeForm from './StakeForm';
import BookCard from './BookCard';

const StatBox = styled('div')(() => ({
  padding: '16px',
  textAlign: 'center',
  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
  color: '#fff',
  borderRadius: '12px',
  marginBottom: '16px',
}));

const RewardButton = styled('button')(({ disabled }) => ({
  width: '100%',
  padding: '10px',
  borderRadius: '25px',
  border: 'none',
  background: disabled ? '#ccc' : 'linear-gradient(45deg, #FFA000 30%, #FFB74D 90%)',
  color: '#fff',
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px'
}));

const ContentCard = styled('div')(() => ({
  margin: 0,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
}));

const Dashboard = ({
  account,
  stakeAmount,
  onStakeAmountChange,
  onStake,
  hasStaked,
  booksRead,
  onClaimReward,
  books,
  onBookClick,
  completedBooks
}) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <ContentCard style={{ borderRadius: 0 }}>
          <CardContent sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <StatBox>
                  <Typography variant="h6">Bağlı Hesap</Typography>
                  <Typography variant="body1">{account}</Typography>
                </StatBox>
              </Grid>
              <Grid item xs={12} md={4}>
                <StatBox>
                  <Typography variant="h6">Stake Durumu</Typography>
                  <Typography variant="h4">
                    {hasStaked ? '✅ Aktif' : '❌ Pasif'}
                  </Typography>
                </StatBox>
              </Grid>
              <Grid item xs={12} md={4}>
                <StatBox>
                  <Typography variant="h6">Okunan Kitap</Typography>
                  <Typography variant="h4">{booksRead}</Typography>
                </StatBox>
              </Grid>
            </Grid>
          </CardContent>
        </ContentCard>
      </Grid>

      <Grid item xs={12} md={6} sx={{ p: 2 }}>
        <StakeForm 
          stakeAmount={stakeAmount}
          onStakeAmountChange={onStakeAmountChange}
          onStake={onStake}
          hasStaked={hasStaked}
        />
      </Grid>

      <Grid item xs={12} md={6} sx={{ p: 2 }}>
        <ContentCard>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <EmojiEvents sx={{ fontSize: 30, color: '#1a237e', mr: 1 }} />
              <Typography variant="h5">Ödüller</Typography>
            </Box>
            <RewardButton 
              onClick={onClaimReward}
              disabled={booksRead < 3}
            >
              <EmojiEvents />
              Ödülü Talep Et
            </RewardButton>
          </CardContent>
        </ContentCard>
      </Grid>

      <Grid item xs={12} sx={{ p: 2 }}>
        <Typography variant="h5" color="white" gutterBottom sx={{ pl: 1 }}>
          Kitaplık
        </Typography>
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <BookCard
                book={book}
                onBookClick={onBookClick}
                isCompleted={completedBooks.has(book.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard; 