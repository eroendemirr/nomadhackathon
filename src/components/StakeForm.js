import React from 'react';
import { Box, Typography, CardContent, Card, TextField, Button } from '@mui/material';
import { LibraryBooks } from '@mui/icons-material';
import styled from '@mui/material/styles/styled';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: 0,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.9)',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      }
    }
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: 0,
  borderRadius: '25px',
  padding: '10px 25px',
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 4px 15px 0 rgba(65, 132, 234, 0.75)',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  '&:hover': {
    background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
  }
}));

const StakeForm = ({ stakeAmount, onStakeAmountChange, onStake, hasStaked }) => {
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <LibraryBooks sx={{ fontSize: 30, color: '#1a237e', mr: 1 }} />
          <Typography variant="h5">Token Stake Et</Typography>
        </Box>
        <StyledTextField
          label="Stake Miktarı"
          type="number"
          value={stakeAmount}
          onChange={(e) => onStakeAmountChange(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={hasStaked}
        />
        <Box mt={2}>
          <StyledButton 
            variant="contained" 
            fullWidth
            onClick={onStake}
            disabled={hasStaked}
          >
            {hasStaked ? 'Stake Edildi' : 'Stake Et'}
          </StyledButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default StakeForm; 