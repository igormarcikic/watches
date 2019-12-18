import './styles/scss/main.scss';
import {moveSlider, currentDot } from './app/slider';
import { displayWatches, search, select } from './app/search';
import timelineScroll from './app/timeline';

// Add drop shadow to nav
window.addEventListener('scroll',(e)=>{
    const nav = document.querySelector('header');
    if(window.pageYOffset>0){
      nav.classList.add("add-shadow");
    }else{
      nav.classList.remove("add-shadow");
    }
  });

// Slider controls
document.getElementById('left').addEventListener('click', () => {
    moveSlider('left')
})

document.getElementById('right').addEventListener('click', () => {
    moveSlider('right')
})

// Serach controls
document.getElementById('search').addEventListener('input', (event) => {
    search(event)
})

currentDot();
displayWatches();

// Timeline controls
let intervalHandler;
document.querySelector('.timeline-left>img').addEventListener('mousedown', () => {
    intervalHandler = setInterval(function() { timelineScroll('left') }, 20);
    return false;
});
document.querySelector('.timeline-left>img').addEventListener('mouseup', () => {
    clearInterval(intervalHandler);
});

document.querySelector('.timeline-right>img').addEventListener('mousedown', () => {
    intervalHandler = setInterval(function() { timelineScroll('right') }, 20);
    return false;
});
document.querySelector('.timeline-right>img').addEventListener('mouseup', () => {
    clearInterval(intervalHandler);
});


// Search tags control
let selectFields = [...document.querySelectorAll('select')];
selectFields.forEach( field => {
    field.addEventListener('change', (event) => {
        console.log('hi')
        select(event)
    })
})
