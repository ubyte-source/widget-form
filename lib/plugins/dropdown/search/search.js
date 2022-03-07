(function (window) {

	'use strict';

	class Search {

		/**
		 * *Returns the label for the pattern dropdown search field.*
		 * @returns The label for the search pattern.
		 */
		
		static label() {
			return 'developer\\form\\dropdown\\search\\label\\pattern';
		}

		/**
		 * *This function returns a string.*
		 * @returns A string.
		 */
		
		static before() {
			return 'before';
		}

		/**
		 * Returns the name of the JavaScript event that is associated with the specified event
		 * @returns The string 'events'
		 */
		
		static events() {
			return 'events';
		}

		/**
		 * The constructor is called when the class is instantiated. It creates the plugin, sets the options,
		 * and adds the event listeners
		 * @param plugin - The plugin that this dropdown is a part of.
		 * @param search - {
		 */
		
		constructor(plugin, search) {
			this.plugin = plugin;
			this.elements = {};

			let label = this.constructor.label();

			this.options = {
				unique: 'id',
				label: label,
				fields: [],
				events: {
					// click: (function)
					// before: (function)
				}
			};

			this.xhr = {
				url: null,
				construct: new XMLHttpRequest(),
				response: 'results',
				event: null
			};
			this.xhr.construct.onreadystatechange = this.result.bind(this);

			let handler = this.getPlugin().getHandler(), input = handler.getSearch();

			handler.getContent().addEventListener('click', this, false);
			handler.removeIcon();

			this.reset();

			input.setAttribute(Form.handle(), ':request');
			input.addEventListener('input', this, false);

			try {
				if (!search.hasOwnProperty('fields')
					|| !search.hasOwnProperty('url')) throw 'The input dropdown-search must have a url and fields';

				this.setUrl(search.url);
				this.setFields(search.fields);

				if (search.hasOwnProperty('response')) this.setXHRResponse(search.response);
				if (search.hasOwnProperty('unique')) this.setUnique(search.unique);
				if (search.hasOwnProperty('label')) this.setLabel(search.label);
				if (typeof search[this.constructor.events()] === 'object') {
					if (search[this.constructor.events()].hasOwnProperty(this.constructor.before())) this.setBeforeRequest(search[this.constructor.events()][this.constructor.before()]);
					if (search[this.constructor.events()].hasOwnProperty(Form.Plugin.Dropdown.Li.click()))
						this.setOnClickListener(search[this.constructor.events()][Form.Plugin.Dropdown.Li.click()]);
				}
			}
			catch (message) {
				let debug = this.getPlugin().getContainer().getForm().getDebug();
				if (debug === true) console.log(message);
			}
		}

		/**
		 * Get the plugin object for the current session
		 * @returns The plugin object.
		 */
		
		getPlugin() {
			return this.plugin;
		}

		/**
		 * Returns the XHR object
		 * @returns The constructor of the XMLHttpRequest object.
		 */
		
		getXHR() {
			return this.xhr.construct;
		}

		/**
		 * Set the response of the XHR object to the container
		 * @param container - The container to set the response to.
		 * @returns The XHR object.
		 */
		
		setXHRResponse(container) {
			this.xhr.response = container;
			return this;
		}

		/**
		 * Get the response from the XHR object
		 * @returns The response of the XHR request.
		 */
		
		getXHRResponse() {
			return this.xhr.response;
		}

		/**
		 * Set the event of the XHR object
		 * @param event - The event that will be triggered when the XHR request is completed.
		 * @returns The XHR object.
		 */
		
		setXHREvent(event) {
			this.xhr.event = event;
			return this;
		}

		/**
		 * Get the event that triggered the XHR request
		 * @returns The event property of the XMLHttpRequest object.
		 */
		
		getXHREvent() {
			return this.xhr.event;
		}

		/**
		 * Get the URL of the current request
		 * @returns The URL of the request.
		 */
		
		getUrl() {
			return this.xhr.url;
		}

		/**
		 * Sets the URL of the request
		 * @param url - The URL to send the request to.
		 * @returns The object itself.
		 */
		
		setUrl(url) {
			this.xhr.url = url;
			return this;
		}

		/**
		 * Returns the unique option value
		 * @returns The unique option.
		 */
		
		getUnique() {
			return this.options.unique;
		}

		/**
		 * Set the unique option to true
		 * @param unique - If true, the field will be unique.
		 * @returns The object itself.
		 */
		
		setUnique(unique) {
			this.options.unique = unique;
			return this;
		}

		/**
		 * Set the label of the button
		 * @param label - The label to be displayed on the button.
		 * @returns The question object.
		 */
		
		setLabel(label) {
			this.options.label = label;
			return this;
		}

		/**
		 * Get the label of the button
		 * @returns The label of the question.
		 */
		
		getLabel() {
			return this.options.label;
		}

		/**
		 * Set the fields to be returned in the query results
		 * @param fields - A list of fields to be returned in the result set.
		 * @returns The `setFields` method returns the `this` object, which is the `options` object.
		 */
		
		setFields(fields) {
			this.options.fields = fields;
			return this;
		}

		/**
		 * Returns the fields that were selected in the query
		 * @returns The getFields() method returns the fields property of the options object.
		 */
		
		getFields() {
			return this.options.fields;
		}

		/**
		 * Set a function to be executed before the request is sent
		 * @param func - A function that will be called before the request is sent.
		 * @returns The object itself.
		 */
		
		setBeforeRequest(func) {
			this.options.events[this.constructor.before()] = func;
			return this;
		}

		/**
		 * Get the before request event handler
		 * @returns The beforeRequest event handler.
		 */
		
		getBeforeRequest() {
			return this.options.events[this.constructor.before()];
		}

		/**
		 * It sets the click event for the dropdown list item.
		 * @param click - A function that will be called when the user clicks on the dropdown.
		 * @returns The object itself.
		 */
		
		setOnClickListener(click) {
			this.options.events[Form.Plugin.Dropdown.Li.click()] = click;
			return this;
		}

		/**
		 * Returns the JavaScript function that will be called when the user clicks on a dropdown list item
		 * @returns The onClick event handler.
		 */
		
		getOnClickListener() {
			return this.options.events[Form.Plugin.Dropdown.Li.click()];
		}

		/**
		 * Get the label of the current node and replace any # with the value of the corresponding field in
		 * the document
		 * @param document - The document to parse.
		 * @returns The label with the parsed fields.
		 */
		
		getLabelParsed(document) {
			let text = this.getLabel(),
				matches = text.match(/([#])(?:(?=(\\?))\2.)*?\1/gm);

			for (let x in matches) {
				if (typeof matches[x] !== 'string'
					|| matches[x].length < 1) continue;

				let field = matches[x].replace(/#/g, '');
				if (!document.hasOwnProperty(field)) continue;

				text = text.replace(matches[x], document[field]);
			}
			return text;
		}

		/**
		 * Reset the search bar
		 */
		
		reset() {
			let plugin = this.getPlugin(), handler = plugin.getHandler(), input = plugin.getInput();

			handler.getAction().setAttribute(Form.handle(), ':request');
			handler.setAction('material-icons search');
			handler.cleanLabel();

			input.value = '';
		}

		/**
		 * * When the user clicks the "Select" button, the function will empty the list of items in the list
		 * box
		 * @returns Nothing.
		 */
		
		select() {
			this.getPlugin().emptyList();
			if (this.getPlugin().getInput().value.length === 0) return;

			let handler = this.getPlugin().getHandler();
			handler.getAction().setAttribute(Form.handle(), ':reset');
			handler.setAction('material-icons close');
		}

		/**
		 * The JavaScript function that is called when the user clicks the search button
		 * @param event - The event that triggered the request.
		 */
		
		request(event) {
			let before = this.getBeforeRequest(), plugin = this.getPlugin();
			if (typeof before === 'function') before.call(this);

			plugin.getPreloader().showSpinner().show();
			plugin.hide().emptyList();

			let xhr = this.getXHR(), url = this.getUrl(), limit = plugin.getOptionLimit(), url_querystring = 'count=' + limit + '&force-use-or=true';
			let url_connector = url.indexOf(String.fromCharCode(63)) === -1 ? String.fromCharCode(63) : String.fromCharCode(38);
			xhr.open('POST', url + url_connector + url_querystring, !0);

			let data = new FormData(), fields = this.getFields(), input = plugin.getHandler().getSearch();
			if (!!fields.length) for (let i in fields) data.append(fields[i], input.value);

			this.setXHREvent(event);

			xhr.send(data);
		}

		/**
		 * Populate the dropdown list with the data returned from the AJAX request
		 * @returns Nothing.
		 */
		
		result() {
			let xhr = this.getXHR(), plugin = this.getPlugin();
			if (XMLHttpRequest.DONE !== xhr.readyState
				|| 200 !== xhr.status) return;

			plugin.getPreloader().hide();

			let json, debug;
			try {
				json = JSON.parse(xhr.responseText);
			}
			catch (message) {
				debug = plugin.getContainer().getForm().getDebug();
				if (debug === true) console.log(message);
				return false;
			}

			let response = this.getXHRResponse();
			if (json.status !== true
				|| !json.hasOwnProperty(response)) return;

			let patterns = {}, unique = this.getUnique(), click = this.getOnClickListener();
			for (let i in json[response]) {
				if (!json[response][i].hasOwnProperty(unique)) continue;

				patterns[json[response][i][unique]] = json[response][i];
				patterns[json[response][i][unique]].text = this.getLabelParsed(json[response][i]);
				if (typeof click === 'function') patterns[json[response][i][unique]][Form.Plugin.Dropdown.Li.click()] = click;
			}

			let event = this.getXHREvent();
			plugin.populateUl(patterns);
			plugin.open(event);
		}

		/**
		 * *Arrange* the value in the dropdown list
		 * @param value - The value of the selected option.
		 * @returns The object itself.
		 */
		
		arrange(value) {
			let unique = this.getUnique();
			if (false === (value instanceof Object)
				|| !value.hasOwnProperty(unique)) return this;

			let text = this.getLabelParsed(value), plugin = this.getPlugin();
			plugin.populateUl({
				[value[unique]]: {
					text: text
				}
			});
			plugin.setSelected(value[unique]);
			this.select();

			return this;
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
		 * Open the search box
		 */
		
		open() {
			this.reset();
			this.getPlugin().getHandler().showSearch().getSearch().focus();
		}
	}

	window.Form.Plugin.Dropdown.Search = Search;

})(window);