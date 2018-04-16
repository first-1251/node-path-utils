const pathReverser = require('./lib/pathReverser');
const fs = require('fs');
const path = require('path');

const IN_DIR = path.resolve(__dirname, 'path_csv_in');
const OUT_DIR = path.resolve(__dirname, 'path_csv_out');
const FILENAME_PATTERN = /(.+)_(left|right)_detailed\.csv/;

const convertFile = function(fileName) {
    // Use Regex to tear the file name apart.
    const nameParts = FILENAME_PATTERN.exec(fileName);

    // If we didn't find the parts we were expecting, then this file doesn't follow the expected
    // naming convention. We can't work with it.
    if (!nameParts) {
        console.log(`Skipping '${fileName}'. It does not follow the expected naming convention ({name}_{left|right}_detailed.csv`);
        return;
    }

    // Build an output file name:
    //   1. Use the same base name
    //   2. Invert the left/right indicator
    //   3. append 'backward' to end of file name to visual distinguish from the original.
    const outName = `${nameParts[1]}_${nameParts[2] === 'left' ? 'right' : 'left' }_detailed_backward.csv`;

    pathReverser(path.resolve(IN_DIR, fileName), path.resolve(OUT_DIR, outName));
};

// Read and process each `.csv` file in the IN_DIR
fs.readdir(IN_DIR, (err, files) => {
   if (err) {
       console.error(err);
   } else {
       // Convert any .csv files which are found.
       files.filter(fileName => fileName.endsWith('.csv')).forEach(fileName => convertFile(fileName));
   }
});
