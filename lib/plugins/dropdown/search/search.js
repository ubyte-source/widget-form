(function (window) {

	'use strict';

	class Search {

		static label() {
			return 'developer\\form\\dropdown\\search\\label\\pattern';
		}
		static before() {
			return 'before';
		}
		static events() {
			return 'events';
		}

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

		getPlugin() {
			return this.plugin;
		}
		getXHR() {
			return this.xhr.construct;
		}
		setXHRResponse(container) {
			this.xhr.response = container;
			return this;
		}
		getXHRResponse() {
			return this.xhr.response;
		}
		setXHREvent(event) {
			this.xhr.event = event;
			return this;
		}
		getXHREvent() {
			return this.xhr.event;
		}
		getUrl() {
			return this.xhr.url;
		}
		setUrl(url) {
			this.xhr.url = url;
			return this;
		}
		getUnique() {
			return this.options.unique;
		}
		setUnique(unique) {
			this.options.unique = unique;
			return this;
		}
		setLabel(label) {
			this.options.label = label;
			return this;
		}
		getLabel() {
			return this.options.label;
		}
		setFields(fields) {
			this.options.fields = fields;
			return this;
		}
		getFields() {
			return this.options.fields;
		}
		setBeforeRequest(func) {
			this.options.events[this.constructor.before()] = func;
			return this;
		}
		getBeforeRequest() {
			return this.options.events[this.constructor.before()];
		}
		setOnClickListener(click) {
			this.options.events[Form.Plugin.Dropdown.Li.click()] = click;
			return this;
		}
		getOnClickListener() {
			return this.options.events[Form.Plugin.Dropdown.Li.click()];
		}
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
		reset() {
			let plugin = this.getPlugin(), handler = plugin.getHandler(), input = plugin.getInput();

			handler.getAction().setAttribute(Form.handle(), ':request');
			handler.setAction('material-icons search');
			handler.cleanLabel();

			input.value = '';
		}
		select() {
			this.getPlugin().emptyList();
			if (this.getPlugin().getInput().value.length === 0) return;

			let handler = this.getPlugin().getHandler();
			handler.getAction().setAttribute(Form.handle(), ':reset');
			handler.setAction('material-icons close');
		}
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
		open() {
			this.reset();
			this.getPlugin().getHandler().showSearch().getSearch().focus();
		}
	}

	window.Form.Plugin.Dropdown.Search = Search;

})(window);