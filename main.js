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

createGrid(16);
