(function (window) {

    'use strict';

    class Tooltip {

        static handle() {
            return 'data-handle-event';
        }
        static id() {
            return 'form-tooltip-container';
        }
        static attribute() {
            return 'data-tooltip-form';
        }

        constructor() {
            this.elements = {};

            this.options = {};
            this.options.width = 320;

            this.options.ready = setInterval(function (instance) {
                if (document.readyState !== 'complete') return;
                clearInterval(instance.options.ready);
                instance.getTooltip.call(instance);
            }, 100, this);
        }

        setText(text) {
            if (typeof text !== 'string') return this;

            this.getIcon().setAttribute(this.constructor.attribute(), text);
            return this;
        }
        setWidth(width) {
            this.options.width = width;
            return this;
        }
        getWidth() {
            return this.options.width;
        }
        getIcon() {
            if (this.elements.hasOwnProperty('icon')) return this.elements.icon;
            this.elements.icon = document.createElement('i');
            this.elements.icon.className = 'tooltip material-icons';
            this.elements.icon.innerText = 'info';
            this.elements.icon.setAttribute(this.constructor.handle(), 'mouseenter:show mouseleave:hide');
            this.elements.icon.addEventListener('mouseenter', this, true);
            this.elements.icon.addEventListener('mouseleave', this, true);
            return this.elements.icon;
        }
        getTooltip() {
            let query = document.getElementById(this.constructor.id());
            if (query !== null) this.elements.tooltip = query;
            if (this.elements.hasOwnProperty('tooltip')) return this.elements.tooltip;

            this.elements.tooltip = document.createElement('div');
            this.elements.tooltip.setAttribute('id', this.constructor.id());

            document.body.appendChild(this.elements.tooltip);

            return this.elements.tooltip;
        }
        show(ev) {
            if (ev.target instanceof Element === false
                || !ev.target.hasAttribute(this.constructor.attribute())) return;

            let text = ev.target.getAttribute(this.constructor.attribute());
            if (text.length === 0) return;

            let tooltip = this.getTooltip();

            tooltip.removeAttribute('class');
            tooltip.innerText = text;
            tooltip.style.width = this.getWidth().toString() + 'px';

            if (window.innerWidth < tooltip.offsetWidth * 1.5) {
                let width = window.innerWidth / 2;
                tooltip.style.maxWidth = width.toString() + 'px';
            }

            let body_rectangle = document.body.getBoundingClientRect(), element_rectangle = ev.target.getBoundingClientRect(), offset_left = element_rectangle.left - body_rectangle.left;

            let position_left = offset_left + (element_rectangle.width / 2) - (tooltip.offsetWidth / 2);
            if (position_left < 0) {
                position_left = offset_left + element_rectangle.width / 2 - 20;
                tooltip.classList.add('left');
            }

            if (position_left + tooltip.offsetWidth > window.innerWidth) {
                position_left = offset_left - tooltip.offsetWidth + element_rectangle.width / 2 + 20;
                tooltip.classList.add('right');
            }

            let offset_top = element_rectangle.top - body_rectangle.top;
            let position_top = offset_top - tooltip.offsetHeight - 20;
            if (position_top < 0) {
                position_top = offset_top + element_rectangle.height;
                tooltip.classList.add('top');
            }

            tooltip.style.left = position_left + 'px';
            tooltip.style.top = position_top + 'px';
            tooltip.classList.add('show');
        }
        hide() {
            this.getTooltip().classList.remove('show');
        }
        handleEvent(event) {
            let attribute = this.constructor.closestAttribute(event.target, this.constructor.handle());
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
        static closestAttribute(target, attribute, html) {
            if (typeof attribute === 'undefined'
                || !attribute.length) return null;

            let result = null, element = target;

            do {
                let tagname = element.tagName.toLowerCase();
                if (tagname === 'body') return null;

                result = element.getAttribute(attribute);
                if (result !== null) {
                    result = result.toString();
                    if (result.length) break;
                }

                element = element.parentNode;
            } while (element !== null
                || typeof element === 'undefined');

            if (typeof html === 'undefined'
                || html !== true) return result;

            return element;
        }
    }

    window.Form.Tooltip = Tooltip;

})(window);