import React, { Component } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ReportProblem } from '@mui/icons-material';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Reload the page as a simple way to reset the app state
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{
            background: 'linear-gradient(135deg, #f8faff 0%, #f0f5ff 100%)',
            p: 3
          }}
        >
          <Paper
            elevation={3}
            sx={{
              maxWidth: 500,
              width: '100%',
              p: 4,
              borderRadius: 2,
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <ReportProblem 
              color="error" 
              sx={{ 
                fontSize: 80,
                mb: 2,
                animation: 'pulse 2s infinite'
              }} 
            />
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We're sorry, Praveen Kumar's Voice Bot has encountered an unexpected error. 
              The application team has been notified.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ 
              mb: 3,
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              p: 2,
              borderRadius: 1,
              overflowX: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              textAlign: 'left'
            }}>
              {this.state.error && this.state.error.toString()}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={this.handleReset}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(58, 123, 213, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(58, 123, 213, 0.6)',
                }
              }}
            >
              Refresh Application
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 