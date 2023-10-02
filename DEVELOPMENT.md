# Firefox
## Development
1. Change
    ```
    "background": {
       "service_worker": "./dist/background.es.js"
       }
    ```
    to
    ```
    "background": {
       "scripts": ["./dist/background.es.js"]
       },
    ```
    This is because Firefox still [does not have service_worker support](https://bugzilla.mozilla.org/show_bug.cgi?id=1573659).

2. Pack extension files into a .zip and then change the extension to .xpi
3. Load this file as temporary add-on in ```about:debugging#/runtime/this-firefox```.
4. In ```about:addons``` grant the ```Access your data for all websites``` permission.


Debug messages can be viewed in the Browser console which can be opened with Ctrl + Shift + J or Cmd + Shift + J
