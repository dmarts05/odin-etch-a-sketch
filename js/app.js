const panelContainer = document.querySelector('.panel-container');
let mouseDown = false;

function generatePanelGrid(size) {
  for (let i = 0; i < size * size; i++) {
    const panel = document.createElement('div');
    panel.classList.add('panel');
    panelContainer.appendChild(panel);
  }

  const panels = document.querySelectorAll('.panel');
  panels.forEach((panel) =>
    panel.addEventListener('mousedown', () => (mouseDown = true))
  );

  panels.forEach((panel) =>
    panel.addEventListener('mouseup', () => (mouseDown = false))
  );

  panels.forEach((panel) =>
    panel.addEventListener('mousemove', function () {
      if (mouseDown) drawColor(this, 'white');
    })
  );
}

function drawColor(panel, color) {
  panel.setAttribute('style', `background-color: ${color}`);
}

generatePanelGrid(16);
