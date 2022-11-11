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
            "associative": {
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
    "type": ":enum:radio",
    "text": "Nome",
    "editable": true
});

```

## Structure

library:
- [window.Form.Plugin.Radio](https://github.com/energia-source/widget-form/tree/main/lib/plugins/radio#class-windowformpluginradio-usable-methods)
- [window.Form.Plugin.Radio.Li](https://github.com/energia-source/widget-form/tree/main/lib/plugins/radio#class-windowformpluginradioli-usable-methods)

<br>

#### ***Class window.Form.Plugin.Radio usable methods***

##### `static void()`

*This function returns a string.*

 * **Returns:** The name of the form that will be used to render the radio button.

##### `constructor(container)`

Create a hidden input element with the name of the matrix

 * **Parameters:** `container` — The container that the input is being added to.

##### `arrange(value)`

Set the selected value of the control

 * **Parameters:** `value` — The value of the option that will be selected.
 * **Returns:** The current instance of the object.

##### `getInput()`

Get the input element from the DOM

 * **Returns:** The input element.

##### `getPreloader()`

Get the preloader element

 * **Returns:** The preloader element.

##### `reset()`

Reset all the values in the list to their defaults

 * **Returns:** The object itself.

##### `getMatrixPatterns()`

Get the patterns from the matrix

 * **Returns:** The patterns are being normalized.

##### `getMatrixPatternsNormalize(value)`

*Normalizes the matrix patterns to a single object.*

The above function is used to normalize the matrix patterns to a single object

 * **Parameters:** `value` — The value to be normalized.
 * **Returns:** The result is a dictionary of patterns.

##### `getUL()`

Create a new <ul> element and return it

 * **Returns:** The ul element.

##### `getWrapper()`

Create a div element with a class of "wrapper" and append an unordered list to it

 * **Returns:** The wrapper div.

##### `getList()`

The function getList() returns the value of the variable list

 * **Returns:** The list array is being returned.

##### `getLi(id)`

Get the list item with the specified ID

 * **Parameters:** `id` — The id of the list item to be retrieved.
 * **Returns:** The list of items.

##### `populateUl(patterns)`

Populates the list of radio buttons with the given patterns

 * **Parameters:** `patterns` — an object containing the patterns to be used.

##### `getPack()`

Get the value of the input and return it as a JavaScript object

 * **Returns:** An array of objects.

##### `setSelected(value)`

Set the selected value

 * **Parameters:** `value` — The value of the item to be selected.
 * **Returns:** The value of the selected item.

##### `out()`

This function returns the wrapper.

 * **Returns:** The wrapper is being returned.

#### ***Class window.Form.Plugin.Radio.Li usable methods***

##### `constructor(radio, id, text)`

Create a new radio button

 * **Parameters:**
   * `radio` — The Radio object that this RadioButton belongs to.
   * `id` — The id of the radio button.
   * `text` — The text that will be displayed next to the radio button.

##### `getRadio()`

Get the radio button

 * **Returns:** The radio button that was clicked.

##### `getID()`

Get the ID of the element

 * **Returns:** The id of the element.

##### `getInput()`

Get the input element from the DOM

 * **Returns:** The input element.

##### `getIcon()`

Create a new icon element and return it

 * **Returns:** The icon element.

##### `setIcon(material)`

Set the icon of the material

 * **Parameters:** `material` — The material to set the icon to.
 * **Returns:** The object itself.

##### `getLabel()`

Create a label element if it doesn't already exist

 * **Returns:** The label element.

##### `getLi()`

Create a list item element and set its attributes

 * **Returns:** The li element.

##### `out()`

Return the list item element

 * **Returns:** The getLi() method is being called and the return value is being passed to the
     out() method.

##### `handleEvent(event)`

If the event target has a matching attribute, execute the function

 * **Parameters:** `event` — The event object that was passed to the function.
 * **Returns:** The `handleEvent` method is being returned.

##### `select()`

Reset the radio button and the input field, and set the icon to the check mark

##### `uncheck()`

Reset the checkbox to unchecked and remove the selected class from the list item

 * **Returns:** The li instance is being returned

##### `click()`

*When the user clicks on the radio button, the radio button is checked and the change event is fired.*

## Built With

* [Javascript](https://www.javascript.com/) - Javascript
