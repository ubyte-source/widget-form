(function (window) {

	'use strict';

	class Chip {

		/**
		 * It returns a string.
		 * @returns The string 'data-id'
		 */
		
		static data() {
			return 'data-id';
		}

		/**
		 * Create a new JavaScript object and set its properties
		 * @param plugin - The plugin object that created this object.
		 * @param id - The ID of the element.
		 * @param value - The value of the input element.
		 */
		
		constructor(plugin, id, value) {
			this.plugin = plugin;
			this.elements = {};

			let input = this.getInput();

			this.setText(value);

			input.value = id;
		}

		/**
		 * Get the plugin object for the current session
		 * @returns The plugin object.
		 */
		
		getPlugin() {
			return this.plugin;
		}

		/**
		 * Create a div element with the class name "chip ellipsis" and append the input, text, and remove
		 * elements to it
		 * @returns The content of the chip.
		 */
		
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

		/**
		 * Get the input element for the matrix
		 * @returns The input element.
		 */
		
		getInput() {
			if (this.elements.hasOwnProperty('input')) return this.elements.input;
			let list = this.getPlugin().getList(), name = this.getPlugin().getContainer().getMatrixName();
			this.elements.input = document.createElement('input');
			this.elements.input.type = 'hidden';
			this.elements.input.name = name.replace(/^(?!\[)(\w+)/, "$1[" + list.length + "]");
			return this.elements.input;
		}

		/**
		 * Create a span element if it doesn't already exist
		 * @returns The text element.
		 */
		
		getText() {
			if (this.elements.hasOwnProperty('text')) return this.elements.text;
			this.elements.text = document.createElement('span');
			return this.elements.text;
		}

		/**
		 * * Set the text of the element
		 * @param text - The text to be displayed in the textbox.
		 * @returns The element itself.
		 */
		
		setText(text) {
			let text_node = document.createTextNode(text);
			this.getText().innerText = '';
			this.getText().appendChild(text_node);
			return this;
		}

		/**
		 * Get the delete icon if it exists, otherwise create it
		 * @returns The delete icon.
		 */
		
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

		/**
		 * Get the content of the current cell as a string
		 * @returns The getContent() method is being called and the return value is being passed to the out()
		 * method.
		 */
		
		out() {
			return this.getContent();
		}

		/**
		 * * For each attribute in the form, split the attribute into a list of words.
		 * * For each word in the list, split the word into a word and a function name.
		 * * If the word is the event type or is empty, execute the function
		 * @param event - The event object that was passed to the function.
		 * @returns The `Form` class.
		 */
		
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

		/**
		 * *Delete a chip from the list.*
		 * 
		 * The function is pretty simple. It stops the event from propagating, and checks if the preloader is
		 * active. If it is, it returns. Then it gets the list of chips, and the data of the chip that was
		 * clicked. It then loops through the list of chips, and checks if the data of the chip is equal to
		 * the data of the chip that was clicked. If it is, it removes the chip from the list, and breaks out
		 * of the loop
		 * @param event - The event object that was triggered.
		 * @returns The `return` statement is used to return a value from a function.
		 */
		
		delete(event) {
			event.stopPropagation();

			let preloader = this.getPlugin().getPreloader().status();
			if (preloader === true) return;

			let list = this.getPlugin().getList(), data = event.target.getAttribute(window.Form.Plugin.Chips.Chip.data());
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

		/**
		 * It returns the string "chip"
		 * @returns The string 'chip'
		 */
		
		static metamorph() {
			return 'chip';
		}

		/**
		 * It creates the JavaScript object that will be used to create the form.
		 * @param container - The container that the plugin is being added to.
		 * @returns Nothing.
		 */
		
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

		/**
		 * Get the write element
		 * @returns The write element.
		 */
		
		getWrite() {
			return this.elements.write;
		}

		/**
		 * Get the preloader element
		 * @returns The preloader element.
		 */
		
		getPreloader() {
			return this.elements.preloader;
		}

		/**
		 * Get the plug element from the plug-in
		 * @returns The plug element.
		 */
		
		getPlug() {
			if (this.elements.hasOwnProperty('plug')) return this.elements.plug;
			return null;
		}

		/**
		 * Set the function to be called when the insert event is triggered
		 * @param func - A function that will be called when the event occurs.
		 * @returns The `setEventInsert` method returns the `this` object.
		 */
		
		setEventInsert(func) {
			if (typeof func === 'function') this.events.insert = func;
			return this;
		}

		/**
		 * Get the insert event for the current table
		 * @returns The `getEventInsert()` method returns the `insert` property of the `events` object if it
		 * exists. If it does not exist, it returns `null`.
		 */
		
		getEventInsert() {
			if (this.events.hasOwnProperty('insert')) return this.events.insert;
			return null;
		}

		/**
		 * Get the regex value from the options object
		 * @returns The regex property of the options object.
		 */
		
		getRegex() {
			if (this.options.hasOwnProperty('regex')) return this.options.regex;
			return null;
		}

		/**
		 * Set the regular expression used to match the input
		 * @param regex - The regular expression to use for matching.
		 * @returns The `setRegex` method returns the `this` object.
		 */
		
		setRegex(regex) {
			if (typeof regex !== 'string') return this;
			let splits = regex.lastIndexOf('/'), pattern = regex.substring(1, splits), flags = regex.substring(splits + 1);
			this.options.regex = new RegExp(pattern, flags);
			return this;
		}

		/**
		 * Check if the text matches the regular expression
		 * @param text - The text to check.
		 * @returns The result of calling the checkRegex method.
		 */
		
		checkRegex(text) {
			let regex = this.getRegex();
			if (regex === null) return null;
			return regex.test(text);
		}

		/**
		 * Get the protected options from the options object
		 * @returns The protected property of the options object.
		 */
		
		getProtected() {
			return this.options.protected || [];
		}

		/**
		 * Set the protected properties of the object
		 * @param array - An array of strings that are the names of the properties that should be protected.
		 * @returns The object itself.
		 */
		
		setProtected(array) {
			if (array instanceof Array) this.options.protected = array.filter(function (item) {
				return typeof item === 'string';
			});
			return this;
		}

		/**
		 * Add a chip to the list of chips
		 * @param chip - The chip to add to the list.
		 * @returns The object itself.
		 */
		
		addChip(chip) {
			if (false === chip instanceof window.Form.Plugin.Chips.Chip) return this;

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

		/**
		 * Create a div element with the class name "chips" and set the attribute "Form.handle()" to
		 * "click:focus"
		 * @returns The chips element.
		 */
		
		getChips() {
			if (this.elements.hasOwnProperty('chips')) return this.elements.chips;
			this.elements.chips = document.createElement('div');
			this.elements.chips.className = 'chips';
			this.elements.chips.setAttribute(Form.handle(), 'click:focus');
			this.elements.chips.addEventListener('click', this, false);
			return this.elements.chips;
		}

		/**
		 * Get the input element from the form
		 * @returns The input element.
		 */
		
		getInput() {
			return this.elements.input;
		}

		/**
		 * Get a list of all the inputs in the matrix
		 * @returns An array of objects.
		 */
		
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

		/**
		 * Create a div element with the class `chips-wrapper` and append the following to it:
		 * 
		 * * The `write` element
		 * * The `chips` element
		 * * The `input` element
		 * @returns The content of the component.
		 */
		
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

		/**
		 * Get the list of elements from the elements object
		 * @returns The list of elements.
		 */
		
		getList() {
			if (this.elements.hasOwnProperty('list')) return this.elements.list;
			this.elements.list = [];
			return this.elements.list;
		}

		/**
		 * * Set the value of the text input to the value of the text parameter
		 * @param text - The text to be added to the chip.
		 * @param regex - If true, the text will be checked against a regular expression.
		 * @returns The `this` object.
		 */
		
		setFromInsert(text, regex) {
			let reserved = this.getProtected();
			if (reserved.indexOf(text) !== -1
				|| text.length === 0) return this;

			let insert = this.getEventInsert();
			if (typeof insert === 'function') insert.call();

			let chip = new window.Form.Plugin.Chips.Chip(this, text, text);
			if (regex === true) {
				let response = this.checkRegex(text);
				if (response === false) return this;
			}

			this.addChip(chip);

			return this;
		}

		/**
		 * Get the content of the current cell
		 * @returns The getContent() method is being called and the return value is being passed to the out()
		 * method.
		 */
		
		out() {
			return this.getContent();
		}

		/**
		 * Reset the list by clicking the delete button for each item in the list
		 * @returns The current instance of the page object.
		 */
		
		reset() {
			let list = this.getList().slice(0);
			for (let i in list) list[i].getDelete().click();
			return this;
		}

		/**
		 * *Arrange* the *value* array into the *this* array
		 * @param value - The value to be inserted.
		 * @returns The object itself.
		 */
		
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

		/**
		 * *Close the search box.*
		 * @param event - The event object that was passed to the close() method.
		 */
		
		close(event) {
			let plug = this.getPlug();
			if (typeof Form.Plugin.Chips.Search === 'function'
				&& plug instanceof Form.Plugin.Chips.Search
				&& typeof plug.close === 'function') plug.close(event);
		}

		/**
		 * Focus the write input
		 * @param event - The event object that was passed to the function.
		 * @returns Nothing.
		 */
		
		focus(event) {
			event.preventDefault();
			let preloader = this.getPreloader().status();
			if (preloader === true) return;

			this.getWrite().getWriteInput().focus();
			event.stopPropagation();
		}

		/**
		 * If the preloader is not active, and the user presses the enter or space key, the insert function
		 * is called
		 * @param event - The event object that was passed to the function.
		 */
		
		keypress(event) {
			let preloader = this.getPreloader().status();
			if (preloader !== true
				&& (event.keyCode === 13 || event.keyCode === 32)) this.insert(event);

			event.stopPropagation();
		}

		/**
		 * * If the preloader is active, do nothing.
		 * * If there is no input, do nothing.
		 * * If there is more than one input, do nothing.
		 * * If the input is not a valid package name, do nothing.
		 * * Set the package name to the input value.
		 * * Set the insert mode to true.
		 * * Clear the input.
		 * * Stop the event from propagating
		 * @param event - The event object that was triggered.
		 * @returns Nothing.
		 */
		
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