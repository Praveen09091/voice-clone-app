import React, { Suspense, lazy } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, CircularProgress, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import './App.css';

// Lazy load components for better performance
const VoiceBot = lazy(() => import('./components/VoiceBot'));
const PraveenProfile = lazy(() => import('./components/PraveenProfile'));

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3a7bd5',
      light: '#6ea8ff',
      dark: '#0052a3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f83d7b',
      light: '#ff76a9',
      dark: '#c00050',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8faff',
      paper: '#ffffff',
    },
    text: {
      primary: '#2A2A2A',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(31, 38, 135, 0.07)',
    '0px 4px 8px rgba(31, 38, 135, 0.1)',
    '0px 8px 16px rgba(31, 38, 135, 0.12)',
    '0px 12px 24px rgba(31, 38, 135, 0.14)',
    // ... more shadows (keeping default values for 5-24)
    ...Array(20).fill(''),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
        },
        contained: {
          boxShadow: '0 4px 14px rgba(58, 123, 213, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(58, 123, 213, 0.5)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(31, 38, 135, 0.1)',
        },
      },
    },
  },
});

// Suspense fallback loading component
const SuspenseFallback = () => (
  <Box 
    display="flex" 
    flexDirection="column"
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
    sx={{
      background: 'linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%)',
    }}
  >
    <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
    <Typography variant="h6" sx={{ fontWeight: 500 }}>
      Loading Praveen's Voice Bot...
    </Typography>
  </Box>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Background waves */}
        <Box className="background-waves-container">
          <div className="background-wave"></div>
          <div className="background-wave"></div>
          <div className="background-wave"></div>
          <div className="background-wave"></div>
          <div className="background-particle"></div>
          <div className="background-particle"></div>
          <div className="background-particle"></div>
          <div className="background-particle"></div>
          
          <div className="curved-wave">
            <svg viewBox="0 0 1320 500" preserveAspectRatio="none">
              <path d="M0,192 C220,100,440,100,660,192 C880,290,1100,290,1320,192 L1320,500 L0,500 Z"></path>
            </svg>
          </div>
          <div className="curved-wave">
            <svg viewBox="0 0 1320 500" preserveAspectRatio="none">
              <path d="M0,150 C220,80,440,80,660,150 C880,220,1100,220,1320,150 L1320,500 L0,500 Z"></path>
            </svg>
          </div>
          <div className="curved-wave">
            <svg viewBox="0 0 1320 500" preserveAspectRatio="none">
              <path d="M0,170 C220,90,440,90,660,170 C880,250,1100,250,1320,170 L1320,500 L0,500 Z"></path>
            </svg>
          </div>
        </Box>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%)',
          }}
          className="shifting-bg"
        >
          {/* Main content */}
          <Box sx={{ flex: 1, py: 4 }}>
            <Container maxWidth="lg">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 5,
                }}
              >
                <Box className="title-container">
                  <div className="tech-element"></div>
                  <div className="tech-element"></div>
                  <div className="tech-element"></div>
                  <div className="tech-element"></div>
                  
                  <Typography 
                    variant="h1" 
                    component="h1" 
                    align="center" 
                    gutterBottom
                    className="gradient-text"
                    data-text="Praveen Kumar's Voice Bot"
                    sx={{ 
                      mb: 2,
                      fontWeight: 700,
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span className="voice-icon">
                      <VolumeUpIcon sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' } }} />
                    </span>
                    Praveen Kumar's
                    <span className="audio-wave">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                    Voice Bot
                  </Typography>
                </Box>
                <Typography 
                  variant="subtitle1" 
                  align="center" 
                  sx={{ 
                    opacity: 0.8, 
                    mb: 3,
                    maxWidth: '600px',
                    color: 'text.secondary',
                    fontWeight: 500,
                    animation: 'fadeIn 1.5s ease-out',
                  }}
                >
                  Interact with an AI voice assistant that knows everything about Praveen Kumar
                </Typography>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' }, 
                  gap: 4,
                  alignItems: 'flex-start',
                  position: 'relative',
                }}
              >
                <div className="tech-circuit top-left"></div>
                <div className="tech-circuit bottom-right"></div>
                
                <Box 
                  sx={{ 
                    flex: 3,
                    width: '100%',
                    animation: 'slideInLeft 0.7s ease-out',
                    position: 'relative',
                  }}
                  className="glow-border holographic"
                >
                  <Suspense fallback={<SuspenseFallback />}>
                    <VoiceBot />
                  </Suspense>
                </Box>
                <Box 
                  sx={{ 
                    flex: 2,
                    width: '100%', 
                    animation: 'slideInRight 0.7s ease-out',
                    position: 'relative',
                  }}
                  className="glow-border holographic"
                >
                  <Suspense fallback={<SuspenseFallback />}>
                    <PraveenProfile />
                  </Suspense>
                </Box>
              </Box>
            </Container>
          </Box>
          
          {/* Footer */}
          <Footer />
        </Box>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App; 