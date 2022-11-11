# Documentation widget-form

Widget Javascript Form is a library used to create a form in your web page to insert different type of data, to manage data retrived from APIs call or send data to an API.

## Usage

Here an example of Ridio Plugin:

```
form.addInput({
    "row": [],
    "name": "field_name",
    "unique": [],
    "patterns": [
        {
            "options": {
                "base": {
                    "text": "base"
                },
                "extended": {
                    "text": "complex"
                }
            }
        }
    ],
    "required": true,
    "protected": false,
    "type": ":array:checkbox",
    "text": "Nome",
    "editable": true
});

```

## Structure

library:
- [window.Form.Plugin.Checkbox](https://github.com/energia-source/widget-form/tree/main/lib/plugins/checkbox#class-windowformplugincheckbox-usable-methods)
- [window.Form.Plugin.Checkbox.Li](https://github.com/energia-source/widget-form/tree/main/lib/plugins/checkbox#class-windowformplugincheckboxli-usable-methods)

<br>

#### ***Class window.Form.Plugin.Checkbox.Li usable methods***

##### `constructor(checkbox, id, text)`

The constructor function creates a new checkbox option, and adds it to the checkbox group

 * **Parameters:**
   * `checkbox` — The checkbox object that this option belongs to.
   * `id` — The id of the checkbox.
   * `text` — The text that will be displayed next to the checkbox.

##### `getCheckbox()`

This function returns the checkbox

 * **Returns:** The checkbox element.

##### `getID()`

This function returns the id of the current object

 * **Returns:** The id of the object.

##### `getInput()`

It returns the input element

 * **Returns:** The input element.

##### `getIcon()`

If the element has an icon, return it. Otherwise, create a new icon element, set its class name, and return it

 * **Returns:** The icon element.

##### `setIcon(material)`

It takes a string, creates a text node from it, then replaces the text in the icon element with the new text node

 * **Parameters:** `material` — The material icon to use.
 * **Returns:** The object itself.

##### `getLabel()`

If the object has a property called 'label', return that property. Otherwise, create a new label element, set its class to 'text', and return it

 * **Returns:** The label element.

##### `getLi()`

It creates a list item element, sets the attribute to the id of the element, sets the handle to toggle, adds an event listener to the element, appends the icon, label, and input to the list item, and returns the list item

 * **Returns:** The li element.

##### `out()`

> This function returns the value of the `getLi()` function

 * **Returns:** The getLi() method is being returned.

##### `handleEvent(event)`

It takes an event, finds the closest attribute to the event target, splits the attribute into an array, loops through the array, splits each item in the array into an array, checks if the first item in the array is the event type or empty, checks if the second item in the array is a function, and if it is, calls the function

 * **Parameters:** `event` — The event object.
 * **Returns:** The function handleEvent is being returned.

##### `toggle()`

It toggles the checkbox

##### `uncheck()`

If the checkbox is checked, toggle it

 * **Returns:** The checkbox object.

##### `change()`
If the checkbox is checked, add the highlight class to the list item, otherwise remove it


#### ***Class window.Form.Plugin.Checkbox.Li usable methods***

##### `constructor(container)`

It creates a hidden input field, and then checks if the matrix has any patterns. If it does, it populates the ul with the patterns

 * **Parameters:** `container` — The container object that this element is attached to.

##### `arrange(value)`

It takes an array of IDs and toggles the visibility of the corresponding items in the list

 * **Parameters:** `value` — The value to set the checkboxes to.
 * **Returns:** The object itself.

##### `getInput()`

It returns the input element

 * **Returns:** The input element.

##### `getPreloader()`

It returns the preloader element.

 * **Returns:** The preloader element.

##### `reset()`

This function resets the list of items to their default state

 * **Returns:** The object itself.

##### `getMatrixPatterns()`

It returns an array of objects, each object containing the options for a pattern

 * **Returns:** An array of objects.

##### `getMatrixPatternsNormalize(value)`

It takes an array of objects and returns an object of objects

 * **Parameters:** `value` — The value to be normalized.
 * **Returns:** An object with the same keys as the original object, but with the values of the

     original object's values.

##### `getUL()`

If the `elements` object has a property called `ul`, return that property. Otherwise, create a new `ul` element, set its `className` property to `option`, and return it

 * **Returns:** The ul element.

##### `getWrapper()`

It creates a wrapper element, adds the UL element to it, and returns the wrapper element

 * **Returns:** The wrapper element.

##### `getList()`

It returns the list.

 * **Returns:**  The list array is being returned.

##### `getLi(id)`

It returns the list item with the given id

 * **Parameters:** `id` — The id of the list item you want to get.
 * **Returns:** The list item with the id that was passed in.

##### `populateUl(patterns)`

It takes an object of objects, and for each object, it creates a new `Li` object, and appends it to the `ul` element

 * **Parameters:** `patterns` — An object containing the checkbox items.

##### `getPack()`

It returns an array of objects, each of which contains the name, value, and constructor of an input element

 * **Returns:** An array of objects.

##### `out()`

This function returns the wrapper.

 * **Returns:** The wrapper is being returned.