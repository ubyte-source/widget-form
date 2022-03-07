(function (window) {

	'use strict';

	class File extends Form.Plugin {

		/**
		 * Create a new input element and set its name to the matrix name
		 * @param container - The container that the file input is added to.
		 */
		
		constructor(container) {
			super(container);

			this.elements.input = document.createElement('input');
			this.elements.input.name = this.getContainer().getMatrixName();
			this.elements.input.type = 'file';

			let content = this.getContent();
			this.elements.preloader = new Form.Container.Preloader(this, content);
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
		 * Get the file(s) that were uploaded to the input element
		 * @param value - The value of the input.
		 * @returns The `getPack()` method returns an array of objects. Each object contains the name of the
		 * input, the value of the input, and the constructor of the input.
		 */
		
		getPack(value) {
			let values = [], input = this.getInput();
			if (false === this.getContainer().getMatrixEditable()) return values;

			for (let i = 0; i < input.files.length; i++) values.push({
				name: input.name,
				value: input.files[i],
				constructor: this
			});

			if (value !== true && values.length === 0) values.push({
				name: input.name,
				value: null,
				constructor: this
			});

			return values;
		}

		/**
		 * Create a div element with the class "file" and append the insert element to it
		 * @returns The content of the file.
		 */
		
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			let insert = this.getInsert();
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'file';
			this.elements.content.appendChild(insert);
			return this.elements.content;
		}

		/**
		 * Create a div element with the class name "input" and append a text input element to it
		 * @returns The `getInsert()` method returns the `insert` element.
		 */
		
		getInsert() {
			if (this.elements.hasOwnProperty('insert')) return this.elements.insert;
			this.elements.insert = document.createElement('div');
			this.elements.insert.className = 'input';

			let input = this.getInput();
			this.elements.insert.appendChild(input);
			return this.elements.insert;
		}

		/**
		 * Set the pattern of the input element
		 * @param pattern - The pattern to set.
		 * @returns The question object.
		 */
		
		setPattern(pattern) {
			let input = this.getInput();
			if (pattern.hasOwnProperty('multiple') && pattern.multiple) input.setAttribute('multiple', true);
			if (pattern.hasOwnProperty('mime')) input.setAttribute('accept', pattern.mime);
			return this;
		}

		/**
		 * Arrange the data in the order you want it to be
		 * @returns The object itself.
		 */
		
		arrange() {
			return this;
		}

		/**
		 * Returns the content of the current cell as a string
		 * @returns The getContent() method returns the content of the page.
		 */
		
		out() {
			return this.getContent();
		}
	}

	window.Form.Plugin.File = File;

})(window);