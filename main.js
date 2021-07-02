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
  
    <form
      id="main"
      method="dialog"
    >
      <div class="row break">
        <label class="row">
          <span>↕︎</span>
          <input 
            id="txtV"
            type="number"
            value=""
            placeholder="Height"
            uxp-quite="true"
          />
        </label>

        <label class="row">
          <span>↔︎</span>
          <input 
            id="txtH"
            type="number"
            value=""
            placeholder="Width"
            uxp-quite="true"
          />
        </label>
      </div>
      <footer>
        <button
          id="ok"
          type="submit"
          uxp-variant="cta"
        >
          Apply
        </button>
      </footer>
    </form>
    
    <p id="warning">This plugin requires you to select a rectangle in the document.</p>
  `

  function resize() {
    const { editDocument } = require('application')
  
    const height = Number(document.querySelector('#txtV').value)
    const width = Number(document.querySelector('#txtH').value)
    
    editDocument({ editLabel: 'Resize Rectangle' }, function (selection) {
      const selectedRectangle = selection.items[0]
      selectedRectangle.height = height
      selectedRectangle.width = width
    })
  }

  panel = document.createElement('div')
  panel.innerHTML = html
  panel.querySelector('form').addEventListener('submit', resize)
}

function show(event) {
  if (!panel) {
    create()
    event.node.appendChild(panel)
  }
}

function update(selection) {
  const { Rectangle } = require('scenegraph')

  const selectedItem = selection && selection.items[0]
  const heightInput = document.querySelector('#txtV')
  const widthInput = document.querySelector('#txtH')
  const form = document.querySelector('form')
  const warning = document.querySelector('#warning')

  if (selectedItem && (selectedItem instanceof Rectangle)) {
    heightInput.value = selectedItem.height
    widthInput.value = selectedItem.width
    form.className = 'show'
    warning.className = 'hide'
  } else {
    form.className = 'hide'
    warning.className = 'show'
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