# Documentation widget-form

Widget Javascript Form is a library used to create a form in your web page to insert different type of data, to manage data retrived from APIs call or send data to an API.

## Usage

Here an example of File Plugin:

```
form.addInput({
    "row": [],
    "name": "field_name",
    "unique": [],
    "patterns": [
        {
            "size": 4096,
            "mime": [
                "text/plain"
            ]
        }
    ],
    "required": false,
    "protected": false,
    "type": ":file",
    "text": "Name",
    "editable": true
});

```
## Structure

library:
- [window.Form.Plugin.File](https://github.com/energia-source/widget-form/tree/main/lib/plugins/file#class-windowformpluginfile-usable-methods)

<br>

#### ***Class window.Form.Plugin.File usable methods***

##### `constructor(container)`

Create a new input element and set its name to the matrix name

 * **Parameters:** `container` — The container that the file input is added to.

##### `getPreloader()`

Get the preloader element

 * **Returns:** The preloader element.

##### `getInput()`

Get the input element from the form

 * **Returns:** The input element.

##### `getPack(value)`

Get the file(s) that were uploaded to the input element

 * **Parameters:** `value` — The value of the input.
 * **Returns:** The `getPack()` method returns an array of objects. Each object contains the name of the

     input, the value of the input, and the constructor of the input.

##### `getContent()`

Create a div element with the class "file" and append the insert element to it

 * **Returns:** The content of the file.

##### `getInsert()`

Create a div element with the class name "input" and append a text input element to it

 * **Returns:** The `getInsert()` method returns the `insert` element.

##### `setPattern(pattern)`

Set the pattern of the input element

 * **Parameters:** `pattern` — The pattern to set.
 * **Returns:** The question object.

##### `reset()`

The reset function sets the value of the input field to an empty

 * **Returns:** The object itself.

##### `arrange()`

Arrange the data in the order you want it to be

 * **Returns:** The object itself.

##### `out()`

Returns the content of the current cell as a string

 * **Returns:** The getContent() method returns the content of the page.
 
## Built With

* [Javascript](https://www.javascript.com/) - Javascript
