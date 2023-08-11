function createGrid(gridSize) {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridCell = document.createElement('div');
    gridCell.className = 'grid-cell';
    gridCell.addEventListener(
      'mouseover',
      () => (gridCell.style.backgroundColor = 'blue')
    );
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

createGrid(16);
