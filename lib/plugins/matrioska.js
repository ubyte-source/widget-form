(function (window) {

	'use strict';

	class Matrioska extends Form.Plugin {

		/**
		 * It returns a string that is used as a data attribute on the element.
		 * @returns The handle() method returns a string.
		 */

		static handle() {
			return 'data-handle-event';
		}

		/**
		 * It returns a string.
		 * @returns A string.
		 */

		static clone() {
			return ':clone';
		}

		/**
		 * *The delete() function returns the string ':delete'*
		 * @returns The string ':delete'
		 */

		static delete() {
			return ':delete';
		}

		/**
		 * The constructor creates a new Form object and sets the Form.Container.nospace class on the
		 * container
		 * @param container - The container that the form is in.
		 */
		
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

		/**
		 * * Render the form.
		 * * Get the name of the Smith.
		 * * Get the pattern of the Smith.
		 * * If either of the above is null, return this.
		 * * Evolve the Smith.
		 * * Get the row of the Smith.
		 * * If the row is null, set the button status to false.
		 * * If the multiple is false or the button status is false, return this.
		 * * Add a button to the row.
		 * * Set the button's handle to "add".
		 * * Set the button's click event handler to "clone".
		 * * Add the event listener to the button
		 * @returns The object itself.
		 */
		
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

		/**
		 * Set the button status to true or false
		 * @param enable - A boolean value that determines whether the button is enabled or not.
		 * @returns The `setButtonStatus` method returns the `this` object.
		 */
		
		setButtonStatus(enable) {
			this.button = enable === true;
			return this;
		}

		/**
		 * Get the status of the button
		 * @returns The button status.
		 */
		
		getButtonStatus() {
			return this.button;
		}

		/**
		 * Get the events from the event store
		 * @returns The getEvents() method returns the events property.
		 */
		
		getEvents() {
			return this.events;
		}

		/**
		 * Set the delete event handler for the current element
		 * @param func - A function that will be called when the event is triggered.
		 * @returns The object itself.
		 */
		
		setEventDelete(func) {
			let events = this.getEvents();
			if (typeof func === 'function') events.delete = func;
			return this;
		}

		/**
		 * Get the delete event from the events object
		 * @returns The delete event.
		 */
		
		getEventDelete() {
			let events = this.getEvents();
			if (events.hasOwnProperty('delete')) return events.delete;
			return null;
		}

		/**
		 * It sets the clone function for the events.
		 * @param func - A function that will be called when the event is triggered.
		 * @returns The object itself.
		 */
		
		setEventClone(func) {
			let events = this.getEvents();
			if (typeof func === 'function') events.clone = func;
			return this;
		}

		/**
		 * Get the event clone
		 * @returns The clone event.
		 */
		
		getEventClone() {
			let events = this.getEvents();
			if (events.hasOwnProperty('clone')) return events.clone;
			return null;
		}

		/**
		 * Get the first pattern in the matrix
		 * @returns The first pattern in the matrix.
		 */
		
		getPattern() {
			let patterns = this.getContainer().getMatrixPatterns();
			if (patterns === null
				|| patterns.length === 0) return null;

			return patterns[0];
		}

		/**
		 * Returns true if the pattern has a multiple property and it is set to true
		 * @returns The `getMultiple()` method returns a boolean value.
		 */
		
		getMultiple() {
			let pattern = this.getPattern();
			if (pattern === null
				|| false === pattern.hasOwnProperty('multiple')
				|| pattern.multiple !== true) return false;
			return true;
		}
		/**
		 * Get the increaser value for the matrix
		 * @returns The increaser value.
		 */
		
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

		/**
		 * Get the name of the matrix in the current container
		 * @param specific - The specific number of the matrix.
		 * @returns The name of the matrix.
		 */
		
		getSmith(specific) {
			let name = this.getContainer().getMatrixName();
			if (name === null) return null;

			if (this.getMultiple()) {
				let increaser = Number.isInteger(specific) ? specific : this.getIncreaser();
				name += String.fromCharCode(91) + increaser.toString() + String.fromCharCode(93);
			}

			return name;
		}

		/**
		 * Add a new input field to the form
		 * @param name - The name of the new field.
		 * @returns The return value is a boolean value.
		 */
		
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

		/**
		 * *Close the form.*
		 * @param event - The event object that was passed to the close function.
		 */
		
		close(event) {
			let form = this.getForm();
			if (typeof form.close === 'function') form.close(event);
		}

		/**
		 * Get the form element from the page
		 * @returns The form element.
		 */
		
		getForm() {
			return this.elements.form;
		}

		/**
		 * Get the preloader object from the form manager
		 * @returns The form manager.
		 */
		
		getPreloader() {
			return this.getForm().getManager();
		}

		/**
		 * Get the packages for the form
		 * @returns The getPack() method returns the packages of the form.
		 */
		
		getPack() {
			return this.getForm().getPackages();
		}

		/**
		 * Get all the containers in the form
		 * @param deep - If true, the method will return all containers from the entire form, otherwise it
		 * will only return containers from the current container.
		 * @returns The form object.
		 */
		
		getContainers(deep) {
			return this.getForm().getContainers(deep);
		}

		/**
		 * Returns the form's HTML
		 * @returns The form's out() method is being called.
		 */
		
		out() {
			return this.getForm().out();
		}

		/**
		 * Clone the event and add it to the form
		 * @param event - The event that triggered the clone.
		 * @returns The name of the cloned element.
		 */
		
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

		/**
		 * Remove a row from the form
		 * @param event - The event object that was passed to the function.
		 */
		
		remove(event) {
			let name = Form.closestAttribute(event.target, Form.Row.data()), remove = this.getEventDelete();
			if (typeof remove === 'function') remove.call(this, name, event);
			this.getForm().removeRow(name);
		}

		/**
		 * It takes an array of objects and sets the values of the form elements
		 * @param value - The value to be set.
		 * @returns The object that was passed in.
		 */
		
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

		/**
		 * Reset the counter to zero
		 * @returns The object itself.
		 */
		
		reset() {
			this.increaser = 0;
			this.render();
			return this;
		}

		/**
		 * *This function is used to recursively traverse the fields array and return all fields that have a
		 * patterns array.*
		 * @param matrioska - The matrioska object.
		 * @returns The fields that are being returned are the fields that are being used in the matrioska
		 * pattern.
		 */
		
		static monica(matrioska) {
			let fields = matrioska instanceof Object && Array.isArray(matrioska.fields)
				? matrioska.fields
				: [];

			for (let item = 0; item < fields.length; item++) {
				if (false === fields[item].hasOwnProperty('patterns')) continue;
				for (let x = 0; x < fields[item].patterns.length; x++) fields = fields.concat(window.Form.Plugin.Matrioska.monica(fields[item].patterns[x]));
			}
			return fields;
		}

		/**
		 * Search for a field in a collection of fields
		 * @param matrioska - The matrioska object.
		 * @param path - The path to the field.
		 * @param collection - The name of the collection to search.
		 * @param field - The name of the field to search for.
		 * @returns The field object.
		 */
		
		static search(matrioska, path, collection, field) {
			let find = window.Form.Plugin.Matrioska.find(matrioska, path, collection);
			if (find === null
				|| typeof field !== 'string'
				|| false === find.hasOwnProperty('fields')) return null;

			for (let item = 0; item < find.fields.length; item++) {
				if (find.fields[item].name !== field) continue;
				return find.fields[item];
			}
			return null;
		}

		/**
		 * Find a pattern in a collection of patterns
		 * @param matrioska - The matrioska object.
		 * @param path - The path to the field.
		 * @param collection - The name of the collection to search for.
		 * @returns The scan object.
		 */
		
		static find(matrioska, path, collection) {
			if (typeof matrioska !== 'object' || typeof path !== 'string') return null;

			let split = path.split(/\./s), scan = window.Form.Plugin.Matrioska.scan(matrioska.fields, split);
			if (null === scan) return null;
			if (typeof collection !== 'string'
				|| !scan.hasOwnProperty('patterns')) return scan;

			for (let item = 0; item < scan.patterns.length; item++) {
				if (false === scan.patterns[item].hasOwnProperty('collection')
					|| scan.patterns[item].collection !== collection) continue;

				let internal = window.Form.Plugin.Matrioska.path(scan.patterns[item]);
				internal.scan = scan.path.concat(internal.scan);
				return internal;
			}

			return null;
		}

		/**
		 * Given an array of objects, and a string of names, return the object that matches the names
		 * @param array - The array of fields to scan.
		 * @param split - The split array of the path.
		 * @returns The path to the field.
		 */
		
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
					let scan = window.Form.Plugin.Matrioska.scan(array[item].patterns[i].fields, split);
					if (scan === null) continue;

					let build = window.Form.Plugin.Matrioska.path(scan);
					build.path.unshift(name);
					return build;
				}

				if (final) return null;

				let build = window.Form.Plugin.Matrioska.path(array[item]);
				build.path.unshift(name);
				return build;
			}

			return null;
		}

		/**
		 * * If the object has a `path` property, add a placeholder to the end of the path array
		 * @param object - The object to be processed.
		 * @returns The object with the path property added.
		 */
		
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
