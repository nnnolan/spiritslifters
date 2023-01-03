//create deposit dates and final payment dates 
function simpleSheetsToCalendar() {
var spreadsheet = SpreadsheetApp.getActiveSheet();
  var eventCal = CalendarApp.getCalendarById("q90tccvedk5uv0bj8ipltk8158@group.calendar.google.com");
  var lastRow = spreadsheet.getLastRow();
  var calendarClientName = spreadsheet.getRange(lastRow, 2).getValue();
  Logger.log(calendarClientName);
  // dont know how to give it a namevar lastRowName = spreadsheet.getRange(lastRow, 1).getValue();  UPDATE 10/13 im so smart guys


  var depositDate = spreadsheet.getRange(lastRow, 28).getValue(); //deposit date of final row
  var finalPaymentDate = spreadsheet.getRange(lastRow, 30).getValue(); //payment date of final row



  Logger.log(depositDate);
  Logger.log(finalPaymentDate);
  eventCal.createAllDayEvent(`${calendarClientName} Deposit Date`, depositDate);
  eventCal.createAllDayEvent(`${calendarClientName} Final Payment Date`, finalPaymentDate)

}
