(function (window) {

	'use strict';

	class Search {

		/**
		 * * Returns the placeholder text for the search results
		 * @returns The placeholder is being returned.
		 */

		static placeholder() {
			return 'developer\\form\\chips\\search\\no_result';
		}


		/**
		 * The constructor creates the search input chip
		 * @param plugin - The plugin that this search is being added to.
		 * @param search 
		 */

		constructor(plugin, search) {
			this.plugin = plugin;
			this.elements = {};

			this.options = {
				unique: 'id',
				fields: [],
				label: 'developer\\label\\pattern'
			};

			this.xhr = {
				url: null,
				limit: 10,
				construct: new XMLHttpRequest(),
				response: 'results'
			};
			this.xhr.construct.onreadystatechange = this.result.bind(this);

			let write = this.getPlugin().getWrite(), input = write.getWriteInput();
			write.getWriteColumn().getContent().appendChild(this.getList());
			input.setAttribute(Form.handle(), 'input:request focus:focus blur:blur');
			input.addEventListener('input', this, false);

			try {
				if (!search.hasOwnProperty('fields')
					|| !search.hasOwnProperty('url')) throw 'The input chip-search must have a url and fields';

				this.setUrl(search.url);
				this.setFields(search.fields);

				if (search.hasOwnProperty('response')) this.setXHRResponse(search.response);
				if (search.hasOwnProperty('unique')) this.setUnique(search.unique);
				if (search.hasOwnProperty('label')) this.setLabel(search.label);

			}
			catch (message) {
				let debug = this.getPlugin().getContainer().getForm().getDebug();
				if (debug === true) console.log(message);
			}

			this.elements.preloader = new Form.Container.Preloader(this.getPlugin(), this.getList());
		}

		/**
		 * Get the plugin object for the current session
		 * @returns The plugin object.
		 */

		getPlugin() {
			return this.plugin;
		}

		/**
		 * Get the limit for the current request
		 * @returns The limit of the request.
		 */

		getOptionLimit() {
			return this.xhr.limit;
		}

		/**
		 * Set the limit of the number of items to return
		 * @param limit - The number of records to return.
		 * @returns The `setOptionLimit` method returns the `this` object, which is the `xhr` object.
		 */

		setOptionLimit(limit) {
			this.xhr.limit = limit;
			return this;
		}

		/**
		 * Get the preloader element
		 * @returns The preloader element.
		 */

		getPreloader() {
			return this.elements.preloader;
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
		 * Get the response from the XHR request
		 * @returns The response of the XHR request.
		 */

		getXHRResponse() {
			return this.xhr.response;
		}

		/**
		 * Get the URL of the current request
		 * @returns The URL of the request.
		 */
		
		getUrl() {
			return this.xhr.url;
		}

		/**
		 * Set the URL of the request
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
		 * Set the unique option to true or false
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
		 * * If the `found` property exists, return it.
		 * * Otherwise, create a `found` property and return it.
		 * @returns The getNotFoundLabel() method returns the empty list item that is used to display the "no
		 * results found" message.
		 */
		
		getNotFoundLabel() {
			if (this.elements.hasOwnProperty('found')) return this.elements.found;
			let text = this.constructor.placeholder(), node = document.createTextNode(text);
			this.elements.found = document.createElement('li');
			this.elements.found.className = 'result empty';
			this.elements.found.appendChild(node);
			return this.elements.found;
		}

		/**
		 * Get the label of the current node and replace any # with the value of the corresponding field in
		 * the document
		 * @param document - The document to be parsed.
		 * @returns The label with the fields replaced by the values.
		 */
		
		getLabelParsed(document) {
			let text = this.getLabel(), matches = text.match(/([#])(?:(?=(\\?))\2.)*?\1/gm);
			for (let x in matches) {
				let field = matches[x].replace(/#/g, '');
				if (!document.hasOwnProperty(field)) continue;

				text = text.replace(matches[x], document[field]);
			}
			return text;
		}

		/**
		 * The JavaScript function that is called when the user clicks the "Request" button
		 */
		
		request() {
			this.refreshList();
			this.hide().getPreloader().hide();
			Form.removeElementDOM(this.getNotFoundLabel());

			let xhr = this.getXHR(), url = this.getUrl(), limit = this.getOptionLimit(), url_querystring = 'count=' + limit + '&force-use-or=true';
			let url_connector = url.indexOf(String.fromCharCode(63)) === -1 ? String.fromCharCode(63) : String.fromCharCode(38);
			xhr.open('POST', url + url_connector + url_querystring, !0);

			this.show().getPreloader().show();
			let data = new FormData(), fields = this.getFields(), input = this.getPlugin().getWrite().getWriteInput();
			if (!!fields.length) for (let item = 0; item < fields.length; item++) data.append(fields[item], input.value);
			xhr.send(data);
		}

		/**
		 * The JavaScript function `result()` is called when the `XMLHttpRequest` is done loading. 
		 * 
		 * If the `XMLHttpRequest` is not done loading, or if the status is not 200, then the function
		 * returns. 
		 * 
		 * If the `XMLHttpRequest` is done loading, and the status is 200, then the function continues. 
		 * 
		 * The function then checks if the response is not true, or if the response does not have the
		 * `response` property. 
		 * 
		 * If either of these conditions are true, then the function returns. 
		 * 
		 * If the response is true, and the response has the `response` property, then the function
		 * continues. 
		 * 
		 * The function then iterates over the `response` property of the `json` object. 
		 * 
		 * If the `json` object does not have the `response` property, or if the `json` object does not have
		 * the `response` property
		 * @returns The response from the server.
		 */
		
		result() {
			let xhr = this.getXHR();
			if (XMLHttpRequest.DONE !== xhr.readyState
				|| 200 !== xhr.status) return;

			this.getPreloader().hide();

			let json, debug;
			try {
				json = JSON.parse(xhr.responseText);
			}
			catch (message) {
				debug = this.getPlugin().getForm().getDebug();
				if (debug === true) console.log(message);
				return false;
			}

			let response = this.getXHRResponse();

			if (json.status !== true
				|| !json.hasOwnProperty(response)) return;

			let list = this.getList(), reserved = this.getPlugin().getProtected(), unique = this.getUnique();
			for (let i in json[response]) {
				if (!json[response][i].hasOwnProperty(unique)
					|| reserved.indexOf(json[response][i][unique]) !== -1) continue;

				let text = this.getLabelParsed(json[response][i]);
				this.addList(json[response][i][unique], text);
			}

			if (list.childNodes.length === 0) list.appendChild(this.getNotFoundLabel());
		}

		/**
		 * Create a new list element and add it to the DOM
		 * @returns The search list.
		 */
		
		getList() {
			if (this.elements.hasOwnProperty('search')) return this.elements.search;
			this.elements.search = document.createElement('ul');
			this.elements.search.classList.add('search');
			return this.elements.search;
		}

		/**
		 * Refresh the list by removing all the child nodes from the list
		 * @returns The object itself.
		 */
		
		refreshList() {
			let list = this.getList(), i = 0;
			while (true) {
				if (list.childNodes.length === i) break;
				if (list.childNodes[i].classList.contains('preloader')) {
					i = i + 1;
					continue
				}
				list.removeChild(list.childNodes[i]);
			}
			return this;
		}

		/**
		 * Add a list item to the list
		 * @param id - The id of the chip.
		 * @param value - The value of the chip.
		 * @returns The object itself.
		 */
		
		addList(id, value) {
			let text = document.createTextNode(value), li = document.createElement('li');
			li.className = 'result hover';
			li.setAttribute(Form.handle(), 'click:select');
			li.addEventListener('click', this, false);
			li.setAttribute(Form.Plugin.Chips.Chip.data(), id);
			li.appendChild(text);
			this.getList().appendChild(li);
			return this;
		}

		/**
		 * Show the list
		 * @returns The object itself.
		 */
		
		show() {
			this.getList().classList.add('show');
			return this;
		}

		/**
		 * Hide the dropdown list
		 * @returns The object itself.
		 */
		
		hide() {
			this.getList().classList.remove('show');
			return this;
		}

		/**
		 * *Arrange* the *value* parameter into the *Chips* plugin
		 * @param value - The value to be added to the chips.
		 * @returns The object itself.
		 */
		
		arrange(value) {
			let plugin = this.getPlugin();
			if (false === (value instanceof Array)) return this;

			for (let item = 0; item < value.length; item++) {
				if (plugin.getProtected().indexOf(value[item]) !== -1) continue;

				let unique = this.getUnique(), text = this.getLabelParsed(value[item]), chip = new Form.Plugin.Chips.Chip(plugin, value[item][unique], text);
				plugin.addChip(chip);
			}

			return this;
		}

		/**
		 * * For each attribute in the form, check if the attribute is a JavaScript event handler.
		 * * If it is, check if the event type matches the event type in the attribute.
		 * * If it does, execute the JavaScript function in the attribute
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
		 * *Close the dialog box.*
		 * 
		 * The function is called when the user clicks the **X** in the upper right corner of the dialog box
		 * @param event - The event that triggered the dialog.
		 * @returns The `close` method returns the `this` object.
		 */
		
		close(event) {
			if (typeof event === 'undefined') return;
			this.hide().refreshList();
		}

		/**
		 * When the user clicks on a chip, it is added to the plugin
		 * @param event - The event object that was triggered.
		 * @returns The object itself.
		 */
		
		select(event) {
			event.stopPropagation();

			let data = event.target.getAttribute(Form.Plugin.Chips.Chip.data()),
				plugin = this.getPlugin(),
				chip = new Form.Plugin.Chips.Chip(plugin, data, event.target.innerText);
			if (chip.hasOwnProperty('content')
				&& chip.content instanceof HTMLElement) chip.content.classList.add('added');

			plugin.addChip(chip);

			return this;
		}
	}

	window.Form.Plugin.Chips.Search = Search;

})(window);
