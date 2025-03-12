import React from 'react';
import { Box, Typography, CardContent } from '@mui/material';
import { AccountBalanceWallet } from '@mui/icons-material';
import styled from '@mui/material/styles/styled';

const StyledCard = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  width: '100%',
  maxWidth: 600,
  margin: 0
}));

const StyledButton = styled('button')(({ theme }) => ({
  margin: 0,
  borderRadius: '25px',
  padding: '10px 25px',
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 4px 15px 0 rgba(65, 132, 234, 0.75)',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 'none',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
  }
}));

const WalletConnect = ({ onConnect }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flex="1" width="100%" p={2}>
      <StyledCard>
        <CardContent>
          <Box textAlign="center" p={3}>
            <AccountBalanceWallet sx={{ fontSize: 60, color: '#1a237e', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Platformumuza Hoş Geldiniz
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Kitap okuyarak ödül kazanmaya başlamak için cüzdanınızı bağlayın.
            </Typography>
            <StyledButton onClick={onConnect}>
              <AccountBalanceWallet sx={{ mr: 1 }} />
              Cüzdanı Bağla
            </StyledButton>
          </Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default WalletConnect; 