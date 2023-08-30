function testkey() {
  var form = FormApp.openById('1xXLR1PGbL7ecV9Cfc15oiKOuu1YQhUQl0lQRvuzH9nU');
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('res');
  var data = sheet.getDataRange().getValues();
  var urlCol = 6;
  var responses = form.getResponses();
  var timestamps = [], urls = [], resultUrls = [];

  // Populate timestamps and URLs arrays
  for (var i = 0; i < responses.length; i++) {
    timestamps.push(responses[i].getTimestamp().setMilliseconds(0));
    urls.push(responses[i].getEditResponseUrl());
  }

  // Process data and populate resultUrls
  for (var j = 1; j < data.length; j++) {
    var currentTimestamp = data[j][0];
    var resultUrl = '';

    if (currentTimestamp instanceof Date) {
      var index = timestamps.indexOf(currentTimestamp.setMilliseconds(0));
      if (index !== -1) {
        resultUrl = urls[index];
      }
    }

    resultUrls.push([resultUrl]);
  }

  // Update the spreadsheet with resultUrls
  sheet.getRange(2, urlCol, resultUrls.length).setValues(resultUrls);
}
