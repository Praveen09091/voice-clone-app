import React, { useState } from 'react';
import { 
  Box, Paper, Typography, Avatar, Chip, Divider, 
  List, ListItem, ListItemIcon, ListItemText, Tabs, Tab,
  Link, IconButton
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BuildIcon from '@mui/icons-material/Build';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

// Custom TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
      className="tab-content-transition"
      style={{
        opacity: value === index ? 1 : 0,
        transform: value === index ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
      }}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function PraveenProfile() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        borderRadius: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px rgba(58, 123, 213, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
      className="floating-card"
    >
      {/* Header with Avatar and Basic Info */}
      <Box 
        sx={{ 
          p: 3, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          background: 'linear-gradient(135deg, #3a7bd5 0%, #5d93df 100%)',
          color: 'white',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
        className="shine-effect"
      >
        <Avatar 
          alt="Praveen Kumar Oleti" 
          src="/avatar-placeholder.png" 
          sx={{ 
            width: 100, 
            height: 100, 
            mb: 2, 
            border: '3px solid white',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
            }
          }}
        />
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 700, textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          Praveen Kumar Oleti
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
          Prompt Engineer and Gen AI Developer
        </Typography>
        <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
          Nvidia Graphics (Tegra and Cosmos Projects)
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <IconButton 
            size="small" 
            sx={{ 
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-3px)',
              }
            }}
            component={Link}
            href="https://www.linkedin.com/in/praveen-kumar-650941240"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton 
            size="small" 
            sx={{ 
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-3px)',
              }
            }}
            component={Link}
            href="mailto:praveenkumaroleti09@gmail.com"
          >
            <EmailIcon />
          </IconButton>
          <IconButton 
            size="small" 
            sx={{ 
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-3px)',
              }
            }}
            component={Link}
            href="tel:+919347088041"
          >
            <PhoneIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Tabs for different sections */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="profile tabs"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
            '& .MuiTab-root': {
              transition: 'all 0.2s ease',
              fontWeight: 500,
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'rgba(58, 123, 213, 0.04)',
              },
              '&.Mui-selected': {
                fontWeight: 600,
                color: 'primary.main',
              },
            },
          }}
        >
          <Tab 
            label="About" 
            id="profile-tab-0" 
            aria-controls="profile-tabpanel-0" 
            icon={<PersonIcon fontSize="small" />}
            iconPosition="start"
          />
          <Tab 
            label="Education" 
            id="profile-tab-1" 
            aria-controls="profile-tabpanel-1"
            icon={<SchoolIcon fontSize="small" />}
            iconPosition="start"
          />
          <Tab 
            label="Experience" 
            id="profile-tab-2" 
            aria-controls="profile-tabpanel-2"
            icon={<WorkIcon fontSize="small" />}
            iconPosition="start"
          />
          <Tab 
            label="Skills" 
            id="profile-tab-3" 
            aria-controls="profile-tabpanel-3"
            icon={<BuildIcon fontSize="small" />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto',
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
      }}>
        {/* About Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box>
            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
              }}
            >
              <LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Location
            </Typography>
            <Typography variant="body2" paragraph sx={{ pl: 1, borderLeft: '3px solid rgba(58, 123, 213, 0.3)', ml: 0.5 }}>
              Kadapa, Andhra Pradesh, India
            </Typography>

            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                mt: 3
              }}
            >
              <LanguageIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Languages
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip 
                label="English (Advanced)" 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(58, 123, 213, 0.1)',
                  color: 'primary.dark',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(58, 123, 213, 0.15)',
                    transform: 'translateY(-2px)',
                  }
                }}
              />
              <Chip 
                label="Telugu (Native)" 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(58, 123, 213, 0.1)',
                  color: 'primary.dark',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(58, 123, 213, 0.15)',
                    transform: 'translateY(-2px)',
                  }
                }}
              />
            </Box>

            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                mt: 3
              }}
            >
              <PersonIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Personal Interests
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {["Listening Music", "Interacting with people", "Designing templates", "Improving communication skills"].map((interest, index) => (
                <Chip 
                  key={index}
                  label={interest} 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(58, 123, 213, 0.1)',
                    color: 'primary.dark',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(58, 123, 213, 0.15)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                />
              ))}
            </Box>

            <Typography 
              variant="subtitle1" 
              fontWeight="bold" 
              gutterBottom
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
                mt: 3
              }}
            >
              <VolunteerActivismIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
              Volunteering & Leadership
            </Typography>
            <List dense disablePadding sx={{ pl: 1, borderLeft: '3px solid rgba(58, 123, 213, 0.3)', ml: 0.5 }}>
              {[
                {primary: "Instructor at AP model school for IOT (2023)", secondary: "Under ATAL Tinkering Labs"},
                {primary: "Member of IEEE, IETE", secondary: "Coordinated events in the College"},
                {primary: "Class Representative for 7 semesters", secondary: "Led the class throughout academic journey"},
                {primary: "Research and Development cell", secondary: "Contributed to various R&D projects"}
              ].map((item, index) => (
                <ListItem 
                  key={index} 
                  disablePadding 
                  sx={{ 
                    mb: 0.5, 
                    transition: 'all 0.2s ease',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(58, 123, 213, 0.05)',
                    }
                  }}
                >
                  <ListItemText 
                    primary={item.primary} 
                    secondary={item.secondary}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </TabPanel>

        {/* Education Tab */}
        <TabPanel value={tabValue} index={1}>
          <List sx={{ p: 0 }}>
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography component="span" variant="subtitle1" fontWeight="bold">
                      Bachelor of Technology (ECE)
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" display="block">
                      KSRM College of Engineering, Kadapa
                    </Typography>
                    <Typography component="span" variant="body2" display="block" color="text.secondary">
                      2020-2024 • CGPA: 8.98
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography component="span" variant="subtitle1" fontWeight="bold">
                      Intermediate (MPC)
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" display="block">
                      Pratibha Junior College, Ongole
                    </Typography>
                    <Typography component="span" variant="body2" display="block" color="text.secondary">
                      2018-2020 • CGPA: 9.53
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography component="span" variant="subtitle1" fontWeight="bold">
                      Secondary Education (SSC)
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" display="block">
                      Alpha High School, Kadapa
                    </Typography>
                    <Typography component="span" variant="body2" display="block" color="text.secondary">
                      2017-2018 • CGPA: 9.80
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>
            Certifications
          </Typography>
          <List dense sx={{ p: 0 }}>
            <ListItem sx={{ px: 1, py: 0.5 }}>
              <ListItemText primary="Oracle OCI Gen AI Professional Certification (July 2024)" />
            </ListItem>
            <ListItem sx={{ px: 1, py: 0.5 }}>
              <ListItemText primary="Career Essentials in Generative AI by Microsoft and LinkedIn (March 2024)" />
            </ListItem>
            <ListItem sx={{ px: 1, py: 0.5 }}>
              <ListItemText primary="Enterprise-grade AI, Journey to cloud: Envisioning your solution by IBM Skillsbuild (March 2024)" />
            </ListItem>
            <ListItem sx={{ px: 1, py: 0.5 }}>
              <ListItemText primary="Prompt Engineering, Gen AI ready Organisation by AWS (February 2024)" />
            </ListItem>
            <ListItem sx={{ px: 1, py: 0.5 }}>
              <ListItemText primary="Microsoft certified Azure Fundamentals, Azure AI Fundamental (October 2022)" />
            </ListItem>
          </List>
        </TabPanel>

        {/* Experience Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <WorkIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Current Position
          </Typography>
          <Typography variant="body2" paragraph>
            Prompt Engineer at Nvidia Graphics (Tegra and Cosmos Projects)
          </Typography>

          <Box 
            sx={{ 
              p: 2, 
              mb: 3, 
              borderRadius: 2, 
              background: 'linear-gradient(135deg, rgba(58,123,213,0.1) 0%, rgba(248,61,123,0.1) 100%)',
              border: '1px solid rgba(58,123,213,0.2)',
              position: 'relative'
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="primary.main" gutterBottom>
              Professional Focus
            </Typography>
            <Typography variant="body2">
              As a Gen AI Developer and Prompt Engineer, I specialize in developing and integrating AI applications to build comprehensive solutions using modern Gen AI frameworks. My expertise includes creating seamless workflows between different AI systems and designing effective prompts for complex use cases.
            </Typography>
          </Box>

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <WorkIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Previous Positions
          </Typography>
          <Typography variant="body2" paragraph>
            Gen AI Developer at AGIE AI
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <WorkIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Internships
          </Typography>

          <List sx={{ p: 0 }}>
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography component="span" variant="subtitle2" fontWeight="bold">
                      Data Analytics and AI
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" display="block">
                      Edunet Foundation (Virtual)
                    </Typography>
                    <Typography component="span" variant="body2" display="block" color="text.secondary">
                      02/2024 - 03/2024
                    </Typography>
                    <Typography component="span" variant="body2" display="block" sx={{ mt: 1 }}>
                      Developed a college chatbot showcasing NLP and conversational AI skills. Preprocessed German housing data, conducted exploratory data analysis (EDA). Visualized data on IBM Cloud.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" sx={{ my: 1 }} />
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography component="span" variant="subtitle2" fontWeight="bold">
                      IoT Internship
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" display="block">
                      Kadapa, AP
                    </Typography>
                    <Typography component="span" variant="body2" display="block" color="text.secondary">
                      11/2022 - 12/2022
                    </Typography>
                    <Typography component="span" variant="body2" display="block" sx={{ mt: 1 }}>
                      Developed IoT projects using Arduino and Raspberry Pi 3B+. Designed and fabricated PCBs for IoT devices using Eagle.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" sx={{ my: 1 }} />
            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography component="span" variant="subtitle2" fontWeight="bold">
                      Mechatronics Internship
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" display="block">
                      ARC Labs, Kadapa, AP
                    </Typography>
                    <Typography component="span" variant="body2" display="block" color="text.secondary">
                      08/2022 - 10/2022
                    </Typography>
                    <Typography component="span" variant="body2" display="block" sx={{ mt: 1 }}>
                      Gained practical experience with Matrix, Bartender, Assembling, and Pick and Place. Developed skills in designing robotic automation using Codesys.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>
            <CodeIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Projects
          </Typography>

          <List dense sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText 
                primary="Object Detection using Drone (2022-2023)"
                secondary="Led development of customized object detection drone with Raspberry Pi and Pixhawk controller, enabling image/video capture and data transmission."
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText 
                primary="RAG & Chatbot Systems (2024)"
                secondary="Developed conversational chatbots using OpenAI, Langchain and LlamaIndex. Built PDF query application extracting information from documents."
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText 
                primary="Data Analysis on Covid-19 (2023)"
                secondary="Performed data cleaning, preprocessing and analysis on a COVID-19
                dataset using SQL for data manipulation and transformation."
              />
            </ListItem>
          </List>
        </TabPanel>

        {/* Skills Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <BuildIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Core Strengths
          </Typography>
          
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              backgroundColor: 'rgba(58, 123, 213, 0.08)',
              borderRadius: 2,
              border: '1px solid rgba(58, 123, 213, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" color="primary.main" gutterBottom>
              AI Solution Integration Specialist
            </Typography>
            <Typography variant="body2" paragraph>
              My primary strength lies in developing projects and integrating several AI applications to build comprehensive AI solutions using Gen AI frameworks. I excel at connecting different AI technologies to create cohesive, powerful systems.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              <Chip label="Solution Architecture" size="small" color="secondary" />
              <Chip label="AI Integration" size="small" color="secondary" />
              <Chip label="Project Development" size="small" color="secondary" />
            </Box>
          </Paper>

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <BuildIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Technical Skills
          </Typography>

          <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
            Programming Languages
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip label="Python" size="small" color="primary" variant="outlined" />
            <Chip label="MySQL" size="small" color="primary" variant="outlined" />
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            ML Frameworks
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip label="Langchain" size="small" color="primary" variant="outlined" />
            <Chip label="Hugging Face" size="small" color="primary" variant="outlined" />
            <Chip label="MLflow" size="small" color="primary" variant="outlined" />
            <Chip label="Llama Index" size="small" color="primary" variant="outlined" />
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            Technologies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip label="Generative AI" size="small" color="primary" />
            <Chip label="Agentic workflow" size="small" color="primary" />
            <Chip label="RAGs" size="small" color="primary" />
            <Chip label="AI Integration" size="small" color="primary" />
            <Chip label="LLM Applications" size="small" color="primary" />
            <Chip label="Machine Learning" size="small" color="primary" variant="outlined" />
            <Chip label="NLP" size="small" color="primary" variant="outlined" />
            <Chip label="Deep Learning" size="small" color="primary" variant="outlined" />
            <Chip label="Prompt Engineering" size="small" color="primary" />
            <Chip label="API Integration" size="small" color="primary" variant="outlined" />
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            Other Tools
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip label="Microsoft Power BI" size="small" color="primary" variant="outlined" />
            <Chip label="Azure" size="small" color="primary" variant="outlined" />
            <Chip label="MongoDB" size="small" color="primary" variant="outlined" />
          </Box>

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
            <PsychologyIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Interpersonal Skills
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Excellent organizational abilities and time management skills" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Strong leadership and analytical problem-solving skills" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Exceptional communication and interpersonal skills" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Ability to multitask in complex situations" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Adaptability to diverse work environments" />
            </ListItem>
          </List>
        </TabPanel>
      </Box>
    </Paper>
  );
}

export default PraveenProfile; 