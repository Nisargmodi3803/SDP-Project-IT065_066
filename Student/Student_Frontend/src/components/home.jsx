import React, { useState, useEffect } from "react";
import "./CourseList.css";
import slides from "./Slides";
import { useNavigate } from "react-router-dom";
const CourseList = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [backgroundBrightness, setBackgroundBrightness] = useState(0);
    const [contentTop, setContentTop] = useState('50%');
    const navigate = useNavigate()
    useEffect(() => {
        calculateBackgroundBrightness();
        calculateContentTop();
    }, [currentIndex]);

    const calculateBackgroundBrightness = () => {
        const image = new Image();
        image.src = slides[currentIndex].background;
        image.onload = () => {
            const brightness = calculateBrightness(image);
            setBackgroundBrightness(brightness);
        };
    };

    const calculateBrightness = (background) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = background.width;
        canvas.height = background.height;
        context.drawImage(background, 0, 0);
        
        let totalBrightness = 0;
        const sampleSize = 100; // Number of pixels to sample
        const imageData = context.getImageData(0, 0, background.width, background.height);
        const pixels = imageData.data;
        
        for (let i = 0; i < sampleSize; i++) {
            const index = Math.floor(Math.random() * pixels.length / 4) * 4;
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            totalBrightness += (r + g + b) / 3; // Calculate brightness for each pixel
        }
        console.log(totalBrightness/sampleSize);
        return totalBrightness / sampleSize; // Calculate average brightness
    };

    const calculateContentTop = () => {
        const mainBackHeight = document.getElementById('main-back').offsetHeight;
        const contentHeight = document.querySelector('.content-container').offsetHeight;
        const topPosition = (mainBackHeight - contentHeight) / 2;
        setContentTop(`${topPosition}px`);
    };

    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % slides.length);
    };

    const previousSlide = () => {
        setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    };

    const displayImage = (index) => {
        const realIndex = (currentIndex + index) % slides.length;
        const isActive = index === 0;
        const classNames = `highlight-item ${isActive ? 'active' : ''}`;

        return (
            <div className={classNames}>
                <p className={`highlight-description ${backgroundBrightness < 128 ? 'light-background' : 'dark-background'}`}>{slides[realIndex].highlightDescription}</p>
                <img src={slides[realIndex].image} alt={`Image ${realIndex}`} className="highlight-image" />
            </div>
        );
    };

    const backgroundImageStyle = {
        backgroundImage: `url(${slides[currentIndex].background})`
    };

    return (
        <div className="grandparent">
            <div id="main-back" className="main-back" style={backgroundImageStyle}>
                {/* <Header /> */}
                <main className="main-content">
                    <div className="content-container" style={{ top: contentTop }}>
                        <h2 className={`country-name ${backgroundBrightness < 115 ? 'light-background'  : 'dark-background'}`}>{slides[currentIndex].course}</h2>
                        <p className={`country-description ${backgroundBrightness < 128 ? 'light-background' : 'dark-background'}`}>{slides[currentIndex].description}</p>
                        <button className="explore-button" style={{ backgroundColor: backgroundBrightness < 128 ? '#333' : '#ccc', color: backgroundBrightness < 128 ? 'white' : 'black' }} onClick={()=>{navigate('/allCourses')}}>Explore More &gt;</button>
                    </div>
                    <div className="highlight-container">
                        <div className="highlight-carousel">
                            {displayImage(0)}
                            {displayImage(1)}
                            {displayImage(2)}
                        </div>
                        &nbsp;&nbsp;
                        <div className="nav-buttons">
                            <button className="button prev" onClick={previousSlide}>{'<'}</button>
                            <button className="button next" onClick={nextSlide}>{'>'}</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CourseList;
