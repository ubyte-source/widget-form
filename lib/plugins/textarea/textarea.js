(function (window) {

	'use strict';

	class Textarea extends Form.Plugin {

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

		getPreloader() {
			return this.elements.preloader;
		}
		getInput() {
			return this.elements.input;
		}
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
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'input';
			this.elements.content.appendChild(this.getInput());
			return this.elements.content;
		}
		arrange(value) {
			this.getInput().innerHTML = value;

			let events = this.getContainer().getForm().getAutoDispatchEvents();
			if (events.indexOf('input') === -1) events.push('input');

			this.dispatch();

			return this;
		}
		reset() {
			let input = this.getInput();
			input.innerHTML = '';
			return this;
		}
		out() {
			return this.getContent();
		}
		input() {
			let container = this.getContainer();
			container.getContent().classList.remove('danger');
			container.getForm().getNotice().hide();
		}
		focus() {
			this.getContainer().getContent().classList.add('focus');
		}
		blur() {
			this.getContainer().getContent().classList.remove('focus');
		}
		resize(event) {
			event.target.style.height = 0;
			let line = window.getComputedStyle(event.target).getPropertyValue('line-height'), resize = event.target.offsetHeight + event.target.scrollHeight + parseInt(line);
			event.target.style.height = resize.toString() + 'px';
		}
	}

	window.Form.Plugin.Textarea = Textarea;

})(window);