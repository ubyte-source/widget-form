(function (window) {

	'use strict';

	class File extends Form.Plugin {

		constructor(container) {
			super(container);

			this.elements.input = document.createElement('input');
			this.elements.input.name = this.getContainer().getMatrixName();
			this.elements.input.type = 'file';

			let content = this.getContent();
			this.elements.preloader = new Form.Container.Preloader(this, content);
		}

		getPreloader() {
			return this.elements.preloader;
		}
		getInput() {
			return this.elements.input;
		}
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
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			let insert = this.getInsert();
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'file';
			this.elements.content.appendChild(insert);
			return this.elements.content;
		}
		getInsert() {
			if (this.elements.hasOwnProperty('insert')) return this.elements.insert;
			this.elements.insert = document.createElement('div');
			this.elements.insert.className = 'input';

			let input = this.getInput();
			this.elements.insert.appendChild(input);
			return this.elements.insert;
		}
		setPattern(pattern) {
			let input = this.getInput();
			if (pattern.hasOwnProperty('multiple') && pattern.multiple) input.setAttribute('multiple', true);
			if (pattern.hasOwnProperty('mime')) input.setAttribute('accept', pattern.mime);
			return this;
		}
		arrange() {
			return this;
		}
		out() {
			return this.getContent();
		}
	}

	window.Form.Plugin.File = File;

})(window);