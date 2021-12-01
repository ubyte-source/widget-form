(function (window) {

    'use strict';

    class Li {

        static attribute() {
            return 'data-form-radio-li-value';
        }
        static check() {
            return 'radio_button_checked';
        }
        static blank() {
            return 'radio_button_unchecked';
        }

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

        getRadio() {
            return this.radio;
        }
        getID() {
            return this.options.id;
        }
        getInput() {
            return this.elements.input;
        }
        getIcon() {
            if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
            this.elements.icon = document.createElement('i');
            this.elements.icon.className = 'material-icons';
            return this.elements.icon;
        }
        setIcon(material) {
            let text = document.createTextNode(material), icon = this.getIcon();
            icon.innerText = '';
            icon.appendChild(text);
            return this;
        }
        getLabel() {
            if (this.elements.hasOwnProperty('label')) return this.elements.label;
            this.elements.label = document.createElement('label');
            this.elements.label.className = 'text';
            return this.elements.label;
        }
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
        out() {
            return this.getLi();
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
        organize() {
            this.getRadio().reset().getInput().value = this.getInput().value;
            this.setIcon(this.constructor.check());
            this.getLi().classList.add('selected');
        }
        reset() {
            this.getInput().checked = false;
            this.setIcon(this.constructor.blank());
            this.getLi().classList.remove('selected');
            return this;
        }
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

        static void() {
            return 'developer\\form\\radio\\empty';
        }

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

        arrange(value) {
            this.setSelected(value);
            return this;
        }
        getInput() {
            return this.elements.input;
        }
        getPreloader() {
            return this.elements.preloader;
        }
        reset() {
            let list = this.getList();
            for (let item in list) list[item].reset();
            return this;
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
            if (!Array.isArray(value)) return value;
            let result = {};
            for (let item in value) for (let x in value[item]) result[x] = Object.assign({}, value[item][x]);
            return result;
        }
        getUL() {
            if (this.elements.hasOwnProperty('ul')) return this.elements.ul;
            this.elements.ul = document.createElement('ul');
            this.elements.ul.className = 'option';
            return this.elements.ul;
        }
        getWrapper() {
            if (this.elements.hasOwnProperty('wrapper')) return this.elements.wrapper;
            let ul = this.getUL();
            this.elements.wrapper = document.createElement('div');
            this.elements.wrapper.className = 'wrapper radio';
            this.elements.wrapper.appendChild(ul);
            return this.elements.wrapper;
        }
        getList() {
            if (!this.elements.hasOwnProperty('list')) this.elements.list = {};
            return this.elements.list;
        }
        getLi(id) {
            let list = this.getList();
            for (let item in list) {
                if (id !== item) continue;
                return list[item];
            }
            return null;
        }
        populateUl(patterns) {
            let list = this.getList(), ul = this.getUL();
            for (let item in patterns) {
                let text = patterns[item].hasOwnProperty('text') ? patterns[item].text : this.constructor.void();
                list[item] = new window.Form.Plugin.Radio.Li(this, item, text);
                ul.appendChild(list[item].out());
            }
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
        setSelected(value) {
            let li = this.getLi(value);
            if (li !== null) li.organize();
            return this;
        }
        out() {
            return this.reset().getWrapper();
        }
    }

    window.Form.Plugin.Radio = Radio;
    window.Form.Plugin.Radio.Li = Li;

})(window);