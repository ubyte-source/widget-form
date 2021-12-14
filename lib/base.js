(function (window) {

	'use strict';

	class Common {

		findContainer(name, deep) {
			for (let item = 0, containers = this.getContainers(deep); item < containers.length; item++)
				if (name === containers[item].getMatrixName())
					return containers[item];
			return null;
		}
		getPlugins(deep) {
			let plugins = [];
			for (let item = 0, conatiners = this.getContainers(deep); item < conatiners.length; item++)
				plugins.push(conatiners[item].getPlugin());
			return plugins;
		}
		getPackages(value, deep) {
			let packages = [];
			for (let item = 0, plugins = this.getPlugins(deep); item < plugins.length; item++) {
				if (typeof plugins[item].getPack !== 'function') continue;
				for (let i = 0, response = plugins[item].getPack(value); i < response.length; i++)
					packages.push(response[i]);
			}
			return packages;
		}
		getInputs(deep) {
			let inputs = [];
			for (let item = 0, plugins = this.getPlugins(deep); item < plugins.length; item++) {
				if (typeof plugins[item].getInput !== 'function') continue;
				inputs.push(plugins[item].getInput());
			}
			return inputs;
		}
		getInput(name, deep) {
			let container = this.findContainer(name, deep);
			if (container !== null
				&& typeof container.getPlugin().getInput === 'function') return container.getPlugin().getInput();

			return null;
		}
		setAutoDispatch(status, deep) {
			let plugins = this.getPlugins(deep);
			for (let item = 0; item < plugins.length; item++) {
				if (false === (plugins[item] instanceof Plugin)) continue;
				plugins[item].setAutoDispatch(status);
			}
		}
		get() {
			let values = this.getPackages(true), associative = {};
			for (let item = 0; item < values.length; item++) associative[values[item].name] = values[item].value;
			return associative;
		}
	}

	class Events {

		static name() {
			return 'callable';
		}

		constructor() {
			this.events = {};
		}

		getEvents() {
			return this.events;
		}
		addEvent(type, event) {
			if (typeof event === 'function') this.events[type] = event;
			return this;
		}
		attach(container) {
			let plugin = container.getPlugin();
			if (typeof plugin.getInput !== 'function') return;

			let input = container.getPlugin().getInput(), handle = input.getAttribute(Form.handle()) || '';
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
			input.setAttribute(Form.handle(), split.join(String.fromCharCode(32)));
			return this;
		}
		detach(container) {
			let plugin = container.getPlugin();
			if (typeof plugin.getInput !== 'function') return;

			let events = this.getEvents();
			for (let type in events) plugin.getInput().removeEventListener(type, events[type].bind(container), false);
			return this;
		}
	}

	class Plugin {

		static metamorph() { }

		constructor(container) {
			this.container = container;
			this.elements = {};
			this.auto = true;
		}

		setAutoDispatch(dispatch) {
			this.auto = !!dispatch;
			return this;
		}
		getAutoDispatch() {
			return this.auto;
		}
		getContainer() {
			return this.container;
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

		constructor(container) {
			super(container);

			let type = container.getMatrixType();
			this.elements.input = document.createElement('input');
			this.elements.input.name = container.getMatrixName();
			this.elements.input.type = type === null ? 'text' : this.type(type);

			let matrix = container.getMatrix();
			if (matrix.hasOwnProperty('placeholder'))
				this.elements.input.placeholder = matrix.placeholder;

			this.elements.input.setAttribute(Form.handle(), 'input:input focus:focus blur:blur');
			this.elements.input.addEventListener('input', this, false);
			this.elements.input.addEventListener('focus', this, false);
			this.elements.input.addEventListener('blur', this, false);

			this.elements.preloader = new window.Form.Container.Preloader(this, this.getContent());
		}

		getPreloader() {
			return this.elements.preloader;
		}
		getInput() {
			return this.elements.input;
		}
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'input';

			let input = this.getInput();
			this.elements.content.appendChild(input);

			return this.elements.content;
		}
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
		out() {
			return this.getContent();
		}
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
		arrange(value) {
			this.getInput().value = value;
			this.dispatch();
			return this;
		}
		reset() {
			this.getInput().value = '';
			return this;
		}
		input() {
			let content = this.getContainer().getContent(), form = this.getContainer().getForm();
			if (content instanceof HTMLElement) content.classList.remove('danger');
			if (false === form.getDanger().status()) form.getNotice().hide();
		}
		focus() {
			let content = this.getContainer().getContent();
			if (content instanceof HTMLElement) content.classList.add('focus');
		}
		blur() {
			let content = this.getContainer().getContent();
			if (content instanceof HTMLElement) content.classList.remove('focus');
		}
	}

	class Row extends Common {

		static data() {
			return 'data-row-id';
		}
		static type() {
			return 'data-element-type';
		}

		constructor(form, matrix) {
			super();

			this.form = form;
			this.name = this.constructor.myName(matrix);
			this.options = {};
			this.options.actions = [];
			this.options.containers = [];
			this.elements = {};
		}

		getForm() {
			return this.form;
		}
		getName() {
			return this.name;
		}
		getActions() {
			return this.options.actions;
		}
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
		addContainer(container) {
			if (container instanceof Container) {
				container.setRow(this);

				this.getContainers().push(container);
				this.getGrid().insertBefore(container.out(), null);
				let matrix = container.getMatrix();
				if (matrix.hasOwnProperty(Container.initialize())
					&& typeof matrix[Container.initialize()] === 'function')
					matrix[Container.initialize()].call(container);

				this.applyGrid();
			}
			return this;
		}
		getButtons() {
			if (this.elements.hasOwnProperty('buttons')) return this.elements.buttons;
			this.elements.buttons = document.createElement('div');
			this.elements.buttons.setAttribute(this.constructor.type(), ':buttons');
			this.elements.buttons.className = 'pure-u-24-24';
			this.getEncapsulate().appendChild(this.elements.buttons);
			return this.elements.buttons;
		}
		addButton(icon) {
			if (typeof window.Form.Row.Action !== 'function') return null;
			let form = this.getForm(), play = new window.Form.Row.Action(form, icon);

			this.getActions().push(play);
			this.getButtons().appendChild(play.out());
			this.setButtonsGrid();

			return play;
		}
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
		getGrid() {
			if (this.elements.hasOwnProperty('grid')) return this.elements.grid;
			this.elements.grid = document.createElement('div');
			this.elements.grid.setAttribute(this.constructor.type(), ':grid');
			this.elements.grid.className = 'pure-u-24-24';
			return this.elements.grid;
		}
		setGrid(size) {
			if (typeof size === 'undefined' || isNaN(parseInt(size)) || parseInt(size) === 0) return this;
			this.getGrid().className = 'pure-u-' + size.toString() + '-24';
			return this;
		}
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
		drop() {
			Form.removeElementDOM(this.getEncapsulate());
			return this;
		}
		out() {
			return this.getGrid();
		}
		static myName(matrix) {
			return !matrix.hasOwnProperty('row')
				|| !matrix.row.hasOwnProperty('name') ? matrix.name : matrix.row.name
		}
	}

	class Container {

		static nospace() {
			return 'nospace';
		}
		static readonly() {
			return 'readonly';
		}
		static initialize() {
			return 'initialize';
		}

		static editable() {
			return 'editable';
		}
		static description() {
			return 'description';
		}
		static tooltip() {
			return 'tooltip';
		}

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
				let icon = Form.getIcon('material-icons error_outline');
				this.getContentError().appendChild(icon);
			} else {
				this.tooltip.error = new Form.Tooltip();
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

			if (matrix.hasOwnProperty(Events.name())
				&& matrix[Events.name()] instanceof Events) matrix[Events.name()].attach(this);

			this.setEditable(this.getMatrixEditable());
		}

		setRow(row) {
			this.row = row;
			return this;
		}
		getRow() {
			return this.row;
		}
		getForm() {
			return this.form;
		}
		getMatrix() {
			return this.matrix;
		}
		getMatrixName(last) {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('name')) return null;

			if (true !== last) return matrix.name;

			let match = matrix.name.match(/\w+/g);
			if (match.length === 0) return null;

			return match[match.length - 1];
		}
		getMatrixText() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('text')) return null;

			return matrix.text;
		}
		getMatrixDescription() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty(this.constructor.description())) return null;

			return matrix[this.constructor.description()];
		}
		getMatrixType() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('type')) return null;

			return matrix.type;
		}
		getMatrixRequired() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('required')) return false;

			return matrix.required === true;
		}
		getMatrixTooltip() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty(this.constructor.tooltip())) return null;

			return matrix[this.constructor.tooltip()];
		}
		getMatrixRow() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('row')) return null;

			return matrix.row;
		}
		setMatrixPatterns(patterns) {
			let matrix = this.getMatrix();
			if (Array.isArray(patterns)) matrix.patterns = patterns;
			return this;
		}
		getMatrixPatterns() {
			let matrix = this.getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('patterns')) return null;

			return matrix.patterns;
		}
		getMatrixEditable() {
			let matrix = this.getMatrix();
			if (matrix === null) return null;
			return false === matrix.hasOwnProperty(this.constructor.editable())
				|| matrix[this.constructor.editable()];
		}
		getTooltipError() {
			if (this.tooltip.hasOwnProperty('error')) return this.tooltip.error;
			return null;
		}
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			let error = this.getContentError();
			this.elements.content = document.createElement('div');
			this.elements.content.className = 'form content';
			this.elements.content.appendChild(error);
			return this.elements.content;
		}
		getContentError() {
			if (this.elements.hasOwnProperty('error')) return this.elements.error;
			this.elements.error = document.createElement('div');
			this.elements.error.className = 'error';
			return this.elements.error;
		}
		getGrid() {
			if (this.elements.hasOwnProperty('grid')) return this.elements.grid;
			let content = this.getContent();
			this.elements.grid = document.createElement('div');
			this.elements.grid.appendChild(content);
			return this.elements.grid;
		}
		getLabel() {
			if (this.elements.hasOwnProperty('label')) return this.elements.label;
			let name = this.getMatrixName(), content = this.getContent();
			this.elements.label = document.createElement('label');
			this.elements.label.setAttribute('for', name);
			this.elements.label.setAttribute(Form.handle(), ':click');
			this.elements.label.addEventListener('click', this, false);
			content.insertBefore(this.elements.label, content.firstChild);
			return this.elements.label;
		}
		setTooltipLabel(text) {
			if (typeof window.Form.Tooltip !== 'function') return this;
			let tooltip = this.getTooltipLabel();
			if (tooltip === null) tooltip = new Form.Tooltip();
			tooltip.setText(text);
			let icon = tooltip.getIcon();
			this.getLabel().appendChild(icon);
			this.tooltip.label = tooltip;
			return this;
		}
		getTooltipLabel() {
			if (this.tooltip.hasOwnProperty('label')) return this.tooltip.label;
			return null;
		}
		setRequired() {
			let icon = document.createElement('i'), text = document.createTextNode(String.fromCharCode(42));
			icon.className = 'asterisc';
			icon.appendChild(text);

			let label = this.getLabel();
			label.insertBefore(icon, label.firstChild);
			return this;
		}
		getLabelTextElement() {
			if (this.elements.hasOwnProperty('text')) return this.elements.text;
			this.elements.text = document.createElement('span');
			this.getLabel().appendChild(this.elements.text);
			return this.elements.text;
		}
		setLabelText(text) {
			let lebel = this.getLabelTextElement(), text_node = document.createTextNode(text);
			lebel.innerText = '';
			lebel.appendChild(text_node);
			return this;
		}
		setLabelRequired(status) {
			if (this.elements.hasOwnProperty('required')) Form.removeElementDOM(this.elements.required);
			if (false === status) return this;

			this.elements.required = document.createElement('span');
			this.elements.required.className = 'required';
			this.elements.required.appendChild(Form.getIcon('material-icons asterisk'));
			this.getLabel().appendChild(this.elements.required);

			return this;
		}
		getDescription() {
			if (this.elements.hasOwnProperty('p')) return this.elements.p;
			this.elements.p = document.createElement('p');
			this.elements.p.className = 'description';
			this.getContent().insertBefore(this.elements.p, this.getContentError());
			return this.elements.p;
		}
		setDescription(text) {
			let description = this.getDescription(), node = document.createTextNode(text);

			description.innerText = '';
			description.appendChild(node);

			return this;
		}
		setPlugin(name) {
			this.removePlugin();

			this.elements.plugin = new window.Form.Plugin[name](this);
			let content = this.getContent();
			content.setAttribute('data-form-plugin', name.toLowerCase());
			if (typeof this.elements.plugin.out === 'function') content.appendChild(this.elements.plugin.out());

			return this;
		}
		getPlugin() {
			return this.elements.plugin;
		}
		getEditable() {
			if (this.elements.hasOwnProperty('editable')) return this.elements.editable;
			this.elements.editable = document.createElement('div');
			this.elements.editable.className = 'editable';
			return this.elements.editable;
		}
		setEditable(status) {
			let editable = this.getEditable(), matrix = this.getMatrix();
			Form.removeElementDOM(editable);
			matrix.editable = !!status;

			if (status === true) return this;

			let plugin = this.getPlugin();
			if (plugin === null
				|| typeof plugin === 'undefined'
				|| typeof plugin.out !== 'function') return this;

			plugin.out().appendChild(editable);

			return this;
		}
		removePlugin() {
			let plugin = this.getPlugin();
			if (plugin === null
				|| typeof plugin === 'undefined'
				|| typeof plugin.out !== 'function') return this;

			Form.removeElementDOM(plugin.out());
			delete this.elements.plugin;
			return this;
		}
		showDanger(message) {
			let tooltip = this.getTooltipError();
			if (tooltip !== null && typeof message === 'string') tooltip.setText(message);
			this.getContent().classList.add('danger');
			return this;
		}
		statusDanger() {
			if (this.getContent().classList.contains('danger')) return true;
			return false;
		}
		hideDanger() {
			this.getContent().classList.remove('danger');
			return this;
		}
		out() {
			return this.getGrid();
		}
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
		click(event) {
			let attribute = Form.closestAttribute(event.target, 'for'), input = this.getForm().getInput(attribute);
			if (false === input instanceof HTMLElement) return;

			input.focus();
		}
	}

	class Preloader {

		constructor(plugin, container) {
			this.plugin = plugin;
			this.container = container;
			this.elements = {};
			this.events = {
				// opened: (function)
				// closer: (function)
			};
		}

		getPlugin() {
			return this.plugin;
		}
		getContainer() {
			return this.container;
		}
		setEventShow(func) {
			if (typeof func === 'function')
				this.events.opened = func.bind(this);
			return this;
		}
		getEventShow() {
			if (this.events.hasOwnProperty('opened')) return this.events.opened;
			return null;
		}
		setEventHide(func) {
			if (typeof func === 'function')
				this.events.closer = func.bind(this);
			return this;
		}
		getEventHide() {
			if (this.events.hasOwnProperty('closer')) return this.events.closer;
			return null;
		}
		getPreloader() {
			if (this.elements.hasOwnProperty('preloader')) return this.elements.preloader;
			this.elements.preloader = document.createElement('div');
			this.elements.preloader.className = 'preloader';
			return this.elements.preloader;
		}
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
		showSpinner() {
			let spinner = this.getSpinner();
			this.getPreloader().appendChild(spinner);
			return this;
		}
		hideSpinner() {
			let spinner = this.getSpinner();
			Form.removeElementDOM(spinner);
			return this;
		}
		show() {
			let container = this.getContainer(), preloader = this.getPreloader();
			if (container instanceof HTMLElement) {
				container.appendChild(preloader);
				let event = this.getEventShow();
				if (typeof event === 'function') event.call(this);
			}
			return this;
		}
		hide() {
			let preloader = this.getPreloader(), event = this.getEventHide();
			Form.removeElementDOM(preloader);
			if (typeof event === 'function') event.call(this);
			return this;
		}
		status() {
			return this.getPreloader().parentNode !== null;
		}
	}

	class Notice {

		static default() {
			return 'alert alert-info';
		}
		static icon() {
			return 'material-icons info';
		}

		constructor(form) {
			this.form = form;
			this.elements = {};
		}

		getForm() {
			return this.form;
		}
		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			let icon = this.getMaterial(), text = this.getText();
			this.elements.content = document.createElement('div');
			this.elements.content.appendChild(icon);
			this.elements.content.appendChild(text);
			return this.elements.content;
		}
		setStyle(css) {
			this.getContent().className = typeof css !== 'string'
				|| css.length === 0 ? this.constructor.default() : css;
			return this;
		}
		getText() {
			if (this.elements.hasOwnProperty('text')) return this.elements.text;
			this.elements.text = document.createElement('span');
			return this.elements.text;
		}
		setText(text) {
			this.getText().innerText = text;
			return this
		}
		getMaterial() {
			if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
			this.elements.icon = Form.getIcon(this.constructor.icon());
			return this.elements.icon;
		}
		setMaterial(icon) {
			let node = document.createTextNode(icon), material = this.getMaterial();
			material.innerText = '';
			material.appendChild(node);
			return this;
		}
		show() {
			let content = this.getContent();
			this.getForm().getFormElement().appendChild(content);
			return this;
		}
		hide() {
			let content = this.getContent();
			Form.removeElementDOM(content);
			return this;
		}
	}

	class Manager {

		constructor(form) {
			this.form = form;
		}

		getForm() {
			return this.form;
		}
		get() {
			let preloaders = [], plugins = this.getForm().getPlugins();
			for (let item = 0; item < plugins.length; item++) {
				if (typeof plugins[item].getPreloader !== 'function') continue;

				let preloader = plugins[item].getPreloader();
				if (preloader instanceof Preloader) preloaders.push(preloader);
				if (preloader instanceof Manager) preloaders = preloaders.concat(preloader.get());
			}
			return preloaders;
		}
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
		status() {
			let preloaders = this.get();
			for (let item = 0; item < preloaders.length; item++) {
				if (typeof preloaders[item].status !== 'function') continue;
				if (preloaders[item].status()) return true;
			}
			return false;
		}
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

		constructor(form) {
			this.form = form;
		}

		getForm() {
			return this.form;
		}
		setArray(array) {
			if (false === Array.isArray(array)) return this;
			for (let item = 0; item < array.length; item++) this.setObject(array[item]);
			return this;
		}
		setObject(object) {
			if (false === object.hasOwnProperty('name')) return this;
			let container = this.getForm().findContainer(object.name, true), message = object.hasOwnProperty('message') ? object.message : null;
			if (container !== null) container.showDanger(message);
			return this;
		}
		hide() {
			let containers = this.getForm().getContainers(true);
			for (let item = 0; item < containers.length; item++) containers[item].hideDanger();
			return this;
		}
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

		static handle() {
			return 'data-handle-event';
		}

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

		setDebug(status) {
			this.debug = status;
			return this;
		}
		getDebug() {
			return this.debug;
		}
		getNotice() {
			return this.elements.notice;
		}
		getManager() {
			return this.manager;
		}
		getDanger() {
			return this.danger;
		}
		setAutoDispatchEvents() {
			this.arrange.events = [];
			for (let item = 0; item < arguments.length; item++) this.addArrangeEvents(arguments[item]);
			return this;
		}
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
		getAutoDispatchEvents() {
			return this.arrange.events;
		}
		setHardcode(key, value) {
			this.xhr.hardcode[key] = value;
			return this;
		}
		getHardcode() {
			return this.xhr.hardcode;
		}
		deleteHardcode(key) {
			let hardcode = this.getHardcode();
			if (hardcode.hasOwnProperty(key)) delete this.xhr.hardcode[key];
			return this;
		}
		setCallbackSuccess(func) {
			this.xhr.callback.success = func;
			return this;
		}
		getCallbackSuccess() {
			return this.xhr.callback.success;
		}
		setCallbackFail(func) {
			this.xhr.callback.fail = func;
			return this;
		}
		getCallbackFail() {
			return this.xhr.callback.fail;
		}
		getXHR() {
			return this.xhr.construct;
		}
		setRequestUrl(url) {
			this.xhr.url = url;
			return this;
		}
		getRequestUrl() {
			return this.xhr.url;
		}
		setCallbackEverywhere(func) {
			this.xhr.callback.everywhere = func;
			return this;
		}
		getCallbackEverywhere() {
			return this.xhr.callback.everywhere;
		}
		getFormElement() {
			if (this.elements.hasOwnProperty('form')) return this.elements.form;
			this.elements.form = document.createElement('form');
			this.elements.form.setAttribute('autocomplete', 'off');
			return this.elements.form;
		}
		getRows() {
			return this.elements.rows;
		}
		getRowsName() {
			let rows = this.getRows(), response = [];
			for (let item = 0; item < rows.length; item++) {
				let name = rows[item].getName();
				if (response.indexOf(name) === -1) response.push(name);
			}
			return response;
		}
		getRow(name, matrix) {
			let dna = null !== name ? name : Row.myName(matrix);
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
		findRow(name, deep) {
			let containers = this.getContainers(deep);
			for (let item = 0; item < containers.length; item++) {
				let row = containers[item].getRow();
				if (row instanceof Row && name === row.getName()) return row;
			}
			return null;
		}
		findRows(regex, deep) {
			let containers = this.getContainers(deep), response = [];
			for (let item = 0; item < containers.length; item++) {
				let row = containers[item].getRow();
				if (false === (row instanceof Row)
					|| !regex.test(row.getName())) continue;
				response.push(row);
			}
			return response;
		}
		removeRow(name) {
			for (let item = 0, rows = this.getRows(); item < rows.length; item++) {
				if (rows[item].getName() !== name) continue;
				this.constructor.removeElementDOM(rows[item].getEncapsulate());
				rows.splice(item, 1);
				break;
			}
			return this;
		}
		getContainers(deep) {
			let response = [];
			for (let item = 0, rows = this.getRows(); item < rows.length; item++) response = response.concat(rows[item].getContainers(deep));
			return response;
		}
		set(name, value) {
			let container = this.findContainer(name, false);
			if (container === null
				|| typeof container.getPlugin().arrange !== 'function') return false;

			container.getPlugin().arrange(value);
			let preloader = typeof container.getPlugin().getPreloader === 'function' ? container.getPlugin().getPreloader() : null;
			if (preloader !== null) preloader.hide();
			return true;
		}
		close(event) {
			let plugins = this.getPlugins();
			for (let item = 0; item < plugins.length; item++) {
				if (typeof plugins[item].close !== 'function') continue;
				plugins[item].close(event);
			}
		}
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
		drop(all) {
			this.getManager().show();
			this.reset();
			for (let item = 0, rows = this.getRows(); item < rows.length; item++) rows[item].drop();
			if (true === all) this.constructor.removeElementDOM(this.out());
			this.elements.rows = [];
			return this;
		}
		get() {
			let associative = super.get(), hardcode = this.getHardcode();
			for (let i in hardcode) associative[i] = hardcode[i];
			return associative;
		}
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
		error() {
			this.xhr.error = this.xhr.error + 1;
			if (this.xhr.error <= 4)
				setTimeout(this.request.bind(this), 1e3, this.getCallbackEverywhere());
		}
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
		out() {
			return this.getFormElement();
		}
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
		static removeElementDOM(element) {
			let parent = element === null || typeof element === 'undefined' || typeof element.parentNode === 'undefined' ? null : element.parentNode;
			if (parent === null) return false;
			parent.removeChild(element);
			return true;
		}
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