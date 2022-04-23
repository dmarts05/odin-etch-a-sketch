const panelContainer = document.querySelector('.panel-container');

for (let i = 0; i < 16*16; i++) {
  const panel = document.createElement('div');
  panel.classList.add('panel');
  panelContainer.appendChild(panel);
}