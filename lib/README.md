# Documentation widget-form

Widget Javascript Form is a library used to create a form in your web page to insert different type of data, to manage data retrived from APIs call or send data to an API.

## Structure

library:
- [window.Form.Plugin](https://github.com/energia-source/widget-form/tree/main/lib/plugins)
- [Common](https://github.com/energia-source/widget-form/tree/main/lib#class-common-usable-methods)
- [window.Form](https://github.com/energia-source/widget-form/tree/main/lib#class-windowform-usable-methods)
- [window.Form.Row](https://github.com/energia-source/widget-form/tree/main/lib#class-windowformrow-usable-methods)
- [window.Form.Plugin](https://github.com/energia-source/widget-form/tree/main/lib#class-windowformplugin-usable-methods)
- [window.Form.Plugin.Text](https://github.com/energia-source/widget-form/tree/main/lib#class-windowformplugintext-usable-methods)
- [window.Form.Container](https://github.com/energia-source/widget-form/tree/main/lib#class-windowformcontainer-usable-methods)
- [window.Form.Container.Events](https://github.com/energia-source/widget-form/tree/main/lib#class-windowformcontainerevents-usable-methods)
- [window.Form.Container.Preloader](https://github.com/energia-source/widget-form/tree/main/lib#class-windowformcontainerpreloader-usable-methods)
- [window.Form.Container.Preloader.Manager](https://github.com/energia-source/widget-form/tree/main/lib#class-windowformcontainerpreloadermanager-usable-methods)
- [window.Form.Container.Notice](https://github.com/energia-source/widget-form/tree/main/lib#class-windowformcontainernotice-usable-methods)
- [window.Form.Container.Danger](https://github.com/energia-source/widget-form/tree/main/lib#class-windowformcontainerdanger-usable-methods)

<br>

#### ***Class Common usable methods***

##### `findContainer(name, deep)`

Find a container by name

 * **Parameters:**
   * `name` — The name of the container to find.
   * `deep` — If true, the search will be recursive.
 * **Returns:** The container with the specified name.

##### `getPlugins(deep)`

Get all the plugins in the current container and all its sub-containers

 * **Parameters:** `deep` — If true, the method will return all plugins in the entire tree. If false, it will

     only return plugins in the current container.
 * **Returns:** An array of plugins.

##### `getPackages(value, deep)`

Get all the packages that are related to the value

 * **Parameters:**
   * `value` — The value to be searched for.
   * `deep` — If true, the function will search for packages in the plugins that are in the

     plugins of the current plugin.
 * **Returns:** The getPackages function returns an array of objects.

##### `getInputs(deep)`

Get all the inputs from all the plugins

 * **Parameters:** `deep` — If true, the getInputs() method will be called on all plugins in the chain.
 * **Returns:** The getInputs function returns an array of objects. Each object contains the name of the

     plugin and the input object.

##### `getInput(name, deep)`

Get the input of a container

 * **Parameters:**
   * `name` — The name of the input.
   * `deep` — The number of levels to search for the container.
 * **Returns:** The input object.

##### `setAutoDispatch(status, deep)`

Set the autoDispatch property of all plugins in the form to the specified value

 * **Parameters:**
   * `status` — Boolean value that determines whether the plugin will dispatch events.
   * `deep` — If true, the method will be called on all plugins in the form. If false, the method

     will only be called on the plugin that called it.

##### `get()`

Get all the packages in the current session

 * **Returns:** An associative array of the package names and their values.

#### ***Class window.Form usable methods***

##### `static handle()`

It returns a string that is used as a data attribute on the element.

 * **Returns:** The handle() method returns a string.

##### `constructor()`

The constructor is called when the object is created. It is used to initialize the object

##### `setDebug(status)`

Set the debug status of the object

 * **Parameters:** `status` — The status of the debug mode.
 * **Returns:** The `setDebug` method returns the `this` object.

##### `getDebug()`

Get the debug setting for the current session

 * **Returns:** The debug property of the class.

##### `getNotice()`

Get the notice element

 * **Returns:** The getNotice() method returns the notice element.

##### `getManager()`

Get the manager for the current session

 * **Returns:** The manager property is being returned.

##### `getDanger()`

Get the danger level of the dragon

 * **Returns:** The getDanger() method returns the danger property of the object.

##### `setAutoDispatchEvents()`

* Set the events that will be dispatched by the arrange function

 * **Returns:** The object itself.

##### `addArrangeEvents()`

Add an event to the list of events to be arranged

 * **Returns:** The instance of the class.

##### `getAutoDispatchEvents()`

Returns the events that are automatically dispatched by the arrange function

 * **Returns:** The `getAutoDispatchEvents()` method returns an array of event names.

##### `setHardcode(key, value)`

Set a hardcoded value for a key

 * **Parameters:**
   * `key` — The name of the parameter.
   * `value` — The value to set.
 * **Returns:** The object itself.

##### `getHardcode()`

Get the hardcode value from the xhr object

 * **Returns:** The hardcode property of the XHR object.

##### `deleteHardcode(key)`

Delete a hardcoded value from the hardcoded object

 * **Parameters:** `key` — The key to delete from the hardcode object.
 * **Returns:** The object itself.

##### `setCallbackSuccess(func)`

Set the success callback for the XHR object

 * **Parameters:** `func` — The function to be called when the request is successful.
 * **Returns:** The XHR object.

##### `getCallbackSuccess()`

Get the callback function for the success event

 * **Returns:** The success callback function.

##### `setCallbackFail(func)`

Set the callback function for the XHR request

 * **Parameters:** `func` — A function that will be called when the request is complete.
 * **Returns:** The XHR object.

##### `getCallbackFail()`

It returns the callback function for the fail event.

 * **Returns:** The callback function that is called when the request is complete.

##### `getXHR()`

Returns the XHR object

 * **Returns:** The constructor of the XMLHttpRequest object.

##### `setRequestUrl(url)`

Set the URL of the request

 * **Parameters:** `url` — The URL to send the request to.
 * **Returns:** Nothing 

##### `getRequestUrl()`

Get the URL of the request

 * **Returns:** The URL of the request.

##### `setCallbackEverywhere(func)`

Set a callback function that will be called on every request

 * **Parameters:** `func` — The function to be called when the request is complete.
 * **Returns:** The XHR object.

##### `getCallbackEverywhere()`

Returns a boolean value indicating whether or not the callback is enabled for all requests

 * **Returns:** The value of the callback.everywhere property.

##### `getFormElement()`

Create a form element if it doesn't exist, and return it

 * **Returns:** The form element.

##### `getRows()`

Get all the rows in the table

 * **Returns:** The getRows() method returns the rows of the table.

##### `getRowsName()`

Get the names of all the rows in the table

 * **Returns:** The names of the rows.

##### `getRow(name, matrix)`

Get a row from the form

 * **Parameters:**
   * `name` — The name of the row. If not specified, the name will be generated from the row's

     index.
   * `matrix` — The matrix that contains the row data.
 * **Returns:** The row object.

##### `findRow(name, deep)`

Find a row in the form by name

 * **Parameters:**
   * `name` — The name of the row to find.
   * `deep` — The number of levels deep to search for the row.
 * **Returns:** The row object.

##### `findRows(regex, deep)`

Find all the rows in the form that match the regular expression

 * **Parameters:**
   * `regex` — A regular expression to match against the row name.
   * `deep` — If true, the function will search all the rows in the form. If false, it will only

     search the rows in the current container.
 * **Returns:** An array of Form.Row objects.

##### `removeRow(name)`

Remove a row from the table

 * **Parameters:** `name` — The name of the row to remove.
 * **Returns:** Nothing 

##### `getContainers(deep)`

Get all the containers in the table

 * **Parameters:** `deep` — If true, the function will return all containers in the table, including those

     nested in other containers.
 * **Returns:** The getContainers method returns an array of all the containers in the table.

##### `set(name, value)`

* Set the value of the specified property for the specified container

 * **Parameters:**
   * `name` — The name of the container.
   * `value` — The value to set the property to.
 * **Returns:** The return value is a boolean.

##### `close(event)`

Close the dialog

 * **Parameters:** `event` — The event object that was passed to the close() method.

##### `reset()`

Reset the form

 * **Returns:** The grid object.

##### `drop(all)`

Drop all the rows in the table

 * **Parameters:** `all` — If true, all rows will be dropped. If false, only the selected rows will be dropped.
 * **Returns:** The object itself.

##### `get()`

Get the hardcoded values and merge them with the values from the parent class

 * **Returns:** The `get()` method returns the `associative` property of the `super.get()` method.

##### `request(everywhere)`

Make a POST request to the given URL with the given data

 * **Parameters:** `everywhere` — A function that will be called when the request is complete.
 * **Returns:** Nothing 

##### `error()`

If the request fails, try again

##### `load()`

Loads the JSON response from the server and calls the callback functions

 * **Returns:** The return value is a boolean. If the return value is true, then the form was

     successfully submitted. If the return value is false, then the form was not successfully

     submitted.

##### `addInput(matrix, nofollow)`

Add a new input to the form

 * **Parameters:**
   * `matrix` — The matrix object that contains the fields and their properties.
   * `nofollow` — If true, the matrix will not follow the input.
 * **Returns:** The plugin.

##### `out()`

Returns the form element

 * **Returns:** The getFormElement() method returns the form element.

##### `handleEvent(event)`

If the event type matches the event type in the attribute, or if the event type is empty, then execute the function

 * **Parameters:** `event` — The event object that was passed to the handler.
 * **Returns:** The return value is the result of the last expression in the function body.

##### `static closestAttribute(target, attribute, html)`

Find the closest attribute to the target element

 * **Parameters:**
   * `target` — The element to search for the attribute.
   * `attribute` — The attribute to search for.
   * `html` — If true, the result will be the HTML of the closest element with the attribute.
 * **Returns:** The closest attribute to the target element.

##### `static removeElementDOM(element)`

Remove an element from the DOM

 * **Parameters:** `element` — The element to remove from the DOM.
 * **Returns:** The return value is a boolean value.

##### `static getIcon(name)`

Create an HTML element with the class name of the icon name passed in

 * **Parameters:** `name` — The name of the icon.
 * **Returns:** The icon element.
 
#### ***Class window.Form.Row usable methods***

##### `static data()`

It returns a string.

 * **Returns:** The data-row-id is being returned.

##### `static type()`

It returns the value of the data-element-type attribute.

 * **Returns:** The `type()` method is being called on the `DataElement` class. The `type()` method

     returns the string `'data-element-type'`.

##### `constructor(form, matrix)`

The constructor function creates a new instance of the class.

 * **Parameters:**
   * `form` — The form that the matrix is attached to.
   * `matrix` — The matrix that the form is based on.

##### `getForm()`

Get the form element that contains the form elements for the current page

 * **Returns:** The form object.

##### `getName()`

Get the name of the person

 * **Returns:** The name of the object.

##### `getActions()`

Get the actions for the current node

 * **Returns:** The getActions() method returns the actions property of the options object.

##### `getContainers(deep)`

Get all the containers in the plugin

 * **Parameters:** `deep` — If true, the function will return all containers from all plugins.
 * **Returns:** The `getContainers` method returns an array of all the containers in the plugin.

##### `addContainer(container)`

Add a container to the row

 * **Parameters:** `container` — The container to add to the row.
 * **Returns:** Nothing 

##### `getButtons()`

Get the buttons element if it exists, otherwise create it

 * **Returns:** The buttons element.

##### `addButton(icon)`

Add a button to the form

 * **Parameters:** `icon` — The icon to use for the button.
 * **Returns:** The new action Button. Null if the Action is not a function.

##### `setButtonsGrid()`

* Set the grid for the buttons

 * **Returns:** The `setButtonsGrid` method returns the `this` object.

##### `getEncapsulate()`

Create a div that encapsulates the grid if not exist.

 * **Returns:** The encapsulate element.

##### `getGrid()`

Create a grid element if it doesn't exist, and return it

 * **Returns:** The grid element.

##### `setGrid(size)`

Set the grid size of the element

 * **Parameters:** `size` — The size of the grid.
 * **Returns:** The grid object.

##### `applyGrid()`

Apply the grid to the containers

 * **Returns:** The object itself.

##### `drop()`

Remove the encapsulate element from the DOM

 * **Returns:** The object itself.

##### `out()`

Returns the grid as a string

 * **Returns:** The grid.

##### `static myName(matrix)`

*If* the matrix has a row property, *and* that row property has a name property, *then* return the name property of the row property.

Otherwise, return the name property of the matrix

 * **Parameters:** `matrix` — The matrix to be named.
 * **Returns:** The name of the matrix.

#### ***Class window.Form.Plugin usable methods***

##### `static metamorph()`

It creates a new function that is a clone of the original function.

##### `constructor(container)`

The constructor function creates a new object and assigns it to the variable `this`. The object contains a property called `container` which is assigned the value of the parameter `container`. The object also contains a property called `elements` which is assigned an empty object. The object also contains a property called `auto` which is assigned the value of the parameter `auto`

 * **Parameters:** `container` — The container element that will be used to contain the elements.

##### `setAutoDispatch(dispatch)`

Set the autoDispatch property to true or false

 * **Parameters:** `dispatch` — A function that will be called when the event is dispatched.
 * **Returns:** The object itself.

##### `getAutoDispatch()`

Returns the value of the autoDispatch property

 * **Returns:** The value of the auto property.

##### `getContainer()`

Get the container element for the current widget

 * **Returns:** The container element.

##### `handleEvent(event)`

* For each attribute in the form, check if the event type matches the attribute. If it does, then check if the attribute has a function to execute. If it does, then execute the function

 * **Parameters:** `event` — The event object that was passed to the function.
 * **Returns:** The `handleEvent` method is being returned.

##### `dispatch()`

Dispatch the event to the input element

 * **Returns:** The object itself.

#### ***Class window.Form.Plugin.Text usable methods***

##### `constructor(container)`

The constructor creates an input element and adds it to the container.

 * **Parameters:** `container` — The container that the input is in.

##### `getPreloader()`

Get the preloader element

 * **Returns:** The preloader element.

##### `getInput()`

Get the input element from the form

 * **Returns:** The input element.

##### `getContent()`

Create a div element with the class name "input" and append an input element to it

 * **Returns:** The content div.

##### `getPack()`

Get the value of the input and return it as a JavaScript object

 * **Returns:** The question is returning a list of values.

##### `out()`

Get the content of the current cell

 * **Returns:** The getContent() method returns the content of the page.

##### `type(type)`

*Get the input type for a given field type.*

The function takes a field type and returns the input type for that field type

 * **Parameters:** `type` — The type of input field.
 * **Returns:** The type of input field to be used.

##### `arrange(value)`

Set the value of the input element

 * **Parameters:** `value` — The value to be set.
 * **Returns:** The `this` object.

##### `reset()`

Reset the input field to an empty string

 * **Returns:** The input element.

##### `input()`

* Get the content of the form. * If the content is an HTML element, remove the danger class from it. * If the form is not in danger, hide the notice.

The function is called when the user clicks the submit button.

##### `focus()`

*Focus* the content of the container

##### `blur()`

Blur the container

#### ***Class window.Form.Container usable methods***

##### `static nospace()`

Returns the string "nospace"

 * **Returns:** The string 'nospace'

##### `static readonly()`

Returns the string 'readonly'

 * **Returns:** The string 'readonly'

##### `static initialize()`

It returns a string.

 * **Returns:** The string 'initialize'

##### `static editable()`

Returns the string 'editable'

 * **Returns:** The string 'editable' is being returned.

##### `static description()`

This function returns a string.

 * **Returns:** The description method is returning the string 'description'.

##### `static tooltip()`

*This function returns a string.*

 * **Returns:** A string.

##### `constructor(form, matrix)`

It creates a new instance of the class.

 * **Parameters:**
   * `form` — The form object that the field is in.
   * `matrix` — The matrix object that contains the field's data.

##### `setRow(row)`

Set the row property of the JavaScript object

 * **Parameters:** `row` — The row number to set.
 * **Returns:** The object itself.

##### `getRow()`

Get the row of the current cell

 * **Returns:** The row number.

##### `getForm()`

Get the form element that contains the form elements for the current page

 * **Returns:** The form object.

##### `getMatrix()`

Returns the matrix of the matrix object

 * **Returns:** The matrix.

##### `getMatrixName(last)`

Get the name of the last matrix in the current document

 * **Parameters:** `last` — If true, returns the last matrix name. Otherwise, returns the first matrix name.
 * **Returns:** The last word in the matrix name.

##### `getMatrixText()`

Get the text of the matrix

 * **Returns:** The text of the matrix.

##### `getMatrixDescription()`

Get the description of the matrix

 * **Returns:** The description of the matrix.

##### `getMatrixType()`

Get the type of the matrix

 * **Returns:** The type of the matrix.

##### `getMatrixRequired()`

Get the required property from the matrix object

 * **Returns:** The `getMatrixRequired()` method returns a boolean value.

##### `getMatrixTooltip()`

Get the tooltip for the current matrix

 * **Returns:** The tooltip for the question.

##### `getMatrixRow()`

Get the row of the matrix

 * **Returns:** The row of the matrix.

##### `setMatrixPatterns(patterns)`

Set the matrix patterns

 * **Parameters:** `patterns` — An array of patterns to be applied to the matrix.
 * **Returns:** Nothing 

##### `getMatrixPatterns()`

Get the patterns from the matrix

 * **Returns:** The patterns property of the matrix object.

##### `getMatrixEditable()`

Returns the value of the `editable` property of the matrix

 * **Returns:** The matrix is a dictionary, so we can access it using the key.

##### `getTooltipError()`

Get the error message from the tooltip object

 * **Returns:** The error message.

##### `getContent()`

* Create a div element with the class `form content` and append the error message to it if it not exist

 * **Returns:** The content element.

##### `getContentError()`

Create a div element with the class name "error" if it doesn't already exist

 * **Returns:** The error element.

##### `getGrid()`

Get the grid element from the elements object if it exists, otherwise create a new grid element and append the content to it

 * **Returns:** The grid element.

##### `getLabel()`

Create a label element and insert it before the first child of the content element if it not exist

 * **Returns:** The label element.

##### `setTooltipLabel(text)`

Set the tooltip label for the button

 * **Parameters:** `text` — The text to display in the tooltip.
 * **Returns:** The question is being returned.

##### `getTooltipLabel()`

Get the tooltip label from the tooltip object

 * **Returns:** The label of the tooltip.

##### `setRequired()`

*Create an icon element and insert it before the label element's first child.*

 * **Returns:** The question object.

##### `getLabelTextElement()`

Get the label text element

 * **Returns:** The label text element.

##### `setLabelText(text)`

Set the text of the label element

 * **Parameters:** `text` — The text to be displayed in the label.
 * **Returns:** The question is not clear. The answer is that the method returns the object itself.

##### `setLabelRequired(status)`

* Set the label to be required

 * **Parameters:** `status` — Boolean
 * **Returns:** The question object.

##### `getDescription()`

* If the description element already exists, return it. * Otherwise, create a new paragraph element and add it to the content element. * Return the paragraph element

 * **Returns:** The description element.

##### `setDescription(text)`

Set the description of the current element

 * **Parameters:** `text` — The text to be displayed in the description.
 * **Returns:** The object itself.

##### `setPlugin(name)`

Set the plugin to use for the form

 * **Parameters:** `name` — The name of the plugin.
 * **Returns:** The form object.

##### `getPlugin()`

Get the plugin element from the DOM

 * **Returns:** The plugin element.

##### `getEditable()`

Create a div element with the class name "editable" and return it

 * **Returns:** The editable div.

##### `setEditable(status)`

Set the editable status of the matrix

 * **Parameters:** `status` — A boolean value that determines whether the matrix is editable or not.
 * **Returns:** The object itself.

##### `removePlugin()`

Remove the plugin from the DOM

 * **Returns:** The object itself.

##### `showDanger(message)`

Show a danger message on the tooltip

 * **Parameters:** `message` — The message to display in the tooltip.
 * **Returns:** The question component.

##### `statusDanger()`

* If the content of the status is danger, return true. * Otherwise, return false

 * **Returns:** The statusDanger method returns a boolean value.

##### `hideDanger()`

Hide the danger class from the content element

 * **Returns:** The `hideDanger` method returns the `this` object.

##### `out()`

Returns the grid as a string

 * **Returns:** The grid.

##### `shouldPlugin(type)`

Returns the name of the plugin that should be used for the specified type

 * **Parameters:** `type` — The type of the field.
 * **Returns:** The name of the plugin that should be used for the field.

##### `handleEvent(event)`

* For each attribute in the form, check if the event type matches the attribute. If it does, then check if the attribute has a function to execute. If it does, then execute the function

 * **Parameters:** `event` — The event object that was passed to the function.
 * **Returns:** The `handleEvent` method is being returned.

##### `click(event)`

*When the user clicks on a label, focus the corresponding input.*

 * **Parameters:** `event` — The event object that was passed to the click handler.
 * **Returns:** The `getForm` method returns the form element.

#### ***Class window.Form.Container.Events usable methods***

##### `static name()`

Returns a string that represents the name of the function

 * **Returns:** The name of the function.

##### `constructor()`

It creates an object that will store all the events that are bound to the object.

##### `getEvents()`

Get the events from the event store

 * **Returns:** The getEvents() method returns the events property.

##### `addEvent(type, event)`

Add an event handler to the object

 * **Parameters:**
   * `type` — The type of event to listen for.
   * `event` — The event to be added.
 * **Returns:** The `this` object.

##### `attach(container)`

Attach the event handlers to the input element

 * **Parameters:** `container` — The container that the plugin is attached to.
 * **Returns:** The object itself.

##### `detach(container)`

Detach the plugin from the container

 * **Parameters:** `container` — The container that the plugin is attached to.
 * **Returns:** The object itself.

#### ***Class window.Form.Container.Preloader usable methods***

##### `constructor(plugin, container)`

The constructor function creates a new instance of the plugin.

The plugin is passed in as the first parameter.

The container is passed in as the second parameter.

The elements object is created.

The events object is created.

The constructor function returns the new instance of the plugin.

 * **Parameters:**
   * `plugin` — The plugin object that created this dialog.
   * `container` — The element that will contain the plugin.

##### `getPlugin()`

Get the plugin object for the current session

 * **Returns:** The plugin object.

##### `getContainer()`

Get the container element for the current instance of the object

 * **Returns:** The container element.

##### `setEventShow(func)`

Set the function to be called when the event is triggered

 * **Parameters:** `func` — A function that will be called when the dialog is opened.
 * **Returns:** The object itself.

##### `getEventShow()`

Get the event that is currently showing

 * **Returns:** The event that was opened.

##### `setEventHide(func)`

Set the function to be called when the user clicks the "X" button in the top right corner of the window

 * **Parameters:** `func` — A function that will be called when the event is triggered.
 * **Returns:** The instance of the class.

##### `getEventHide()`

Returns the event that will hide the modal

 * **Returns:** The closer event.

##### `getPreloader()`

Create a preloader element if it doesn't exist, and return it

 * **Returns:** The preloader element.

##### `getSpinner()`

Create a spinner element if it doesn't exist, and return it

 * **Returns:** The spinner element.

##### `showSpinner()`

Create a spinner and append it to the preloader

 * **Returns:** The object itself.

##### `hideSpinner()`

Hide the spinner

 * **Returns:** The object itself.

##### `show()`

Show the preloader

 * **Returns:** The object itself.

##### `hide()`

Hide the preloader

 * **Returns:** The object itself.

##### `status()`

Returns a boolean indicating whether the preloader is currently visible

 * **Returns:** The status() function returns a boolean value.


#### ***Class window.Form.Container.Preloader.Manager usable methods***

##### `constructor(form)`

It creates a new instance of the JavaScript class.

 * **Parameters:** `form` — The form that the dialog will be attached to.

##### `getForm()`

Get the form object

 * **Returns:** The form object.

##### `get()`

Get all the preloaders that are attached to the form

 * **Returns:** The preloaders are being returned.

##### `show(spinner)`

Show the spinner for all preloaders

 * **Parameters:** `spinner` — A boolean value that determines whether to show or hide the spinner.
 * **Returns:** The object itself.

##### `status()`

Returns true if any of the preloaders are still loading

 * **Returns:** The status function returns a boolean value.

##### `hide()`

Hide all the preloaders

 * **Returns:** The object itself.

#### ***Class window.Form.Container.Notice usable methods***

##### `static default()`

Returns the default CSS class for the alert

 * **Returns:** A string.

##### `static icon()`

*Returns the icon for the info button.*

 * **Returns:** The icon function returns the string 'material-icons info'

##### `constructor(form)`

The constructor function creates an object that has a form property and an elements property.

The form property is set to the form that the constructor was called on.

 * **Parameters:** `form` — The form that the form elements are in.

##### `getForm()`

Get the form object

 * **Returns:** The form object.

##### `getContent()`

Create a div element and add the icon and text to it

 * **Returns:** The content element.

##### `setStyle(css)`

Set the CSS class of the content element

 * **Parameters:** `css` — A string of the CSS class name to apply to the element.
 * **Returns:** The current instance of the class.

##### `getText()`

Create a span element if it doesn't already exist

 * **Returns:** The text element.

##### `setText(text)`

Set the inner text of the element

 * **Parameters:** `text` — The text to be displayed in the button.
 * **Returns:** The object itself.

##### `getMaterial()`

Get the icon for the current form

 * **Returns:** The icon of the question.

##### `setMaterial(icon)`

Create a text node and append it to the material element

 * **Parameters:** `icon` — The icon to be displayed.
 * **Returns:** The object itself.

##### `show()`

Show the form

 * **Returns:** The object itself.

##### `hide()`

Hide the content of the form

 * **Returns:** The object itself.

#### ***Class window.Form.Container.Danger usable methods***

##### `constructor(form)`

The constructor function creates a new instance of the JavaScript class

 * **Parameters:** `form` — The form that the dialog will be attached to.

##### `getForm()`

Get the form object

 * **Returns:** The form object.

##### `setArray(array)`

Set the value of the current node to an array of objects

 * **Parameters:** `array` — The array to be set.
 * **Returns:** The object itself.

##### `setObject(object)`

Set the container for the given object to show a danger message

 * **Parameters:** `object` — The object to be validated.
 * **Returns:** The object itself.

##### `hide()`

Hide all the danger messages in the form

 * **Returns:** The form object.

##### `status()`

Get the status of all the containers in the form

 * **Returns:** The statusDanger() method returns a boolean value. If the method returns true, then the

     form is not valid.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript