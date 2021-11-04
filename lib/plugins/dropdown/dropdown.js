(function (window) {

	'use strict';

	class Handler {

		constructor(plugin) {
			this.plugin = plugin;
			this.elements = {};
		}

		getPlugin() {
			return this.plugin;
		}
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
		setAction(material) {
			this.cleanAction();
			let icon = Form.getIcon(material);
			this.getAction().appendChild(icon);
			return this;
		}
		getAction() {
			if (this.elements.hasOwnProperty('action')) return this.elements.action;
			let icon = Form.getIcon('material-icons expand_more');
			this.elements.action = document.createElement('div');
			this.elements.action.className = 'action';
			this.elements.action.appendChild(icon);
			return this.elements.action;
		}
		cleanAction() {
			let action = this.getAction();
			while (action.firstChild) Form.removeElementDOM(action.lastChild);
			return this;
		}
		setIcon(clonable) {
			let content = this.getContent();

			this.removeIcon();
			this.elements.icon = clonable.cloneNode(true);

			content.classList.add('icon');
			content.insertBefore(this.elements.icon, content.firstChild);

			return this;
		}
		getIcon() {
			if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
			return null;
		}
		removeIcon() {
			let icon = this.getIcon();
			if (icon === null) return this;

			Form.removeElementDOM(icon);
			this.getContent().classList.remove('icon');

			delete this.elements.icon;

			return this;
		}
		setLabel(text) {
			let node = document.createTextNode(text), label = this.getLabel();
			label.innerText = '';
			label.appendChild(node);
			return this;
		}
		getLabel() {
			if (this.elements.hasOwnProperty('label')) return this.elements.label;
			this.elements.label = document.createElement('b');
			this.elements.label.className = 'ellipsis';
			return this.elements.label;
		}
		cleanLabel() {
			let label = this.getLabel();
			while (label.firstChild) Form.removeElementDOM(label.lastChild);
			return this;
		}
		getSearch() {
			if (this.elements.hasOwnProperty('find')) return this.elements.find;
			this.elements.find = document.createElement('input');
			this.elements.find.type = 'text';
			this.elements.find.setAttribute(Form.handle(), 'input:find');
			this.elements.find.addEventListener('input', this.getPlugin(), false);
			return this.elements.find;
		}
		showSearch() {
			let search = this.getSearch();
			this.cleanLabel().getLabel().appendChild(search);
			return this;
		}
		hideSearch() {
			let search = this.getSearch();
			Form.removeElementDOM(search);
			return this;
		}
	}

	class Icon {

		static icon() {
			return 'material-icons filter_list';
		}

		constructor(li) {
			this.li = li;
			this.elements = {};
		}

		getLI() {
			return this.li;
		}
		get() {
			if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
			let icon = this.constructor.icon();
			this.set(icon);
			return this.elements.icon;
		}
		set(icon) {
			this.elements.icon = Form.getIcon(icon);
			return this;
		}
		show() {
			let wrapper = this.getLI().getWrapper(), icon = this.get();
			wrapper.insertBefore(icon, wrapper.firstChild);
			return this;
		}
		hide() {
			let icon = this.get();
			Form.removeElementDOM(icon);
			return this;
		}
		status() {
			return this.get().parentNode !== null;
		}
		out() {
			return this.get();
		}
	}

	class Li {

		static attribute() {
			return 'data-form-dropdown-li-value';
		}
		static click() {
			return 'click';
		}
		static text() {
			return 'developer\\form\\dropdown\\li\\text';
		}

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

		getPlugin() {
			return this.plugin;
		}
		getID() {
			return this.options.id;
		}
		getMatrix() {
			return this.matrix;
		}
		getIcon() {
			return this.elements.icon;
		}
		setClick(func) {
			this.options[this.constructor.click()] = func;
			return this;
		}
		getClick() {
			return this.options[this.constructor.click()];
		}
		getLabel() {
			if (this.elements.hasOwnProperty('label')) return this.elements.label;
			this.elements.label = document.createElement('span');
			this.setLabel(this.constructor.text());
			return this.elements.label;
		}
		setLabel(text) {
			let label = this.getLabel(), node = document.createTextNode(text);
			label.innerText = '';
			label.appendChild(node);
			return this;
		}
		getWrapper() {
			if (this.elements.hasOwnProperty('wrapper')) return this.elements.wrapper;
			let label = this.getLabel();
			this.elements.wrapper = document.createElement('div');
			this.elements.wrapper.className = 'wrapper ellipsis';
			this.elements.wrapper.appendChild(label);
			return this.elements.wrapper;
		}
		getLi() {
			if (this.elements.hasOwnProperty('li')) return this.elements.li;
			let wrapper = this.getWrapper(), attribute = this.constructor.attribute(), id = this.getID();
			this.elements.li = document.createElement('li');
			this.elements.li.setAttribute(attribute, id);
			this.elements.li.setAttribute(Form.handle(), ':select');
			this.elements.li.appendChild(wrapper);
			return this.elements.li;
		}
		out() {
			return this.getLi();
		}
	}


	class Dropdown extends Form.Plugin {

		static empty() {
			return 'a2e4822a98337283e39f7b60acf85ec9';
		}
		static emptyText() {
			return 'developer\\form\\dropdown\\empty';
		}
		static void() {
			return 'd64bc1eb577b062fa13ed20ddbc130f3';
		}
		static voidText() {
			return 'developer\\form\\dropdown\\void';
		}
		static found() {
			return 'material-icons search';
		}
		static metamorph() {
			return 'enum';
		}

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

		getPreloader() {
			return this.elements.preloader;
		}
		getHandler() {
			return this.elements.handler;
		}
		getPlug() {
			if (this.elements.hasOwnProperty('plug')) return this.elements.plug;
			return null;
		}
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
		getMatrixPatternsNormalize(value) {
			if (false === Array.isArray(value)) return value;
			let result = {};
			for (let item = 0; item < value.length; item++) for (let x in value[item]) result[x] = Object.assign({}, value[item][x]);
			return result;
		}
		setOptionLimit(limit) {
			this.options.limit = limit;
			return this;
		}
		getOptionLimit() {
			return this.options.limit;
		}
		setOptionVoid(key, text) {
			this.options.void = new window.Form.Plugin.Dropdown.Li(this, key.toString(), {
				text: text
			});
			return this;
		}
		getOptionVoid() {
			return this.options.void;
		}
		setOptionEmpty(key, text) {
			this.options.empty = new window.Form.Plugin.Dropdown.Li(this, key.toString(), {
				text: text,
				icon: 'material-icons search_off'
			});
			this.options.empty.getIcon().show();
			return this;
		}
		getOptionEmpty() {
			return this.options.empty;
		}
		setValue(value) {
			let input = this.getInput(), option = this.getOptionVoid().getID();
			let value_parsed = option !== value ? value : '';
			if (value_parsed === input.value) return this;

			input.value = value_parsed;

			return this;
		}
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
		getUL() {
			if (this.elements.hasOwnProperty('ul')) return this.elements.ul;
			this.elements.ul = document.createElement('ul');
			this.elements.ul.className = 'option';
			this.getHandler().getContent().appendChild(this.elements.ul);
			return this.elements.ul;
		}
		getList() {
			if (!this.elements.hasOwnProperty('list')) this.elements.list = {};
			return this.elements.list;
		}
		emptyList() {
			let list = this.getList();
			for (let item in list) {
				Form.removeElementDOM(list[item].getLi());
				delete list[item];
			}
			return this;
		}
		getLi(value) {
			let list = this.getList();
			for (let item in list) {
				if (list[item].getID() !== value) continue;
				return list[item];
			}
			return null;
		}
		getLiFirst() {
			let list = this.getList();
			for (let item in list) if (item !== this.constructor.empty()) return list[item];
			return null;
		}
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

				if (typeof object[item][Li.click()] === 'function') list[item].setClick(object[item][Li.click()]);
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
		populateUlHaveIcon(patterns) {
			for (let i in patterns) {
				if (!patterns[i].hasOwnProperty('icon')) continue;
				return true;
			}
			return false;
		}
		out() {
			return this.getHandler().getContent();
		}
		show() {
			let ul = this.getUL(), search = this.getHandler().getSearch();

			ul.classList.add('active');
			ul.scrollTop = ul.scrollLeft = 0;

			let plug = this.getPlug();
			if (plug === null) search.value = '';

			if (search.parentNode !== null) {
				let event = document.createEvent('HTMLEvents');
				event.initEvent('focus', true, false);
				search.dispatchEvent(event);
			}

			return this;
		}
		hide() {
			this.getUL().classList.remove('active');
			return this;
		}
		status() {
			return this.getUL().classList.contains('active');
		}
		arrange(value) {
			let plug = this.getPlug();
			if (plug !== null
				&& typeof plug.arrange === 'function') return plug.arrange(value);

			this.setSelected(value);

			return this;
		}
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
		close(event) {
			let plugin = Form.closestAttribute(event.target, 'data-form-plugin'), status = this.status();
			if (plugin === 'dropdown'
				|| status === false) return;

			this.hide();
		}
		reset(event) {
			let plug = this.getPlug();
			if (plug !== null
				&& typeof plug.reset === 'function') plug.reset(event);

			let list = this.getLiFirst();
			if (list === null) return this.dispatch();

			this.setSelected(list.getID());

			return this;
		}
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
					let trigger = document.createEvent('HTMLEvents');
					trigger.initEvent('click', true, false);
					actived[0].dispatchEvent(trigger);
					break;
			}

			let container = this.getContainer();
			container.getContent().classList.remove('danger');
			container.getForm().getNotice().hide();
		}
		select(event) {
			let value = Form.closestAttribute(event.target, Li.attribute());
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