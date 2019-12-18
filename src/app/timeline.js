
let first = document.querySelectorAll('.first');

let timelineState = 0;
let timelineScroll = (direction) => {
    if(direction === 'left') {
        timelineState+=50;
        first.forEach(item => {
            item.style.marginLeft = `${timelineState}px`
        })
    } else {
        timelineState-=50;
        first.forEach(item => {
            item.style.marginLeft = `${timelineState}px`
        })
    }
}

export default timelineScroll;