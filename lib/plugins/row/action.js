(function (window) {

	'use strict';

	class Action {

		static handle() {
			return 'data-handle-event';
		}

		constructor(form, icon) {
			this.form = form;
			this.elements = {};

			let material = typeof icon !== 'string' || icon.length === 0 ? 'warning' : icon;
			this.setButtonIcon(material);
		}

		getForm() {
			return this.form;
		}
		getButton() {
			if (this.elements.hasOwnProperty('button')) return this.elements.button;
			this.elements.button = document.createElement('button');
			this.elements.button.setAttribute('type', 'button');
			this.elements.button.className = 'waves-effect';
			return this.elements.button;
		}
		getButtonContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			let button = this.getButton();
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'form content action';
			this.elements.content.appendChild(button);
			return this.elements.content;
		}
		getButtonGrid() {
			if (this.elements.hasOwnProperty('grid')) return this.elements.grid;
			let content = this.getButtonContent();
			this.elements.grid = document.createElement('div');
			this.elements.grid.className = 'pure-u-24-24';
			this.elements.grid.appendChild(content);
			return this.elements.grid;
		}
		setButtonIcon(icon) {
			let material = 'material-icons' + String.fromCharCode(32) + icon,
				button = this.getButton();

			button.innerText = '';
			button.appendChild(Form.getIcon(material));
			return this;
		}
		out() {
			return this.getButtonGrid();
		}
	}

	window.Form.Row.Action = Action;

})(window);