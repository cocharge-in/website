// Bound this script to the waitlist spreadsheet:
// Extensions → Apps Script, paste this file, then Deploy → New deployment → Web app.
// Execute as: Me. Who has access: Anyone.
// Put the Web app URL in WAITLIST_WEBHOOK_URL.

var SHEET_NAME = "Waitlist";
var HEADERS = [
  "createdAt",
  "name",
  "phone",
  "pincode",
  "city",
  "area",
  "role",
  "socket",
  "vehicle",
  "source",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();
    ensureHeaders_(sheet);
    sheet.appendRow(
      HEADERS.map(function (key) {
        return data[key] == null ? "" : String(data[key]);
      }),
    );
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return json_({ ok: true, sheet: SHEET_NAME });
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow(HEADERS);
  sheet.setFrozenRows(1);
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
