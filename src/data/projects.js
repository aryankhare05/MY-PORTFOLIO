export const projects = [
{
  id: 'wanderlust',

  name: 'WanderLust – Airbnb Clone',

  tagline:
    'A full-stack Airbnb-inspired booking platform supporting 100+ property listings.',

  overview:
    'WanderLust is a full-stack Airbnb-inspired booking and property listing platform built with Node.js, Express.js, MongoDB, and EJS. The application supports 100+ property listings and provides secure user authentication, authorization, listing management, reviews, image uploads, and interactive location visualization. It follows an MVC-based architecture and includes 10+ RESTful APIs for managing users, listings, reviews, and bookings.',

  technologies: [
    'Node.js',
    'Express.js',
    'MongoDB',
    'Mongoose',
    'EJS',
    'JavaScript',
    'HTML',
    'CSS',
    'Passport.js',
    'Cloudinary',
    'Mapbox'
  ],

  features: [
    'Supports 100+ property listings with complete listing management',
    'Create, view, edit, and delete property listings',
    'Secure user authentication, authorization, and session management using Passport.js',
    '10+ RESTful APIs for users, listings, reviews, and bookings',
    'Cloud-based property image uploads and storage using Cloudinary',
    'Interactive property location visualization using Mapbox',
    'Add and delete reviews with user-based authorization',
    'MongoDB relationships between users, listings, and reviews',
    'Responsive server-rendered user interface using EJS, HTML, and CSS',
    'MVC-based architecture with separate models, views, controllers, routes, and middleware',
    'Centralized error handling and server-side validation',
    'Designed to support 50+ concurrent users'
  ],

  githubUrl:
    'https://github.com/aryankhare05/wanderLust-airbnb-clone-',

  liveUrl:
    'https://wanderlust-airbnb-clone-667v.onrender.com/',

  screenshots: ['/WANDERLUST1.jpg'],
},

// {
// id: 'garbage-detection',
// name: 'Garbage Detection Project',
// tagline: 'An AI-powered garbage detection and classification web application.',
// overview:
// 'An AI/ML-based garbage detection project that combines computer vision with a Django web application. The system processes uploaded images and uses trained machine-learning models to identify and classify different categories of waste through a browser-based interface.',
// technologies: [
// 'Python',
// 'Django',
// 'YOLO',
// 'TensorFlow',
// 'Machine Learning',
// 'Computer Vision',
// 'SQLite',
// 'HTML',
// 'CSS'
// ],
// features: [
// 'Upload images through a Django-based web interface',
// 'Detect and classify garbage from uploaded images',
// 'Computer-vision-based garbage detection using YOLO',
// 'Machine-learning model integration with the Django backend',
// 'Supports classification of multiple waste categories such as glass and cardboard',
// 'Displays detection and classification results through the web interface'
// ],
// githubUrl: 'https://github.com/aryankhare05/Mini-project-garbage-detection-project.git',
// liveUrl: '[ADD LIVE DEMO URL]',
// screenshots: [],
// },

{
  id: 'video-conferencing',

  name: 'Video Conferencing Web App',

  tagline:
    'A full-stack real-time video conferencing platform supporting 20+ concurrent participants.',

  overview:
    'A full-stack real-time video conferencing web application built using React.js, Node.js, Express.js, WebRTC, and Socket.IO. The platform enables users to create and join secure meeting rooms, communicate through low-latency peer-to-peer video and audio, and use live chat directly from the browser. It features responsive Material UI interfaces, API communication using Axios, and secure user authentication and session handling.',

  technologies: [
    'React.js',
    'Node.js',
    'Express.js',
    'WebRTC',
    'Socket.IO',
    'JavaScript',
    'HTML',
    'CSS',
    'Material UI',
    'Axios',
    'bcrypt',
    'Crypto'
  ],

  features: [
    'Real-time peer-to-peer video and audio communication using WebRTC',
    'Supports 20+ concurrent participants',
    'Secure meeting room creation and joining',
    'Real-time communication and signaling using Socket.IO',
    'Live text chat during video conferences',
    'User authentication and secure session management',
    'Responsive user interface built with Material UI',
    'API communication between frontend and backend using Axios',
    'Password security using bcrypt and Crypto'
  ],

  githubUrl: '[ADD VIDEO CONFERENCING GITHUB URL]',

  liveUrl: 'https://connectsphere1.onrender.com',

  screenshots: ['/videoConfrencing1.jpg'],
},
]

