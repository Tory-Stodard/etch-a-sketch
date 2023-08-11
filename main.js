let currentColor = 'black';
let showGrid = false;

createGrid(16);

function createGrid(gridSize) {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridCell = document.createElement('div');
    gridCell.className = 'grid-cell';
    gridCell.addEventListener('mouseover', () => {
      if (currentColor === 'rainbow') {
        const r = randomColor();
        const g = randomColor();
        const b = randomColor();
        gridCell.style.backgroundColor = `rgb(${r},${g},${b})`;
      } else {
        gridCell.style.backgroundColor = currentColor;
      }
    });
    gridContainer.appendChild(gridCell);
  }
}

function changeGrid(promptStr = 'Enter a grid size between 2 and 100.') {
  let gridSize = prompt(promptStr);
  if (gridSize >= 2 && gridSize <= 100) {
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach((element) => element.remove());
    createGrid(gridSize);
  } else if (gridSize === null) {
    return;
  } else {
    changeGrid('You must enter a value between 2 and 100 to change grid size!');
  }
}

function clearGrid() {
  const gridCells = document.querySelectorAll('.grid-cell');
  gridCells.forEach((element) => (element.style.backgroundColor = 'white'));
}

function changeColor(color) {
  currentColor = color;
}

function randomColor() {
  return Math.floor(Math.random() * 255);
}

function showHideGrid() {
  const gridCells = document.querySelectorAll('.grid-cell');
  showGrid = !showGrid;
  switch (showGrid) {
    case true:
      gridCells.forEach(
        (element) => (element.style.border = '1px solid rgb(30,30,30)')
      );
      break;
    case false:
      gridCells.forEach((element) => (element.style.border = 'none'));
      break;
  }
}
