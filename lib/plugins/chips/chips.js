(function (window) {

	'use strict';

	class Chip {

		static data() {
			return 'data-id';
		}

		constructor(plugin, id, value) {
			this.plugin = plugin;
			this.elements = {};

			let input = this.getInput();

			this.setText(value);

			input.value = id;
		}

		getPlugin() {
			return this.plugin;
		}
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			let input = this.getInput(), text = this.getText(), remove = this.getDelete();
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'chip ellipsis';
			this.elements.content.appendChild(input);
			this.elements.content.appendChild(text);
			this.elements.content.appendChild(remove);
			return this.elements.content;
		}
		getInput() {
			if (this.elements.hasOwnProperty('input')) return this.elements.input;
			let list = this.getPlugin().getList(), name = this.getPlugin().getContainer().getMatrixName();
			this.elements.input = document.createElement('input');
			this.elements.input.type = 'hidden';
			this.elements.input.name = name.replace(/^(?!\[)(\w+)/, "$1[" + list.length + "]");
			return this.elements.input;
		}
		getText() {
			if (this.elements.hasOwnProperty('text')) return this.elements.text;
			this.elements.text = document.createElement('span');
			return this.elements.text;
		}
		setText(text) {
			let text_node = document.createTextNode(text);
			this.getText().innerText = '';
			this.getText().appendChild(text_node);
			return this;
		}
		getDelete() {
			if (this.elements.hasOwnProperty('delete')) return this.elements.delete;
			let input = this.getInput();
			this.elements.delete = Form.getIcon('material-icons close');
			this.elements.delete.classList.add('close');
			this.elements.delete.setAttribute(this.constructor.data(), input.value);
			this.elements.delete.setAttribute(Form.handle(), ':delete');
			this.elements.delete.addEventListener('click', this, false);
			return this.elements.delete;
		}
		out() {
			return this.getContent();
		}
		handleEvent(event) {
			let attribute = Form.closestAttribute(event.target, Form.handle());
			if (attribute === null) return;

			let attribute_split = attribute.split(/\s+/);
			for (let item = 0; item < attribute_split.length; item++) {
				let execute = attribute_split[item].split(String.fromCharCode(58));
				if (execute.length !== 2) break;
				if (execute[0] === event.type || 0 === execute[0].length) {
					if (typeof this[execute[1]] !== 'function') continue;

					this[execute[1]].call(this, event);
				}
			}
		}
		delete(event) {
			event.stopPropagation();

			let preloader = this.getPlugin().getPreloader().status();
			if (preloader === true) return;

			let list = this.getPlugin().getList(), data = event.target.getAttribute(Chip.data());
			for (let i in list) {
				let item = list[i].getInput();
				if (item.value.toString() !== data.toString()) continue;

				Form.removeElementDOM(list[i].out());
				list.splice(i, 1);
				break;
			}
		}
	}

	class Chips extends Form.Plugin {

		static metamorph() {
			return 'chip';
		}

		constructor(container) {
			super(container);

			this.elements.write = new Form();
			this.elements.write.getWriteRow = function () {
				let rows = this.getRows();
				if (rows.length === 0) return null;

				return rows[0];
			};
			this.elements.write.getWriteColumn = function () {
				let row = this.getWriteRow();
				if (row === null) return null;

				let columns = row.getContainers();
				if (columns.length === 0) return null;

				return columns[0];
			};
			this.elements.write.getWriteInput = function () {
				let column = this.getWriteColumn();
				if (column === null) return null;

				return column.getPlugin().getInput();
			};

			this.elements.input = document.createElement('input');
			this.elements.input.type = 'hidden';
			this.elements.input.name = this.getContainer().getMatrixName();

			this.options = {
				// regex: Regex
				// protecetd: (array)
			};

			this.events = {
				// insert: (function)
			};

			let form = this.getWrite(), plugin = form.addInput({
				name: 'write',
				type: ':string:employee'
			});

			let input = plugin.getInput();
			input.setAttribute(Form.handle(), 'keypress:keypress focus:focus blur:blur');
			input.addEventListener('keypress', this, false);

			try {
				let matrix = this.getContainer().getMatrix();
				if (matrix === null) throw 'Invalid matrix';

				if (matrix.hasOwnProperty('protected')) this.setProtected(matrix.protected);

				if (!matrix.hasOwnProperty('patterns')
					|| !matrix.patterns.hasOwnProperty(0)) throw 'Pattern not found';

				if (matrix.patterns[0].hasOwnProperty('regex')) this.setRegex(matrix.patterns[0].regex);
				if (matrix.patterns[0].hasOwnProperty('search') && typeof Form.Plugin.Chips.Search === 'function') {
					this.elements.plug = new Form.Plugin.Chips.Search(this, matrix.patterns[0].search);
				} else {
					let row = form.getRow(input.name), button = row.addButton('expand_more').getButton();
					button.setAttribute(Form.handle(), 'click:insert');
					button.addEventListener('click', this, false);
				}
			}
			catch (message) {
				let debug = this.getContainer().getForm().getDebug();
				if (debug === true) console.log(message);
			}

			this.elements.preloader = new Form.Container.Preloader(this, this.getWrite().getFormElement());
		}

		getWrite() {
			return this.elements.write;
		}
		getPreloader() {
			return this.elements.preloader;
		}
		getPlug() {
			if (this.elements.hasOwnProperty('plug')) return this.elements.plug;
			return null;
		}
		setEventInsert(func) {
			if (typeof func === 'function') this.events.insert = func;
			return this;
		}
		getEventInsert() {
			if (this.events.hasOwnProperty('insert')) return this.events.insert;
			return null;
		}
		getRegex() {
			if (this.options.hasOwnProperty('regex')) return this.options.regex;
			return null;
		}
		setRegex(regex) {
			if (typeof regex !== 'string') return this;
			let splits = regex.lastIndexOf('/'), pattern = regex.substring(1, splits), flags = regex.substring(splits + 1);
			this.options.regex = new RegExp(pattern, flags);
			return this;
		}
		checkRegex(text) {
			let regex = this.getRegex();
			if (regex === null) return null;
			return regex.test(text);
		}
		getProtected() {
			return this.options.protected || [];
		}
		setProtected(array) {
			if (array instanceof Array) this.options.protected = array.filter(function (item) {
				return typeof item === 'string';
			});
			return this;
		}
		addChip(chip) {
			if (false === chip instanceof Chip) return this;

			let input = chip.getInput(), value = input.value.toString(), list = this.getList();
			for (let i in list) {
				let item = list[i].getInput();
				if (item.value.toString() !== value) continue;

				return this;
			}

			this.getList().push(chip);
			this.getChips().appendChild(chip.out());
			this.dispatch();

			return this;
		}
		getChips() {
			if (this.elements.hasOwnProperty('chips')) return this.elements.chips;
			this.elements.chips = document.createElement('div');
			this.elements.chips.className = 'chips';
			this.elements.chips.setAttribute(Form.handle(), 'click:focus');
			this.elements.chips.addEventListener('click', this, false);
			return this.elements.chips;
		}
		getInput() {
			return this.elements.input;
		}
		getPack() {
			let values = [], list = this.getList();
			if (false === this.getContainer().getMatrixEditable()) return values;

			for (let item = 0; item < list.length; item++) {
				let input = list[item].getInput();
				values.push({
					name: input.name,
					value: input.value,
					constructor: this
				});
			}

			if (0 === values.length) {
				let input = this.getInput();
				values.push({
					name: input.name,
					value: null,
					constructor: this
				});
			}

			return values;
		}
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			let write = this.getWrite(), chips = this.getChips(), input = this.getInput();
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'chips-wrapper';
			this.elements.content.appendChild(write.out());
			this.elements.content.appendChild(chips);
			this.elements.content.appendChild(input);
			return this.elements.content;
		}
		getList() {
			if (this.elements.hasOwnProperty('list')) return this.elements.list;
			this.elements.list = [];
			return this.elements.list;
		}
		setFromInsert(text, regex) {
			let reserved = this.getProtected();
			if (reserved.indexOf(text) !== -1
				|| text.length === 0) return this;

			let insert = this.getEventInsert();
			if (typeof insert === 'function') insert.call();

			let chip = new Chip(this, text, text);
			if (regex === true) {
				let response = this.checkRegex(text);
				if (response === false) return this;
			}

			this.addChip(chip);

			return this;
		}
		out() {
			return this.getContent();
		}
		reset() {
			let list = this.getList().slice(0);
			for (let i in list) list[i].getDelete().click();
			return this;
		}
		arrange(value) {
			let plug = this.getPlug();
			if (plug !== null && typeof plug.arrange === 'function') return plug.arrange(value);
			if (false === (value instanceof Array)) return this;

			let reserved = this.getProtected();
			for (let item = 0; item < value.length; item++) {
				if (reserved.indexOf(value[item]) !== -1) continue;

				this.setFromInsert(value[item]);
			}

			return this;
		}
		close(event) {
			let plug = this.getPlug();
			if (typeof Form.Plugin.Chips.Search === 'function'
				&& plug instanceof Form.Plugin.Chips.Search
				&& typeof plug.close === 'function') plug.close(event);
		}
		focus(event) {
			event.preventDefault();
			let preloader = this.getPreloader().status();
			if (preloader === true) return;

			this.getWrite().getWriteInput().focus();
			event.stopPropagation();
		}
		keypress(event) {
			let preloader = this.getPreloader().status();
			if (preloader !== true
				&& (event.keyCode === 13 || event.keyCode === 32)) this.insert(event);

			event.stopPropagation();
		}
		insert(event) {
			event.preventDefault();
			let preloader = this.getPreloader().status();
			if (preloader === true) return;

			let inputs = this.getWrite().getPackages();
			if (inputs.length !== 1
				|| !inputs[0].hasOwnProperty('value')) return;

			this.setFromInsert(inputs[0].value, true);
			this.getWrite().getWriteInput().value = '';
			event.stopPropagation();
		}
	}

	window.Form.Plugin.Chips = Chips;
	window.Form.Plugin.Chips.Chip = Chip;

})(window);