function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('Autofill Docs');
  menu.addItem('Create New Docs', 'createNewGoogleDocs');
  menu.addToUi();

}

function createNewGoogleDocs() {
  
  const googleDocTemplate = DriveApp.getFileById('(removed ;)');
  const destinationFolder = DriveApp.getFolderById('(removed ;)');
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses 2');
  const rows = sheet.getDataRange().getValues();
  
  rows.forEach(function(row, index){
    const friendlyDate = new Date(row[4]).toLocaleDateString(); //change row , completed, changed from 3
    const friendlyDate2 = new Date(row[27]).toLocaleDateString(); 
    if (index === 0) return;
    if (row[30]) return;
    //change rows to match our template
    const copy = googleDocTemplate.makeCopy(`${row[1]} ${friendlyDate}`, destinationFolder); //bugged name 
    //Exception: The parameters (String,String,DriveApp.Folder) don't match the method signature for DriveApp.File.makeCopy.
    //May be able to fix by making it all with one comma. Ex: (`${row[1]} ${row[4]}`, destinationFolder)

    const doc = DocumentApp.openById(copy.getId());
    const body = doc.getBody();
    
    body.replaceText('{{Applicant Name}}', row[1]); 
    body.replaceText('{{Email}}', row[2]);
    body.replaceText('{{Phone Number}', row[3]);
    body.replaceText('{{Event Date}}', friendlyDate);
    body.replaceText('{{Event Time}}', row[5]);
    body.replaceText('{{Event Type}}', row[6]);
    body.replaceText('{{Rental Fee}}', row[7]);
    body.replaceText('{{Hourly Rent Fee}}', row[8]);
    body.replaceText('{{rentalhours}}', row[9]);
    body.replaceText('{{Guest Estimate}}', row[10]);
    body.replaceText('{{Maximum Guest Estimate}}', row[11]);
    body.replaceText('{{Usage Start}}', row[12]);
    body.replaceText('{{Usage Finish}}', row[13]);
    body.replaceText('{{Rental Fee}}', row[14]);
    body.replaceText('{{DrinkPackage}}', row[15]);
    body.replaceText('{{BartenderFee}}', row[16]);
    body.replaceText('{{AVFee}}', row[17]);
    body.replaceText('{{DOC}}', row[18]);
    body.replaceText('{{flip}}', row[19]);
    body.replaceText('{{Misc}}', row[20]);
    body.replaceText('{{Misc Cost}}', row[21]);
    body.replaceText('{{Subtotal}}', row[22]);
    body.replaceText('{{salestax}}', row[23]);
    body.replaceText('{{CCFEE}}', row[24]);
    body.replaceText('{{total}}', row[25]);
    body.replaceText('{{Deposit}}', row[26]);
    body.replaceText('{{FinalPay}}', friendlyDate2);
    
    
    
    
                     
                   
    //rental hours, usage start, drink package, bartender fee, av fee, doc, flip, misc cost, misc, subtotal, sales tax, cc fee, total, deposit, final payment
    doc.saveAndClose();
    const url = doc.getUrl();
    sheet.getRange(index + 1, 31).setValue(url)
     
    
  })
}
