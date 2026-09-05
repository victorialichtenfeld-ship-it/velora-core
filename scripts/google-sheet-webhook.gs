/**
 * Google Apps Script web app for Velora validation.
 *
 * 1. Create a Google Sheet with tabs named Leads, Feedback, Events.
 * 2. Extensions → Apps Script, paste this file.
 * 3. Deploy → New deployment → Web app
 *    Execute as: Me
 *    Who has access: Anyone
 * 4. Put the web app URL in GOOGLE_SHEETS_WEBHOOK_URL
 */
function doPost(e) {
  const body = JSON.parse(e.postData.contents || "{}");
  const kind = String(body.kind || "events");
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tabName = kind === "leads" ? "Leads" : kind === "feedback" ? "Feedback" : "Events";
  const sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName);

  const skip = { kind: true };
  const keys = Object.keys(body).filter((key) => !skip[key]);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(keys);
  }
  const header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = header.map(function (key) {
    const value = body[key];
    return value == null ? "" : value;
  });
  keys.forEach(function (key) {
    if (header.indexOf(key) === -1) {
      sheet.getRange(1, header.length + 1).setValue(key);
      header.push(key);
      row.push(body[key]);
    }
  });
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
