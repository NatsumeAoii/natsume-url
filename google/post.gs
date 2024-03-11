function doGet(e) {
  var hash = e.parameter.name;
  var targetUrl = e.parameter.url;
  return createShortUrl(hash, targetUrl);
}

function createShortUrl(hash, targetUrl) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('database');
  var data = sheet.getDataRange().getValues();
  var baseUrl = "https://url.canaria.cc/";
  var shortUrl = "";

  if (!hash) {
    hash = generateRandomHash();
  }

  hash = ensureUniqueHash(hash, data);

  if (isValidUrl(targetUrl)) {
    sheet.appendRow([new Date(), hash, targetUrl]);
    shortUrl = baseUrl + hash;
  } else {
    shortUrl = "0";
  }

  return ContentService.createTextOutput(JSON.stringify(shortUrl)).setMimeType(ContentService.MimeType.JSON);
}

function generateRandomHash() {
  var alphabet = "ABCDEFGHIJKMNPQRSTUVWXYZ"; // Uppercase alphabet
  var randomHash = "";
  for (var i = 0; i < 2; i++) {
    randomHash += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  randomHash += Math.floor(Math.random() * 99) + 1;
  return randomHash;
}

function ensureUniqueHash(hash, data) {
  var uniqueHash = hash;
  var isUnique = false;

  while (!isUnique) {
    isUnique = true;
    for (var i = 0; i < data.length; i++) {
      if (data[i][1] === uniqueHash) {
        uniqueHash += Math.floor(Math.random() * 10);
        isUnique = false;
        break;
      }
    }
  }

  return uniqueHash;
}

function isValidUrl(url) {
  return url.indexOf("https://") === 0 || url.indexOf("http://") === 0;
}