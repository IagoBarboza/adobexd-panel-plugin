let panel;

function create() {

  const html = `
    <style>
      .break { 
        flex-wrap: wrap;
      }
      label.row > span {
        color: #8E8E8E;
        width: 20px;
        text-align: right;
        font-size: 9px;
      }
      label.row input {
        flex: 1 1 auto;
      }
      form {
        width: 90%;
        margin: -20px;
        padding: 0px;
      }
      .show {
        display: block;
      }
      .hide {
        display: none;
      }
    </style>

    <form method="dialog" id="main">
      <div class="row break">
        <label class="row">
          <span>↕︎</span>
          <input type="number" uxp-quiet="true" id="txtV" value="" placeholder="Height" />
        </label>

        <label class="row">
          <span>↔︎</span>
          <input type="number" uxp-quiet="true" id="txtH" value="" placeholder="Height" />
        </label>
      </div>
      <footer>
        <button id="ok" type="submit" uxp-variant="cta">Apply</button>
      </footer>
    </form>
    
    <p id="warning">This plugin requires you to select a rectangle in the document. Please select a rectangle.</p>
  `;

  function resize() {
    const { editDocument } = require('application');
    const height = Number(document.querySelector('#txtV').value);
    const width = Number(document.querySelector('#txtH').value);
    
    editDocument({ editLabel: 'Resize rectangle' }, function (selection) {
      const selectedRectangle = selection.items[0];
      selectedRectangle.width = width;
      selectedRectangle.height = height;
    });
  }

  panel = document.createElement('div');
  panel.innerHTML = html;
  panel.querySelector('form').addEventListener('submit', resize);

  return panel;
}

function show(event) {
  if (!panel) event.node.appendChild(create());
}

function update(selection) {
  const { Rectangle } = require('scenegraph');
  
  const form = document.querySelector('form');
  const warning = document.querySelector('#warning');

  if (!selection || !(selection.items[0] instanceof Rectangle)) {
    form.className = 'hide';
    warning.className = 'show';
  } else {
    form.className = 'show';
    warning.className = 'hide';
  }
}

module.exports = {
  panels: {
    resizeRectangle: {
      show,
      update
    }
  }
}