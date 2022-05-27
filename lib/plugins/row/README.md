# Documentation widget-form

Widget Javascript Form is a library used to create a form in your web page to insert different type of data, to manage data retrived from APIs call or send data to an API.

## Usage

Here an example of Row Plugin:

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
- [window.Form.Row.Action](https://github.com/energia-source/widget-form/tree/main/lib/plugins/row#class-windowformrowaction-usable-methods)

<br>

#### ***Class window.Form.Row.Action usable methods***

##### `static handle()`

It returns a string.

 * **Returns:** The handle() method returns a string.

##### `constructor(form, icon)`

It creates a new instance of the JavaScript class.

 * **Parameters:**
   * `form` — The form that the button will be added to.
   * `icon` — The icon to use for the button.

##### `getForm()`

Get the form element that contains the form elements for the current page

 * **Returns:** The form object.

##### `getButton()`

Create a button element if it doesn't exist, and return it

 * **Returns:** The button element.

##### `getButtonContent()`

Create a div with the class "form content action" and append the button to it

 * **Returns:** The content of the form.

##### `getButtonGrid()`

Create a grid element and append the button content to it

 * **Returns:** The grid element.

##### `setButtonIcon(icon)`

* Sets the icon of the button

 * **Parameters:** `icon` — The icon to be displayed on the button.
 * **Returns:** The object itself.

##### `out()`

Get the button grid for the current page

 * **Returns:** The getButtonGrid() method is returning the grid of buttons.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript
