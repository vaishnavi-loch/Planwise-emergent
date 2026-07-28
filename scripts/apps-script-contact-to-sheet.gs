/**
 * Planwise contact form → Google Sheet
 *
 * Setup:
 * 1. Open (or create) the Google Sheet you want submissions to land in.
 * 2. Extensions > Apps Script, delete any boilerplate, paste this whole file in.
 * 3. Change SHARED_SECRET below to your own random string.
 * 4. Deploy > New deployment > type "Web app" > Execute as "Me" > Who has access "Anyone".
 * 5. Copy the deployment URL (ends in /exec) and the SHARED_SECRET value into the
 *    GOOGLE_SHEETS_WEBHOOK_URL / GOOGLE_SHEETS_SECRET constants at the top of the
 *    submitContact server action in app/actions.ts (hardcoded there, not via env vars).
 *
 * Whenever you edit this script, you must create a new deployment (or "Manage
 * deployments" > edit > new version) for the change to take effect on the live URL.
 */

const SHEET_NAME = 'Contact Submissions';
const SHARED_SECRET = 'REPLACE_WITH_A_RANDOM_STRING';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Location', 'Age Group', 'Topics', 'Message'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
      return jsonResponse_({ ok: false, error: 'unauthorized' });
    }

    const sheet = getSheet_();
    ensureHeaders_(sheet);
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.location || '',
      data.ageGroup || '',
      Array.isArray(data.topics) ? data.topics.join(', ') : (data.topics || ''),
      data.message || ''
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
}

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
