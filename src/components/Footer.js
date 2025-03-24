import React from 'react';
import { Box, Typography, Link, Container, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 'auto',
        background: 'linear-gradient(90deg, rgba(58,123,213,0.05) 0%, rgba(248,61,123,0.05) 100%)',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="footer"
    >
      {/* Background decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,123,213,0.06) 0%, rgba(58,123,213,0) 70%)',
          zIndex: 0
        }}
      />
      <Box 
        sx={{ 
          position: 'absolute',
          bottom: '-30px',
          right: '-30px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(248,61,123,0.06) 0%, rgba(248,61,123,0) 70%)',
          zIndex: 0
        }}
      />
      
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: { xs: 2, sm: 0 },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            © {currentYear} - Praveen Kumar Oleti - All rights reserved
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 1.5,
              justifyContent: 'center',
              alignItems: 'center' 
            }}
          >
            <IconButton 
              aria-label="GitHub" 
              component={Link}
              href="https://github.com/Praveen09091"
              target="_blank"
              rel="noopener noreferrer"
              size="small" 
              color="primary"
              sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-3px)' }
              }}
            >
              <GitHub fontSize="small" />
            </IconButton>
            
            <IconButton 
              aria-label="LinkedIn" 
              component={Link}
              href="https://www.linkedin.com/in/praveen-kumar-650941240"
              target="_blank"
              rel="noopener noreferrer"
              size="small" 
              color="primary"
              sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-3px)' }
              }}
            >
              <LinkedIn fontSize="small" />
            </IconButton>
            
            <IconButton 
              aria-label="Email" 
              component={Link}
              href="mailto:praveenkumaroleti09@gmail.com"
              size="small" 
              color="primary"
              sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': { transform: 'translateY(-3px)' }
              }}
            >
              <Email fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center" 
          sx={{ mt: 2, opacity: 0.8 }}
        >
          Powered by{' '}
          <Link href="https://openai.com/" target="_blank" rel="noopener noreferrer" underline="hover" color="primary">
            OpenAI
          </Link>{' '}
          and{' '}
          <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" target="_blank" rel="noopener noreferrer" underline="hover" color="primary">
            Web Speech API
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 