import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
  Container, 
  Button, 
  TextField, 
  Typography, 
  Card, 
  CardContent,
  Grid,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Pagination,
  CardMedia,
  CardActionArea,
  Chip,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { LibraryBooks, AccountBalanceWallet, EmojiEvents, MenuBook, Check, Menu as MenuIcon } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
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

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
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

const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: '#fff',
  textAlign: 'center',
  margin: 0,
  padding: theme.spacing(2),
  fontWeight: 700,
  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
}));

const StatBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
  color: '#fff',
  borderRadius: '12px',
  marginBottom: theme.spacing(2),
}));

const BookCard = styled(Card)(({ theme }) => ({
  height: '100%',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
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

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
}));

const sampleBooks = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    description: "Distopik bir gelecekte geçen, gözetim toplumunu anlatan klasik roman.",
    totalPages: 328,
    coverImage: "https://example.com/1984.jpg",
    preview: "Distopik bir dünyada Winston Smith'in Büyük Birader'e karşı mücadelesi..."
  },
  {
    id: 2,
    title: "Suç ve Ceza",
    author: "Fyodor Dostoyevski",
    description: "Psikolojik bir başyapıt, suç ve vicdan kavramlarını sorgulayan roman.",
    totalPages: 671,
    coverImage: "https://example.com/crime-and-punishment.jpg",
    preview: "Raskolnikov'un işlediği cinayetin psikolojik sonuçları..."
  },
];

