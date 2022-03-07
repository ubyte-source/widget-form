(function (window) {

	'use strict';

	class Common {

		/**
		 * Find a container by name
		 * @param name - The name of the container to find.
		 * @param deep - If true, the search will be recursive.
		 * @returns The container with the specified name.
		 */

		findContainer(name, deep) {
			for (let item = 0, containers = this.getContainers(deep); item < containers.length; item++)
				if (name === containers[item].getMatrixName())
					return containers[item];
			return null;
		}

		/**
		 * Get all the plugins in the current container and all its sub-containers
		 * @param deep - If true, the method will return all plugins in the entire tree. If false, it will
		 * only return plugins in the current container.
		 * @returns An array of plugins.
		 */
		
		getPlugins(deep) {
			let plugins = [];
			for (let item = 0, conatiners = this.getContainers(deep); item < conatiners.length; item++)
				plugins.push(conatiners[item].getPlugin());
			return plugins;
		}

		/**
		 * Get all the packages that are related to the value
		 * @param value - The value to be searched for.
		 * @param deep - If true, the function will search for packages in the plugins that are in the
		 * plugins of the current plugin.
		 * @returns The getPackages function returns an array of objects.
		 */
		
		getPackages(value, deep) {
			let packages = [];
			for (let item = 0, plugins = this.getPlugins(deep); item < plugins.length; item++) {
				if (typeof plugins[item].getPack !== 'function') continue;
				for (let i = 0, response = plugins[item].getPack(value); i < response.length; i++)
					packages.push(response[i]);
			}
			return packages;
		}

		/**
		 * Get all the inputs from all the plugins
		 * @param deep - If true, the getInputs() method will be called on all plugins in the chain.
		 * @returns The getInputs function returns an array of objects. Each object contains the name of the
		 * plugin and the input object.
		 */
		
		getInputs(deep) {
			let inputs = [];
			for (let item = 0, plugins = this.getPlugins(deep); item < plugins.length; item++) {
				if (typeof plugins[item].getInput !== 'function') continue;
				inputs.push(plugins[item].getInput());
			}
			return inputs;
		}

		/**
		 * Get the input of a container
		 * @param name - The name of the input.
		 * @param deep - The number of levels to search for the container.
		 * @returns The input object.
		 */
		
		getInput(name, deep) {
			let container = this.findContainer(name, deep);
			if (container !== null
				&& typeof container.getPlugin().getInput === 'function') return container.getPlugin().getInput();

			return null;
		}

		/**
		 * Set the autoDispatch property of all plugins in the form to the specified value
		 * @param status - Boolean value that determines whether the plugin will dispatch events.
		 * @param deep - If true, the method will be called on all plugins in the form. If false, the method
		 * will only be called on the plugin that called it.
		 */
		
		setAutoDispatch(status, deep) {
			let plugins = this.getPlugins(deep);
			for (let item = 0; item < plugins.length; item++) {
				if (false === (plugins[item] instanceof window.Form.Plugin)) continue;
				plugins[item].setAutoDispatch(status);
			}
		}

		/**
		 * Get all the packages in the current session
		 * @returns An associative array of the package names and their values.
		 */
		
		get() {
			let values = this.getPackages(true), associative = {};
			for (let item = 0; item < values.length; item++) associative[values[item].name] = values[item].value;
			return associative;
		}
	}

	class Events {

		/**
		 * Returns a string that represents the name of the function
		 * @returns The name of the function.
		 */
		
		static name() {
			return 'callable';
		}

		/**
		 * It creates an object that will store all the events that are bound to the object.
		 */
		
		constructor() {
			this.events = {};
		}

		/**
		 * Get the events from the event store
		 * @returns The getEvents() method returns the events property.
		 */
		
		getEvents() {
			return this.events;
		}

		/**
		 * Add an event handler to the object
		 * @param type - The type of event to listen for.
		 * @param event - The event to be added.
		 * @returns The `this` object.
		 */
		
		addEvent(type, event) {
			if (typeof event === 'function') this.events[type] = event;
			return this;
		}

		/**
		 * Attach the event handlers to the input element
		 * @param container - The container that the plugin is attached to.
		 * @returns The object itself.
		 */
		
		attach(container) {
			let plugin = container.getPlugin();
			if (typeof plugin.getInput !== 'function') return;

			let input = container.getPlugin().getInput(), handle = input.getAttribute(window.Form.handle()) || '';
			let split = handle.split(/\s+/), events = this.getEvents();

			this.detach(container);

			for (let type in events) {
				let name = type + String.fromCharCode(58) + type;
				split.push(name);
				input.addEventListener(type, events[type].bind(container), false);
				container.getForm().addArrangeEvents(type);
			}

			split = split.filter(function (x, i, a) {
				return a.indexOf(x) == i || x.length;
			});
			input.setAttribute(window.Form.handle(), split.join(String.fromCharCode(32)));
			return this;
		}

		/**
		 * Detach the plugin from the container
		 * @param container - The container that the plugin is attached to.
		 * @returns The object itself.
		 */
		
		detach(container) {
			let plugin = container.getPlugin();
			if (typeof plugin.getInput !== 'function') return;

			let events = this.getEvents();
			for (let type in events) plugin.getInput().removeEventListener(type, events[type].bind(container), false);
			return this;
		}
	}

	class Plugin {

		/**
		 * It creates a new function that is a clone of the original function.
		 */
		
		static metamorph() { }

		/**
		 * The constructor function creates a new object and assigns it to the variable `this`. 
		 * The object contains a property called `container` which is assigned the value of the parameter
		 * `container`. 
		 * The object also contains a property called `elements` which is assigned an empty object. 
		 * The object also contains a property called `auto` which is assigned the value of the parameter
		 * `auto`
		 * @param container - The container element that will be used to contain the elements.
		 */
		
		constructor(container) {
			this.container = container;
			this.elements = {};
			this.auto = true;
		}

		/**
		 * Set the autoDispatch property to true or false
		 * @param dispatch - A function that will be called when the event is dispatched.
		 * @returns The object itself.
		 */
		
		setAutoDispatch(dispatch) {
			this.auto = !!dispatch;
			return this;
		}

		/**
		 * Returns the value of the autoDispatch property
		 * @returns The value of the auto property.
		 */
		
		getAutoDispatch() {
			return this.auto;
		}

		/**
		 * Get the container element for the current widget
		 * @returns The container element.
		 */
		
		getContainer() {
			return this.container;
		}

		/**
		 * * For each attribute in the form, check if the event type matches the attribute. If it does, then
		 * check if the attribute has a function to execute. If it does, then execute the function
		 * @param event - The event object that was passed to the function.
		 * @returns The `handleEvent` method is being returned.
		 */
		
		handleEvent(event) {
			let attribute = window.Form.closestAttribute(event.target, window.Form.handle());
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
		 * Dispatch the event to the input element
		 * @returns The object itself.
		 */
		
		dispatch() {
			if (false === this.getAutoDispatch()) return this;

			let events = this.getContainer().getForm().getAutoDispatchEvents();
			for (let item = 0; item < events.length; item++) {
				let event = new Event(events[item], {
					'cancelable': false,
					'bubbles': true
				});
				this.getInput().dispatchEvent(event);
			}

			return this;
		}
	}

	class Text extends Plugin {

		/**
		 * The constructor creates an input element and adds it to the container.
		 * @param container - The container that the input is in.
		 */

		constructor(container) {
			super(container);

			let type = container.getMatrixType();
			this.elements.input = document.createElement('input');
			this.elements.input.name = container.getMatrixName();
			this.elements.input.type = type === null ? 'text' : this.type(type);

			let matrix = container.getMatrix();
			if (matrix.hasOwnProperty('placeholder'))
				this.elements.input.placeholder = matrix.placeholder;

			this.elements.input.setAttribute(window.Form.handle(), 'input:input focus:focus blur:blur');
			this.elements.input.addEventListener('input', this, false);
			this.elements.input.addEventListener('focus', this, false);
			this.elements.input.addEventListener('blur', this, false);

			this.elements.preloader = new window.Form.Container.Preloader(this, this.getContent());
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
		 * Create a div element with the class name "input" and append an input element to it
		 * @returns The content div.
		 */
		
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'input';

			let input = this.getInput();
			this.elements.content.appendChild(input);

			return this.elements.content;
		}

		/**
		 * Get the value of the input and return it as a JavaScript object
		 * @returns The question is returning a list of values.
		 */
		
		getPack() {
			let values = [], input = this.getInput();
			if (false === this.getContainer().getMatrixEditable()) return values;

			let value = {
				name: input.name,
				value: 0 === input.value.length ? null : input.value,
				constructor: this
			};
			values.push(value);
			return values;
		}

		/**
		 * Get the content of the current cell
		 * @returns The getContent() method returns the content of the page.
		 */
		
		out() {
			return this.getContent();
		}

		/**
		 * *Get the input type for a given field type.*
		 * 
		 * The function takes a field type and returns the input type for that field type
		 * @param type - The type of input field.
		 * @returns The type of input field to be used.
		 */
		
		type(type) {
			switch (true) {
				case type.indexOf(':datetime') !== -1:
					return 'datetime-local';
				case type.indexOf(':email') !== -1:
					return 'email';
				case type.indexOf(':password') !== -1:
					return 'password';
				case type.indexOf(':number') !== -1:
					return 'number';
				case type.indexOf(':hidden') !== -1:
					return 'hidden';
				default:
					return 'text';
			}
		}

		/**
		 * Set the value of the input element
		 * @param value - The value to be set.
		 * @returns The `this` object.
		 */
		
		arrange(value) {
			this.getInput().value = value;
			this.dispatch();
			return this;
		}

		/**
		 * Reset the input field to an empty string
		 * @returns The input element.
		 */
		
		reset() {
			this.getInput().value = '';
			return this;
		}

		/**
		 * * Get the content of the form. 
		 * * If the content is an HTML element, remove the danger class from it. 
		 * * If the form is not in danger, hide the notice. 
		 * 
		 * The function is called when the user clicks the submit button. 
		 */
		
		input() {
			let content = this.getContainer().getContent(), form = this.getContainer().getForm();
			if (content instanceof HTMLElement) content.classList.remove('danger');
			if (false === form.getDanger().status()) form.getNotice().hide();
		}

		/**
		 * *Focus* the content of the container
		 */
		
		focus() {
			let content = this.getContainer().getContent();
			if (content instanceof HTMLElement) content.classList.add('focus');
		}

		/**
		 * Blur the container
		 */
		
		blur() {
			let content = this.getContainer().getContent();
			if (content instanceof HTMLElement) content.classList.remove('focus');
		}
	}

	class Row extends Common {

		/**
		 * It returns a string.
		 * @returns The data-row-id is being returned.
		 */
		
		static data() {
			return 'data-row-id';
		}

		/**
		 * It returns the value of the data-element-type attribute.
		 * @returns The `type()` method is being called on the `DataElement` class. The `type()` method
		 * returns the string `'data-element-type'`.
		 */
		
		static type() {
			return 'data-element-type';
		}

		/**
		 * The constructor function creates a new instance of the class.
		 * @param form - The form that the matrix is attached to.
		 * @param matrix - The matrix that the form is based on.
		 */
		
		constructor(form, matrix) {
			super();

			this.form = form;
			this.name = this.constructor.myName(matrix);
			this.options = {};
			this.options.actions = [];
			this.options.containers = [];
			this.elements = {};
		}

		/**
		 * Get the form element that contains the form elements for the current page
		 * @returns The form object.
		 */
		
		getForm() {
			return this.form;
		}

		/**
		 * Get the name of the person
		 * @returns The name of the object.
		 */
		
		getName() {
			return this.name;
		}

		/**
		 * Get the actions for the current node
		 * @returns The getActions() method returns the actions property of the options object.
		 */
		
		getActions() {
			return this.options.actions;
		}

		/**
		 * Get all the containers in the plugin
		 * @param deep - If true, the function will return all containers from all plugins.
		 * @returns The `getContainers` method returns an array of all the containers in the plugin.
		 */
		
		getContainers(deep) {
			if (true !== deep) return this.options.containers;
			let containers = this.getContainers(), response = containers.slice(0);
			for (let item = 0; item < containers.length; item++) {
				let plugin = containers[item].getPlugin();
				if (plugin === null
					|| typeof plugin.getContainers !== 'function') continue;

				response = response.concat(plugin.getContainers(deep));
			}
			return response;
		}

		/**
		 * Add a container to the row
		 * @param container - The container to add to the row.
		 * @returns Nothing.
		 */
		
		addContainer(container) {
			if (container instanceof window.Form.Container) {
				container.setRow(this);

				this.getContainers().push(container);
				this.getGrid().insertBefore(container.out(), null);
				let matrix = container.getMatrix();
				if (matrix.hasOwnProperty(window.Form.Container.initialize())
					&& typeof matrix[window.Form.Container.initialize()] === 'function')
					matrix[window.Form.Container.initialize()].call(container);

				this.applyGrid();
			}
			return this;
		}

		/**
		 * Get the buttons element if it exists, otherwise create it
		 * @returns The buttons element.
		 */
		
		getButtons() {
			if (this.elements.hasOwnProperty('buttons')) return this.elements.buttons;
			this.elements.buttons = document.createElement('div');
			this.elements.buttons.setAttribute(this.constructor.type(), ':buttons');
			this.elements.buttons.className = 'pure-u-24-24';
			this.getEncapsulate().appendChild(this.elements.buttons);
			return this.elements.buttons;
		}

		/**
		 * Add a button to the form
		 * @param icon - The icon to use for the button.
		 * @returns The new action Button. Null if the Action is not a function.
		 */
		
		addButton(icon) {
			if (typeof window.Form.Row.Action !== 'function') return null;
			let form = this.getForm(), play = new window.Form.Row.Action(form, icon);

			this.getActions().push(play);
			this.getButtons().appendChild(play.out());
			this.setButtonsGrid();

			return play;
		}

		/**
		 * * Set the grid for the buttons
		 * @returns The `setButtonsGrid` method returns the `this` object.
		 */
		
		setButtonsGrid() {
			let actions = this.getActions(), master = actions.length * 2, grid = 24 - master;

			this.getButtons().className = 'pure-u-' + master.toString() + '-24';
			this.setGrid(grid);

			try {
				if (actions.length > 24) throw 'The button for the same container not be more of 24';

				let length = actions.length - 1;
				while (24 % ++length != 0 && length < 24);

				let grid = 24 / length, difference = 24 - (grid * actions.length);
				for (let item = 0; item < actions.length; item++) {
					let add = item == 0 ? grid + difference : grid;
					actions[item].className = 'pure-u-' + add.toString() + '-24';
				}
			}
			catch (message) {
				let debug = this.getForm().getDebug();
				if (debug === true) console.log(message);
			}

			return this;
		}

		/**
		 * Create a div that encapsulates the grid if not exist. 
		 * @returns The encapsulate element.
		 */
		
		getEncapsulate() {
			if (this.elements.hasOwnProperty('encapsulate')) return this.elements.encapsulate;
			var grid = this.getGrid();
			this.elements.encapsulate = document.createElement('div');
			this.elements.encapsulate.setAttribute(this.constructor.type(), ':encapsulate');
			this.elements.encapsulate.setAttribute(this.constructor.data(), this.getName());
			this.elements.encapsulate.className = 'row pure-u-24-24';
			grid.parentNode.replaceChild(this.elements.encapsulate, grid);
			this.elements.encapsulate.appendChild(grid);
			return this.elements.encapsulate;
		}

		/**
		 * Create a grid element if it doesn't exist, and return it
		 * @returns The grid element.
		 */

		getGrid() {
			if (this.elements.hasOwnProperty('grid')) return this.elements.grid;
			this.elements.grid = document.createElement('div');
			this.elements.grid.setAttribute(this.constructor.type(), ':grid');
			this.elements.grid.className = 'pure-u-24-24';
			return this.elements.grid;
		}

		/**
		 * Set the grid size of the element
		 * @param size - The size of the grid.
		 * @returns The grid object.
		 */
		
		setGrid(size) {
			if (typeof size === 'undefined' || isNaN(parseInt(size)) || parseInt(size) === 0) return this;
			this.getGrid().className = 'pure-u-' + size.toString() + '-24';
			return this;
		}

		/**
		 * Apply the grid to the containers
		 * @returns The object itself.
		 */
		
		applyGrid() {
			try {
				let parent = this.getGrid(), containers = this.getContainers().slice(0), visible = containers.filter(function (item) {
					return parent === item.out().parentNode;
				});
				if (visible.length === 0) return this;
				if (visible.length > 24) throw 'The input for the same line not be more of 24';

				let length = visible.length - 1;
				while (24 % ++length != 0 && length < 24);

				let grid = 24 / length, difference = 24 - (grid * visible.length);
				for (let item = 0; item < visible.length; item++) {
					let add = item == 0 ? grid + difference : grid, out = visible[item].out();
					out.className = 'column pure-u-' + add.toString() + '-24';
				}
			}
			catch (message) {
				let debug = this.getForm().getDebug();
				if (debug === true) console.log(message);
			}

			return this;
		}

		/**
		 * Remove the encapsulate element from the DOM
		 * @returns The object itself.
		 */
		
		drop() {
			window.Form.removeElementDOM(this.getEncapsulate());
			return this;
		}

		/**
		 * Returns the grid as a string
		 * @returns The grid.
		 */
		
		out() {
			return this.getGrid();
		}

		/**
		 * *If* the matrix has a row property, *and* that row property has a name property, *then* return the
		 * name property of the row property. 
		 * 
		 * Otherwise, return the name property of the matrix
		 * @param matrix - The matrix to be named.
		 * @returns The name of the matrix.
		 */
		
		static myName(matrix) {
			return !matrix.hasOwnProperty('row')
				|| !matrix.row.hasOwnProperty('name') ? matrix.name : matrix.row.name
		}
	}

	class Container {

		/**
		 * Returns the string "nospace"
		 * @returns The string 'nospace'
		 */
		
		static nospace() {
			return 'nospace';
		}

		/**
		 * Returns the string 'readonly'
		 * @returns The string 'readonly'
		 */
		
		static readonly() {
			return 'readonly';
		}

		/**
		 * It returns a string.
		 * @returns The string 'initialize'
		 */
		
		static initialize() {
			return 'initialize';
		}

		/**
		 * Returns the string 'editable'
		 * @returns The string 'editable' is being returned.
		 */
		
		static editable() {
			return 'editable';
		}

		/**
		 * This function returns a string.
		 * @returns The description method is returning the string 'description'.
		 */
		
		static description() {
			return 'description';
		}

		/**
		 * *This function returns a string.*
		 * @returns a string.
		 */
		
		static tooltip() {
			return 'tooltip';
		}

		/**
		 * It creates a new instance of the class.
		 * @param form - The form object that the field is in.
		 * @param matrix - The matrix object that contains the field's data.
		 */
		
		constructor(form, matrix) {
			this.row; // Defined in the row container action add
			this.form = form;
			this.matrix = matrix;

			this.elements = {
				// plugin: Plugin
			};

			this.tooltip = {
				// label: Form.Tooltip
				// error: Form.Tooltip
			};

			let description = this.getMatrixDescription(), description_write = description === null ? '' : description;
			if (description_write.length)
				this.setDescription(description_write);

			let text = this.getMatrixText();
			if (text !== null) {
				this.setLabelText(text);
				let required = this.getMatrixRequired();
				if (required === true) this.setRequired();

				let tooltip = this.getMatrixTooltip();
				if (tooltip !== null) this.setTooltipLabel(tooltip);
			}

			if (typeof window.Form.Tooltip !== 'function') {
				let icon = window.Form.getIcon('material-icons error_outline');
				this.getContentError().appendChild(icon);
			} else {
				this.tooltip.error = new window.Form.Tooltip();
				this.getContentError().appendChild(this.tooltip.error.getIcon());
			}

			try {
				let type = this.getMatrixType(), name = this.shouldPlugin(type);
				if (type === null || name === null) throw 'No loaded plug-in meets the need for the field ' + type;

				this.setPlugin(name);
			}
			catch (message) {
				let debug = this.getForm().getDebug();
				if (debug === true) console.log(message);
			}

			if (matrix.hasOwnProperty(window.Form.Container.Events.name())
				&& matrix[window.Form.Container.Events.name()] instanceof window.Form.Container.Events) matrix[window.Form.Container.Events.name()].attach(this);

			this.setEditable(this.getMatrixEditable());
		}

		/**
		 * Set the row property of the JavaScript object
		 * @param row - The row number to set.
		 * @returns The object itself.
		 */
		
		setRow(row) {
			this.row = row;
			return this;
		}

		/**
		 * Get the row of the current cell
		 * @returns The row number.
		 */
		
		getRow() {
			return this.row;
		}

		/**
		 * Get the form element that contains the form elements for the current page
		 * @returns The form object.
		 */
		
		getForm() {
			return this.form;
		}

		/**
		 * Returns the matrix of the matrix object
		 * @returns The matrix.
		 */
		
		getMatrix() {
			return this.matrix;
		}

		/**
		 * Get the name of the last matrix in the current document
		 * @param last - If true, returns the last matrix name. Otherwise, returns the first matrix name.
		 * @returns The last word in the matrix name.
		 */
		
		getMatrixName(last) {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('name')) return null;

			if (true !== last) return matrix.name;

			let match = matrix.name.match(/\w+/g);
			if (match.length === 0) return null;

			return match[match.length - 1];
		}

		/**
		 * Get the text of the matrix
		 * @returns The text of the matrix.
		 */
		
		getMatrixText() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('text')) return null;

			return matrix.text;
		}

		/**
		 * Get the description of the matrix
		 * @returns The description of the matrix.
		 */
		
		getMatrixDescription() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty(this.constructor.description())) return null;

			return matrix[this.constructor.description()];
		}

		/**
		 * Get the type of the matrix
		 * @returns The type of the matrix.
		 */
		
		getMatrixType() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('type')) return null;

			return matrix.type;
		}

		/**
		 * Get the required property from the matrix object
		 * @returns The `getMatrixRequired()` method returns a boolean value.
		 */
		
		getMatrixRequired() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('required')) return false;

			return matrix.required === true;
		}

		/**
		 * Get the tooltip for the current matrix
		 * @returns The tooltip for the question.
		 */
		
		getMatrixTooltip() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty(this.constructor.tooltip())) return null;

			return matrix[this.constructor.tooltip()];
		}

		/**
		 * Get the row of the matrix
		 * @returns The row of the matrix.
		 */
		
		getMatrixRow() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('row')) return null;

			return matrix.row;
		}

		/**
		 * Set the matrix patterns
		 * @param patterns - An array of patterns to be applied to the matrix.
		 * @returns Nothing.
		 */
		
		setMatrixPatterns(patterns) {
			let matrix = this.getMatrix();
			if (Array.isArray(patterns)) matrix.patterns = patterns;
			return this;
		}

		/**
		 * Get the patterns from the matrix
		 * @returns The patterns property of the matrix object.
		 */
		
		getMatrixPatterns() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('patterns')) return null;

			return matrix.patterns;
		}

		/**
		 * Returns the value of the `editable` property of the matrix
		 * @returns The matrix is a dictionary, so we can access it using the key.
		 */
		
		getMatrixEditable() {
			let matrix = this.getMatrix();
			if (matrix === null) return null;
			return false === matrix.hasOwnProperty(this.constructor.editable())
				|| matrix[this.constructor.editable()];
		}

		/**
		 * Get the error message from the tooltip object
		 * @returns The error message.
		 */
		
		getTooltipError() {
			if (this.tooltip.hasOwnProperty('error')) return this.tooltip.error;
			return null;
		}

		/**
		 * * Create a div element with the class `form content` and append the error message to it
		 * if it not exist
		 * @returns The content element.
		 */
		
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			let error = this.getContentError();
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'form content';
			this.elements.content.appendChild(error);
			return this.elements.content;
		}

		/**
		 * Create a div element with the class name "error" if it doesn't already exist
		 * @returns The error element.
		 */
		
		getContentError() {
			if (this.elements.hasOwnProperty('error')) return this.elements.error;
			this.elements.error = document.createElement('div');
			this.elements.error.className = 'error';
			return this.elements.error;
		}

		/**
		 * Get the grid element from the elements object if it exists, otherwise create a new grid element
		 * and append the content to it
		 * @returns The grid element.
		 */
		
		getGrid() {
			if (this.elements.hasOwnProperty('grid')) return this.elements.grid;
			let content = this.getContent();
			this.elements.grid = document.createElement('div');
			this.elements.grid.appendChild(content);
			return this.elements.grid;
		}

		/**
		 * Create a label element and insert it before the first child of the content element
		 * if it not exist
		 * @returns The label element.
		 */
		
		getLabel() {
			if (this.elements.hasOwnProperty('label')) return this.elements.label;
			let name = this.getMatrixName(), content = this.getContent();
			this.elements.label = document.createElement('label');
			this.elements.label.setAttribute('for', name);
			this.elements.label.setAttribute(window.Form.handle(), ':click');
			this.elements.label.addEventListener('click', this, false);
			content.insertBefore(this.elements.label, content.firstChild);
			return this.elements.label;
		}

		/**
		 * Set the tooltip label for the button
		 * @param text - The text to display in the tooltip.
		 * @returns The question is being returned.
		 */
		
		setTooltipLabel(text) {
			if (typeof window.Form.Tooltip !== 'function') return this;
			let tooltip = this.getTooltipLabel();
			if (tooltip === null) tooltip = new window.Form.Tooltip();
			tooltip.setText(text);
			let icon = tooltip.getIcon();
			this.getLabel().appendChild(icon);
			this.tooltip.label = tooltip;
			return this;
		}

		/**
		 * Get the tooltip label from the tooltip object
		 * @returns The label of the tooltip.
		 */
		
		getTooltipLabel() {
			if (this.tooltip.hasOwnProperty('label')) return this.tooltip.label;
			return null;
		}

		/**
		 * *Create an icon element and insert it before the label element's first child.*
		 * @returns The question object.
		 */
		
		setRequired() {
			let icon = document.createElement('i'), text = document.createTextNode(String.fromCharCode(42));
			icon.className = 'asterisc';
			icon.appendChild(text);

			let label = this.getLabel();
			label.insertBefore(icon, label.firstChild);
			return this;
		}

		/**
		 * Get the label text element
		 * @returns The label text element.
		 */
		
		getLabelTextElement() {
			if (this.elements.hasOwnProperty('text')) return this.elements.text;
			this.elements.text = document.createElement('span');
			this.getLabel().appendChild(this.elements.text);
			return this.elements.text;
		}

		/**
		 * Set the text of the label element
		 * @param text - The text to be displayed in the label.
		 * @returns The question is not clear. The answer is that the method returns the object itself.
		 */
		
		setLabelText(text) {
			let lebel = this.getLabelTextElement(), text_node = document.createTextNode(text);
			lebel.innerText = '';
			lebel.appendChild(text_node);
			return this;
		}

		/**
		 * * Set the label to be required
		 * @param status - Boolean
		 * @returns The question object.
		 */
		
		setLabelRequired(status) {
			if (this.elements.hasOwnProperty('required')) window.Form.removeElementDOM(this.elements.required);
			if (false === status) return this;

			this.elements.required = document.createElement('span');
			this.elements.required.className = 'required';
			this.elements.required.appendChild(window.Form.getIcon('material-icons asterisk'));
			this.getLabel().appendChild(this.elements.required);

			return this;
		}

		/**
		 * * If the description element already exists, return it.
		 * * Otherwise, create a new paragraph element and add it to the content element.
		 * * Return the paragraph element
		 * @returns The description element.
		 */
		
		getDescription() {
			if (this.elements.hasOwnProperty('p')) return this.elements.p;
			this.elements.p = document.createElement('p');
			this.elements.p.className = 'description';
			this.getContent().insertBefore(this.elements.p, this.getContentError());
			return this.elements.p;
		}

		/**
		 * Set the description of the current element
		 * @param text - The text to be displayed in the description.
		 * @returns The object itself.
		 */
		
		setDescription(text) {
			let description = this.getDescription(), node = document.createTextNode(text);

			description.innerText = '';
			description.appendChild(node);

			return this;
		}

		/**
		 * Set the plugin to use for the form
		 * @param name - The name of the plugin.
		 * @returns The form object.
		 */
		
		setPlugin(name) {
			this.removePlugin();

			this.elements.plugin = new window.Form.Plugin[name](this);
			let content = this.getContent();
			content.setAttribute('data-form-plugin', name.toLowerCase());
			if (typeof this.elements.plugin.out === 'function') content.appendChild(this.elements.plugin.out());

			return this;
		}

		/**
		 * Get the plugin element from the DOM
		 * @returns The plugin element.
		 */
		
		getPlugin() {
			return this.elements.plugin;
		}

		/**
		 * Create a div element with the class name "editable" and return it
		 * @returns The editable div.
		 */
		
		getEditable() {
			if (this.elements.hasOwnProperty('editable')) return this.elements.editable;
			this.elements.editable = document.createElement('div');
			this.elements.editable.className = 'editable';
			return this.elements.editable;
		}

		/**
		 * Set the editable status of the matrix
		 * @param status - A boolean value that determines whether the matrix is editable or not.
		 * @returns The object itself.
		 */
		
		setEditable(status) {
			let editable = this.getEditable(), matrix = this.getMatrix();
			window.Form.removeElementDOM(editable);
			matrix.editable = !!status;

			if (status === true) return this;

			let plugin = this.getPlugin();
			if (plugin === null
				|| typeof plugin === 'undefined'
				|| typeof plugin.out !== 'function') return this;

			plugin.out().appendChild(editable);

			return this;
		}

		/**
		 * Remove the plugin from the DOM
		 * @returns The object itself.
		 */
		
		removePlugin() {
			let plugin = this.getPlugin();
			if (plugin === null
				|| typeof plugin === 'undefined'
				|| typeof plugin.out !== 'function') return this;

			window.Form.removeElementDOM(plugin.out());
			delete this.elements.plugin;
			return this;
		}

		/**
		 * Show a danger message on the tooltip
		 * @param message - The message to display in the tooltip.
		 * @returns The question component.
		 */
		
		showDanger(message) {
			let tooltip = this.getTooltipError();
			if (tooltip !== null && typeof message === 'string') tooltip.setText(message);
			this.getContent().classList.add('danger');
			return this;
		}

		/**
		 * * If the content of the status is danger, return true.
		 * * Otherwise, return false
		 * @returns The statusDanger method returns a boolean value.
		 */
		
		statusDanger() {
			if (this.getContent().classList.contains('danger')) return true;
			return false;
		}

		/**
		 * Hide the danger class from the content element
		 * @returns The `hideDanger` method returns the `this` object.
		 */
		
		hideDanger() {
			this.getContent().classList.remove('danger');
			return this;
		}

		/**
		 * Returns the grid as a string
		 * @returns The grid.
		 */
		
		out() {
			return this.getGrid();
		}

		/**
		 * Returns the name of the plugin that should be used for the specified type
		 * @param type - The type of the field.
		 * @returns The name of the plugin that should be used for the field.
		 */
		
		shouldPlugin(type) {
			if (typeof type !== 'string') return null;

			let loaded = {};
			for (let item in window.Form.Plugin) if (typeof window.Form.Plugin[item] === 'function' && typeof window.Form.Plugin[item].metamorph === 'function') {
				let metamorph = window.Form.Plugin[item].metamorph();
				if (typeof metamorph === 'undefined') metamorph = item.toLowerCase();
				if (metamorph === 'plugin') continue;
				loaded[metamorph] = item;
			}

			let split = type.split(':'), reverse = split.reverse();
			for (let item = 0; item < reverse.length; item++)
				if (loaded.hasOwnProperty(reverse[item])) return loaded[reverse[item]];

			return 'Text';
		}

		/**
		 * * For each attribute in the form, check if the event type matches the attribute. If it does, then
		 * check if the attribute has a function to execute. If it does, then execute the function
		 * @param event - The event object that was passed to the function.
		 * @returns The `handleEvent` method is being returned.
		 */
		
		handleEvent(event) {
			let attribute = window.Form.closestAttribute(event.target, window.Form.handle());
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
		 * *When the user clicks on a label, focus the corresponding input.*
		 * @param event - The event object that was passed to the click handler.
		 * @returns The `getForm` method returns the form element.
		 */
		
		click(event) {
			let attribute = window.Form.closestAttribute(event.target, 'for'), input = this.getForm().getInput(attribute);
			if (false === input instanceof HTMLElement) return;

			input.focus();
		}
	}

	class Preloader {

		/**
		 * The constructor function creates a new instance of the plugin. 
		 * 
		 * The plugin is passed in as the first parameter. 
		 * 
		 * The container is passed in as the second parameter. 
		 * 
		 * The elements object is created. 
		 * 
		 * The events object is created. 
		 * 
		 * The constructor function returns the new instance of the plugin.
		 * @param plugin - The plugin object that created this dialog.
		 * @param container - The element that will contain the plugin.
		 */
		
		constructor(plugin, container) {
			this.plugin = plugin;
			this.container = container;
			this.elements = {};
			this.events = {
				// opened: (function)
				// closer: (function)
			};
		}

		/**
		 * Get the plugin object for the current session
		 * @returns The plugin object.
		 */
		
		getPlugin() {
			return this.plugin;
		}

		/**
		 * Get the container element for the current instance of the object
		 * @returns The container element.
		 */
		
		getContainer() {
			return this.container;
		}

		/**
		 * Set the function to be called when the event is triggered
		 * @param func - A function that will be called when the dialog is opened.
		 * @returns The object itself.
		 */
		
		setEventShow(func) {
			if (typeof func === 'function')
				this.events.opened = func.bind(this);
			return this;
		}

		/**
		 * Get the event that is currently showing
		 * @returns The event that was opened.
		 */
		
		getEventShow() {
			if (this.events.hasOwnProperty('opened')) return this.events.opened;
			return null;
		}

		/**
		 * Set the function to be called when the user clicks the "X" button in the top right corner of the
		 * window
		 * @param func - A function that will be called when the event is triggered.
		 * @returns The instance of the class.
		 */
		
		setEventHide(func) {
			if (typeof func === 'function')
				this.events.closer = func.bind(this);
			return this;
		}

		/**
		 * Returns the event that will hide the modal
		 * @returns The closer event.
		 */
		
		getEventHide() {
			if (this.events.hasOwnProperty('closer')) return this.events.closer;
			return null;
		}

		/**
		 * Create a preloader element if it doesn't exist, and return it
		 * @returns The preloader element.
		 */
		
		getPreloader() {
			if (this.elements.hasOwnProperty('preloader')) return this.elements.preloader;
			this.elements.preloader = document.createElement('div');
			this.elements.preloader.className = 'preloader';
			return this.elements.preloader;
		}

		/**
		 * Create a spinner element if it doesn't exist, and return it
		 * @returns The spinner element.
		 */
		
		getSpinner() {
			if (this.elements.hasOwnProperty('spinner')) return this.elements.spinner;
			this.elements.spinner = document.createElement('div');
			this.elements.spinner.className = 'spinner';
			for (let item = 0; item < 3; item++) {
				let bounce = document.createElement('div');
				bounce.className = 'bounce-' + item;
				this.elements.spinner.appendChild(bounce);
			}
			return this.elements.spinner;
		}

		/**
		 * Create a spinner and append it to the preloader
		 * @returns The object itself.
		 */
		
		showSpinner() {
			let spinner = this.getSpinner();
			this.getPreloader().appendChild(spinner);
			return this;
		}

		/**
		 * Hide the spinner
		 * @returns The object itself.
		 */
		
		hideSpinner() {
			let spinner = this.getSpinner();
			window.Form.removeElementDOM(spinner);
			return this;
		}

		/**
		 * Show the preloader
		 * @returns The object itself.
		 */
		
		show() {
			let container = this.getContainer(), preloader = this.getPreloader();
			if (container instanceof HTMLElement) {
				container.appendChild(preloader);
				let event = this.getEventShow();
				if (typeof event === 'function') event.call(this);
			}
			return this;
		}

		/**
		 * Hide the preloader
		 * @returns The object itself.
		 */
		
		hide() {
			let preloader = this.getPreloader(), event = this.getEventHide();
			window.Form.removeElementDOM(preloader);
			if (typeof event === 'function') event.call(this);
			return this;
		}

		/**
		 * Returns a boolean indicating whether the preloader is currently visible
		 * @returns The status() function returns a boolean value.
		 */
		
		status() {
			return this.getPreloader().parentNode !== null;
		}
	}

	class Notice {

		/**
		 * Returns the default CSS class for the alert
		 * @returns A string.
		 */
		
		static default() {
			return 'alert alert-info';
		}

		/**
		 * *Returns the icon for the info button.*
		 * @returns The icon function returns the string 'material-icons info'
		 */
		
		static icon() {
			return 'material-icons info';
		}

		/**
		 * The constructor function creates an object that has a form property and an elements property. 
		 * 
		 * The form property is set to the form that the constructor was called on. 
		 * 
		 * @param form - The form that the form elements are in.
		 */
		
		constructor(form) {
			this.form = form;
			this.elements = {};
		}

		/**
		 * Get the form object
		 * @returns The form object.
		 */
		
		getForm() {
			return this.form;
		}

		/**
		 * Create a div element and add the icon and text to it
		 * @returns The content element.
		 */
		
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			let icon = this.getMaterial(), text = this.getText();
			this.elements.content = document.createElement('div');
			this.elements.content.appendChild(icon);
			this.elements.content.appendChild(text);
			return this.elements.content;
		}

		/**
		 * Set the CSS class of the content element
		 * @param css - A string of the CSS class name to apply to the element.
		 * @returns The current instance of the class.
		 */
		
		setStyle(css) {
			this.getContent().className = typeof css !== 'string'
				|| css.length === 0 ? this.constructor.default() : css;
			return this;
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
		 * Set the inner text of the element
		 * @param text - The text to be displayed in the button.
		 * @returns The object itself.
		 */
		
		setText(text) {
			this.getText().innerText = text;
			return this
		}

		/**
		 * Get the icon for the current form
		 * @returns The icon of the question.
		 */
		
		getMaterial() {
			if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
			this.elements.icon = window.Form.getIcon(this.constructor.icon());
			return this.elements.icon;
		}

		/**
		 * Create a text node and append it to the material element
		 * @param icon - The icon to be displayed.
		 * @returns The object itself.
		 */
		
		setMaterial(icon) {
			let node = document.createTextNode(icon), material = this.getMaterial();
			material.innerText = '';
			material.appendChild(node);
			return this;
		}

		/**
		 * Show the form
		 * @returns The object itself.
		 */
		
		show() {
			let content = this.getContent();
			this.getForm().getFormElement().appendChild(content);
			return this;
		}

		/**
		 * Hide the content of the form
		 * @returns The object itself.
		 */
		
		hide() {
			let content = this.getContent();
			window.Form.removeElementDOM(content);
			return this;
		}
	}

	class Manager {

		/**
		 * It creates a new instance of the JavaScript class.
		 * @param form - The form that the dialog will be attached to.
		 */
		
		constructor(form) {
			this.form = form;
		}

		/**
		 * Get the form object
		 * @returns The form object.
		 */
		
		getForm() {
			return this.form;
		}

		/**
		 * Get all the preloaders that are attached to the form
		 * @returns The preloaders are being returned.
		 */
		
		get() {
			let preloaders = [], plugins = this.getForm().getPlugins();
			for (let item = 0; item < plugins.length; item++) {
				if (typeof plugins[item].getPreloader !== 'function') continue;

				let preloader = plugins[item].getPreloader();
				if (preloader instanceof window.Form.Container.Preloader) preloaders.push(preloader);
				if (preloader instanceof window.Form.Container.Preloader.Manager) preloaders = preloaders.concat(preloader.get());
			}
			return preloaders;
		}

		/**
		 * Show the spinner for all preloaders
		 * @param spinner - A boolean value that determines whether to show or hide the spinner.
		 * @returns The object itself.
		 */
		
		show(spinner) {
			let preloaders = this.get();
			for (let item = 0; item < preloaders.length; item++) {
				if (typeof preloaders[item].show !== 'function') continue;
				if (spinner !== true && typeof preloaders[item].hideSpinner === 'function') preloaders[item].hideSpinner();
				if (spinner === true && typeof preloaders[item].showSpinner === 'function') preloaders[item].showSpinner();
				preloaders[item].show();
			}
			return this;
		}

		/**
		 * Returns true if any of the preloaders are still loading
		 * @returns The status function returns a boolean value.
		 */
		
		status() {
			let preloaders = this.get();
			for (let item = 0; item < preloaders.length; item++) {
				if (typeof preloaders[item].status !== 'function') continue;
				if (preloaders[item].status()) return true;
			}
			return false;
		}

		/**
		 * Hide all the preloaders
		 * @returns The object itself.
		 */
		
		hide() {
			let preloaders = this.get();
			for (let item = 0; item < preloaders.length; item++) {
				if (typeof preloaders[item].hide !== 'function') continue;
				preloaders[item].hide();
			}
			return this;
		}
	}

	class Danger {

		/**
		 * The constructor function creates a new instance of the JavaScript class
		 * @param form - The form that the dialog will be attached to.
		 */
		
		constructor(form) {
			this.form = form;
		}

		/**
		 * Get the form object
		 * @returns The form object.
		 */
		
		getForm() {
			return this.form;
		}

		/**
		 * Set the value of the current node to an array of objects
		 * @param array - The array to be set.
		 * @returns The object itself.
		 */
		
		setArray(array) {
			if (false === Array.isArray(array)) return this;
			for (let item = 0; item < array.length; item++) this.setObject(array[item]);
			return this;
		}

		/**
		 * Set the container for the given object to show a danger message
		 * @param object - The object to be validated.
		 * @returns The object itself.
		 */
		
		setObject(object) {
			if (false === object.hasOwnProperty('name')) return this;
			let container = this.getForm().findContainer(object.name, true), message = object.hasOwnProperty('message') ? object.message : null;
			if (container !== null) container.showDanger(message);
			return this;
		}

		/**
		 * Hide all the danger messages in the form
		 * @returns The form object.
		 */
		
		hide() {
			let containers = this.getForm().getContainers(true);
			for (let item = 0; item < containers.length; item++) containers[item].hideDanger();
			return this;
		}

		/**
		 * Get the status of all the containers in the form
		 * @returns The statusDanger() method returns a boolean value. If the method returns true, then the
		 * form is not valid.
		 */
		
		status() {
			let containers = this.getForm().getContainers(true);
			for (let item = 0; item < containers.length; item++) {
				let status = containers[item].statusDanger();
				if (status === true) return true;
			}
			return false;
		}
	}

	class Form extends Common {

		/**
		 * It returns a string that is used as a data attribute on the element.
		 * @returns The handle() method returns a string.
		 */
		
		static handle() {
			return 'data-handle-event';
		}

		/**
		 * The constructor is called when the object is created. It is used to initialize the object
		 */
		
		constructor() {
			super();

			this.debug = true;

			this.elements = {};
			this.elements.rows = [];
			this.elements.notice = new window.Form.Container.Notice(this);

			this.arrange = {
				events: []
			};

			this.xhr = {
				url: null,
				error: 0,
				hardcode: {},
				construct: new XMLHttpRequest(),
				callback: {
					fail: null,
					success: null,
					everywhere: null
				}
			};

			this.xhr.construct.addEventListener('load', this, false);
			this.xhr.construct.addEventListener('error', this, false);

			this.manager = new window.Form.Container.Preloader.Manager(this);
			this.danger = new window.Form.Container.Danger(this);
		}

		/**
		 * Set the debug status of the object
		 * @param status - The status of the debug mode.
		 * @returns The `setDebug` method returns the `this` object.
		 */
		
		setDebug(status) {
			this.debug = status;
			return this;
		}

		/**
		 * Get the debug setting for the current session
		 * @returns The debug property of the class.
		 */
		
		getDebug() {
			return this.debug;
		}

		/**
		 * Get the notice element
		 * @returns The getNotice() method returns the notice element.
		 */
		
		getNotice() {
			return this.elements.notice;
		}

		/**
		 * Get the manager for the current session
		 * @returns The manager property is being returned.
		 */
		
		getManager() {
			return this.manager;
		}

		/**
		 * Get the danger level of the dragon
		 * @returns The getDanger() method returns the danger property of the object.
		 */
		
		getDanger() {
			return this.danger;
		}

		/**
		 * * Set the events that will be dispatched by the arrange function
		 * @returns The object itself.
		 */
		
		setAutoDispatchEvents() {
			this.arrange.events = [];
			for (let item = 0; item < arguments.length; item++) this.addArrangeEvents(arguments[item]);
			return this;
		}

		/**
		 * Add an event to the list of events to be arranged
		 * @returns The instance of the class.
		 */
		
		addArrangeEvents() {
			for (let item = 0; item < arguments.length; item++) {
				if (typeof arguments[item] !== 'string'
					|| arguments[item].length === 0) continue;
				this.arrange.events.push(arguments[item]);
			}
			this.arrange.events = this.arrange.events.filter(function (x, i, a) {
				return a.indexOf(x) === i;
			});
			return this;
		}

		/**
		 * Returns the events that are automatically dispatched by the arrange function
		 * @returns The `getAutoDispatchEvents()` method returns an array of event names.
		 */
		
		getAutoDispatchEvents() {
			return this.arrange.events;
		}

		/**
		 * Set a hardcoded value for a key
		 * @param key - The name of the parameter.
		 * @param value - The value to set.
		 * @returns The object itself.
		 */
		
		setHardcode(key, value) {
			this.xhr.hardcode[key] = value;
			return this;
		}

		/**
		 * Get the hardcode value from the xhr object
		 * @returns The hardcode property of the XHR object.
		 */
		
		getHardcode() {
			return this.xhr.hardcode;
		}

		/**
		 * Delete a hardcoded value from the hardcoded object
		 * @param key - The key to delete from the hardcode object.
		 * @returns The object itself.
		 */
		
		deleteHardcode(key) {
			let hardcode = this.getHardcode();
			if (hardcode.hasOwnProperty(key)) delete this.xhr.hardcode[key];
			return this;
		}

		/**
		 * Set the success callback for the XHR object
		 * @param func - The function to be called when the request is successful.
		 * @returns The XHR object.
		 */
		
		setCallbackSuccess(func) {
			this.xhr.callback.success = func;
			return this;
		}

		/**
		 * Get the callback function for the success event
		 * @returns The success callback function.
		 */
		
		getCallbackSuccess() {
			return this.xhr.callback.success;
		}

		/**
		 * Set the callback function for the XHR request
		 * @param func - A function that will be called when the request is complete.
		 * @returns The XHR object.
		 */
		
		setCallbackFail(func) {
			this.xhr.callback.fail = func;
			return this;
		}

		/**
		 * It returns the callback function for the fail event.
		 * @returns The callback function that is called when the request is complete.
		 */
		
		getCallbackFail() {
			return this.xhr.callback.fail;
		}

		/**
		 * Returns the XHR object
		 * @returns The constructor of the XMLHttpRequest object.
		 */
		
		getXHR() {
			return this.xhr.construct;
		}

		/**
		 * Set the URL of the request
		 * @param url - The URL to send the request to.
		 * @returns Nothing.
		 */
		
		setRequestUrl(url) {
			this.xhr.url = url;
			return this;
		}

		/**
		 * Get the URL of the request
		 * @returns The URL of the request.
		 */
		
		getRequestUrl() {
			return this.xhr.url;
		}

		/**
		 * Set a callback function that will be called on every request
		 * @param func - The function to be called when the request is complete.
		 * @returns The XHR object.
		 */
		
		setCallbackEverywhere(func) {
			this.xhr.callback.everywhere = func;
			return this;
		}

		/**
		 * Returns a boolean value indicating whether or not the callback is enabled for all requests
		 * @returns The value of the callback.everywhere property.
		 */
		
		getCallbackEverywhere() {
			return this.xhr.callback.everywhere;
		}

		/**
		 * Create a form element if it doesn't exist, and return it
		 * @returns The form element.
		 */
		
		getFormElement() {
			if (this.elements.hasOwnProperty('form')) return this.elements.form;
			this.elements.form = document.createElement('form');
			this.elements.form.setAttribute('autocomplete', 'off');
			return this.elements.form;
		}

		/**
		 * Get all the rows in the table
		 * @returns The getRows() method returns the rows of the table.
		 */
		
		getRows() {
			return this.elements.rows;
		}

		/**
		 * Get the names of all the rows in the table
		 * @returns The names of the rows.
		 */
		
		getRowsName() {
			let rows = this.getRows(), response = [];
			for (let item = 0; item < rows.length; item++) {
				let name = rows[item].getName();
				if (response.indexOf(name) === -1) response.push(name);
			}
			return response;
		}

		/**
		 * Get a row from the form
		 * @param name - The name of the row. If not specified, the name will be generated from the row's
		 * index.
		 * @param matrix - The matrix that contains the row data.
		 * @returns The row object.
		 */
		
		getRow(name, matrix) {
			let dna = null !== name ? name : window.Form.Row.myName(matrix);
			for (let item = 0, rows = this.getRows(); item < rows.length; item++) {
				if (dna !== rows[item].getName()) continue;
				return rows[item];
			}
			if (typeof matrix !== 'object') return null;
			let row = new window.Form.Row(this, matrix);
			this.getFormElement().appendChild(row.out());
			this.getRows().push(row);
			return row;
		}

		/**
		 * Find a row in the form by name
		 * @param name - The name of the row to find.
		 * @param deep - The number of levels deep to search for the row.
		 * @returns The row object.
		 */
		
		findRow(name, deep) {
			let containers = this.getContainers(deep);
			for (let item = 0; item < containers.length; item++) {
				let row = containers[item].getRow();
				if (row instanceof window.Form.Row && name === row.getName()) return row;
			}
			return null;
		}

		/**
		 * Find all the rows in the form that match the regular expression
		 * @param regex - A regular expression to match against the row name.
		 * @param deep - If true, the function will search all the rows in the form. If false, it will only
		 * search the rows in the current container.
		 * @returns An array of Form.Row objects.
		 */

		findRows(regex, deep) {
			let containers = this.getContainers(deep), response = [];
			for (let item = 0; item < containers.length; item++) {
				let row = containers[item].getRow();
				if (false === (row instanceof window.Form.Row)
					|| !regex.test(row.getName())) continue;
				response.push(row);
			}
			return response;
		}

		/**
		 * Remove a row from the table
		 * @param name - The name of the row to remove.
		 * @returns Nothing.
		 */
		
		removeRow(name) {
			for (let item = 0, rows = this.getRows(); item < rows.length; item++) {
				if (rows[item].getName() !== name) continue;
				this.constructor.removeElementDOM(rows[item].getEncapsulate());
				rows.splice(item, 1);
				break;
			}
			return this;
		}

		/**
		 * Get all the containers in the table
		 * @param deep - If true, the function will return all containers in the table, including those
		 * nested in other containers.
		 * @returns The getContainers method returns an array of all the containers in the table.
		 */
		
		getContainers(deep) {
			let response = [];
			for (let item = 0, rows = this.getRows(); item < rows.length; item++) response = response.concat(rows[item].getContainers(deep));
			return response;
		}

		/**
		 * * Set the value of the specified property for the specified container
		 * @param name - The name of the container.
		 * @param value - The value to set the property to.
		 * @returns The return value is a boolean.
		 */
		
		set(name, value) {
			let container = this.findContainer(name, false);
			if (container === null
				|| typeof container.getPlugin().arrange !== 'function') return false;

			container.getPlugin().arrange(value);
			let preloader = typeof container.getPlugin().getPreloader === 'function' ? container.getPlugin().getPreloader() : null;
			if (preloader !== null) preloader.hide();
			return true;
		}

		/**
		 * Close the dialog
		 * @param event - The event object that was passed to the close() method.
		 */
		
		close(event) {
			let plugins = this.getPlugins();
			for (let item = 0; item < plugins.length; item++) {
				if (typeof plugins[item].close !== 'function') continue;
				plugins[item].close(event);
			}
		}

		/**
		 * Reset the form
		 * @returns The grid object.
		 */
		
		reset() {
			this.getDanger().hide();
			this.getNotice().hide();
			let rows = this.getRows();
			for (let item = 0; item < rows.length; item++) {
				let actions = rows[item].getActions();
				for (let i = 0; i < actions.length; i++) {
					if (typeof actions[i].reset !== 'function') continue;
					actions[i].reset();
				}
			}
			let plugins = this.getPlugins();
			for (let item = 0; item < plugins.length; item++) {
				if (typeof plugins[item].reset !== 'function') continue;
				plugins[item].reset();
			}
			return this;
		}

		/**
		 * Drop all the rows in the table
		 * @param all - If true, all rows will be dropped. If false, only the selected rows will be dropped.
		 * @returns The object itself.
		 */
		
		drop(all) {
			this.getManager().show();
			this.reset();
			for (let item = 0, rows = this.getRows(); item < rows.length; item++) rows[item].drop();
			if (true === all) this.constructor.removeElementDOM(this.out());
			this.elements.rows = [];
			return this;
		}

		/**
		 * Get the hardcoded values and merge them with the values from the parent class
		 * @returns The `get()` method returns the `associative` property of the `super.get()` method.
		 */
		
		get() {
			let associative = super.get(), hardcode = this.getHardcode();
			for (let i in hardcode) associative[i] = hardcode[i];
			return associative;
		}

		/**
		 * Make a POST request to the given URL with the given data
		 * @param everywhere - A function that will be called when the request is complete.
		 * @returns Nothing.
		 */
		
		request(everywhere) {
			this.getDanger().hide();
			this.getNotice().hide();

			let xhr = this.getXHR(),
				url = this.getRequestUrl();
			if (url === null) return;

			this.getManager().show();

			xhr.open('POST', url, !0);
			this.setCallbackEverywhere(everywhere);

			let data = new FormData(),
				values = this.get();
			for (let i in values)
				data.append(i, values[i]);

			xhr.send(data);

			return;
		}

		/**
		 * If the request fails, try again
		 */
		
		error() {
			this.xhr.error = this.xhr.error + 1;
			if (this.xhr.error <= 4)
				setTimeout(this.request.bind(this), 1e3, this.getCallbackEverywhere());
		}

		/**
		 * Loads the JSON response from the server and calls the callback functions
		 * @returns The return value is a boolean. If the return value is true, then the form was
		 * successfully submitted. If the return value is false, then the form was not successfully
		 * submitted.
		 */

		load() {
			let json, xhr = this.getXHR();

			this.xhr.error = 0;

			this.getManager().hide();

			try {
				json = JSON.parse(xhr.responseText);
			}
			catch (message) {
				json = {
					'status': false,
					'notice': message
				};
			}
			let everywhere = this.getCallbackEverywhere();
			if (typeof everywhere === 'function') everywhere.call(this, json);

			let notice = this.getNotice();
			if (json.status == true) {
				let success = this.getCallbackSuccess();
				if (typeof success === 'function') success.call(this, json);

				let text = json.hasOwnProperty('notice') ? json.notice : 'Successful!';
				notice.setStyle('alert alert-success');
				notice.setMaterial('done');
				notice.setText(text);
				notice.show();

				return true;
			}

			let text = json.hasOwnProperty('notice') ? json.notice : 'Unmanaged error';
			notice.setStyle('alert alert-danger');
			notice.setMaterial('error');
			notice.setText(text);
			notice.show();

			if (json.hasOwnProperty('errors')) this.getDanger().setArray(json.errors);

			let fail = this.getCallbackFail();
			if (typeof fail === 'function') fail.call(this, json);

			return false;
		}

		/**
		 * Add a new input to the form
		 * @param matrix - The matrix object that contains the fields and their properties.
		 * @param nofollow - If true, the matrix will not follow the input.
		 * @returns The plugin.
		 */
		
		addInput(matrix, nofollow) {
			let parking = {};
			try {
				if (false === matrix.hasOwnProperty('name')) throw 'Field name is not defined';
				if (nofollow === true) {
					parking.patterns = matrix.patterns;
					delete matrix.patterns;
				}
				let container = new window.Form.Container(this, matrix), plugin = container.getPlugin();
				if (typeof matrix.construct === 'function') matrix.construct.call(plugin);
				this.getRow(null, matrix).addContainer(container);
				if (nofollow === true) container.setMatrixPatterns(parking.patterns);
				return plugin;
			}
			catch (message) {
				let debug = this.getDebug();
				if (debug === true) console.log(message);
			}
			return null;
		}

		/**
		 * Returns the form element
		 * @returns The getFormElement() method returns the form element.
		 */
		
		out() {
			return this.getFormElement();
		}

		/**
		 * If the event type matches the event type in the attribute, or if the event type is empty, then
		 * execute the function
		 * @param event - The event object that was passed to the handler.
		 * @returns The return value is the result of the last expression in the function body.
		 */
		
		handleEvent(event) {
			if (typeof this[event.type] === 'function')
				return this[event.type].call(this, event);

			let attribute = this.constructor.closestAttribute(event.target, this.constructor.handle());
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
		 * Find the closest attribute to the target element
		 * @param target - The element to search for the attribute.
		 * @param attribute - The attribute to search for.
		 * @param html - If true, the result will be the HTML of the closest element with the attribute.
		 * @returns The closest attribute to the target element.
		 */
		
		static closestAttribute(target, attribute, html) {
			if (typeof attribute === 'undefined'
				|| !attribute.length) return null;
			let result = null, element = target;
			do {
				let tagname = element.tagName.toLowerCase();
				if (tagname === 'body') return null;
				result = element.getAttribute(attribute);
				if (result !== null) {
					result = result.toString();
					if (result.length) break;
				}
				element = element.parentNode;
			} while (element !== null
				|| typeof element === 'undefined');
			if (typeof html === 'undefined'
				|| html !== true) return result;
			return element;
		}

		/**
		 * Remove an element from the DOM
		 * @param element - The element to remove from the DOM.
		 * @returns The return value is a boolean value.
		 */
		
		static removeElementDOM(element) {
			let parent = element === null || typeof element === 'undefined' || typeof element.parentNode === 'undefined' ? null : element.parentNode;
			if (parent === null) return false;
			parent.removeChild(element);
			return true;
		}

		/**
		 * Create an HTML element with the class name of the icon name passed in
		 * @param name - The name of the icon.
		 * @returns The icon element.
		 */
		
		static getIcon(name) {
			if (name === null
				|| typeof name !== 'string') name = 'material-icons lens_blur';
			let icon = document.createElement('i'), clean = name.replace(/(material\-icons(\S(\w+))?(\s+))?/, '');

			icon.className = name;
			if (clean === name) return icon;
			let text = document.createTextNode(clean);
			icon.appendChild(text);
			return icon;
		}
	}

	window.Form = Form;
	window.Form.Row = Row;
	window.Form.Plugin = Plugin;
	window.Form.Plugin.Text = Text;
	window.Form.Container = Container;
	window.Form.Container.Events = Events;
	window.Form.Container.Preloader = Preloader;
	window.Form.Container.Preloader.Manager = Manager;
	window.Form.Container.Notice = Notice;
	window.Form.Container.Danger = Danger;

})(window);