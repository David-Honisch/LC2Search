/*
 * This script demonstrates a simple CSV transformation that's
 * formulated to use minimal memory.  The processing is done via
 * piping using the Node.js Streams interface.
 *
 * This transformation is to extract selected columns from the
 * input file, then write to another file using different column names.
 *
 * The `transform` section could make other changes such as adding
 * columns together.
 */
'use strict';

const parse     = require('csv-parse');
const stringify = require('csv-stringify');
const transform = require('stream-transform');
const fs        = require('fs-extra-promise');

const infname   = process.argv[2];
const outfname  = process.argv[3];

const inputFields = [
    // List field names for input file
];

const extractFields = [
    // List field names to extract from input
];

const outputFields = [
    // List field names in the output file
]

fs.createReadStream(infname)
.pipe(parse({
    delimiter: ',',
    // Use columns: true if the input has column headers
    // Otherwise list the input field names in the array above.
    columns: inputFields
}))
.pipe(transform(function(data) {
    // This sample transformation selects out fields
    // that will make it through to the output.  Simply
    // list the field names in the array above.
    return extractFields
    .map(nm => { return data[nm]; });
}))
.pipe(stringify({
    delimiter: ',',
    relax_column_count: true,
    skip_empty_lines: true,
    header: true,
    // This names the resulting columns for the output file.
    columns: outputFields
}))
.pipe(fs.createWriteStream(outfname));
