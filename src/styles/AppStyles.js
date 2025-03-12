import { Box } from '@mui/material';
import styled from '@mui/material/styles/styled';

export const AppContainer = styled(Box)(() => ({
  height: '100vh',
  width: '100vw',
  display: 'flex', 
  flexDirection: 'column', 
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
  position: 'fixed',
  inset: 0
}));

export const MainContent = styled(Box)(() => ({
  flex: 1,
  overflow: 'auto'
})); 