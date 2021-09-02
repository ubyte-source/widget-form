(function (window) {

	'use strict';

	class Matrioska extends Form.Plugin {

		static handle() {
			return 'data-handle-event';
		}
		static clone() {
			return ':clone';
		}
		static delete() {
			return ':delete';
		}

		constructor(container) {
			super(container);

			this.events = {};
			this.button = true;
			this.increaser = 0;
			this.elements = {};
			this.elements.form = new Form();
			this.elements.form.getContainer = this.getContainer.bind(this);
			this.elements.form.setAutoDispatchEvents.apply(this.elements.form, this.getContainer().getForm().getAutoDispatchEvents());
			container.getContent().classList.add(Form.Container.nospace());
			this.render();
		}

		render() {
			this.getForm().drop();

			let name = this.getSmith(), pattern = this.getPattern();
			if (name === null
				|| pattern === null) return this;

			this.evolution(name);

			let row = this.getForm().getRow(name);
			if (row === null) this.setButtonStatus(false);

			if (false === this.getMultiple()
				|| false === this.getButtonStatus()) return this;

			let add = row.addButton('add');
			if (add === null) return this;

			add.out().setAttribute(this.constructor.handle(), 'click:clone');
			add.out().addEventListener('click', this, false);

			return this;
		}
		setButtonStatus(enable) {
			this.button = enable === true;
			return this;
		}
		getButtonStatus() {
			return this.button;
		}
		getEvents() {
			return this.events;
		}
		setEventDelete(func) {
			let events = this.getEvents();
			if (typeof func === 'function') events.delete = func;
			return this;
		}
		getEventDelete() {
			let events = this.getEvents();
			if (events.hasOwnProperty('delete')) return events.delete;
			return null;
		}
		setEventClone(func) {
			let events = this.getEvents();
			if (typeof func === 'function') events.clone = func;
			return this;
		}
		getEventClone() {
			let events = this.getEvents();
			if (events.hasOwnProperty('clone')) return events.clone;
			return null;
		}
		getPattern() {
			let patterns = this.getContainer().getMatrixPatterns();
			if (patterns === null
				|| patterns.length === 0) return null;

			return patterns[0];
		}
		getMultiple() {
			let pattern = this.getPattern();
			if (pattern === null
				|| false === pattern.hasOwnProperty('multiple')
				|| pattern.multiple !== true) return false;
			return true;
		}
		getIncreaser() {
			let name = this.getContainer().getMatrixName();
			if (name === null) return null;
			for (let item = 91; item <= 93; item += 2) name = name.replace(String.fromCharCode(item), '\\' + String.fromCharCode(item));

			let value = String.fromCharCode(40) + name + '\\' + String.fromCharCode(91) + '\\d+' + '\\' + String.fromCharCode(93) + String.fromCharCode(41) + '.*';
			let count = [0], rows = this.getForm().getRows(), regex = new RegExp(value, 'i');
			for (let item = 0; item < rows.length; item++) {
				let base = rows[item].getName().replace(regex, '$1');
				if (count.indexOf(base) === -1) count.push(base);
			}

			return count.reduce(function (a, b) {
				let number = 1 + parseInt(b.slice(0, -1).match(/(\d+)$/i)[0]);
				return Math.max(a, number);
			});
		}
		getSmith(specific) {
			let name = this.getContainer().getMatrixName();
			if (name === null) return null;

			if (this.getMultiple()) {
				let increaser = Number.isInteger(specific) ? specific : this.getIncreaser();
				name += String.fromCharCode(91) + increaser.toString() + String.fromCharCode(93);
			}

			return name;
		}
		evolution(name) {
			let pattern = this.getPattern();
			if (pattern === null) return false;
			for (let item = 0; item < pattern.fields.length; item++) {
				let copy = Object.assign({}, pattern.fields[item]);
				copy.row = copy.hasOwnProperty('row') ? Object.assign({}, copy.row) : {};
				copy.row.name = typeof copy.row.name !== 'string' ? '' : String.fromCharCode(91) + copy.row.name + String.fromCharCode(93);
				copy.row.name = name + copy.row.name;
				copy.name = name + String.fromCharCode(91) + copy.name + String.fromCharCode(93);
				this.getForm().addInput(copy);
			}

			return true;
		}
		close(event) {
			let form = this.getForm();
			if (typeof form.close === 'function') form.close(event);
		}
		getForm() {
			return this.elements.form;
		}
		getPreloader() {
			return this.getForm().getManager();
		}
		getPack() {
			return this.getForm().getPackages();
		}
		getContainers(deep) {
			return this.getForm().getContainers(deep);
		}
		out() {
			return this.getForm().out();
		}
		clone(event) {
			let name = this.getSmith();
			if (name === null) return null;

			this.evolution(name);

			let row = this.getForm().getRow(name);
			if (row === null) return name;

			if (this.getButtonStatus()) {
				let remove = row.addButton('delete').out();
				remove.setAttribute(this.constructor.handle(), 'click:remove');
				remove.addEventListener('click', this, false);
			}

			let clone = this.getEventClone();
			if (typeof clone === 'function') clone.call(this, name, event);

			return name;
		}
		remove(event) {
			let name = Form.closestAttribute(event.target, Form.Row.data()), remove = this.getEventDelete();
			if (typeof remove === 'function') remove.call(this, name, event);
			this.getForm().removeRow(name);
		}
		arrange(value) {
			let object = {}, values = Array.isArray(value) ? value : [value], index = 0;
			do {
				let smith = this.getSmith(index);
				for (let item in values[index]) {
					let parsed = smith + String.fromCharCode(91) + item + String.fromCharCode(93);
					object[parsed] = values[index][item];
				}
				if (values.length - 1 <= index) break;
				if (values.length !== this.getIncreaser()) smith = this.clone();
				++index;
			} while (true);

			for (let item in object)
				this.getForm().set(item, object[item]);

			return this;
		}
		reset() {
			this.increaser = 0;
			this.render();
			return this;
		}
		static monica(matrioska) {
			let fields = matrioska instanceof Object && Array.isArray(matrioska.fields)
				? matrioska.fields
				: [];

			for (let item = 0; item < fields.length; item++) {
				if (false === fields[item].hasOwnProperty('patterns')) continue;
				for (let x = 0; x < fields[item].patterns.length; x++) fields = fields.concat(Matrioska.monica(fields[item].patterns[x]));
			}
			return fields;
		}
		static search(matrioska, path, collection, field) {
			let find = Matrioska.find(matrioska, path, collection);
			if (find === null
				|| typeof field !== 'string'
				|| false === find.hasOwnProperty('fields')) return null;

			for (let item = 0; item < find.fields.length; item++) {
				if (find.fields[item].name !== field) continue;
				return find.fields[item];
			}
			return null;
		}
		static find(matrioska, path, collection) {
			if (typeof matrioska !== 'object' || typeof path !== 'string') return null;

			let split = path.split(/\./s), scan = Matrioska.scan(matrioska.fields, split);
			if (null === scan) return null;
			if (typeof collection !== 'string'
				|| !scan.hasOwnProperty('patterns')) return scan;

			for (let item = 0; item < scan.patterns.length; item++) {
				if (false === scan.patterns[item].hasOwnProperty('collection')
					|| scan.patterns[item].collection !== collection) continue;

				let internal = Matrioska.path(scan.patterns[item]);
				internal.scan = scan.path.concat(internal.scan);
				return internal;
			}

			return null;
		}
		static scan(array, split) {
			if (0 === split.length) return null;
			let name = split.shift();
			for (let item = 0; item < array.length; item++) {
				if (array[item].type !== ':matrioska'
					|| name !== array[item].name
					|| false === array[item].hasOwnProperty('patterns')
					|| false === Array.isArray(array[item].patterns)) continue;

				let final = 0 !== split.length;

				for (let i = 0; i < array[item].patterns.length; i++) {
					let scan = Matrioska.scan(array[item].patterns[i].fields, split);
					if (scan === null) continue;

					let build = Matrioska.path(scan);
					build.path.unshift(name);
					return build;
				}

				if (final) return null;

				let build = Matrioska.path(array[item]);
				build.path.unshift(name);
				return build;
			}

			return null;
		}
		static path(object) {
			if (false === object.hasOwnProperty('path')) object.path = [];
			if (object.multiple !== true) return object;
			let placeholder = String.fromCharCode(91) + String.fromCharCode(36) + object.path.length + String.fromCharCode(93);
			object.path.push(placeholder);
			return object;
		}
	}

	window.Form.Plugin.Matrioska = Matrioska;

})(window);