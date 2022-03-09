var fs = require('fs');
const { parse } = require('csv-parse');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


var id = 1;
const transformData = [];

function addToCSV(id, array) {
  let data = {
    'id': id,
    'current_product_id': id,
    'related_product_ids': array,
  }
  transformData.push(data);
}


function writeArrays(records) {
  var relatedArray = [];

  for (var entry of records) {
    if (entry.current_product_id === id) {
      relatedArray.push(entry.related_product_id);
      records.shift();
    } else {
      addToCSV(id, relatedArray);
      id = id + 1;
      return writeArrays(records); //no recursion, just continue on?
    }
  }
}

const csvWriter = createCsvWriter({
  path: 'newRelated.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'productId', title: 'current_product_id'},
    {id: 'related', title: 'related_product_ids'}
  ]
})

var parser = parse({columns:true}, function (err, records) {
  console.log('starting transform');
  csvWriter.writeRecords(writeArrays(records));
});

fs.createReadStream(__dirname+'/allData/related.csv').pipe(parser);