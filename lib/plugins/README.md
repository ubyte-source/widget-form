# Documentation widget-form

Widget Javascript Form is a library used to create a form in your web page to insert different type of data, to manage data retrived from APIs call or send data to an API.

## Usage

Here an example of Matrioska:

```
  form.addInput({
  "row": [],
  "name": "field_name",
  "unique": [],
  "patterns": [
      {
        "collection": "table",
        "fields": [
            {
              "row": [],
              "name": "language",
              "unique": [],
              "patterns": [
                {
                  "associative": {
                      "it": {
                          "icon": "flag-icon flag-icon-it",
                          "text": "Italiano"
                      },
                      "en": {
                          "icon": "flag-icon flag-icon-gb",
                          "text": "Inglese"
                      },
                      "de": {
                          "icon": "flag-icon flag-icon-de",
                          "text": "Tedesco"
                      },
                      "fr": {
                          "icon": "flag-icon flag-icon-fr",
                          "text": "Francese"
                      },
                      "es": {
                          "icon": "flag-icon flag-icon-es",
                          "text": "Spagnolo"
                      }
                    }
                  }
              ],
              "required": true,
              "protected": false,
              "type": ":enum",
              "text": "Lingua"
            },
            {
              "row": [],
              "name": "label",
              "unique": [],
              "patterns": [
                  null
              ],
              "required": true,
              "protected": false,
              "type": ":string",
              "text": "Testo"
            }
        ],
        "unique": {
            "primary": [
                "id_table"
            ]
        },
        "multiple": true
      }
  ],
  "required": false,
  "protected": false,
  "type": ":matrioska",
  "text": "Name",
  "editable": true
});

```

## Structure

library:
- [window.Form.Plugin.Matrioska](https://github.com/energia-source/widget-form/tree/main/lib/plugins#class-windowformpluginmatrioska-usable-methods)
- [window.Form.Plugin.Chips](https://github.com/energia-source/widget-form/tree/main/lib/plugins/chips)
- [window.Form.Plugin.Dropdown](https://github.com/energia-source/widget-form/tree/main/lib/plugins/dropdown)
- [window.Form.Plugin.File](https://github.com/energia-source/widget-form/tree/main/lib/plugins/file)
- [window.Form.Plugin.Radio](https://github.com/energia-source/widget-form/tree/main/lib/plugins/radio)
- [window.Form.Plugin.Row](https://github.com/energia-source/widget-form/tree/main/lib/plugins/row)
- [window.Form.Plugin.Textarea](https://github.com/energia-source/widget-form/tree/main/lib/plugins/textarea)
- [window.Form.Plugin.Tooltip](https://github.com/energia-source/widget-form/tree/main/lib/plugins/tooltip)

<br>

#### ***Class window.Form.Plugin.Matrioska usable methods***

##### `static handle()`

It returns a string that is used as a data attribute on the element.

 * **Returns:** The handle() method returns a string.

##### `static clone()`

It returns a string.

 * **Returns:** A string.

##### `static delete()`

*The delete() function returns the string ':delete'*

 * **Returns:** The string ':delete'

##### `constructor(container)`

The constructor creates a new Form object and sets the Form.Container.nospace class on the container

 * **Parameters:** `container` — The container that the form is in.

##### `render()`

* Render the form. * Get the name of the Smith. * Get the pattern of the Smith. * If either of the above is null, return this. * Evolve the Smith. * Get the row of the Smith. * If the row is null, set the button status to false. * If the multiple is false or the button status is false, return this. * Add a button to the row. * Set the button's handle to "add". * Set the button's click event handler to "clone". * Add the event listener to the button

 * **Returns:** The object itself.

##### `setButtonStatus(enable)`

Set the button status to true or false

 * **Parameters:** `enable` — A boolean value that determines whether the button is enabled or not.
 * **Returns:** The `setButtonStatus` method returns the `this` object.

##### `getButtonStatus()`

Get the status of the button

 * **Returns:** The button status.

##### `getEvents()`

Get the events from the event store

 * **Returns:** The getEvents() method returns the events property.

##### `setEventDelete(func)`

Set the delete event handler for the current element

 * **Parameters:** `func` — A function that will be called when the event is triggered.
 * **Returns:** The object itself.

##### `getEventDelete()`

Get the delete event from the events object

 * **Returns:** The delete event.

##### `setEventClone(func)`

It sets the clone function for the events.

 * **Parameters:** `func` — A function that will be called when the event is triggered.
 * **Returns:** The object itself.

##### `getEventClone()`

Get the event clone

 * **Returns:** The clone event.

##### `getPattern()`

Get the first pattern in the matrix

 * **Returns:** The first pattern in the matrix.

##### `getMultiple()`

Returns true if the pattern has a multiple property and it is set to true

 * **Returns:** The `getMultiple()` method returns a boolean value.

##### `getIncreaser()`

Get the increaser value for the matrix

 * **Returns:** The increaser value.

##### `getSmith(specific)`

Get the name of the matrix in the current container

 * **Parameters:** `specific` — The specific number of the matrix.
 * **Returns:** The name of the matrix.

##### `evolution(name)`

Add a new input field to the form

 * **Parameters:** `name` — The name of the new field.
 * **Returns:** The return value is a boolean value.

##### `close(event)`

*Close the form.*

 * **Parameters:** `event` — The event object that was passed to the close function.

##### `getForm()`

Get the form element from the page

 * **Returns:** The form element.

##### `getPreloader()`

Get the preloader object from the form manager

 * **Returns:** The form manager.

##### `getPack()`

Get the packages for the form

 * **Returns:** The getPack() method returns the packages of the form.

##### `getContainers(deep)`

Get all the containers in the form

 * **Parameters:** `deep` — If true, the method will return all containers from the entire form, otherwise it

     will only return containers from the current container.
 * **Returns:** The form object.

##### `out()`

Returns the form's HTML

 * **Returns:** The form's out() method is being called.

##### `clone(event)`

Clone the event and add it to the form

 * **Parameters:** `event` — The event that triggered the clone.
 * **Returns:** The name of the cloned element.

##### `remove(event)`

Remove a row from the form

 * **Parameters:** `event` — The event object that was passed to the function.

##### `arrange(value)`

It takes an array of objects and sets the values of the form elements

 * **Parameters:** `value` — The value to be set.
 * **Returns:** The object that was passed in.

##### `reset()`

Reset the counter to zero

 * **Returns:** The object itself.

##### `static monica(matrioska)`

*This function is used to recursively traverse the fields array and return all fields that have a patterns array.*

 * **Parameters:** `matrioska` — The matrioska object.
 * **Returns:** The fields that are being returned are the fields that are being used in the matrioska

     pattern.

##### `static search(matrioska, path, collection, field)`

Search for a field in a collection of fields

 * **Parameters:**
   * `matrioska` — The matrioska object.
   * `path` — The path to the field.
   * `collection` — The name of the collection to search.
   * `field` — The name of the field to search for.
 * **Returns:** The field object.

##### `static find(matrioska, path, collection)`

Find a pattern in a collection of patterns

 * **Parameters:**
   * `matrioska` — The matrioska object.
   * `path` — The path to the field.
   * `collection` — The name of the collection to search for.
 * **Returns:** The scan object.

##### `static scan(array, split)`

Given an array of objects, and a string of names, return the object that matches the names

 * **Parameters:**
   * `array` — The array of fields to scan.
   * `split` — The split array of the path.
 * **Returns:** The path to the field.

##### `static path(object)`

* If the object has a `path` property, add a placeholder to the end of the path array

 * **Parameters:** `object` — The object to be processed.
 * **Returns:** The object with the path property added.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript
