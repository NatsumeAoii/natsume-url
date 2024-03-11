function doGet(e) {
  var hash = e.parameter.name;
  return findLongUrl(hash);
}

function findLongUrl(hash) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('database-url');
  var data = sheet.getDataRange().getValues();
  var longUrl = "https://url.canaria.cc/";

  for (var i = 0; i < data.length; i++) {
    if (data[i][1] === hash) {
      longUrl = data[i][2];
      break;
    }
  }

  return ContentService.createTextOutput(longUrl).setMimeType(ContentService.MimeType.JSON);
}