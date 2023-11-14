import {readFile, writeFile} from "fs/promises";

const manifestPath = './dist/manifest.json';
const manifest = JSON.parse(await readFile(manifestPath, 'utf-8'))

manifest["short_name"] = "BullDet";


try {
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
} catch (error) {
  console.error("Could not transform manifest.json for Opera. Reason: ", error)
}



