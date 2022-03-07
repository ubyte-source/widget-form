(function (window) {

	'use strict';

	class Action {

		/**
		 * It returns a string.
		 * @returns The handle() method returns a string.
		 */

		static handle() {
			return 'data-handle-event';
		}

		/**
		 * It creates a new instance of the JavaScript class.
		 * @param form - The form that the button will be added to.
		 * @param icon - The icon to use for the button.
		 */
		
		constructor(form, icon) {
			this.form = form;
			this.elements = {};

			let material = typeof icon !== 'string' || icon.length === 0 ? 'warning' : icon;
			this.setButtonIcon(material);
		}

		/**
		 * Get the form element that contains the form elements for the current page
		 * @returns The form object.
		 */
		
		getForm() {
			return this.form;
		}

		/**
		 * Create a button element if it doesn't exist, and return it
		 * @returns The button element.
		 */
		
		getButton() {
			if (this.elements.hasOwnProperty('button')) return this.elements.button;
			this.elements.button = document.createElement('button');
			this.elements.button.setAttribute('type', 'button');
			this.elements.button.className = 'waves-effect';
			return this.elements.button;
		}

		/**
		 * Create a div with the class "form content action" and append the button to it
		 * @returns The content of the form.
		 */
		
		getButtonContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			let button = this.getButton();
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'form content action';
			this.elements.content.appendChild(button);
			return this.elements.content;
		}

		/**
		 * Create a grid element and append the button content to it
		 * @returns The grid element.
		 */
		
		getButtonGrid() {
			if (this.elements.hasOwnProperty('grid')) return this.elements.grid;
			let content = this.getButtonContent();
			this.elements.grid = document.createElement('div');
			this.elements.grid.className = 'pure-u-24-24';
			this.elements.grid.appendChild(content);
			return this.elements.grid;
		}

		/**
		 * * Sets the icon of the button
		 * @param icon - The icon to be displayed on the button.
		 * @returns The object itself.
		 */
		
		setButtonIcon(icon) {
			let material = 'material-icons' + String.fromCharCode(32) + icon,
				button = this.getButton();

			button.innerText = '';
			button.appendChild(Form.getIcon(material));
			return this;
		}

		/**
		 * Get the button grid for the current page
		 * @returns The getButtonGrid() method is returning the grid of buttons.
		 */
		
		out() {
			return this.getButtonGrid();
		}
	}

	window.Form.Row.Action = Action;

})(window);