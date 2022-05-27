# Documentation widget-form

Widget Javascript Form is a library used to create a form in your web page to insert different type of data, to manage data retrived from APIs call or send data to an API.

## Usage

Here an example of a Chips Plugin:

```
form.addInput({            
    "row": [],
    "name": "field_name",
    "unique": [],
    "patterns": [
        {
            "regex": null,
            "search": {
                "fields": [
                    "id",
                    "name"
                ],
                "response": "data",
                "unique": "id",
                "label": "#name#",
                "url": "/api/configuration/draw/read"
            }
        }
    ],
    "required": true,
    "protected": false,
    "type": ":array:chip",
    "text": "Nome"    
});

```

## Structure

library:
- [window.Form.Plugin.Chips.Search](https://github.com/energia-source/widget-form/tree/main/lib/plugins/chips/search)
- [window.Form.Plugin.Chips](https://github.com/energia-source/widget-form/tree/main/lib/plugins/chips#class-windowformpluginchips-usable-methods)
- [window.Form.Plugin.Chips.Chip](https://github.com/energia-source/widget-form/tree/main/lib/plugins/chips#class-windowformpluginchipschip-usable-methods)

<br>

#### ***Class window.Form.Plugin.Chips usable methods***

##### `static metamorph()`

It returns the string "chip"

 * **Returns:** The string 'chip'

##### `constructor(container)`

It creates the JavaScript object that will be used to create the form.

 * **Parameters:** `container` — The container that the plugin is being added to.
 * **Returns:** Nothing 

##### `getWrite()`

Get the write element

 * **Returns:** The write element.

##### `getPreloader()`

Get the preloader element

 * **Returns:** The preloader element.

##### `getPlug()`

Get the plug element from the plug-in

 * **Returns:** The plug element.

##### `setEventInsert(func)`

Set the function to be called when the insert event is triggered

 * **Parameters:** `func` — A function that will be called when the event occurs.
 * **Returns:** The `setEventInsert` method returns the `this` object.

##### `getEventInsert()`

Get the insert event for the current table

 * **Returns:** The `getEventInsert()` method returns the `insert` property of the `events` object if it

     exists. If it does not exist, it returns `null`.

##### `getRegex()`

Get the regex value from the options object

 * **Returns:** The regex property of the options object.

##### `setRegex(regex)`

Set the regular expression used to match the input

 * **Parameters:** `regex` — The regular expression to use for matching.
 * **Returns:** The `setRegex` method returns the `this` object.

##### `checkRegex(text)`

Check if the text matches the regular expression

 * **Parameters:** `text` — The text to check.
 * **Returns:** The result of calling the checkRegex method.

##### `getProtected()`

Get the protected options from the options object

 * **Returns:** The protected property of the options object.

##### `setProtected(array)`

Set the protected properties of the object

 * **Parameters:** `array` — An array of strings that are the names of the properties that should be protected.
 * **Returns:** The object itself.

##### `addChip(chip)`

Add a chip to the list of chips

 * **Parameters:** `chip` — The chip to add to the list.
 * **Returns:** The object itself.

##### `getChips()`

Create a div element with the class name "chips" and set the attribute "Form.handle()" to "click:focus"

 * **Returns:** The chips element.

##### `getInput()`

Get the input element from the form

 * **Returns:** The input element.

##### `getPack()`

Get a list of all the inputs in the matrix

 * **Returns:** `` — array of objects.

##### `getContent()`

Create a div element with the class `chips-wrapper` and append the following to it:

* The `write` element * The `chips` element * The `input` element

 * **Returns:** The content of the component.

##### `getList()`

Get the list of elements from the elements object

 * **Returns:** The list of elements.

##### `setFromInsert(text, regex)`

* Set the value of the text input to the value of the text parameter

 * **Parameters:**
   * `text` — The text to be added to the chip.
   * `regex` — If true, the text will be checked against a regular expression.
 * **Returns:** The `this` object.

##### `out()`

Get the content of the current cell

 * **Returns:** The getContent() method is being called and the return value is being passed to the out()

     method.

##### `reset()`

Reset the list by clicking the delete button for each item in the list

 * **Returns:** The current instance of the page object.

##### `arrange(value)`

*Arrange* the *value* array into the *this* array

 * **Parameters:** `value` — The value to be inserted.
 * **Returns:** The object itself.

##### `close(event)`

*Close the search box.*

 * **Parameters:** `event` — The event object that was passed to the close() method.

##### `focus(event)`

Focus the write input

 * **Parameters:** `event` — The event object that was passed to the function.
 * **Returns:** Nothing 

##### `keypress(event)`

If the preloader is not active, and the user presses the enter or space key, the insert function is called

 * **Parameters:** `event` — The event object that was passed to the function.

##### `insert(event)`

* If the preloader is active, do nothing. * If there is no input, do nothing. * If there is more than one input, do nothing. * If the input is not a valid package name, do nothing. * Set the package name to the input value. * Set the insert mode to true. * Clear the input. * Stop the event from propagating

 * **Parameters:** `event` — The event object that was triggered.
 * **Returns:** Nothing 

 #### ***Class window.Form.Plugin.Chips usable methods***

##### `static data()`

It returns a string.

 * **Returns:** The string 'data-id'

##### `constructor(plugin, id, value)`

Create a new JavaScript object and set its properties

 * **Parameters:**
   * `plugin` — The plugin object that created this object.
   * `id` — The ID of the element.
   * `value` — The value of the input element.

##### `getPlugin()`

Get the plugin object for the current session

 * **Returns:** The plugin object.

##### `getContent()`

Create a div element with the class name "chip ellipsis" and append the input, text, and remove elements to it

 * **Returns:** The content of the chip.

##### `getInput()`

Get the input element for the matrix

 * **Returns:** The input element.

##### `getText()`

Create a span element if it doesn't already exist

 * **Returns:** The text element.

##### `setText(text)`

* Set the text of the element

 * **Parameters:** `text` — The text to be displayed in the textbox.
 * **Returns:** The element itself.

##### `getDelete()`

Get the delete icon if it exists, otherwise create it

 * **Returns:** The delete icon.

##### `out()`

Get the content of the current cell as a string

 * **Returns:** The getContent() method is being called and the return value is being passed to the out()

     method.

##### `handleEvent(event)`

* For each attribute in the form, split the attribute into a list of words. * For each word in the list, split the word into a word and a function name. * If the word is the event type or is empty, execute the function

 * **Parameters:** `event` — The event object that was passed to the function.
 * **Returns:** The `Form` class.

##### `delete(event)`

*Delete a chip from the list.*

The function is pretty simple. It stops the event from propagating, and checks if the preloader is active. If it is, it returns. Then it gets the list of chips, and the data of the chip that was clicked. It then loops through the list of chips, and checks if the data of the chip is equal to the data of the chip that was clicked. If it is, it removes the chip from the list, and breaks out of the loop

 * **Parameters:** `event` — The event object that was triggered.
 * **Returns:** The `return` statement is used to return a value from a function.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript
