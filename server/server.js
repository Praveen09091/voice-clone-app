require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Praveen's profile information extracted from the resume
const praveenProfile = {
  name: "Praveen Kumar Oleti",
  currentPosition: "Prompt Engineer and Gen AI Developer at Nvidia graphics for Tegra and cosmos projects",
  location: "Kadapa, Andhra Pradesh, India",
  contact: {
    phone: "+91 9347088041",
    email: "praveenkumaroleti09@gmail.com",
    linkedin: "in/praveen-kumar-650941240"
  },
  education: [
    {
      degree: "Bachelor of Technology in Electronics and Communication (ECE)",
      institution: "KSRM College of Engineering, Kadapa",
      period: "2020-2024",
      performance: "CGPA-8.98"
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Pratibha Junior College, Ongole",
      period: "2018-2020",
      performance: "CGPA-9.53"
    },
    {
      degree: "SSC (Secondary Education)",
      institution: "Alpha High School, Kadapa",
      period: "2017-2018",
      performance: "CGPA-9.80"
    }
  ],
  projects: [
    {
      name: "Object detection using drone",
      period: "2022-April 2023",
      details: "Developed a customized object detection drone with Raspberry Pi and Pixhawk controller as the team lead, enabling image/video capture and data transmission to the ground control/server. Implemented manual control and Linux command-based control methods for accessing and operating the drone."
    },
    {
      name: "RAG, Chatbot, Q and A chatbot, Pdf query using Llama index, Langchain",
      period: "March 2024",
      details: "Developed a conversational chatbot capable of understanding and responding to natural language queries using OpenAI and Langchain. Implemented a Q&A chatbot system that can retrieve accurate answers from a knowledge base using LlamaIndex. Built a PDF query application that can extract relevant information from PDF documents using LlamaIndex's capabilities and AWS bedrock."
    },
    {
      name: "Data analysis on Covid-19 data set",
      period: "December 2023",
      details: "Performed data cleaning and preprocessing on a COVID-19 dataset, utilizing SQL for data manipulation and transformation. Extracted relevant information and insights from the cleaned COVID-19 data by executing SQL queries and analysis."
    }
  ],
  internships: [
    {
      position: "Internship on Data analytics and AI",
      company: "Edunet Foundation",
      location: "Virtual",
      period: "02/2024 - 03/2024",
      details: "Developed a college chatbot showcasing NLP and conversational AI skills. Preprocessed German housing data, conducted exploratory data analysis (EDA). Visualized data on IBM Cloud, demonstrating cloud computing proficiency."
    },
    {
      position: "Internship on IoT",
      location: "Kadapa, AP",
      period: "11/2022 - 12/22",
      details: "Developed IoT projects using Arduino and Raspberry Pi 3B+. Designed and fabricated PCBs for IoT devices using Eagle."
    },
    {
      position: "Internship on Mechatronics",
      company: "ARC Labs",
      location: "Kadapa, AP",
      period: "08/2022 - 10/22",
      details: "Gained practical experience working with applications like Matrix, Bartender, Assembling, and Pick and Place, which are commonly used in the industry. Developed skills in designing and implementing instructions for robotic automation using Codesys, a widely-used software platform for industrial control systems. Acquired the ability to tailor robotic automation programs to specific needs and requirements."
    }
  ],
  certifications: [
    "Oracle OCI Gen AI Professional Certification (July 2024)",
    "Career Essentials in Generative AI by Microsoft and LinkedIn (March 2024)",
    "Getting Started with Enterprise-grade AI, Journey to cloud: Envisioning your solution by IBM Skillsbuild (March 2024)",
    "Foundations of Prompt Engineering, Building a Gen AI ready Organisation, Planning a Gen AI Project by AWS training and Certification (February 2024)",
    "Basics of python, Techniques for Big data analytics by Infosys Springboard (January 2024)",
    "Introduction to Generative Adversarial Networks, Data science foundations (January 2024)",
    "Python Bootcamp from Udemy (December 2023)",
    "Data Analytics Bootcamp by Alexander Freberg (November 2023)",
    "Microsoft certified Azure Fundamentals, Azure AI Fundamental (October 2022)"
  ],
  technicalSkills: {
    programmingLanguages: ["Python", "MYSQL"],
    mlFrameworks: ["Langchain", "Hugging Face", "MLflow", "Llama Index"],
    technologies: ["Generative AI", "Agentic workflow", "RAGs", "Machine Learning", "NLP", "Deep Learning", "Reinforcement Learning", "Prompt Engineering"],
    dataVisualization: ["Microsoft Power BI"],
    cloudComputing: ["Microsoft Azure Fundamentals", "Azure AI Document Intelligence", "Mango DB"]
  },
  interpersonalSkills: [
    "Excellent organizational abilities, time management skills, and adaptability to diverse work environments.",
    "Strong leadership, analytical, problem-solving, and influential skills to guide and collaborate effectively.",
    "Exceptional communication, interpersonal skills, and ability to multitask in complex situations."
  ],
  volunteering: [
    "Served as an INSTRUCTOR at AP model school for IOT, Under ATAL Tinkering Labs (Oct. - Jan. 2023)",
    "Coordinated events in the College as a member of IEEE, IETE.",
    "Took the responsibility of leading the class for 7 semesters as a Class Representative.",
    "Contributed to Projects within the Research and development cell."
  ],
  personalInterests: [
    "Listening Music",
    "Interacting with people",
    "Designing templates",
    "Improving communication skills"
  ],
  languages: [
    { language: "English", level: "Advanced" },
    { language: "Telugu", level: "Native" }
  ],
  // Answers to specific questions - we'll customize these with more information as needed
  lifeStory: "I am Praveen Kumar Oleti, a Prompt Engineer and Gen AI Developer currently working at Nvidia graphics for Tegra and cosmos projects. I completed my Bachelor's in Electronics and Communication Engineering from KSRMCE with an impressive 8.98 CGPA. Throughout my academic journey, I've maintained excellent performance with high CGPA scores. I've developed expertise in AI, particularly in Generative AI, and have worked on various projects spanning object detection drones, RAG chatbots, and data analysis.",
  superpower: "My #1 superpower is my ability to quickly adapt to and master new technologies, particularly in the AI and Generative AI space. I have a strong foundation in prompt engineering and can effectively build AI systems that deliver accurate and helpful responses. My core strength lies in developing projects and integrating several AI applications to build comprehensive AI solutions using Gen AI frameworks. My technical versatility allows me to work across domains from IoT to data analytics to generative AI solutions.",
  growthAreas: [
    "Deepening my expertise in advanced Generative AI models and techniques",
    "Expanding my knowledge of cloud infrastructure and deployment strategies for AI applications",
    "Enhancing my leadership skills to effectively manage larger teams and more complex projects"
  ],
  misconception: "A common misconception coworkers might have about me is that I'm solely focused on technical aspects of projects. While I do have strong technical skills, I also value good communication, team collaboration, and understanding the broader business context of our work. I'm as invested in the people aspects of projects as I am in the technical implementations.",
  pushingBoundaries: "I push my boundaries by continuously seeking out new learning opportunities through certifications and courses. I take on projects that challenge me to apply my knowledge in new ways, such as my work on object detection drones and RAG systems. I also step into leadership roles whenever possible, having served as a class representative for 7 semesters and leading technical projects. I believe in putting myself in situations that require me to grow and adapt quickly."
};

