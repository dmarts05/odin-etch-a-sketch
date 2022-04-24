const panelContainer = document.querySelector('.panel-container');
let mouseDown = false;

function generatePanelGrid(size) {
  for (let i = 0; i < size * size; i++) {
    const panel = document.createElement('div');
    panel.classList.add('panel');
    panelContainer.appendChild(panel);
  }

  panelContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  const panels = document.querySelectorAll('.panel');

  window.addEventListener('mouseup', () => (mouseDown = false));
  panels.forEach((panel) => {
    // Implement drawing capability
    panel.addEventListener('mousedown', () => (mouseDown = true));
    panel.addEventListener('mousemove', () => {
      if (mouseDown) drawColor(this, 'white');
    });
    // Prevent dragging of panels
    panel.addEventListener('dragstart', (e) => e.preventDefault());
  });
}

function drawColor(panel, color) {
  panel.setAttribute('style', `background-color: ${color}`);
}

generatePanelGrid(16);
