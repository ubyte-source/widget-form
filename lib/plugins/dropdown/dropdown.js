(function (window) {

	'use strict';

	class Handler {

		/**
		 * The constructor function creates an object that has a property called plugin. 
		 * 
		 * The plugin property is set to the plugin object that is passed in as a parameter. 
		 * 
		 * The constructor function also creates an object called elements.  
		 * 
		 * The elements object is used to store the
		 * @param plugin - The plugin object that is calling this constructor.
		 */

		constructor(plugin) {
			this.plugin = plugin;
			this.elements = {};
		}

		/**
		 * Get the plugin object for the current session
		 * @returns The plugin object.
		 */

		getPlugin() {
			return this.plugin;
		}

		/**
		 * Create the content of the dropdown
		 * @returns The content of the dropdown.
		 */

		getContent() {
			if (this.elements.hasOwnProperty('content')) return this.elements.content;
			let label = this.getLabel(), action = this.getAction();
			this.elements.content = document.createElement('p');
			this.elements.content.className = 'dropdown';
			this.elements.content.setAttribute(Form.handle(), ':open');
			this.elements.content.addEventListener('click', this.getPlugin(), false);
			this.elements.content.appendChild(label);
			this.elements.content.appendChild(action);
			return this.elements.content;
		}

		/**
		 * Set the action of the form to the given material
		 * @param material - The material to be used.
		 * @returns The question is asking what is being returned. The answer is that the question is asking
		 * what is being returned.
		 */

		setAction(material) {
			this.cleanAction();
			let icon = Form.getIcon(material);
			this.getAction().appendChild(icon);
			return this;
		}

		/**
		 * Create a div element with the class name "action" and append an icon to it
		 * @returns The action element.
		 */
		
		getAction() {
			if (this.elements.hasOwnProperty('action')) return this.elements.action;
			let icon = Form.getIcon('material-icons expand_more');
			this.elements.action = document.createElement('div');
			this.elements.action.className = 'action';
			this.elements.action.appendChild(icon);
			return this.elements.action;
		}

		/**
		 * Remove all child elements from the action element
		 * @returns The form object.
		 */
		
		cleanAction() {
			let action = this.getAction();
			while (action.firstChild) Form.removeElementDOM(action.lastChild);
			return this;
		}

		/**
		 * * Set the icon of the button
		 * @param clonable - The element to clone.
		 * @returns The `setIcon` method returns the `this` object.
		 */
		
		setIcon(clonable) {
			let content = this.getContent();

			this.removeIcon();
			this.elements.icon = clonable.cloneNode(true);

			content.classList.add('icon');
			content.insertBefore(this.elements.icon, content.firstChild);

			return this;
		}

		/**
		 * Get the icon element from the elements object
		 * @returns The icon property of the elements object.
		 */
		
		getIcon() {
			if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
			return null;
		}

		/**
		 * Remove the icon from the form
		 * @returns The object itself.
		 */
		
		removeIcon() {
			let icon = this.getIcon();
			if (icon === null) return this;

			Form.removeElementDOM(icon);
			this.getContent().classList.remove('icon');

			delete this.elements.icon;

			return this;
		}

		/**
		 * Create a text node and append it to the label
		 * @param text - The text to be displayed in the label.
		 * @returns The object itself.
		 */
		
		setLabel(text) {
			let node = document.createTextNode(text), label = this.getLabel();
			label.innerText = '';
			label.appendChild(node);
			return this;
		}

		/**
		 * Create a label element if it doesn't exist, and return it
		 * @returns The label element.
		 */
		
		getLabel() {
			if (this.elements.hasOwnProperty('label')) return this.elements.label;
			this.elements.label = document.createElement('b');
			this.elements.label.className = 'ellipsis';
			return this.elements.label;
		}

		/**
		 * Remove all child elements from the label element
		 * @returns The object itself.
		 */
		
		cleanLabel() {
			let label = this.getLabel();
			while (label.firstChild) Form.removeElementDOM(label.lastChild);
			return this;
		}

		/**
		 * Create a new input element and set its type to text
		 * @returns The search input element.
		 */
		
		getSearch() {
			if (this.elements.hasOwnProperty('find')) return this.elements.find;
			this.elements.find = document.createElement('input');
			this.elements.find.type = 'text';
			this.elements.find.setAttribute(Form.handle(), 'input:find');
			this.elements.find.addEventListener('input', this.getPlugin(), false);
			return this.elements.find;
		}

		/**
		 * Show the search box
		 * @returns The object itself.
		 */
		
		showSearch() {
			let search = this.getSearch();
			this.cleanLabel().getLabel().appendChild(search);
			return this;
		}

		/**
		 * Hide the search bar
		 * @returns The object itself.
		 */
		
		hideSearch() {
			let search = this.getSearch();
			Form.removeElementDOM(search);
			return this;
		}
	}

	class Icon {

		/**
		 * *Returns the icon name for the filter list icon
		 * @returns The icon function returns the string 'material-icons filter_list'
		 */
		
		static icon() {
			return 'material-icons filter_list';
		}

		/**
		 * The constructor function creates a new object and assigns it to the variable `this`. 
		 * 
		 * The `this` object is then assigned to the variable `elements` and contains a key-value pair for
		 * each element in the list. 
		 * 
		 * The `this` object is then assigned to the variable `li` and contains the list item. 
		 * 
		 * @param li - The list item that contains the button.
		 */
		
		constructor(li) {
			this.li = li;
			this.elements = {};
		}

		/**
		 * Returns the list item element that contains the current node
		 * @returns The li element.
		 */
		
		getLI() {
			return this.li;
		}

		/**
		 * Get the icon for the current element
		 * @returns The icon property is being returned.
		 */
		
		get() {
			if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
			let icon = this.constructor.icon();
			this.set(icon);
			return this.elements.icon;
		}

		/**
		 * Set the icon for the form
		 * @param icon - The icon to use.
		 * @returns The question object.
		 */
		
		set(icon) {
			this.elements.icon = Form.getIcon(icon);
			return this;
		}

		/**
		 * Inserts the icon before the first child of the list item
		 * @returns The question mark icon.
		 */
		
		show() {
			let wrapper = this.getLI().getWrapper(), icon = this.get();
			wrapper.insertBefore(icon, wrapper.firstChild);
			return this;
		}

		/**
		 * Hide the icon
		 * @returns The object itself.
		 */
		
		hide() {
			let icon = this.get();
			Form.removeElementDOM(icon);
			return this;
		}

		/**
		 * Returns true if the element is still attached to the DOM
		 * @returns The status() function returns a boolean value.
		 */
		
		status() {
			return this.get().parentNode !== null;
		}

		/**
		 * Get the value of the current node and return it as a string
		 * @returns The value of the variable.
		 */
		
		out() {
			return this.get();
		}
	}

	class Li {

		/**
		 * The attribute() function returns the value of the attribute that will be used to store the value
		 * of the dropdown list item
		 * @returns The attribute() method returns the value of the attribute that is being set.
		 */
		
		static attribute() {
			return 'data-form-dropdown-li-value';
		}

		/**
		 * It returns the string "click"
		 * @returns The string 'click'
		 */
		
		static click() {
			return 'click';
		}

		/**
		 * *Returns the text of the dropdown list item.*
		 * @returns The text of the dropdown list item.
		 */
		
		static text() {
			return 'developer\\form\\dropdown\\li\\text';
		}

		/**
		 * Create a new instance of the Dropdown.Li class
		 * @param plugin - The plugin object that created this dropdown.
		 * @param id - The id of the dropdown.
		 * @param matrix - The matrix object that was passed to the constructor.
		 */
		
		constructor(plugin, id, matrix) {
			this.plugin = plugin;
			this.matrix = matrix;

			this.elements = {};
			this.elements.icon = new window.Form.Plugin.Dropdown.Li.Icon(this);

			this.options = {};
			this.options.id = id.toString();

			if (matrix.hasOwnProperty('icon')) this.getIcon().set(matrix.icon);
			if (matrix.hasOwnProperty('text')) this.setLabel(matrix.text);
		}

		/**
		 * Get the plugin object for the current session
		 * @returns The plugin object.
		 */
		
		getPlugin() {
			return this.plugin;
		}

		/**
		 * Get the ID of the element
		 * @returns The id of the element.
		 */
		
		getID() {
			return this.options.id;
		}

		/**
		 * Returns the matrix of the matrix object
		 * @returns The matrix.
		 */
		
		getMatrix() {
			return this.matrix;
		}

		/**
		 * Get the icon element
		 * @returns The icon element.
		 */
		
		getIcon() {
			return this.elements.icon;
		}

		/**
		 * Set the click event handler for the button
		 * @param func - The function to be called when the button is clicked.
		 * @returns The object itself.
		 */
		
		setClick(func) {
			this.options[this.constructor.click()] = func;
			return this;
		}

		/**
		 * Get the click option from the options object
		 * @returns The click event handler.
		 */
		
		getClick() {
			return this.options[this.constructor.click()];
		}

		/**
		 * Create a label element if it doesn't exist, and set its text to the class's text property
		 * @returns The label element.
		 */
		
		getLabel() {
			if (this.elements.hasOwnProperty('label')) return this.elements.label;
			this.elements.label = document.createElement('span');
			this.setLabel(this.constructor.text());
			return this.elements.label;
		}

		/**
		 * Set the label of the button
		 * @param text - The text to be displayed in the label.
		 * @returns The object itself.
		 */
		
		setLabel(text) {
			let label = this.getLabel(), node = document.createTextNode(text);
			label.innerText = '';
			label.appendChild(node);
			return this;
		}

		/**
		 * Create a wrapper element for the label element
		 * @returns The wrapper element.
		 */
		
		getWrapper() {
			if (this.elements.hasOwnProperty('wrapper')) return this.elements.wrapper;
			let label = this.getLabel();
			this.elements.wrapper = document.createElement('div');
			this.elements.wrapper.className = 'wrapper ellipsis';
			this.elements.wrapper.appendChild(label);
			return this.elements.wrapper;
		}

		/**
		 * Create a new list item element and set its ID and handle attributes
		 * @returns The li element.
		 */
		
		getLi() {
			if (this.elements.hasOwnProperty('li')) return this.elements.li;
			let wrapper = this.getWrapper(), attribute = this.constructor.attribute(), id = this.getID();
			this.elements.li = document.createElement('li');
			this.elements.li.setAttribute(attribute, id);
			this.elements.li.setAttribute(Form.handle(), ':select');
			this.elements.li.appendChild(wrapper);
			return this.elements.li;
		}

		/**
		 * Returns the HTML for a list item
		 * @returns The getLi() method is being called and the return value is being passed to the out()
		 * method.
		 */
		
		out() {
			return this.getLi();
		}
	}


	class Dropdown extends Form.Plugin {

		/**
		 * *This function returns a string that is the SHA256 hash of an empty string.*
		 * @returns The string 'a2e4822a98337283e39f7b60acf85ec9'
		 */
		
		static empty() {
			return 'a2e4822a98337283e39f7b60acf85ec9';
		}

		/**
		 * *Returns the empty text for the dropdown.*
		 * @returns The emptyText() method returns the string 'developer\form\dropdown\empty'.
		 */
		
		static emptyText() {
			return 'developer\\form\\dropdown\\empty';
		}

		/**
		 * *Return a string that is a SHA256 hash of the string 'd64bc1eb577b062fa13ed20ddbc130f3'*
		 * @returns The string 'd64bc1eb577b062fa13ed20ddbc130f3'
		 */
		
		static void() {
			return 'd64bc1eb577b062fa13ed20ddbc130f3';
		}

		/**
		 * Returns the path to the void dropdown
		 * @returns The string 'developer\form\dropdown\void'
		 */
		
		static voidText() {
			return 'developer\\form\\dropdown\\void';
		}

		/**
		 * * If the search box is empty, return the string 'material-icons search'.
		 * * If the search box is not empty, return the string 'material-icons search found'
		 * @returns The class name for the icon.
		 */
		
		static found() {
			return 'material-icons search';
		}

		/**
		 * It returns the string "enum"
		 * @returns The string "enum"
		 */
		
		static metamorph() {
			return 'enum';
		}

		/**
		 * Create a new instance of the dropdown plugin
		 * @param container - The container of the dropdown.
		 */
		
		constructor(container) {
			super(container);

			this.elements.handler = new window.Form.Plugin.Dropdown.Handler(this);

			this.options = {
				limit: 8,
				// empty: Li
				// void: Li
			};

			this.setOptionVoid(this.constructor.void(), this.constructor.voidText());
			this.setOptionEmpty(this.constructor.empty(), this.constructor.emptyText());

			this.elements.input = document.createElement('input');
			this.elements.input.name = this.getContainer().getMatrixName();
			this.elements.input.type = 'hidden';
			this.elements.input.setAttribute(Form.handle(), 'change:input input:input');
			this.elements.input.addEventListener('change', this, false);

			if (this.elements.input.parentNode === null) this.getHandler().getContent().appendChild(this.elements.input);

			let matrix = this.getContainer().getMatrix();
			if (matrix.hasOwnProperty('patterns') && matrix.patterns.hasOwnProperty(0)) if (!matrix.patterns[0].hasOwnProperty('search')) {
				let patterns = this.getMatrixPatterns();
				this.populateUl(patterns);
			} else if (typeof Form.Plugin.Dropdown.Search === 'function') {
				this.elements.plug = new Form.Plugin.Dropdown.Search(this, matrix.patterns[0].search);
			}

			this.elements.preloader = new Form.Container.Preloader(this, this.getHandler().getContent());
		}

		/**
		 * Get the preloader element
		 * @returns The preloader element.
		 */
		
		getPreloader() {
			return this.elements.preloader;
		}

		/**
		 * Get the handler element
		 * @returns The handler element.
		 */
		
		getHandler() {
			return this.elements.handler;
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
		 * Get the patterns from the matrix
		 * @returns The normalized patterns.
		 */
		
		getMatrixPatterns() {
			let matrix = this.getContainer().getMatrix();
			if (matrix === null
				|| !matrix.hasOwnProperty('patterns')
				|| !Array.isArray(matrix.patterns)) return null;

			let patterns = matrix.patterns.map(function (item) {
				return item.associative;
			});
			return this.getMatrixPatternsNormalize(patterns);
		}

		/**
		 * *Normalize the matrix patterns to a single object.*
		 * 
		 * The above function is used to normalize the matrix patterns to a single object
		 * @param value - The value to be normalized.
		 * @returns The result is a new object that is a combination of all the objects in the array.
		 */
		
		getMatrixPatternsNormalize(value) {
			if (false === Array.isArray(value)) return value;
			let result = {};
			for (let item = 0; item < value.length; item++) for (let x in value[item]) result[x] = Object.assign({}, value[item][x]);
			return result;
		}

		/**
		 * Set the limit for the number of results to return
		 * @param limit - The number of rows to return.
		 * @returns The query object.
		 */
		
		setOptionLimit(limit) {
			this.options.limit = limit;
			return this;
		}

		/**
		 * Get the limit option from the options object
		 * @returns The getOptionLimit() function returns the value of the limit property of the options
		 * object.
		 */
		
		getOptionLimit() {
			return this.options.limit;
		}

		/**
		 * * Sets the void option
		 * @param key - The key of the option.
		 * @param text - The text to display in the dropdown.
		 * @returns The object itself.
		 */
		
		setOptionVoid(key, text) {
			this.options.void = new window.Form.Plugin.Dropdown.Li(this, key.toString(), {
				text: text
			});
			return this;
		}

		/**
		 * Get the value of the void option
		 * @returns The void option.
		 */
		
		getOptionVoid() {
			return this.options.void;
		}

		/**
		 * * Set the empty option
		 * @param key - The key of the option.
		 * @param text - The text to display in the dropdown.
		 * @returns The object itself.
		 */
		
		setOptionEmpty(key, text) {
			this.options.empty = new window.Form.Plugin.Dropdown.Li(this, key.toString(), {
				text: text,
				icon: 'material-icons search_off'
			});
			this.options.empty.getIcon().show();
			return this;
		}

		/**
		 * Returns the empty option
		 * @returns The empty option.
		 */
		
		getOptionEmpty() {
			return this.options.empty;
		}

		/**
		 * Set the value of the input element
		 * @param value - The value of the option.
		 * @returns The object itself.
		 */
		
		setValue(value) {
			let input = this.getInput(), option = this.getOptionVoid().getID();
			let value_parsed = option !== value ? value : '';
			if (value_parsed === input.value) return this;

			input.value = value_parsed;

			return this;
		}

		/**
		 * Set the selected value
		 * @param value - The value to be set.
		 * @returns The object itself.
		 */
		
		setSelected(value) {
			let string = null === value ? this.constructor.void() : value.toString();

			this.hide();

			if (string === this.constructor.empty()) return this.reset();
			this.setValue(string);

			let li = this.getLi(string) || this.getLiFirst();
			if (li === null) return this;

			let icon = li.getIcon(), label = li.getLabel(), handler = this.getHandler();

			handler.removeIcon();
			if (icon.status()) handler.setIcon(icon.out());
			handler.setLabel(label.innerText);

			let click = li.getClick();
			if (typeof click === 'function') click.call(li);

			return this;
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
		 * Create a new <ul> element and add it to the content of the handler
		 * @returns The ul element.
		 */
		
		getUL() {
			if (this.elements.hasOwnProperty('ul')) return this.elements.ul;
			this.elements.ul = document.createElement('ul');
			this.elements.ul.className = 'option';
			this.getHandler().getContent().appendChild(this.elements.ul);
			return this.elements.ul;
		}

		/**
		 * Get the list element from the elements object
		 * @returns The list object.
		 */
		
		getList() {
			if (!this.elements.hasOwnProperty('list')) this.elements.list = {};
			return this.elements.list;
		}

		/**
		 * Remove all items from the list
		 * @returns The object itself.
		 */
		
		emptyList() {
			let list = this.getList();
			for (let item in list) {
				Form.removeElementDOM(list[item].getLi());
				delete list[item];
			}
			return this;
		}

		/**
		 * Get a list item by its ID
		 * @param value - The ID of the item to be retrieved.
		 * @returns The getLi() method returns the list item that has the same ID as the value parameter.
		 */
		
		getLi(value) {
			let list = this.getList();
			for (let item in list) {
				if (list[item].getID() !== value) continue;
				return list[item];
			}
			return null;
		}

		/**
		 * Get the first item in the list
		 * @returns The first item in the list.
		 */
		
		getLiFirst() {
			let list = this.getList();
			for (let item in list) if (item !== this.constructor.empty()) return list[item];
			return null;
		}

		/**
		 * Populates the dropdown list with the given patterns
		 * @param patterns - The data to populate the dropdown with.
		 * @returns The object itself.
		 */
		
		populateUl(patterns) {
			let should = this.populateUlHaveIcon(patterns);
			if (should === false) this.getHandler().removeIcon();

			let object = Object.assign({}, patterns);

			this.emptyList();

			let ul = this.getUL(), list = this.getList(), matrix = this.getContainer().getMatrix();
			let is = !matrix.hasOwnProperty('required') || true !== matrix.required;
			if (is) {
				let option = this.getOptionVoid();
				ul.appendChild(option.out());
				list[option.getID()] = option;
			}

			let plug = this.getPlug(), first = Object.keys(object).shift();
			for (let item in object) {
				list[item] = new window.Form.Plugin.Dropdown.Li(this, item, object[item]);
				if (should) list[item].getIcon().show();
				ul.appendChild(list[item].out());

				if (typeof object[item][window.Form.Plugin.Dropdown.Li.click()] === 'function') list[item].setClick(object[item][window.Form.Plugin.Dropdown.Li.click()]);
				if (null !== plug) continue;
				if (is
					|| first !== item
					&& (!object[item].hasOwnProperty('selected') || object[item].selected !== true)) continue;

				this.setSelected(item);
			}

			if (is) this.setSelected(this.constructor.void());

			if (0 === Object.keys(list).length) {
				let option = this.getOptionEmpty();
				ul.appendChild(option.out());
				list[option.getID()] = option;
				return this;
			}

			return this;
		}
		
		/**
		 * * For each pattern in the patterns array, check if the pattern has an icon property. 
		 * * If the pattern has an icon property, return true. 
		 * * If the pattern does not have an icon property, continue to the next pattern. 
		 * * If no pattern has an icon property, return false
		 * @param patterns - The patterns to be added to the list.
		 * @returns a boolean value.
		 */
		
		populateUlHaveIcon(patterns) {
			for (let i in patterns) {
				if (!patterns[i].hasOwnProperty('icon')) continue;
				return true;
			}
			return false;
		}

		/**
		 * Returns the JavaScript content of the current page
		 * @returns The content of the file.
		 */
		
		out() {
			return this.getHandler().getContent();
		}

		/**
		 * Show the dropdown list
		 * @returns The object itself.
		 */
		
		show() {
			let ul = this.getUL(), search = this.getHandler().getSearch();

			ul.classList.add('active');
			ul.scrollTop = ul.scrollLeft = 0;

			let plug = this.getPlug();
			if (plug === null) search.value = '';

			if (search.parentNode !== null) {
				let event = new Event('focus', {
					'cancelable': false,
					'bubbles': true
				});
				search.dispatchEvent(event);
			}

			return this;
		}

		/**
		 * Hide the dropdown menu
		 * @returns Nothing is being returned.
		 */
		
		hide() {
			this.getUL().classList.remove('active');
			return this;
		}

		/**
		 * Returns a boolean indicating whether the status of the dropdown is active
		 * @returns The status() method returns a boolean value.
		 */
		
		status() {
			return this.getUL().classList.contains('active');
		}

		/**
		 * *Arrange* is a function that is called when the user selects a value in the dropdown. 
		 * 
		 * The function is passed the value that the user selected. 
		 * 
		 * The function can be used to set the value of the plug. 
		 * 
		 * If the plug has a *arrange* function, it will be called. 
		 * 
		 * @param value - The value to be set.
		 * @returns The object itself.
		 */
		
		arrange(value) {
			let plug = this.getPlug();
			if (plug !== null
				&& typeof plug.arrange === 'function') return plug.arrange(value);

			this.setSelected(value);

			return this;
		}

		/**
		 * When the user clicks on the dropdown button, the dropdown menu is shown
		 * @param event - The event object that triggered the open method.
		 * @returns The object itself.
		 */
		
		open(event) {
			let preloader = this.getPreloader().status(), list = this.getList();
			if (preloader === true
				|| Object.keys(list).length === 0) return;

			for (let x in list) list[x].getLi().removeAttribute('class');

			if (Object.keys(this.getList()).length > 1) Form.removeElementDOM(this.getOptionEmpty().out());
			this.show();

			this.getHandler().hideSearch();
			let plug = this.getPlug();

			if (plug !== null
				&& typeof plug.open === 'function') return plug.open(event);

			let limit = this.getOptionLimit();
			if (Object.keys(list).length <= limit) return;

			let icon = Form.getIcon(this.constructor.found());
			this.getHandler().showSearch().setIcon(icon).getSearch().focus();
		}

		/**
		 * When the user clicks outside of the dropdown, the dropdown is hidden
		 * @param event - The event object that was triggered.
		 * @returns The `close` method returns `this`.
		 */
		
		close(event) {
			let plugin = Form.closestAttribute(event.target, 'data-form-plugin'), status = this.status();
			if (plugin === 'dropdown'
				|| status === false) return;

			this.hide();
		}

		/**
		 * Reset the list to the first item
		 * @param event - The event object that was passed to the function.
		 * @returns The object itself.
		 */
		
		reset(event) {
			let plug = this.getPlug();
			if (plug !== null
				&& typeof plug.reset === 'function') plug.reset(event);

			let list = this.getLiFirst();
			if (list === null) return this.dispatch();

			this.setSelected(list.getID());

			return this;
		}

		/**
		 * Find the list item that matches the search term and display it
		 * @param event - The event object that was triggered.
		 */
		
		find(event) {
			let actived = [], list = this.getList(), empty = this.getOptionEmpty().out(), option = this.getOptionVoid().getID();
			Form.removeElementDOM(empty);

			for (let item in list) if (option !== item) {
				let li = list[item].getLi(), text = list[item].getLabel().innerText.toLowerCase();
				if (text.indexOf(event.target.value.toLowerCase()) === -1) {
					li.classList.add('hide');
					continue;
				}
				li.classList.remove('hide');
				actived.push(li);
			}

			switch (actived.length) {
				case 0:
					this.getUL().appendChild(empty);
					break;
				case 1:
					let trigger = new Event('click', {
						'cancelable': false,
						'bubbles': true
					});
					actived[0].dispatchEvent(trigger);
					break;
			}

			let container = this.getContainer();
			container.getContent().classList.remove('danger');
			container.getForm().getNotice().hide();
		}

		/**
		 * When the user clicks on a dropdown list item, set the selected value and call the select function
		 * on the plug
		 * @param event - The event object that was passed to the function.
		 * @returns Nothing.
		 */
		
		select(event) {
			let value = Form.closestAttribute(event.target, window.Form.Plugin.Dropdown.Li.attribute());
			if (value === null) return;

			this.setSelected(value);

			let plug = this.getPlug();
			if (plug !== null
				&& typeof plug.select === 'function') plug.select(event);

			this.dispatch();
		}
	}

	window.Form.Plugin.Dropdown = Dropdown;
	window.Form.Plugin.Dropdown.Handler = Handler;
	window.Form.Plugin.Dropdown.Li = Li;
	window.Form.Plugin.Dropdown.Li.Icon = Icon;

})(window);