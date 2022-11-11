(function (window) {

    'use strict';

    class Li {

        static attribute() {
            return 'data-form-checkbox-li-value';
        }

        static check() {
            return 'check_box';
        }

        static blank() {
            return 'check_box_outline_blank';
        }

        static highlights() {
            return 'selected';
        }

        /**
         * The constructor function creates a new checkbox option, and adds it to the checkbox group
         * @param checkbox - The checkbox object that this option belongs to.
         * @param id - The id of the checkbox.
         * @param text - The text that will be displayed next to the checkbox.
         */

        constructor(checkbox, id, text) {
            this.checkbox = checkbox;
            this.elements = {};

            this.options = {};
            this.options.id = id.toString();

            let list = checkbox.getList(),
                input = checkbox.getInput(),
                pattern = "$1"
                    + String.fromCharCode(91)
                    + list.length.toString()
                    + String.fromCharCode(93);

            this.elements.input = document.createElement('input');
            this.elements.input.type = 'checkbox';
            this.elements.input.name = input.name.replace(/^(?!\[)(\w+)/, pattern);
            this.elements.input.className = 'checkbox';
            this.elements.input.setAttribute('value', id);
            this.elements.input.setAttribute(Form.handle(), ':change');
            this.elements.input.addEventListener('change', this, false);

            let node = document.createTextNode(text);
            this.getLabel().appendChild(node);
        }


        /**
         * This function returns the checkbox
         * @returns The checkbox element.
         */

        getCheckbox() {
            return this.checkbox;
        }

        /**
         * This function returns the id of the current object
         * @returns The id of the object.
         */

        getID() {
            return this.options.id;
        }

        /**
         * It returns the input element
         * @returns The input element.
         */

        getInput() {
            return this.elements.input;
        }

        /**
         * If the element has an icon, return it. Otherwise, create a new icon element, set its class
         * name, and return it
         * @returns The icon element.
         */

        getIcon() {
            if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
            this.elements.icon = document.createElement('i');
            this.elements.icon.className = 'material-icons';
            return this.elements.icon;
        }

        /**
         * It takes a string, creates a text node from it, then replaces the text in the icon element
         * with the new text node
         * @param material - The material icon to use.
         * @returns The object itself.
         */

        setIcon(material) {
            let text = document.createTextNode(material),
                icon = this.getIcon();

            icon.innerText = '';
            icon.appendChild(text);
            return this;
        }

        /**
         * If the object has a property called 'label', return that property. Otherwise, create a new
         * label element, set its class to 'text', and return it
         * @returns The label element.
         */

        getLabel() {
            if (this.elements.hasOwnProperty('label')) return this.elements.label;
            this.elements.label = document.createElement('label');
            this.elements.label.className = 'text';
            return this.elements.label;
        }

        /**
         * It creates a list item element, sets the attribute to the id of the element, sets the handle
         * to toggle, adds an event listener to the element, appends the icon, label, and input to the
         * list item, and returns the list item
         * @returns The li element.
         */

        getLi() {
            if (this.elements.hasOwnProperty('li')) return this.elements.li;
            let input = this.getInput(),
                icon = this.setIcon(this.constructor.blank()).getIcon(),
                label = this.getLabel(),
                attribute = this.constructor.attribute(),
                id = this.getID();

            this.elements.li = document.createElement('li');
            this.elements.li.setAttribute(attribute, id);
            this.elements.li.setAttribute(Form.handle(), ':toggle');
            this.elements.li.addEventListener('click', this, false);
            this.elements.li.appendChild(icon);
            this.elements.li.appendChild(label);
            this.elements.li.appendChild(input);

            return this.elements.li;
        }

        /**
         * > This function returns the value of the `getLi()` function
         * @returns The getLi() method is being returned.
         */

        out() {
            return this.getLi();
        }

        /**
         * It takes an event, finds the closest attribute to the event target, splits the attribute into
         * an array, loops through the array, splits each item in the array into an array, checks if the
         * first item in the array is the event type or empty, checks if the second item in the array is
         * a function, and if it is, calls the function
         * @param event - The event object.
         * @returns The function handleEvent is being returned.
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
         * It toggles the checkbox
         */

        toggle() {
            let input = this.getInput(),
                event = new Event('change', {
                    'cancelable': false,
                    'bubbles': true
                });

            input.checked = !input.checked;
            input.dispatchEvent(event);
            this.getCheckbox().dispatch();
        }

        /**
         * If the checkbox is checked, toggle it
         * @returns The checkbox object.
         */

        uncheck() {
            let input = this.getInput();
            if (input.checked) this.toggle();
            return this;
        }

        /**
         * If the checkbox is checked, add the highlight class to the list item, otherwise remove it
         */

        change() {
            let input = this.getInput(),
                icon = input.checked === true
                    ? this.constructor.check()
                    : this.constructor.blank();

            input.checked
                ? this.getLi().classList.add(this.constructor.highlights())
                : this.getLi().classList.remove(this.constructor.highlights());

            this.setIcon(icon);
        }
    }

    class Checkbox extends Form.Plugin {

        static void() {
            return 'developer\\form\\checkbox\\empty';
        }

        /**
         * It creates a hidden input field, and then checks if the matrix has any patterns. If it does,
         * it populates the ul with the patterns
         * @param container - The container object that this element is attached to.
         */

        constructor(container) {
            super(container);

            this.list = [];

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
         * It takes an array of IDs and toggles the visibility of the corresponding items in the list
         * @param value - The value to set the checkboxes to.
         * @returns The object itself.
         */

        arrange(value) {
            if (false === (value instanceof Array)) return this;

            let list = this.getList();
            for (let item = 0; item < list.length; item++)
                list[item].toggle(value.indexOf(list[item].getID()) !== -1);

            return this;
        }

        /**
         * It returns the input element
         * @returns The input element.
         */

        getInput() {
            return this.elements.input;
        }

        /**
         * It returns the preloader element.
         * @returns The preloader element.
         */

        getPreloader() {
            return this.elements.preloader;
        }

        /**
         * This function resets the list of items to their default state
         * @returns The object itself.
         */

        reset() {
            let list = this.getList();
            for (let item = 0; item < list.length; item++)
                list[item].toggle(false);

            return this;
        }

        /**
         * It returns an array of objects, each object containing the options for a pattern
         * @returns An array of objects.
         */

        getMatrixPatterns() {
            let matrix = this.getContainer().getMatrix();
            if (matrix === null
                || !matrix.hasOwnProperty('patterns')
                || !Array.isArray(matrix.patterns)) return null;

            let patterns = matrix.patterns.map(function (item) {
                return item.options;
            });
            return this.getMatrixPatternsNormalize(patterns);
        }

        /**
         * It takes an array of objects and returns an object of objects
         * @param value - The value to be normalized.
         * @returns An object with the same keys as the original object, but with the values of the
         * original object's values.
         */

        getMatrixPatternsNormalize(value) {
            if (!Array.isArray(value)) return value;

            let result = {};
            for (let item in value)
                for (let x in value[item])
                    result[x] = Object.assign({}, value[item][x]);

            return result;
        }

        /**
         * If the `elements` object has a property called `ul`, return that property. Otherwise, create
         * a new `ul` element, set its `className` property to `option`, and return it
         * @returns The ul element.
         */

        getUL() {
            if (this.elements.hasOwnProperty('ul')) return this.elements.ul;
            this.elements.ul = document.createElement('ul');
            this.elements.ul.className = 'option';
            return this.elements.ul;
        }

        /**
         * It creates a wrapper element, adds the UL element to it, and returns the wrapper element
         * @returns The wrapper element.
         */

        getWrapper() {
            if (this.elements.hasOwnProperty('wrapper')) return this.elements.wrapper;
            let ul = this.getUL();
            this.elements.wrapper = document.createElement('div');
            this.elements.wrapper.className = 'wrapper checkbox';
            this.elements.wrapper.appendChild(ul);
            return this.elements.wrapper;
        }

        /**
        * It returns the list.
        * @returns The list array is being returned.
        */

        getList() {
            return this.list;
        }

        /**
         * It returns the list item with the given id
         * @param id - The id of the list item you want to get.
         * @returns The list item with the id that was passed in.
         */

        getLi(id) {
            let list = this.getList();
            for (let item = 0; item < list.length; item++) {
                if (id !== list[item].getID()) continue;
                return list[item];
            }
            return null;
        }

        /**
         * It takes an object of objects, and for each object, it creates a new `Li` object, and
         * appends it to the `ul` element
         * @param patterns - An object containing the checkbox items.
         */

        populateUl(patterns) {
            let list = this.getList(),
                ul = this.getUL();
            for (let item in patterns) {
                let text = patterns[item].hasOwnProperty('text')
                    ? patterns[item].text
                    : this.constructor.void(),
                    li = new window.Form.Plugin.Checkbox.Li(this, item, text);

                list.push(li);
                ul.appendChild(li.out());
            }
        }

        /**
         * It returns an array of objects, each of which contains the name, value, and constructor of
         * an input element
         * @returns An array of objects.
         */

        getPack() {
            let list = this.getList(),
                first = this.getInput(),
                collector = [];

            if (false === this.getContainer().getMatrixEditable()) return collector;

            for (let item = 0; item < list.length; item++) {
                let input = list[item].getInput();
                if (input.checked === true) collector.push({
                    name: input.name,
                    value: input.value,
                    constructor: this
                });
            }

            if (collector.length === 0) collector.push({
                name: first.name,
                value: null,
                constructor: this
            });

            return collector;
        }

        /**
         * This function returns the wrapper.
         * @returns The wrapper is being returned.
         */

        out() {
            return this.getWrapper();
        }
    }

    window.Form.Plugin.Checkbox = Checkbox;
    window.Form.Plugin.Checkbox.Li = Li;

})(window);
