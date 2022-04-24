const panelContainer = document.querySelector('.panel-container');
const drawBtn = document.querySelector('#draw');
const eraseBtn = document.querySelector('#erase');
let mouseDown = false;
const defaultColor = window.getComputedStyle(panelContainer, null).getPropertyValue('background-color');

function generatePanelGrid(size) {
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

function drawColor(panel, color) {
  panel.setAttribute('style', `background-color: ${color}`);
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
}

function activateEraseMode() {
  const panels = document.querySelectorAll('.panel');
  panels.forEach((panel) => {
    panel.addEventListener('mousemove', function () {
      if (mouseDown) drawColor(this, defaultColor);
    });
  });
}

generatePanelGrid(16);
drawBtn.addEventListener('click', activateDrawMode);
eraseBtn.addEventListener('click', activateEraseMode);