// API route for text-based interactions
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Log the request
    console.log('Received message:', message);
    
    // Check if API key exists and is properly formatted
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === '') {
      console.error('Invalid API key format - check your .env file');
      return res.status(500).json({ error: 'OpenAI API key is invalid or improperly formatted' });
    }
    
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Using gpt-3.5-turbo which is more widely available
        messages: [
          { 
            role: "system", 
            content: `You are a voice assistant clone of Praveen Kumar Oleti. Respond as if you are Praveen himself.
            Use the following information about Praveen to inform your responses:
            ${JSON.stringify(praveenProfile, null, 2)}
            
            When answering questions about Praveen's life, experiences, or opinions, use this information and respond in first person,
            as if you are Praveen speaking. Keep responses conversational, personal, and reflective of Praveen's background.
            If asked something not covered in the provided information, politely explain that you don't have that specific information.`
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      console.log('OpenAI response received successfully');
      res.json({ 
        response: response.choices[0].message.content,
        usage: response.usage
      });
    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError.message);
      console.error('Full error details:', JSON.stringify(openaiError, null, 2));
      return res.status(500).json({ 
        error: 'Error calling OpenAI API', 
        details: openaiError.message 
      });
    }
  } catch (error) {
    console.error('General server error:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Failed to process your request', 
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 