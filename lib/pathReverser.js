const fs = require('fs');
const fastCSV = require('fast-csv');
const jsonExport = require('jsonexport');

module.exports = (inFile, outFile) => {
    const all = [];
    fastCSV.fromPath(inFile, {headers:true}).transform(data => {
        data.position *= -1;
        data.acceleration *= -1;
        data.velocity *= -1;
        data.jerk *= -1;
        return data;
    }).on('data', (data) => {
        all.push(data);
    }).on('end', () => {
        console.log('Total Time: ' + (all.length * .020));
        const out = fs.createWriteStream(outFile);
        jsonExport(all, (err, csv) => {
            if (err) { console.log(err); }
            out.write(csv);
        })
    });
};
