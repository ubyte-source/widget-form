(function (window) {

    'use strict';

    class Li {

        /**
         * The attribute() function returns the value of the attribute that is used to identify the
         * radio button
         * @returns The `static attribute()` method returns the value of the `data-form-radio-li-value`
         * attribute.
         */

        static attribute() {
            return 'data-form-radio-li-value';
        }

        /**
         * *This function checks if the radio button is checked and returns the string
         * 'radio_button_checked' if it is.*
         * @returns The string 'radio_button_checked'
         */

        static check() {
            return 'radio_button_checked';
        }

        /**
         * Returns the name of the blank radio button image
         * @returns The `blank` function returns the `radio_button_unchecked` icon.
         */

        static blank() {
            return 'radio_button_unchecked';
        }

        /**
         * Create a new radio button
         * @param radio - The Radio object that this RadioButton belongs to.
         * @param id - The id of the radio button.
         * @param text - The text that will be displayed next to the radio button.
         */

        constructor(radio, id, text) {
            this.radio = radio;
            this.elements = {};

            this.options = {};
            this.options.id = id.toString();

            this.event = {};

            let input = this.getRadio().getInput();

            this.elements.input = document.createElement('input');
            this.elements.input.type = 'radio';
            this.elements.input.name = input.name;
            this.elements.input.className = 'radio';
            this.elements.input.setAttribute('value', id);
            this.elements.input.setAttribute(Form.handle(), ':organize');
            this.elements.input.addEventListener('change', this, false);

            let node = document.createTextNode(text);
            this.getLabel().appendChild(node);
        }

        /**
         * Get the radio button
         * @returns The radio button that was clicked.
         */

        getRadio() {
            return this.radio;
        }

        /**
         * Get the ID of the element
         * @returns The id of the element.
         */

        getID() {
            return this.options.id;
        }

        /**
         * Get the input element from the DOM
         * @returns The input element.
         */

        getInput() {
            return this.elements.input;
        }

        /**
         * Create a new icon element and return it
         * @returns The icon element.
         */

        getIcon() {
            if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
            this.elements.icon = document.createElement('i');
            this.elements.icon.className = 'material-icons';
            return this.elements.icon;
        }

        /**
         * Set the icon of the material
         * @param material - The material to set the icon to.
         * @returns The object itself.
         */

        setIcon(material) {
            let text = document.createTextNode(material), icon = this.getIcon();
            icon.innerText = '';
            icon.appendChild(text);
            return this;
        }

        /**
         * Create a label element if it doesn't already exist
         * @returns The label element.
         */

        getLabel() {
            if (this.elements.hasOwnProperty('label')) return this.elements.label;
            this.elements.label = document.createElement('label');
            this.elements.label.className = 'text';
            return this.elements.label;
        }

        /**
         * Create a list item element and set its attributes
         * @returns The li element.
         */

        getLi() {
            if (this.elements.hasOwnProperty('li')) return this.elements.li;
            let input = this.getInput(), icon = this.getIcon(), label = this.getLabel(), attribute = this.constructor.attribute(), id = this.getID();
            this.elements.li = document.createElement('li');
            this.elements.li.setAttribute(attribute, id);
            this.elements.li.setAttribute(Form.handle(), ':click');
            this.elements.li.addEventListener('click', this, false);
            this.elements.li.appendChild(icon);
            this.elements.li.appendChild(label);
            this.elements.li.appendChild(input);
            return this.elements.li;
        }

        /**
         * Return the list item element
         * @returns The getLi() method is being called and the return value is being passed to the
         * out() method.
         */

        out() {
            return this.getLi();
        }

        /**
         * If the event target has a matching attribute, execute the function
         * @param event - The event object that was passed to the function.
         * @returns The `handleEvent` method is being returned.
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
         * Reset the radio button and the input field, and set the icon to the check mark
         */
        
        organize() {
            this.getRadio().reset().getInput().value = this.getInput().value;
            this.setIcon(this.constructor.check());
            this.getLi().classList.add('selected');
        }

        /**
         * Reset the checkbox to unchecked and remove the selected class from the list item
         * @returns The `this` keyword is being returned.
         */
        
        reset() {
            this.getInput().checked = false;
            this.setIcon(this.constructor.blank());
            this.getLi().classList.remove('selected');
            return this;
        }

        /**
         * *When the user clicks on the radio button, the radio button is checked and the change event
         * is fired.*
         */
        
        click() {
            let event = new Event('change', {
                'cancelable': false,
                'bubbles': true
            });
            this.getInput().dispatchEvent(event);
            this.getRadio().dispatch();
        }
    }

    class Radio extends Form.Plugin {

        /**
         * *This function returns a string.*
         * @returns The name of the form that will be used to render the radio button.
         */
        
        static void() {
            return 'developer\\form\\radio\\empty';
        }

        /**
         * Create a hidden input element with the name of the matrix
         * @param container - The container that the input is being added to.
         */
        
        constructor(container) {
            super(container);

            this.elements.input = document.createElement('input');
            this.elements.input.name = container.getMatrixName();
            this.elements.input.type = 'hidden';

            let matrix = container.getMatrix();
            if (matrix.hasOwnProperty('patterns') && matrix.patterns.hasOwnProperty(0)) {
                let patterns = this.getMatrixPatterns();
                this.populateUl(patterns);
            }

            this.elements.preloader = new Form.Container.Preloader(this, this.getWrapper());
        }


        /**
         * Set the selected value of the control
         * @param value - The value of the option that will be selected.
         * @returns The current instance of the object.
         */
        
        arrange(value) {
            this.setSelected(value);
            return this;
        }

        /**
         * Get the input element from the DOM
         * @returns The input element.
         */
        
        getInput() {
            return this.elements.input;
        }

        /**
         * Get the preloader element
         * @returns The preloader element.
         */
        
        getPreloader() {
            return this.elements.preloader;
        }

        /**
         * Reset all the values in the list to their defaults
         * @returns The object itself.
         */
        
        reset() {
            let list = this.getList();
            for (let item in list) list[item].reset();
            return this;
        }

        /**
         * Get the patterns from the matrix
         * @returns The patterns are being normalized.
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
         * *Normalizes the matrix patterns to a single object.*
         * 
         * The above function is used to normalize the matrix patterns to a single object
         * @param value - The value to be normalized.
         * @returns The result is a dictionary of patterns.
         */
        
        getMatrixPatternsNormalize(value) {
            if (!Array.isArray(value)) return value;
            let result = {};
            for (let item in value) for (let x in value[item]) result[x] = Object.assign({}, value[item][x]);
            return result;
        }

        /**
         * Create a new <ul> element and return it
         * @returns The ul element.
         */
        
        getUL() {
            if (this.elements.hasOwnProperty('ul')) return this.elements.ul;
            this.elements.ul = document.createElement('ul');
            this.elements.ul.className = 'option';
            return this.elements.ul;
        }

        /**
         * Create a div element with a class of "wrapper" and append an unordered list to it
         * @returns The wrapper div.
         */
        
        getWrapper() {
            if (this.elements.hasOwnProperty('wrapper')) return this.elements.wrapper;
            let ul = this.getUL();
            this.elements.wrapper = document.createElement('div');
            this.elements.wrapper.className = 'wrapper radio';
            this.elements.wrapper.appendChild(ul);
            return this.elements.wrapper;
        }

        /**
         * It returns the list object from the elements object.
         * @returns An object with a property called list.
         */
        
        getList() {
            if (!this.elements.hasOwnProperty('list')) this.elements.list = {};
            return this.elements.list;
        }

        /**
         * Get the list item with the specified ID
         * @param id - The id of the list item to be retrieved.
         * @returns The list of items.
         */
        
        getLi(id) {
            let list = this.getList();
            for (let item in list) {
                if (id !== item) continue;
                return list[item];
            }
            return null;
        }

        /**
         * Populates the list of radio buttons with the given patterns
         * @param patterns - an object containing the patterns to be used.
         */
        
        populateUl(patterns) {
            let list = this.getList(), ul = this.getUL();
            for (let item in patterns) {
                let text = patterns[item].hasOwnProperty('text') ? patterns[item].text : this.constructor.void();
                list[item] = new window.Form.Plugin.Radio.Li(this, item, text);
                ul.appendChild(list[item].out());
            }
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
         * Set the selected value
         * @param value - The value of the item to be selected.
         * @returns The `setSelected` method returns the `Organizer` object itself. This is so that we
         * can chain multiple method calls together.
         */
        
        setSelected(value) {
            let li = this.getLi(value);
            if (li !== null) li.organize();
            return this;
        }

        /**
         * Returns a string that is the JavaScript representation of the current object
         * @returns The reset() method returns a new instance of the class.
         */
        
        out() {
            return this.reset().getWrapper();
        }
    }

    window.Form.Plugin.Radio = Radio;
    window.Form.Plugin.Radio.Li = Li;

})(window);