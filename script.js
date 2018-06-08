function changeBackground(box) {
    box.classList.add('grid-item-hovered');
}

function reset() {
    gridSize = prompt('How many?')
    createGrid(gridSize)
}

function clearGrid() {
    while (gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild)
    }
}

function setHoverEvents(mode) {

    const gridItems = document.querySelectorAll('.grid-item');
    if (mode == 'rainbow') {
        gridItems.forEach(item => {
            item.addEventListener('mouseover', e => item.style.backgroundColor = getRandomColor());
        })
    } else if (mode == 'shade') {
        gridItems.forEach(item => {
            item.addEventListener('mouseover', e => item.style.backgroundColor = incrementShade(item));
        })

    } else {
        gridItems.forEach(item => {
            item.addEventListener('mouseover', e => item.style.backgroundColor = mode);
        })
    }

}

function createGrid(size) {
    clearGrid()
    gridContainer.style.gridTemplateColumns = `repeat(${size}, auto)`
    gridContainer.style.gridTemplateRows = `repeat(${size}, auto)`

    for (num = 0; num < size * size; num++) {
        let gridItem = document.createElement('div');
        gridItem.setAttribute('class', 'grid-item');
        gridItem.setAttribute('id', num);
        gridContainer.append(gridItem);
        //gridItem.textContent = num;
    }
    setHoverEvents('rgba(0, 0, 0, 1)');
}


function incrementShade(item) {
    console.log(item)
    let currentColor = window.getComputedStyle(item, null).getPropertyValue('background-color')
    let newColor = 'rgba(0, 0, 0, 0.1)'
    if (currentColor.startsWith('rgba')) {
        let shade = currentColor.match(/rgba\(0, 0, 0, 0\.(\d)\)/);
        let newShade = Number(shade[1]) + 1;
        newColor = `rgba(0, 0, 0, 0.${newShade})`;
    }
    return newColor;
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setMode(mode) {
    createGrid(gridSize);
    setHoverEvents(mode);
}

let gridSize = 16
const gridContainer = document.querySelector('.grid-container');
const resetButton = document.querySelector('#reset-button');
const rainbowMode = document.querySelector('#rainbow-mode');
const shadeMode = document.querySelector('#shade-mode');
createGrid(gridSize);


resetButton.addEventListener('click', e => reset());
rainbowMode.addEventListener('click', e => setMode('rainbow'));
shadeMode.addEventListener('click', e => setMode('shade'));