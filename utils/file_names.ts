import * as fs from 'fs';
import * as path from 'path';

// Adapted from https://stackoverflow.com/a/25462405/8678845.
function processFileNames(startPath: string, filter: RegExp , callback: Function) {
  const files = fs.readdirSync(startPath);

  for (const file of files) {
    const fileName = path.join(startPath, file);
    const fileStatus = fs.lstatSync(fileName);

    if (fileStatus.isDirectory()) {
      processFileNames(fileName, filter, callback);
    } else if (filter.test(fileName)) {
      callback(fileName);
    }
  }
}

export default function getAllFilenames(startPath: string, filter: RegExp): string[] {
  const fileNames = [];

  processFileNames(startPath, filter, function pushFileName (filename: string) {
    fileNames.push(filename);
  });

  return fileNames;
}
