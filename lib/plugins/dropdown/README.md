# Documentation widget-form

Widget Javascript Form is a library used to create a form in your web page to insert different type of data, to manage data retrived from APIs call or send data to an API.

## Usage

Here an example of a Dropdown Plugin:

```
form.addInput({
  editable: true
  name: "field_name"
  patterns: {
    associative:{
      tnc: {text: 'TNC'}
      tns: {text: 'TNS'}
      tt: {text: 'TT'}
    }
  }
  protected: false
  required: true
  row: []
  text: "Name"
  type: ":enum"
  unique: []
});

```

## Structure

library:
- [window.Form.Plugin.Dropdown.Search](https://github.com/energia-source/widget-form/tree/main/lib/plugins/dropdown/search)
- [window.Form.Plugin.Dropdown](https://github.com/energia-source/widget-form/tree/main/lib/plugins/dropdown#class-windowformplugindropdown-usable-methods)
- [window.Form.Plugin.Dropdown.Handler](https://github.com/energia-source/widget-form/tree/main/lib/plugins/dropdown#class-windowformplugindropdownhandler-usable-methods)
- [window.Form.Plugin.Dropdown.Li](https://github.com/energia-source/widget-form/tree/main/lib/plugins/dropdown#class-windowformplugindropdownli-usable-methods)
- [window.Form.Plugin.Dropdown.Li.Icon](https://github.com/energia-source/widget-form/tree/main/lib/plugins/dropdown#class-windowformplugindropdownliicon-usable-methods)

<br>

#### ***Class window.Form.Plugin.Dropdown usable methods***

##### `static empty()`

*This function returns a string that is the SHA256 hash of an empty string.*

 * **Returns:** The string 'a2e4822a98337283e39f7b60acf85ec9'

##### `static emptyText()`

*Returns the empty text for the dropdown.*

 * **Returns:** The emptyText() method returns the string 'developer\form\dropdown\empty'.

##### `static void()`

*Return a string that is a SHA256 hash of the string 'd64bc1eb577b062fa13ed20ddbc130f3'*

 * **Returns:** The string 'd64bc1eb577b062fa13ed20ddbc130f3'

##### `static voidText()`

Returns the path to the void dropdown

 * **Returns:** The string 'developer\form\dropdown\void'

##### `static found()`

* If the search box is empty, return the string 'material-icons search'. * If the search box is not empty, return the string 'material-icons search found'

 * **Returns:** The class name for the icon.

##### `static metamorph()`

It returns the string "enum"

 * **Returns:** The string "enum"

##### `constructor(container)`

Create a new instance of the dropdown plugin

 * **Parameters:** `container` — The container of the dropdown.

##### `getPreloader()`

Get the preloader element

 * **Returns:** The preloader element.

##### `getHandler()`

Get the handler element

 * **Returns:** The handler element.

##### `getPlug()`

Get the plug element from the plug-in

 * **Returns:** The plug element.

##### `getMatrixPatterns()`

Get the patterns from the matrix

 * **Returns:** The normalized patterns.

##### `getMatrixPatternsNormalize(value)`

*Normalize the matrix patterns to a single object.*

The above function is used to normalize the matrix patterns to a single object

 * **Parameters:** `value` — The value to be normalized.
 * **Returns:** The result is a new object that is a combination of all the objects in the array.

##### `setOptionLimit(limit)`

Set the limit for the number of results to return

 * **Parameters:** `limit` — The number of rows to return.
 * **Returns:** The query object.

##### `getOptionLimit()`

Get the limit option from the options object

 * **Returns:** The getOptionLimit() function returns the value of the limit property of the options

     object.

##### `setOptionVoid(key, text)`

* Sets the void option

 * **Parameters:**
   * `key` — The key of the option.
   * `text` — The text to display in the dropdown.
 * **Returns:** The object itself.

##### `getOptionVoid()`

Get the value of the void option

 * **Returns:** The void option.

##### `setOptionEmpty(key, text)`

* Set the empty option

 * **Parameters:**
   * `key` — The key of the option.
   * `text` — The text to display in the dropdown.
 * **Returns:** The object itself.

##### `getOptionEmpty()`

Returns the empty option

 * **Returns:** The empty option.

##### `setValue(value)`

Set the value of the input element

 * **Parameters:** `value` — The value of the option.
 * **Returns:** The object itself.

##### `setSelected(value)`

Set the selected value

 * **Parameters:** `value` — The value to be set.
 * **Returns:** The object itself.

##### `getInput()`

Get the input element from the form

 * **Returns:** The input element.

##### `getPack()`

Get the value of the input and return it as a JavaScript object

 * **Returns:** A array of objects.

##### `getUL()`

Create a new <ul> element and add it to the content of the handler

 * **Returns:** The ul element.

##### `getList()`

Get the list element from the elements object

 * **Returns:** The list object.

##### `emptyList()`

Remove all items from the list

 * **Returns:** The object itself.

##### `getLi(value)`

Get a list item by its ID

 * **Parameters:** `value` — The ID of the item to be retrieved.
 * **Returns:** The getLi() method returns the list item that has the same ID as the value parameter.

##### `getLiFirst()`

Get the first item in the list

 * **Returns:** The first item in the list.

##### `populateUl(patterns)`

Populates the dropdown list with the given patterns

 * **Parameters:** `patterns` — The data to populate the dropdown with.
 * **Returns:** The object itself.

##### `populateUlHaveIcon(patterns)`

* For each pattern in the patterns array, check if the pattern has an icon property. * If the pattern has an icon property, return true. * If the pattern does not have an icon property, continue to the next pattern. * If no pattern has an icon property, return false

 * **Parameters:** `patterns` — The patterns to be added to the list.
 * **Returns:** A boolean value.

##### `out()`

Returns the JavaScript content of the current page

 * **Returns:** The content of the file.

##### `show()`

Show the dropdown list

 * **Returns:** The object itself.

##### `hide()`

Hide the dropdown menu

 * **Returns:** Nothing is being returned.

##### `status()`

Returns a boolean indicating whether the status of the dropdown is active

 * **Returns:** The status() method returns a boolean value.

##### `arrange(value)`

*Arrange* is a function that is called when the user selects a value in the dropdown.

The function is passed the value that the user selected.

The function can be used to set the value of the plug.

If the plug has a *arrange* function, it will be called.

 * **Parameters:** `value` — The value to be set.
 * **Returns:** The object itself.

##### `open(event)`

When the user clicks on the dropdown button, the dropdown menu is shown

 * **Parameters:** `event` — The event object that triggered the open method.
 * **Returns:** The object itself.

##### `close(event)`

When the user clicks outside of the dropdown, the dropdown is hidden

 * **Parameters:** `event` — The event object that was triggered.
 * **Returns:** The `close` method returns `this`.

##### `reset(event)`

Reset the list to the first item

 * **Parameters:** `event` — The event object that was passed to the function.
 * **Returns:** The object itself.

##### `find(event)`

Find the list item that matches the search term and display it

 * **Parameters:** `event` — The event object that was triggered.

##### `select(event)`

When the user clicks on a dropdown list item, set the selected value and call the select function on the plug

 * **Parameters:** `event` — The event object that was passed to the function.
 * **Returns:** `othing` — 
 
#### ***Class window.Form.Plugin.Dropdown.Handler usable methods***

##### `constructor(plugin)`

The constructor function creates an object that has a property called plugin.

The plugin property is set to the plugin object that is passed in as a parameter.

The constructor function also creates an object called elements.

The elements object is used to store the

 * **Parameters:** `plugin` — The plugin object that is calling this constructor.

##### `getPlugin()`

Get the plugin object for the current session

 * **Returns:** The plugin object.

##### `getContent()`

Create the content of the dropdown

 * **Returns:** The content of the dropdown.

##### `setAction(material)`

Set the action of the form to the given material

 * **Parameters:** `material` — The material to be used.
 * **Returns:** The question is asking what is being returned. The answer is that the question is asking

     what is being returned.

##### `getAction()`

Create a div element with the class name "action" and append an icon to it

 * **Returns:** The action element.

##### `cleanAction()`

Remove all child elements from the action element

 * **Returns:** The form object.

##### `setIcon(clonable)`

* Set the icon of the button

 * **Parameters:** `clonable` — The element to clone.
 * **Returns:** The `setIcon` method returns the `this` object.

##### `getIcon()`

Get the icon element from the elements object

 * **Returns:** The icon property of the elements object.

##### `removeIcon()`

Remove the icon from the form

 * **Returns:** The object itself.

##### `setLabel(text)`

Create a text node and append it to the label

 * **Parameters:** `text` — The text to be displayed in the label.
 * **Returns:** The object itself.

##### `getLabel()`

Create a label element if it doesn't exist, and return it

 * **Returns:** The label element.

##### `cleanLabel()`

Remove all child elements from the label element

 * **Returns:** The object itself.

##### `getSearch()`

Create a new input element and set its type to text

 * **Returns:** The search input element.

##### `showSearch()`

Show the search box

 * **Returns:** The object itself.

##### `hideSearch()`

Hide the search bar

 * **Returns:** The object itself.

#### ***Class window.Form.Plugin.Dropdown.Li usable methods***

##### `static attribute()`

The attribute() function returns the value of the attribute that will be used to store the value of the dropdown list item

 * **Returns:** The attribute() method returns the value of the attribute that is being set.

##### `static click()`

It returns the string "click"

 * **Returns:** The string 'click'

##### `static text()`

*Returns the text of the dropdown list item.*

 * **Returns:** The text of the dropdown list item.

##### `constructor(plugin, id, matrix)`

Create a new instance of the Dropdown.Li class

 * **Parameters:**
   * `plugin` — The plugin object that created this dropdown.
   * `id` — The id of the dropdown.
   * `matrix` — The matrix object that was passed to the constructor.

##### `getPlugin()`

Get the plugin object for the current session

 * **Returns:** The plugin object.

##### `getID()`

Get the ID of the element

 * **Returns:** The id of the element.

##### `getMatrix()`

Returns the matrix of the matrix object

 * **Returns:** The matrix.

##### `getIcon()`

Get the icon element

 * **Returns:** The icon element.

##### `setClick(func)`

Set the click event handler for the button

 * **Parameters:** `func` — The function to be called when the button is clicked.
 * **Returns:** The object itself.

##### `getClick()`

Get the click option from the options object

 * **Returns:** The click event handler.

##### `getLabel()`

Create a label element if it doesn't exist, and set its text to the class's text property

 * **Returns:** The label element.

##### `setLabel(text)`

Set the label of the button

 * **Parameters:** `text` — The text to be displayed in the label.
 * **Returns:** The object itself.

##### `getWrapper()`

Create a wrapper element for the label element

 * **Returns:** The wrapper element.

##### `getLi()`

Create a new list item element and set its ID and handle attributes

 * **Returns:** The li element.

##### `out()`

Returns the HTML for a list item

 * **Returns:** The getLi() method is being called and the return value is being passed to the out()

     method.

#### ***Class window.Form.Plugin.Dropdown.Li.Icon usable methods***

##### `static icon()`

*Returns the icon name for the filter list icon

 * **Returns:** The icon function returns the string 'material-icons filter_list'

##### `constructor(li)`

The constructor function creates a new object and assigns it to the variable `this`.

The `this` object is then assigned to the variable `elements` and contains a key-value pair for each element in the list.

The `this` object is then assigned to the variable `li` and contains the list item.

 * **Parameters:** `li` — The list item that contains the button.

##### `getLI()`

Returns the list item element that contains the current node

 * **Returns:** The li element.

##### `get()`

Get the icon for the current element

 * **Returns:** The icon property is being returned.

##### `set(icon)`

Set the icon for the form

 * **Parameters:** `icon` — The icon to use.
 * **Returns:** The question object.

##### `show()`

Inserts the icon before the first child of the list item

 * **Returns:** The question mark icon.

##### `hide()`

Hide the icon

 * **Returns:** The object itself.

##### `status()`

Returns true if the element is still attached to the DOM

 * **Returns:** The status() function returns a boolean value.

##### `out()`

Get the value of the current node and return it as a string

 * **Returns:** The value of the variable.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript