import watchesJson from './watches.JSON'
let table = document.querySelector('.table-inner');
let watches = watchesJson.data;
let newWatches = [...watches];
let cartWatches = [];
let tagsPlaceholder = document.querySelector('.tags-inner');

// Function for the search function
let search = (event) => {
    table.innerHTML = null;
    let filtered = watches.filter(item => {
        return item.brand.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1;
    })
    newWatches = filtered;
    displayWatches()
}

// Function for the select options
let select = (event) => {
    let optionValue = event.target.value;
    let content = `<div class="tag"><p>${optionValue}</p> <i class="fas fa-times"></i></div>`

    tagsPlaceholder.insertAdjacentHTML('beforeend',content)
}

// Function that displays current watches (based on search preference)
let displayWatches = () => {
    newWatches.forEach((watch, index) => {
        let rowContent = `
        <div class="row-outer-${index} row-control">
        <div class="row" onclick='showAppendix(${index})'>
            <div class="cell"><i class="far fa-star" onclick="star(event)"></i> <img src='${watch.image}'></div>
            <div class="cell brand"> 
                <span class="top">${watch.brand}</span> 
                <span class="bottom">${watch.collection}</span>
            </div>
            <div class="cell">${watch.itemNo}</div>
            <div class="cell">$${(watch.price).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</div>
            <div class="cell">$${(watch.wholesale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</div>
            <div class="cell picker"><span id="watch-count-${index}">0</span> <div><i class="fas fa-chevron-up" onclick="mutateCart('add', ${watch.id})"></i><i class="fas fa-chevron-down" onclick="mutateCart('remove', ${watch.id})"></i></div></div>
            <div class="cell add-to-cart"><button class="button-buy" onclick="mutateCart('add', ${watch.id}, 'button')" id="button-buy-${index}">ADD <i class="fas fa-shopping-cart"></i></button> <i class="fas fa-chevron-down rotate-${index}"></i></div>
        </div>
        <div class="appendix">
            <hr/>
            <div class="cell">Color: ${watch.color}</div>
            <div class="cell">Material: ${watch.material}</div>
            <div class="cell">Features: ${watch.features}</div>
            <div class="cell external-link"><a href="https://www.google.com" target="_blank"><i class="fas fa-external-link-alt"></i></a></div>
        </div>
        </div>
        `
        table.insertAdjacentHTML('beforeend', rowContent);

    });
}

// Function to show additional information on row click
let direction = 0;
window.showAppendix = id => {
    let outer = document.querySelector(`.row-outer-${id}`);
    let chevron = document.querySelector(`.rotate-${id}`);

    outer.classList.toggle('row-control');
    outer.classList.toggle('row-outline');

    if(direction === 0) {
        chevron.style.transform = 'rotate(180deg)';
        direction = 1;
    } else {
        chevron.style.transform = 'rotate(0deg)';
        direction = 0;
    }
}

// Function for favorites (start)
window.star = (event) => {
    let currClass = event.target.classList;
    if(currClass.value === 'far fa-star') {
        currClass.remove('far');
        currClass.remove('fa-star')
        currClass.add('fas');
        currClass.add('fa-star')
    } else {
        currClass.remove('fas');
        currClass.remove('fa-star')
        currClass.add('far');
        currClass.add('fa-star')
    } 
}


// Function for cart mutation (adding/removing watches from the cart)
window.mutateCart = (modifier, id, button) => {
    if(modifier === 'add') {
        let addWatch = newWatches.filter(item => {
            return item.id === id
        })
        cartWatches.push(addWatch[0]);
        if(button === 'button'){
            let btn = document.getElementById(`button-buy-${id-1}`);
            btn.innerHTML = `ADDED <i class="fas fa-check"></i>`;
            setTimeout(()=> {
                btn.innerHTML = `ADD <i class="fas fa-shopping-cart"></i>`;
            }, 1500)
        }
    }
    if(modifier === 'remove') {
        let found = cartWatches.findIndex( item => {
            return item.id === id
        })
        cartWatches.splice(found,1);
    }

    updateCount(id);
}

// Function to update navbar cart status
window.updateCount = (id) => {
    let counter = document.getElementById(`watch-count-${id-1}`);
    let num = document.getElementById('num');
    let total = document.getElementById('total');
    let sum;

    let currentWatches = [];

    cartWatches.forEach(watch => {
        if(watch.id === id) {
            currentWatches.push(watch);
        }
    })
    counter.innerHTML = currentWatches.length;
    num.innerHTML = cartWatches.length;
    if(cartWatches.length === 0) {
        total.innerHTML = '$0';
    } else {
        sum = cartWatches.map(item => parseInt(item.price)).reduce((sum,curr)=>sum+curr);
        total.innerHTML = `$ ${sum.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`
    }
}




export { displayWatches, search, select }

