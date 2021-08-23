(function (window) {

	'use strict';

	class Search {

		static placeholder() {
			return 'developer\\form\\chips\\search\\no_result';
		}

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

		getPlugin() {
			return this.plugin;
		}
		getOptionLimit() {
			return this.xhr.limit;
		}
		setOptionLimit(limit) {
			this.xhr.limit = limit;
			return this;
		}
		getPreloader() {
			return this.elements.preloader;
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
		getNotFoundLabel() {
			if (this.elements.hasOwnProperty('found')) return this.elements.found;
			let text = this.constructor.placeholder(), node = document.createTextNode(text);
			this.elements.found = document.createElement('li');
			this.elements.found.className = 'result empty';
			this.elements.found.appendChild(node);
			return this.elements.found;
		}
		getLabelParsed(document) {
			let text = this.getLabel(), matches = text.match(/([#])(?:(?=(\\?))\2.)*?\1/gm);
			for (let x in matches) {
				let field = matches[x].replace(/#/g, '');
				if (!document.hasOwnProperty(field)) continue;

				text = text.replace(matches[x], document[field]);
			}
			return text;
		}
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
		getList() {
			if (this.elements.hasOwnProperty('search')) return this.elements.search;
			this.elements.search = document.createElement('ul');
			this.elements.search.classList.add('search');
			return this.elements.search;
		}
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
		show() {
			this.getList().classList.add('show');
			return this;
		}
		hide() {
			this.getList().classList.remove('show');
			return this;
		}
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
		close(event) {
			if (typeof event === 'undefined') return;
			this.hide().refreshList();
		}
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