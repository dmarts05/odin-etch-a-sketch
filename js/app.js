const panelContainer = document.querySelector('.panel-container');
const drawBtn = document.querySelector('#draw');
const eraseBtn = document.querySelector('#erase');
const clearBtn = document.querySelector('#clear');
const gridSizeSlider = document.querySelector('#grid-size');

let mouseDown = false;
const defaultColor = window
  .getComputedStyle(panelContainer, null)
  .getPropertyValue('background-color');

function generatePanelGrid(size) {
  removePreviousGrid();

  for (let i = 0; i < size * size; i++) {
    const panel = document.createElement('div');
    panel.classList.add('panel');
    panelContainer.appendChild(panel);
  }

  panelContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  const panels = document.querySelectorAll('.panel');

  window.addEventListener('mouseup', () => (mouseDown = false));
  activateDrawMode();
  panels.forEach((panel) => {
    // Implement drawing capability
    panel.addEventListener('mousedown', () => (mouseDown = true));
    // Prevent dragging of panels
    panel.addEventListener('dragstart', (e) => e.preventDefault());
  });
}

function removePreviousGrid() {
  if (document.querySelectorAll('.panel').length !== 0) {
    let panel = panelContainer.lastElementChild;
    while (panel) {
      panelContainer.removeChild(panel);
      panel = panelContainer.lastElementChild;
    }
  }
}

function updateGridSizeText(size) {
  document.getElementById('grid-size-text').textContent = `${size} × ${size}`;
}

function clearGrid() {
  const panels = document.querySelectorAll('.panel');
  panels.forEach((panel) => {
    panel.style.backgroundColor = defaultColor;
  });
}

function drawColor(panel, color) {
  panel.style.backgroundColor = color;
}

function getColor() {
  const colorPicker = document.querySelector('#color');
  return colorPicker.value;
}

function activateDrawMode() {
  const panels = document.querySelectorAll('.panel');
  panels.forEach((panel) => {
    panel.addEventListener('mousemove', function () {
      if (mouseDown) drawColor(this, getColor());
    });
  });

  changeMode(drawBtn);
}

function activateEraseMode() {
  const panels = document.querySelectorAll('.panel');
  panels.forEach((panel) => {
    panel.addEventListener('mousemove', function () {
      if (mouseDown) drawColor(this, defaultColor);
    });
  });

  changeMode(eraseBtn);
}

function changeMode(modeBtn) {
  const formBtns = document.querySelectorAll('input[type = "button"]');
  formBtns.forEach((btn) => {
    btn.style.backgroundColor = 'transparent';
    btn.style.color = 'black';
  });

  setActiveMode(modeBtn);
}

function setActiveMode(btn) {
  btn.style.backgroundColor = 'black';
  btn.style.color = 'white';
}

function startApp() {
  generatePanelGrid(gridSizeSlider.value);
  gridSizeSlider.addEventListener('input', (e) =>
    updateGridSizeText(e.target.value)
  );
  gridSizeSlider.addEventListener('mouseup', (e) =>
    generatePanelGrid(e.target.value)
  );
  drawBtn.addEventListener('click', activateDrawMode);
  eraseBtn.addEventListener('click', activateEraseMode);
  clearBtn.addEventListener('click', clearGrid);
}

startApp();
