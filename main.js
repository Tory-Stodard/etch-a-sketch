const colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("input", (e) => {
  if (eraserActive) {
    erase();
  } else if (rainbowActive) {
    rainbow();
  }
  currentColor = e.target.value;
});

let currentColor = colorPicker.value;
let showGrid = false;
let eraserActive = false;
let rainbowActive = false;

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
    gridCell.style.backgroundColor = "#FFFFFF";
    gridCell.addEventListener("mouseover", draw);
    gridCell.addEventListener("mousedown", draw);
    gridContainer.appendChild(gridCell);
  }
  const gridCells = document.querySelectorAll(".grid-cell");
  if (showGrid) {
    gridCells.forEach((element) => (element.style.border = "1px solid black"));
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

function erase() {
  if (rainbowActive === true) {
    rainbow();
  }
  const eraserBtn = document.querySelector(".eraser-btn");
  eraserActive = !eraserActive;
  switch (eraserActive) {
    case true:
      eraserBtn.style.backgroundColor = "white";
      eraserBtn.style.border = "2px solid black";
      break;
    case false:
      eraserBtn.style.backgroundColor = "var(--color2)";
      eraserBtn.style.border = "2px solid transparent";
  }
}

function rainbow() {
  if (eraserActive === true) {
    erase();
  }
  const rainbowBtn = document.querySelector(".rainbow-btn");
  rainbowActive = !rainbowActive;
  switch (rainbowActive) {
    case true:
      rainbowBtn.style.backgroundColor = "white";
      rainbowBtn.style.border = "2px solid black";
      break;
    case false:
      rainbowBtn.style.backgroundColor = "var(--color2)";
      rainbowBtn.style.border = "2px solid transparent";
      break;
  }
}

function randomColor() {
  return Math.floor(Math.random() * 255);
}

function showHideGrid() {
  const gridCells = document.querySelectorAll(".grid-cell");
  const showHideBtn = document.querySelector(".show-hide-btn");
  showGrid = !showGrid;
  switch (showGrid) {
    case true:
      gridCells.forEach(
        (element) => (element.style.border = "1px solid black")
      );
      showHideBtn.textContent = "Hide Grid";
      break;
    case false:
      gridCells.forEach((element) => (element.style.border = "none"));
      showHideBtn.textContent = "Show Grid";
      break;
  }
}

function draw(e) {
  if (e.type === "mouseover" && mouseDown === false) {
    return;
  } else if (rainbowActive === true) {
    const r = randomColor();
    const g = randomColor();
    const b = randomColor();
    e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
  } else if (eraserActive === true) {
    e.target.style.backgroundColor = "white";
  } else {
    e.target.style.backgroundColor = currentColor;
  }
}
