import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Chip,
  Checkbox,
  FormControlLabel,
  Pagination
} from '@mui/material';
import styled from '@mui/material/styles/styled';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  }
}));

const BookReadingDialog = ({
  open,
  onClose,
  book,
  currentPage,
  onPageChange,
  isCompleted,
  onBookCompletion,
  totalPages
}) => {
  return (
    <StyledDialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{book?.title}</Typography>
          <Chip 
            label={`${currentPage} / ${totalPages}`} 
            color="primary"
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography paragraph>
          {book?.preview}
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination 
            count={totalPages} 
            page={currentPage}
            onChange={onPageChange}
            color="primary"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          control={
            <Checkbox 
              checked={isCompleted}
              onChange={() => onBookCompletion(book?.id)}
              disabled={currentPage !== totalPages}
            />
          }
          label="Kitabı tamamladım"
        />
        <Button onClick={onClose}>Kapat</Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default BookReadingDialog; 