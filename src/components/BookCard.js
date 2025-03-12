import React from 'react';
import { CardContent, CardActionArea, Typography, Card, CardMedia, Chip } from '@mui/material';
import { Check, MenuBook } from '@mui/icons-material';
import styled from '@mui/material/styles/styled';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  margin: 0,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
}));

const BookImage = styled(CardMedia)(({ theme }) => ({
  paddingTop: '140%',
  position: 'relative',
}));

const BookStatus = styled(Chip)(({ theme, completed }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  background: completed ? 'linear-gradient(45deg, #43A047 30%, #66BB6A 90%)' : 'rgba(0, 0, 0, 0.6)',
  color: '#fff',
}));

const BookCard = ({ book, onBookClick, isCompleted }) => {
  return (
    <StyledCard>
      <CardActionArea onClick={() => onBookClick(book)}>
        <BookImage
          image={book.coverImage}
          title={book.title}
        >
          <BookStatus
            label={isCompleted ? "Tamamlandı" : "Okunuyor"}
            completed={isCompleted}
            icon={isCompleted ? <Check /> : <MenuBook />}
          />
        </BookImage>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {book.author}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {book.totalPages} sayfa
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default BookCard; 