function App() {
  const [account, setAccount] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  const [booksRead, setBooksRead] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [hasStaked, setHasStaked] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [readingDialogOpen, setReadingDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [completedBooks, setCompletedBooks] = useState(new Set());
  const [readingProgress, setReadingProgress] = useState({});

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        alert('Lütfen MetaMask yükleyin!');
      }
    } catch (error) {
      console.error('Bağlantı hatası:', error);
    }
  };

  const stakeTokens = async () => {
    try {
      if (!stakeAmount) return;
      setHasStaked(true);
      alert(`${stakeAmount} token stake edildi`);
    } catch (error) {
      console.error('Stake hatası:', error);
    }
  };

  const handleBookClick = (book) => {
    if (!hasStaked) {
      alert('Kitapları okumak için önce token stake etmelisiniz!');
      return;
    }
    setSelectedBook(book);
    setReadingDialogOpen(true);
    setCurrentPage(readingProgress[book.id]?.currentPage || 1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    setReadingProgress(prev => ({
      ...prev,
      [selectedBook.id]: { ...prev[selectedBook.id], currentPage: page }
    }));
  };

  const handleBookCompletion = (bookId) => {
    if (currentPage === selectedBook.totalPages) {
      const newCompletedBooks = new Set(completedBooks);
      newCompletedBooks.add(bookId);
      setCompletedBooks(newCompletedBooks);
      setBooksRead(prev => prev + 1);
      setReadingDialogOpen(false);
      alert('Tebrikler! Kitabı başarıyla tamamladınız.');
    } else {
      alert('Kitabı tamamlamak için son sayfaya kadar okumalısınız!');
    }
  };

  const claimReward = async () => {
    try {
      if (booksRead >= 3) {
        alert('Tebrikler! Ödülünüz başarıyla talep edildi.');
      } else {
        alert('Ödül almak için en az 3 kitap bitirmelisiniz!');
      }
    } catch (error) {
      console.error('Ödül talep hatası:', error);
    }
  };

  const BookReadingDialog = () => (
    <Dialog 
      open={readingDialogOpen} 
      onClose={() => setReadingDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{selectedBook?.title}</Typography>
          <Chip 
            label={`${currentPage} / ${selectedBook?.totalPages}`} 
            color="primary"
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography paragraph>
          {selectedBook?.preview}
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination 
            count={selectedBook?.totalPages} 
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          control={
            <Checkbox 
              checked={completedBooks.has(selectedBook?.id)}
              onChange={() => handleBookCompletion(selectedBook?.id)}
              disabled={currentPage !== selectedBook?.totalPages}
            />
          }
          label="Kitabı tamamladım"
        />
        <Button onClick={() => setReadingDialogOpen(false)}>Kapat</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ 
      height: '100vh',
      minHeight: '100vh',
      width: '100vw',
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            📚 Kitap Okuma Stake
          </Typography>
          {isConnected && (
            <Typography variant="body2" color="inherit">
              {account.substring(0, 6)}...{account.substring(38)}
            </Typography>
          )}
        </Toolbar>
      </StyledAppBar>

      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        {!isConnected ? (
          <Box display="flex" justifyContent="center" alignItems="center" flex="1" width="100%" p={2}>
            <StyledCard sx={{ margin: 0, width: '100%', maxWidth: 600 }}>
              <CardContent>
                <Box textAlign="center" p={3}>
                  <AccountBalanceWallet sx={{ fontSize: 60, color: '#1a237e', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Platformumuza Hoş Geldiniz
                  </Typography>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    Kitap okuyarak ödül kazanmaya başlamak için cüzdanınızı bağlayın.
                  </Typography>
                  <StyledButton 
                    variant="contained" 
                    size="large"
                    onClick={connectWallet}
                    startIcon={<AccountBalanceWallet />}
                    sx={{ margin: 0 }}
                  >
                    Cüzdanı Bağla
                  </StyledButton>
                </Box>
              </CardContent>
            </StyledCard>
          </Box>
        ) : (
          <Grid container spacing={0} sx={{ flex: 1, width: '100%' }}>
            <Grid item xs={12}>
              <StyledCard sx={{ margin: 0, borderRadius: 0 }}>
                <CardContent sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <StatBox elevation={3}>
                        <Typography variant="h6">Bağlı Hesap</Typography>
                        <Typography variant="body1">
                          {account.substring(0, 6)}...{account.substring(38)}
                        </Typography>
                      </StatBox>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <StatBox elevation={3}>
                        <Typography variant="h6">Stake Durumu</Typography>
                        <Typography variant="h4">
                          {hasStaked ? '✅ Aktif' : '❌ Pasif'}
                        </Typography>
                      </StatBox>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <StatBox elevation={3}>
                        <Typography variant="h6">Okunan Kitap</Typography>
                        <Typography variant="h4">{booksRead}</Typography>
                      </StatBox>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={6} sx={{ p: 2 }}>
              <StyledCard sx={{ margin: 0 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <LibraryBooks sx={{ fontSize: 30, color: '#1a237e', mr: 1 }} />
                    <Typography variant="h5">Token Stake Et</Typography>
                  </Box>
                  <StyledTextField
                    label="Stake Miktarı"
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    disabled={hasStaked}
                  />
                  <Box mt={2}>
                    <StyledButton 
                      variant="contained" 
                      fullWidth
                      onClick={stakeTokens}
                      disabled={hasStaked}
                      sx={{ margin: 0 }}
                    >
                      {hasStaked ? 'Stake Edildi' : 'Stake Et'}
                    </StyledButton>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={6} sx={{ p: 2 }}>
              <StyledCard sx={{ margin: 0 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <EmojiEvents sx={{ fontSize: 30, color: '#1a237e', mr: 1 }} />
                    <Typography variant="h5">Ödüller</Typography>
                  </Box>
                  <StyledButton 
                    variant="contained" 
                    onClick={claimReward}
                    disabled={booksRead < 3}
                    startIcon={<EmojiEvents />}
                    fullWidth
                    sx={{ 
                      margin: 0,
                      background: booksRead >= 3 ? 'linear-gradient(45deg, #FFA000 30%, #FFB74D 90%)' : undefined,
                      opacity: booksRead >= 3 ? 1 : 0.7
                    }}
                  >
                    Ödülü Talep Et
                  </StyledButton>
                </CardContent>
              </StyledCard>
            </Grid>

            <Grid item xs={12} sx={{ p: 2 }}>
              <Typography variant="h5" color="white" gutterBottom sx={{ pl: 1 }}>
                Kitaplık
              </Typography>
              <Grid container spacing={2}>
                {sampleBooks.map((book) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                    <BookCard>
                      <CardActionArea onClick={() => handleBookClick(book)}>
                        <BookImage
                          image={book.coverImage}
                          title={book.title}
                        >
                          <BookStatus
                            label={completedBooks.has(book.id) ? "Tamamlandı" : "Okunuyor"}
                            completed={completedBooks.has(book.id)}
                            icon={completedBooks.has(book.id) ? <Check /> : <MenuBook />}
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
                    </BookCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
      {selectedBook && <BookReadingDialog />}
    </Box>
  );
}

export default App; 