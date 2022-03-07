# Documentation widget-form

Widget Javascript Form is a library used to create a form in your web page to insert different type of data, to manage data retrived from APIs call or send data to an API.

## Structure

library:
- [window.Form.Plugin.Tooltip](https://github.com/energia-source/widget-form/tree/main/lib/plugins/tooltip#class-windowformplugintooltip-usable-methods)

<br>

#### ***Class window.Form.Plugin.Tooltip usable methods***

## `static handle()`

It returns a string.

 * **Returns:** The string 'data-handle-event'

## `static id()`

*The `id()` function returns the id of the form-tooltip-container div

 * **Returns:** The `id()` method returns the `id` of the `<div>` element.

## `static attribute()`

*The attribute() function returns the value of the attribute that will be used to store the form data.*

 * **Returns:** The `static attribute()` method returns the string `'data-tooltip-form'`.

## `constructor()`

Create a JavaScript object that will contain the tooltip elements

## `setText(text)`

Set the text of the icon

 * **Parameters:** `text` — The text to be displayed in the icon.
 * **Returns:** The object itself.

## `setWidth(width)`

Set the width of the chart

 * **Parameters:** `width` — The width of the chart.
 * **Returns:** The chart object.

## `getWidth()`

Get the width of the chart

 * **Returns:** The width of the chart.

## `getIcon()`

Create an icon element, add it to the tooltip, and return it

 * **Returns:** The icon element.

## `getTooltip()`

Get the tooltip element if it exists, otherwise create it

 * **Returns:** The tooltip element.

## `show(ev)`

Show the tooltip when the user hovers over the element

 * **Parameters:** `ev` — The event object.
 * **Returns:** Nothing

## `hide()`

Hide the tooltip

## `handleEvent(event)`

If the event target has the attribute we're looking for, execute the function

 * **Parameters:** `event` — The event object that was passed to the handler.
 * **Returns:** The `handleEvent` method is being returned.

## `static closestAttribute(target, attribute, html)`

Find the closest attribute to the target element

 * **Parameters:**
   * `target` — The element to search for the attribute.
   * `attribute` — The attribute to search for.
   * `html` — If true, the attribute is searched for in the HTML code of the page.
 * **Returns:** The closest attribute to the target element.

## Built With

* [Javascript](https://www.javascript.com/) - Javascript