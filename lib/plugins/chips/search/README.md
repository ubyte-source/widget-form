# Documentation widget-form

Widget Javascript Form is a library used to create a form in your web page to insert different type of data, to manage data retrived from APIs call or send data to an API.

## Usage

Here an example of Chips.Search Plugin:

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
- [window.Form.Plugin.Chips.Search](https://github.com/energia-source/widget-form/tree/main/lib/plugins/chips/search#class-windowformpluginchipssearch-usable-methods)
- [window.Form.Plugin.Chips](https://github.com/energia-source/widget-form/tree/main/lib/plugins/chips)

<br>

#### ***Class window.Form.Plugin.Chips.Search usable methods***

##### `static placeholder()`

* Returns the placeholder text for the search results

 * **Returns:** The placeholder is being returned.

##### `constructor(plugin, search)`

The constructor creates the search input chip

 * **Parameters:**
   * `plugin` — The plugin that this search is being added to.
   * `search` 

##### `getPlugin()`

Get the plugin object for the current session

 * **Returns:** The plugin object.

##### `getOptionLimit()`

Get the limit for the current request

 * **Returns:** The limit of the request.

##### `setOptionLimit(limit)`

Set the limit of the number of items to return

 * **Parameters:** `limit` — The number of records to return.
 * **Returns:** The `setOptionLimit` method returns the `this` object, which is the `xhr` object.

##### `getPreloader()`

Get the preloader element

 * **Returns:** The preloader element.

##### `getXHR()`

Returns the XHR object

 * **Returns:** The constructor of the XMLHttpRequest object.

##### `setXHRResponse(container)`

Set the response of the XHR object to the container

 * **Parameters:** `container` — The container to set the response to.
 * **Returns:** The XHR object.

##### `getXHRResponse()`

Get the response from the XHR request

 * **Returns:** The response of the XHR request.

##### `getUrl()`

Get the URL of the current request

 * **Returns:** The URL of the request.

##### `setUrl(url)`

Set the URL of the request

 * **Parameters:** `url` — The URL to send the request to.
 * **Returns:** The object itself.

##### `getUnique()`

Returns the unique option value

 * **Returns:** The unique option.

##### `setUnique(unique)`

Set the unique option to true or false

 * **Parameters:** `unique` — If true, the field will be unique.
 * **Returns:** The object itself.

##### `setLabel(label)`

Set the label of the button

 * **Parameters:** `label` — The label to be displayed on the button.
 * **Returns:** The question object.

##### `getLabel()`

Get the label of the button

 * **Returns:** The label of the question.

##### `setFields(fields)`

Set the fields to be returned in the query results

 * **Parameters:** `fields` — A list of fields to be returned in the result set.
 * **Returns:** The `setFields` method returns the `this` object, which is the `options` object.

##### `getFields()`

Returns the fields that were selected in the query

 * **Returns:** The getFields() method returns the fields property of the options object.

##### `getNotFoundLabel()`

* If the `found` property exists, return it. * Otherwise, create a `found` property and return it.

 * **Returns:** The getNotFoundLabel() method returns the empty list item that is used to display the "no

     results found" message.

##### `getLabelParsed(document)`

Get the label of the current node and replace any # with the value of the corresponding field in the document

 * **Parameters:** `document` — The document to be parsed.
 * **Returns:** The label with the fields replaced by the values.

##### `request()`

The JavaScript function that is called when the user clicks the "Request" button

##### `result()`

The JavaScript function `result()` is called when the `XMLHttpRequest` is done loading.

If the `XMLHttpRequest` is not done loading, or if the status is not 200, then the function returns.

If the `XMLHttpRequest` is done loading, and the status is 200, then the function continues.

The function then checks if the response is not true, or if the response does not have the `response` property.

If either of these conditions are true, then the function returns.

If the response is true, and the response has the `response` property, then the function continues.

The function then iterates over the `response` property of the `json` object.

If the `json` object does not have the `response` property, or if the `json` object does not have the `response` property

 * **Returns:** The response from the server.

##### `getList()`

Create a new list element and add it to the DOM

 * **Returns:** The search list.

##### `refreshList()`

Refresh the list by removing all the child nodes from the list

 * **Returns:** The object itself.

##### `addList(id, value)`

Add a list item to the list

 * **Parameters:**
   * `id` — The id of the chip.
   * `value` — The value of the chip.
 * **Returns:** The object itself.

##### `show()`

Show the list

 * **Returns:** The object itself.

##### `hide()`

Hide the dropdown list

 * **Returns:** The object itself.

##### `arrange(value)`

*Arrange* the *value* parameter into the *Chips* plugin

 * **Parameters:** `value` — The value to be added to the chips.
 * **Returns:** The object itself.

##### `handleEvent(event)`

* For each attribute in the form, check if the attribute is a JavaScript event handler. * If it is, check if the event type matches the event type in the attribute. * If it does, execute the JavaScript function in the attribute

 * **Parameters:** `event` — The event object that was passed to the function.
 * **Returns:** The `Form` class.

##### `close(event)`

*Close the dialog box.*

The function is called when the user clicks the **X** in the upper right corner of the dialog box

 * **Parameters:** `event` — The event that triggered the dialog.
 * **Returns:** The `close` method returns the `this` object.

##### `select(event)`

When the user clicks on a chip, it is added to the plugin

 * **Parameters:** `event` — The event object that was triggered.
 * **Returns:** The object itself.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript
