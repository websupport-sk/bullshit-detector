import {readFile, writeFile} from "fs/promises";

const manifestPath = './dist/manifest.json';
const manifest = JSON.parse(await readFile(manifestPath, 'utf-8'))

const browser_specific_settings = {
  "gecko": {
    "id": "extensions@websupport.sk"
  }
};

const background = {
  "scripts": ["./dist/background.es.js"]
}

manifest["browser_specific_settings"] = browser_specific_settings;
manifest["background"] = background;

try {
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
} catch (error) {
  console.error("Could not transform manifest.json for Firefox. Reason: ", error)
}



