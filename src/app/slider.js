let state = 0;
let moveSlider = direction => {
    let body = document.querySelector('.slider-body');
    if(state === 0) {
        if(direction === 'right') {
            state = state-800
            body.style.marginLeft = state + 'px'
        }
    }   else if(state === -2400) {
        if(direction === 'left') {
            state = state+800
            body.style.marginLeft = state + 'px'
        }
    } 
    else {
        if(direction === 'left') {
            state = state+800
            body.style.marginLeft = state+'px'
        } else {
            state = state-800
            body.style.marginLeft = state + 'px'
        }
    }
    console.log(state)

    currentDot()
}

let currentDot = () => {
    let dots = [...document.querySelectorAll('.dot')];
    let currDot;
    switch(state) {
        case 0:
            currDot = dots[0];
            dots.splice(0, 1)
            break;
        case -800:
            currDot = dots[1];
            dots.splice(1, 1)
            break;
        case -1600:
            currDot = dots[2];
            dots.splice(2, 1)
            break;
        case -2400:
            currDot = dots[3];
            dots.splice(3, 1)
            break;
    }
    dots.forEach(item => {
        item.style.width = '10px'
        item.style.height = '10px'
        item.style.backgroundColor = '#e7dcd5'
    })
    currDot.style.width = '15px';
    currDot.style.height = '15px';
    currDot.style.backgroundColor = '#a67e64'
}

export { moveSlider, currentDot }
