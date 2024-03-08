// slides.js


import image1 from '../assets/course1.png';
import image2 from '../assets/course2.jpeg.jpg';

import image3 from '../assets/laptop-with-program-code-technological-background-with-program-code-elements-shields_272306-174.webp';
import image4 from '../assets/background1.jpeg.jpg';
import image5 from '../assets/course5.jpeg.jpg';
import background from '../assets/background.jpeg.jpg';

const slides = [
    
    {
        course: 'HTML',
        description: 'In this comprehensive course, students will embark on a journey to master the fundamentals of HTML, equipping themselves with the essential skills needed to create and design web pages from scratch.',
        highlightDescription: 'Beginner HTML course ',
        image: image1,
        background: image3
    },
    {
        course: 'CSS',
        description: 'In our comprehensive CSS course, participants will embark on a journey to master the art of styling web pages with precision and creativity. CSS (Cascading Style Sheets) is the backbone of web design, enabling developers to control the presentation and layout of HTML content with finesse.',
        highlightDescription: 'Zero to Hero',
        image: image2,
        background: image4
    },
    {
        course: 'REACT',
        description: 'In our immersive React course, participants will embark on a transformative journey to become proficient in building dynamic and interactive web applications. React, a powerful JavaScript library developed by Facebook, revolutionizes the way developers create user interfaces, offering a component-based approach that promotes reusability, modularity, and efficiency.',
        highlightDescription: 'Effects by React',
        image: image5,
        background: background
    }
];

export default slides;