const colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("input", (e) => (currentColor = e.target.value));

let currentColor = colorPicker.value;
let showGrid = false;

let mouseDown = false;
document.body.onmousedown = (e) => {
  mouseDown = true;
  e.preventDefault();
};
document.body.onmouseup = () => (mouseDown = false);

createGrid(16);

function createGrid(gridSize) {
  const gridContainer = document.querySelector(".grid-container");
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridCell = document.createElement("div");
    gridCell.className = "grid-cell";
    gridCell.addEventListener("mouseover", draw);
    gridCell.addEventListener("mousedown", draw);
    gridContainer.appendChild(gridCell);
  }
  const gridCells = document.querySelectorAll(".grid-cell");
  if (showGrid) {
    gridCells.forEach(
      (element) => (element.style.border = "1px solid rgb(30,30,30)")
    );
  } else {
    gridCells.forEach((element) => (element.style.border = "none"));
  }
}

function changeGrid(promptStr = "Enter a grid size between 2 and 100.") {
  let gridSize = prompt(promptStr);
  if (gridSize >= 2 && gridSize <= 100) {
    const gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach((element) => element.remove());
    createGrid(gridSize);
  } else if (gridSize === null) {
    return;
  } else {
    changeGrid("You must enter a value between 2 and 100 to change grid size!");
  }
}

function clearGrid() {
  const gridCells = document.querySelectorAll(".grid-cell");
  gridCells.forEach((element) => (element.style.backgroundColor = "white"));
}

function changeColor(color) {
  currentColor = color;
}

function randomColor() {
  return Math.floor(Math.random() * 255);
}

function showHideGrid() {
  const gridCells = document.querySelectorAll(".grid-cell");
  showGrid = !showGrid;
  switch (showGrid) {
    case true:
      gridCells.forEach(
        (element) => (element.style.border = "1px solid rgb(30,30,30)")
      );
      break;
    case false:
      gridCells.forEach((element) => (element.style.border = "none"));
      break;
  }
}

function draw(e) {
  if (e.type === "mouseover" && mouseDown === false) {
    return;
  } else if (currentColor === "rainbow") {
    const r = randomColor();
    const g = randomColor();
    const b = randomColor();
    e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
  } else {
    e.target.style.backgroundColor = currentColor;
  }
}
