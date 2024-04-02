/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('Kennesaw_State_University');

// Insert a few documents into the sales collection.
db.getCollection('KSU_Instructors').insertMany([
  { 'First_name': 'Shaoen', 'Last_name': 'Wu', 'NetID': 'swu10','Employee_status': 'Permanent', },
  { 'First_name': 'Ying', 'Last_name': 'Xie', 'NetID': 'yxie2','Employee_status': 'Permanent', },
  { 'First_name': 'Shirley', 'Last_name': 'Tian', 'NetID': 'xtian2','Employee_status': 'Permanent', },
  { 'First_name': 'Maria', 'Last_name': 'Valero de Clemente', 'NetID': 'mvalero2','Employee_status': 'Permanent', },
  { 'First_name': 'Donald', 'Last_name': 'Privitera', 'NetID': 'dprivit2', 'Employee_status': 'Permanent'},
  { 'First_name': 'Judith', 'Last_name': 'Brodell', 'NetID': 'jbrodell', 'Employee_status': 'Permanent'},
  { 'First_name': 'Taeyeong', 'Last_name': 'Choi', 'NetID': 'tchoi3', 'Employee_status': 'Permanent'},
  { 'First_name': 'William', 'Last_name': 'Forsyth', 'NetID': 'wforsyt2', 'Employee_status': 'Permanent'},
  { 'First_name': 'William', 'Last_name': 'Haggerty', 'NetID': 'whagger1', 'Employee_status': 'Permanent'},
  { 'First_name': 'Jamie', 'Last_name': 'Jamison', 'NetID': 'jjamiso9', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Linh', 'Last_name': 'Le', 'NetID': 'lle13','Employee_status': 'Permanent'}, 
  { 'First_name': 'Lei', 'Last_name': 'Li', 'NetID': 'lli13','Employee_status': 'Permanent'}, 
  { 'First_name': 'Zhigang', 'Last_name': 'Li', 'NetID': 'zli8', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Darin', 'Last_name': 'Morrow', 'NetID': 'dmorro21', 'Employee_status': 'Permanent'},
  { 'First_name': 'Svetlana', 'Last_name': 'Peltsverger', 'NetID': 'speltsve', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Seyedamin', 'Last_name': 'Pouriyeh', 'NetID': 'spouriye', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Nazmus', 'Last_name': 'Sakib', 'NetID': 'nsakib1', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Sudhashree', 'Last_name': 'Sayenju', 'NetID': 'ssayenju', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Chloe', 'Last_name': 'Xie', 'NetID': 'yxie11', 'Employee_status': 'Permanent'},
  { 'First_name': 'Honghui', 'Last_name': 'Xu', 'NetID': 'hxu10', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Ming', 'Last_name': 'Yang', 'NetID': 'myang8', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Chi', 'Last_name': 'Zhang', 'NetID': 'czhang4', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Liang', 'Last_name': 'Zhao', 'NetID': 'lzhao10', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Junxuan', 'Last_name': 'Zhao', 'NetID': 'jzhao5', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Jack', 'Last_name': 'Zheng', 'NetID': 'gzheng', 'Employee_status': 'Permanent'}, 
  { 'First_name': 'Jian', 'Last_name': 'Zhang', 'NetID': 'jzhang51', 'Employee_status': 'Permanent'},
  { 'First_name': 'Lynda', 'Last_name': 'Brown', 'NetID': 'lbrown72', 'Employee_status': 'Part Time'},
  { 'First_name': 'Bob', 'Last_name': 'Brown', 'NetID': 'rbrow211', 'Employee_status': 'Part Time'},
  { 'First_name': 'Juston', 'Last_name': 'Bryant', 'NetID': 'jbrya153', 'Employee_status': 'Part Time'},
  { 'First_name': 'Kyla', 'Last_name': 'Craven', 'NetID': 'kcraven9', 'Employee_status': 'Part Time'},
  { 'First_name': 'Patrick', 'Last_name': 'Dicks', 'NetID': 'pdicks', 'Employee_status': 'Part Time'},
  { 'First_name': 'Yu', 'Last_name': 'Feng', 'NetID': 'yfeng2', 'Employee_status': 'Part Time'},
  { 'First_name': 'Gennadiy', 'Last_name': 'Kemelmakher', 'NetID': 'gkemelma', 'Employee_status': 'Part Time'},
  { 'First_name': 'Alexandru', 'Last_name': 'Malos', 'NetID': 'amalos', 'Employee_status': 'Part Time'},
  { 'First_name': 'Francis', 'Last_name': 'Miawama', 'NetID': 'fmiawama', 'Employee_status': 'Part Time'},
  { 'First_name': 'Sailaja', 'Last_name': 'Pydimarri', 'NetID': 'spydimar', 'Employee_status': 'Part Time'},
  { 'First_name': 'Hao', 'Last_name': 'Qiu', 'NetID': 'hqiu4', 'Employee_status': 'Part Time'},
  { 'First_name': 'Soheyla', 'Last_name': 'Shahab', 'NetID': 'sshahab', 'Employee_status': 'Part Time'},
  { 'First_name': 'Vadim', 'Last_name': 'Stanovski', 'NetID': 'vstanovs', 'Employee_status': 'Part Time'},
  { 'First_name': 'Chad', 'Last_name': 'Teat', 'NetID': 'cteat', 'Employee_status': 'Part Time'},
  { 'First_name': 'Denise', 'Last_name': 'Tucker', 'NetID': 'dtucke36', 'Employee_status': 'Part Time'},
  { 'First_name': 'Susan', 'Last_name': 'Vande Ven', 'NetID': 'svandev', 'Employee_status': 'Part Time'},
  { 'First_name': 'Geetika', 'Last_name': 'Vyas', 'NetID': 'gvyas', 'Employee_status': 'Part Time'},
  { 'First_name': 'Richard', 'Last_name': 'Windland', 'NetID': 'rwindlan', 'Employee_status': 'Part Time'}

]);