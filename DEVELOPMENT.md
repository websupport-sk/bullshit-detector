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
2. Add 
3. ```  
   "browser_specific_settings": {
    "gecko": {
      "id": "extensions@websupport.sk"
    }
},```
3. Pack extension files into a .zip and then change the extension to .xpi
4. Load this file as temporary add-on in ```about:debugging#/runtime/this-firefox```.
5. In ```about:addons``` grant the ```Access your data for all websites``` permission.

## Publish
- ```web-ext build```
- ```web-ext lint```
- ```web-ext sign --api-key=XXX --api-secret=XXX --channel=listed``` (keys can be retrieved here: https://addons.mozilla.org/en-US/developers/addon/api/key/)

  - The ```--channel=listed``` flag is not fully implemented, manual upload may be necessary using https://addons.mozilla.org/en-US/developers/addon/bullshit-detector/versions/submit/. Don't forget to ensure the version is hosted "On this site" and not "on your own"

Debug messages can be viewed in the Browser console which can be opened with Ctrl + Shift + J or Cmd + Shift + J

# Opera
## Development
1. In ```manifest.json``` change ```short_name``` to ```BullDet```
2. Ensure there is no ```__MACOSX``` directory in the zip file, use i.e. ```zip -r dir.zip . -x '.*' -x '__MACOSX'```
