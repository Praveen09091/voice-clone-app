import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Box, Paper, Typography, IconButton, CircularProgress, 
  TextField, Card, CardContent, Tooltip, Alert, Snackbar
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import SendIcon from '@mui/icons-material/Send';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import api from '../services/api';
import { 
  initSpeechRecognition, 
  initSpeechSynthesis, 
  speakText, 
  findVoice,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported
} from '../utils/speechUtils';

function VoiceBot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState(null);
  const [error, setError] = useState(null);
  
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const utteranceRef = useRef(null);
  
  // Send message to API
  const handleSendMessage = async (text = null) => {
    const messageText = text || inputText;
    
    if (!messageText.trim()) return;
    
    // Add user message to chat
    setMessages(prev => [...prev, { text: messageText, isUser: true }]);
    setInputText('');
    setIsProcessing(true);
    
    try {
      // Send message to API
      const response = await api.sendMessage(messageText);
      
      // Add bot response to chat
      const botMessage = response.response;
      setMessages(prev => [...prev, { text: botMessage, isUser: false }]);
      
      // Speak the response
      if (isSpeechSynthesisSupported()) {
        setIsSpeaking(true);
        utteranceRef.current = speakText(botMessage, voice, 1, 1);
        
        utteranceRef.current.onend = () => {
          setIsSpeaking(false);
        };
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to get a response. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle recognition result - memoized with useCallback
  const handleRecognitionResult = useCallback((event) => {
    const transcript = event.results[0][0].transcript;
    setInputText(transcript);
    
    // Automatically send the message after recognition
    // Instead of using handleSendMessage directly, we'll inline the logic
    // to avoid circular dependencies
    const messageText = transcript;
    
    if (!messageText.trim()) return;
    
    // Add user message to chat
    setMessages(prev => [...prev, { text: messageText, isUser: true }]);
    setInputText('');
    setIsProcessing(true);
    
    // Send message to API
    api.sendMessage(messageText)
      .then(response => {
        // Add bot response to chat
        const botMessage = response.response;
        setMessages(prev => [...prev, { text: botMessage, isUser: false }]);
        
        // Speak the response
        if (isSpeechSynthesisSupported()) {
          setIsSpeaking(true);
          utteranceRef.current = speakText(botMessage, voice, 1, 1);
          
          utteranceRef.current.onend = () => {
            setIsSpeaking(false);
          };
        }
      })
      .catch(error => {
        console.error('Error sending message:', error);
        setError('Failed to get a response. Please try again.');
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, [setMessages, setInputText, setIsProcessing, setIsSpeaking, setError, voice]);
  
  // Handle recognition error
  const handleRecognitionError = useCallback((event) => {
    console.error('Speech recognition error:', event.error);
    setError(`Speech recognition error: ${event.error}`);
    setIsListening(false);
  }, []);
  
  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (isSpeechRecognitionSupported()) {
      recognitionRef.current = initSpeechRecognition();
      
      // Set up recognition event handlers
      if (recognitionRef.current) {
        recognitionRef.current.onresult = handleRecognitionResult;
        recognitionRef.current.onerror = handleRecognitionError;
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
    
    // Initialize speech synthesis and find a suitable voice
    if (isSpeechSynthesisSupported()) {
      initSpeechSynthesis();
      
      // Find a male Indian English voice if possible
      findVoice('en-IN', 'male').then(foundVoice => {
        if (foundVoice) {
          setVoice(foundVoice);
        } else {
          // Fallback to any English male voice
          findVoice('en', 'male').then(fallbackVoice => {
            if (fallbackVoice) {
              setVoice(fallbackVoice);
            }
            // If no suitable voice is found, the default voice will be used
          });
        }
      });
    }
    
    // Clean up
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (window.speechSynthesis && utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [handleRecognitionResult, handleRecognitionError]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Toggle listening state
  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not supported by your browser.');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setError(null);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };
  
  // Handle text input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  
  // Stop speaking
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  
  // Close error alert
  const handleCloseError = () => {
    setError(null);
  };
  
  // Suggested questions to ask
  const suggestedQuestions = [
    "What should we know about your life story?",
    "What's your #1 superpower?",
    "What are the top 3 areas you'd like to grow in?",
    "What misconception do your coworkers have about you?",
    "How do you push your boundaries and limits?"
  ];
  
  // Handle clicking a suggested question
  const handleSuggestedQuestion = (question) => {
    setInputText(question);
    handleSendMessage(question);
  };
  
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        maxHeight: '600px',
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px rgba(58, 123, 213, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
      className="floating-card"
    >
      <Typography 
        variant="h6" 
        component="h2" 
        gutterBottom 
        sx={{ 
          borderBottom: '1px solid rgba(0,0,0,0.08)', 
          pb: 1, 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(90deg, rgba(58, 123, 213, 0.05) 0%, rgba(248, 61, 123, 0.05) 100%)',
          px: 2,
          py: 1,
          borderRadius: '8px 8px 0 0',
        }}
      >
        <Box 
          sx={{ 
            mr: 1,
            width: 28,
            height: 28,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #3a7bd5, #f83d7b)',
            boxShadow: '0 2px 10px rgba(58, 123, 213, 0.3)',
          }}
        >
          <VolumeUpIcon sx={{ fontSize: 18, color: 'white' }} />
        </Box>
        Voice Interaction
      </Typography>
      
      {/* Messages area */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(58, 123, 213, 0.3)',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'rgba(58, 123, 213, 0.5)',
            },
          },
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ p: 2 }} className="fade-in">
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Ask Praveen Kumar's AI clone a question by voice or text. Try one of these:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
              {suggestedQuestions.map((question, index) => (
                <Card 
                  key={index} 
                  variant="outlined" 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      bgcolor: 'rgba(58, 123, 213, 0.06)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(58, 123, 213, 0.1)'
                    }
                  }}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="btn-hover-effect"
                >
                  <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Typography variant="body2">{question}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ) : (
          messages.map((message, index) => (
            <Box 
              key={index} 
              sx={{ 
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                opacity: 0,
                animation: 'messageEnter 0.3s forwards',
                animationDelay: `${index * 0.1}s`
              }}
              className="message-wrapper"
            >
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 1.8, 
                  borderRadius: 2.5,
                  bgcolor: message.isUser ? 'primary.main' : 'rgba(245, 247, 250, 0.95)',
                  color: message.isUser ? 'white' : 'text.primary',
                  borderTopRightRadius: message.isUser ? 0 : 2.5,
                  borderTopLeftRadius: message.isUser ? 2.5 : 0,
                  boxShadow: message.isUser 
                    ? '0 2px 8px rgba(58, 123, 213, 0.2)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: message.isUser 
                      ? '0 4px 12px rgba(58, 123, 213, 0.3)' 
                      : '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }
                }}
              >
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{message.text}</Typography>
              </Paper>
              {!message.isUser && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
                  <IconButton 
                    size="small" 
                    onClick={() => {
                      utteranceRef.current = speakText(message.text, voice, 1, 1);
                      setIsSpeaking(true);
                      utteranceRef.current.onend = () => {
                        setIsSpeaking(false);
                      };
                    }}
                    sx={{
                      color: 'primary.main',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(58, 123, 213, 0.1)',
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    <VolumeUpIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>
      
      {/* Input area */}
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          position: 'relative',
          padding: '8px',
          backgroundColor: 'rgba(245, 247, 250, 0.5)',
          borderRadius: 2.5,
          boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.03)',
          backdropFilter: 'blur(5px)'
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
          disabled={isProcessing}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'white',
              transition: 'all 0.2s ease',
              '&.Mui-focused': {
                boxShadow: '0 0 0 3px rgba(58, 123, 213, 0.2)'
              },
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(58, 123, 213, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        <Tooltip title={isListening ? "Stop listening" : "Start voice input"} arrow>
          {isProcessing ? (
            <span>
              <IconButton 
                color={isListening ? "secondary" : "primary"} 
                onClick={toggleListening}
                disabled={true}
                className={isListening ? "pulse-animation" : ""}
                sx={{ boxShadow: '0 2px 5px rgba(58, 123, 213, 0.2)' }}
              >
                {isListening ? <MicOffIcon /> : <MicIcon />}
              </IconButton>
            </span>
          ) : (
            <IconButton 
              onClick={toggleListening}
              className={`${isListening ? "pulse-animation" : ""} neon-pulse`}
              sx={{ 
                boxShadow: '0 2px 5px rgba(58, 123, 213, 0.2)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 8px rgba(58, 123, 213, 0.3)',
                },
                background: isListening 
                  ? 'linear-gradient(45deg, #f83d7b, #ff8c52)' 
                  : 'linear-gradient(45deg, #3a7bd5, #5e3aec)',
                color: 'white',
                p: 1.2,
              }}
            >
              {isListening ? <MicOffIcon /> : <MicIcon />}
            </IconButton>
          )}
        </Tooltip>
        
        {isSpeaking && (
          <Tooltip title="Stop speaking" arrow>
            <IconButton 
              color="secondary" 
              onClick={stopSpeaking}
              sx={{ 
                boxShadow: '0 2px 5px rgba(248, 61, 123, 0.2)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 8px rgba(248, 61, 123, 0.3)',
                }
              }}
            >
              <VolumeMuteIcon />
            </IconButton>
          </Tooltip>
        )}
        
        <Tooltip title="Send message" arrow>
          {isProcessing || !inputText.trim() ? (
            <span>
              <IconButton 
                color="primary" 
                disabled={true}
                sx={{
                  opacity: 0.5,
                }}
              >
                {isProcessing ? 
                  <CircularProgress size={24} /> : 
                  <SendIcon />
                }
              </IconButton>
            </span>
          ) : (
            <IconButton 
              color="primary" 
              type="submit"
              sx={{ 
                boxShadow: '0 2px 5px rgba(58, 123, 213, 0.2)',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 8px rgba(58, 123, 213, 0.3)',
                }
              }}
            >
              <SendIcon />
            </IconButton>
          )}
        </Tooltip>
      </Box>
      
      {/* Voice activity visualization - enhanced */}
      {isListening && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <div className="voice-waves" style={{ 
            background: 'linear-gradient(90deg, rgba(58, 123, 213, 0.05) 0%, rgba(248, 61, 123, 0.05) 100%)', 
            padding: '10px 20px',
            borderRadius: 20,
            boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.05)'
          }}>
            <div className="voice-wave"></div>
            <div className="voice-wave"></div>
            <div className="voice-wave"></div>
            <div className="voice-wave"></div>
            <div className="voice-wave"></div>
          </div>
        </Box>
      )}
      
      {/* Listening indicator - enhanced */}
      {isListening && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 15, 
            right: 15, 
            backgroundColor: 'transparent', 
            color: 'white',
            borderRadius: '12px',
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            background: 'linear-gradient(90deg, #3a7bd5, #f83d7b)',
            boxShadow: '0 2px 8px rgba(248, 61, 123, 0.3)',
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <MicIcon fontSize="small" />
          Listening...
        </Box>
      )}
      
      {/* Error notification */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <Alert 
          onClose={handleCloseError} 
          severity="error" 
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            '& .MuiAlert-icon': {
              alignItems: 'center'
            }
          }}
          variant="filled"
        >
          {error}
        </Alert>
      </Snackbar>
      
      {/* Processing indicator */}
      {isProcessing && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            zIndex: 10,
          }}
        >
          <Box 
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '20px',
              borderRadius: '50%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CircularProgress size={50} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            Processing your request...
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default VoiceBot; 