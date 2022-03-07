# Documentation widget-form

Widget Javascript Form is a library used to create a form in your web page to insert different type of data, to manage data retrived from APIs call or send data to an API.

## Usage

Here an example of Radio Plugin:

```
form.addInput({
    "row": [],
    "name": "benefit_fx",
    "unique": [],
    "patterns": [
        null
    ],
    "required": true,
    "protected": false,
    "type": ":string:textarea",
    "text": "Funzione",
    "editable": true
});

```

## Structure

library:
- [window.Form.Plugin.Textarea](https://github.com/energia-source/widget-form/tree/main/lib/plugins/textarea#class-windowformplugintextarea-usable-methods)

<br>

#### ***Class window.Form.Plugin.Textarea usable methods***

##### `constructor(container)`

The constructor creates a textarea element and adds it to the container.

It also creates a preloader element and adds it to the container.

It also creates a couple of event listeners for the textarea element.

 * **Parameters:** `container` — The container that the textarea is being added to.

##### `getPreloader()`

Get the preloader element

 * **Returns:** The preloader element.

##### `getInput()`

Get the input element from the form

 * **Returns:** The input element.

##### `getPack()`

Get the value of the input and return it as a JavaScript object

 * **Returns:** An array of objects.

##### `getContent()`

Create a div element with the class name "input" and append a text input element to it

 * **Returns:** The content div.

##### `arrange(value)`

Set the value of the input element

 * **Parameters:** `value` — The value to set the input to.
 * **Returns:** The object itself.

##### `reset()`

Reset the input field

 * **Returns:** The `reset` method returns the `this` object.

##### `out()`

Returns the content of the current cell

 * **Returns:** The getContent() method is being called and the return value is being passed to the out()

     method.

##### `input()`

*The input() function is called when the user clicks the input button.*

The function is pretty simple. It removes the danger class from the input container and hides the notice

##### `focus()`

*Focus* the text area

##### `blur()`

Blur the text box

##### `resize(event)`

Resize the textarea to the height of the content

 * **Parameters:** `event` — The event object that contains the target element.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript