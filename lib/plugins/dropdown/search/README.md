# Documentation widget-form

Widget Javascript Form is a library used to create a form in your web page to insert different type of data, to manage data retrived from APIs call or send data to an API.

## Usage

Here an example of a Dropdown.Search Plugin:

```
form.addInput({
  editable: true
    name: "field_name"
    patterns:{
      associative: []
      search:{
        fields: ['id']
        label: "#id#"
        response: "data"
        unique: "id"
        url: "<URL where you can get the list>"
      }
      protected: false
      required: true
      row: []
      text: "Name"
      type: ":enum"
      unique: []
    }
});

```

## Structure

library:
- [window.Form.Plugin.Dropdown.Search](https://github.com/energia-source/widget-form/tree/main/lib/plugins/dropdown/search#class-windowformplugindropdownsearch-usable-methods)
- [window.Form.Plugin.Dropdown](https://github.com/energia-source/widget-form/tree/main/lib/plugins/dropdown)

<br>

#### ***Class window.Form.Plugin.Dropdown.Search usable methods***

##### `static label()`

*Returns the label for the pattern dropdown search field.*

 * **Returns:** The label for the search pattern.

##### `static before()`

*This function returns a string.*

 * **Returns:** A string.

##### `static events()`

Returns the name of the JavaScript event that is associated with the specified event

 * **Returns:** The string 'events'

##### `constructor(plugin, search)`

The constructor is called when the class is instantiated. It creates the plugin, sets the options, and adds the event listeners

 * **Parameters:**
   * `plugin` — The plugin that this dropdown is a part of.
   * `search` 

##### `getPlugin()`

Get the plugin object for the current session

 * **Returns:** The plugin object.

##### `getXHR()`

Returns the XHR object

 * **Returns:** The constructor of the XMLHttpRequest object.

##### `setXHRResponse(container)`

Set the response of the XHR object to the container

 * **Parameters:** `container` — The container to set the response to.
 * **Returns:** The XHR object.

##### `getXHRResponse()`

Get the response from the XHR object

 * **Returns:** The response of the XHR request.

##### `setXHREvent(event)`

Set the event of the XHR object

 * **Parameters:** `event` — The event that will be triggered when the XHR request is completed.
 * **Returns:** The XHR object.

##### `getXHREvent()`

Get the event that triggered the XHR request

 * **Returns:** The event property of the XMLHttpRequest object.

##### `getUrl()`

Get the URL of the current request

 * **Returns:** The URL of the request.

##### `setUrl(url)`

Sets the URL of the request

 * **Parameters:** `url` — The URL to send the request to.
 * **Returns:** The object itself.

##### `getUnique()`

Returns the unique option value

 * **Returns:** The unique option.

##### `setUnique(unique)`

Set the unique option to true

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

##### `setBeforeRequest(func)`

Set a function to be executed before the request is sent

 * **Parameters:** `func` — A function that will be called before the request is sent.
 * **Returns:** The object itself.

##### `getBeforeRequest()`

Get the before request event handler

 * **Returns:** The beforeRequest event handler.

##### `setOnClickListener(click)`

It sets the click event for the dropdown list item.

 * **Parameters:** `click` — A function that will be called when the user clicks on the dropdown.
 * **Returns:** The object itself.

##### `getOnClickListener()`

Returns the JavaScript function that will be called when the user clicks on a dropdown list item

 * **Returns:** The onClick event handler.

##### `getLabelParsed(document)`

Get the label of the current node and replace any # with the value of the corresponding field in the document

 * **Parameters:** `document` — The document to parse.
 * **Returns:** The label with the parsed fields.

##### `reset()`

Reset the search bar

##### `select()`

* When the user clicks the "Select" button, the function will empty the list of items in the list box

 * **Returns:** Nothing 

##### `request(event)`

The JavaScript function that is called when the user clicks the search button

 * **Parameters:** `event` — The event that triggered the request.

##### `result()`

Populate the dropdown list with the data returned from the AJAX request

 * **Returns:** Nothing 

##### `arrange(value)`

*Arrange* the value in the dropdown list

 * **Parameters:** `value` — The value of the selected option.
 * **Returns:** The object itself.

##### `handleEvent(event)`

* For each attribute in the form, split the attribute into a list of words. * For each word in the list, split the word into a word and a function name. * If the word is the event type or is empty, execute the function

 * **Parameters:** `event` — The event object that was passed to the function.
 * **Returns:** The `Form` class.

##### `open()`

Open the search box

## Built With

* [Javascript](https://www.javascript.com/) - Javascript