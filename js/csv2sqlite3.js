#!/usr/bin/env node
'use strict';

const parse      = require('csv-parse');
const util       = require('util');
const fs         = require('fs');
const path       = require('path');
const sqlite3    = require('sqlite3').verbose();
const async      = require('async');
const co         = require('co');
const csvHeaders = require('csv-headers');

const dbfn  = process.argv[2];
const tblnm = process.argv[3];
const csvfn = process.argv[4];

new Promise((resolve, reject) => {
    csvHeaders({
        file      : csvfn,
        delimiter : ','
    }, function(err, headers) {
        if (err) reject(err);
        else resolve({ headers });
    });
})
.then(context => {
    return new Promise((resolve, reject) => {
        var db = new sqlite3.Database(dbfn);
        db.on('error', err => { reject(err); });
        db.on('open',  ()  => {
            context.db = db;
            resolve(context);
        });
    })
})
.then(context => {
    return new Promise((resolve, reject) => {
        context.db.run(`DROP TABLE IF EXISTS ${tblnm}`,
        [ ],
        err => {
            if (err) reject(err);
            else resolve(context);
        })
    });
})
.then(context => {
    return new Promise((resolve, reject) => {
        var fields = '';
        var fieldnms = '';
        var qs = '';
        context.headers.forEach(hdr => {
            hdr = hdr.replace(' ', '_');
            if (fields !== '') fields += ',';
            if (fieldnms !== '') fieldnms += ','
            if (qs !== '') qs += ',';
            fields += ` ${hdr} TEXT`;
            fieldnms += ` ${hdr}`;
            qs += ' ?';
        });
        context.qs = qs;
        context.fieldnms = fieldnms;
        // console.log(`about to create CREATE TABLE IF NOT EXISTS ${tblnm} ( ${fields} )`);
        context.db.run(`CREATE TABLE IF NOT EXISTS ${tblnm} ( ${fields} )`,
        [ ],
        err => {
            if (err) reject(err);
            else resolve(context);
        })
    });
})
.then(context => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(csvfn).pipe(parse({
            delimiter: ',',
            columns: true,
            relax_column_count: true
        }, (err, data) => {
            if (err) return reject(err);
            async.eachSeries(data, (datum, next) => {
                // console.log(`about to run INSERT INTO ${tblnm} ( ${context.fieldnms} ) VALUES ( ${context.qs} )`);
                var d = [];
                context.headers.forEach(hdr => {
                    d.push(datum[hdr]);
                });
                // console.log(`${d.length}: ${util.inspect(d)}`);
                context.db.run(`INSERT INTO ${tblnm} ( ${context.fieldnms} ) VALUES ( ${context.qs} )`, d,
                err => {
                    if (err) { console.error(err); next(err); }
                    else setTimeout(() => { next(); });
                });
            },
            err => {
                if (err) reject(err);
                else resolve(context);
            });
        }));
    });
})
.then(context => { context.db.close(); })
.catch(err => { console.error(err.stack); });