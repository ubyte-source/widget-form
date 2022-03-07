(function (window) {

	'use strict';

	class Textarea extends Form.Plugin {

		/**
		 * The constructor creates a textarea element and adds it to the container. 
		 * 
		 * It also creates a preloader element and adds it to the container. 
		 * 
		 * It also creates a couple of event listeners for the textarea element.
		 * @param container - The container that the textarea is being added to.
		 */

		constructor(container) {
			super(container);

			let error = this.getContainer().getContentError();
			if (error instanceof HTMLElement) error.classList.add('textarea');

			this.elements.input = document.createElement('textarea');
			this.elements.input.name = this.getContainer().getMatrixName();
			this.elements.input.setAttribute(Form.handle(), 'input:input focus:focus blur:blur change:resize keydown:resize paste:resize');

			this.elements.input.addEventListener('keydown', this, false);
			this.elements.input.addEventListener('change', this, false);
			this.elements.input.addEventListener('input', this, false);
			this.elements.input.addEventListener('focus', this, false);
			this.elements.input.addEventListener('paste', this, false);
			this.elements.input.addEventListener('blur', this, false);

			this.elements.preloader = new Form.Container.Preloader(this, this.getContent());
		}

		/**
		 * Get the preloader element
		 * @returns The preloader element.
		 */
		
		getPreloader() {
			return this.elements.preloader;
		}

		/**
		 * Get the input element from the form
		 * @returns The input element.
		 */
		
		getInput() {
			return this.elements.input;
		}

		/**
		 * Get the value of the input and return it as a JavaScript object
		 * @returns An array of objects.
		 */
		
		getPack() {
			let values = [], input = this.getInput();
			if (false === this.getContainer().getMatrixEditable()) return values;

			values.push({
				name: input.name,
				value: 0 === input.value.length ? null : input.value,
				constructor: this
			});
			return values;
		}

		/**
		 * Create a div element with the class name "input" and append a text input element to it
		 * @returns The content div.
		 */
		
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'input';
			this.elements.content.appendChild(this.getInput());
			return this.elements.content;
		}

		/**
		 * Set the value of the input element
		 * @param value - The value to set the input to.
		 * @returns The object itself.
		 */
		
		arrange(value) {
			this.getInput().innerHTML = value;

			let events = this.getContainer().getForm().getAutoDispatchEvents();
			if (events.indexOf('input') === -1) events.push('input');

			this.dispatch();

			return this;
		}

		/**
		 * Reset the input field
		 * @returns The `reset` method returns the `this` object.
		 */
		
		reset() {
			let input = this.getInput();
			input.innerHTML = '';
			return this;
		}

		/**
		 * Returns the content of the current cell
		 * @returns The getContent() method is being called and the return value is being passed to the out()
		 * method.
		 */
		
		out() {
			return this.getContent();
		}

		/**
		 * *The input() function is called when the user clicks the input button.*
		 * 
		 * The function is pretty simple. It removes the danger class from the input container and hides the
		 * notice
		 */
		
		input() {
			let container = this.getContainer();
			container.getContent().classList.remove('danger');
			container.getForm().getNotice().hide();
		}

		/**
		 * *Focus* the text area
		 */
		
		focus() {
			this.getContainer().getContent().classList.add('focus');
		}

		/**
		 * Blur the text box
		 */
		
		blur() {
			this.getContainer().getContent().classList.remove('focus');
		}

		/**
		 * Resize the textarea to the height of the content
		 * @param event - The event object that contains the target element.
		 */
		
		resize(event) {
			event.target.style.height = 0;
			let line = window.getComputedStyle(event.target).getPropertyValue('line-height'), resize = event.target.offsetHeight + event.target.scrollHeight + parseInt(line);
			event.target.style.height = resize.toString() + 'px';
		}
	}

	window.Form.Plugin.Textarea = Textarea;

})(window);