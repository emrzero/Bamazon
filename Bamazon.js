var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "dev", //Your username
    password: "^312ag420QbG", //Your password
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) {console.log(err)};
    console.log("connected as id " + connection.threadId);
});


connection.query('SELECT * FROM tblProducts ORDER BY itemID', function(error, rows, fields){
  if (error) {console.log(error)};
  var strOutput = "   ";
  for (var i = 0; i < fields.length; i++) {
    strOutput += fields[i].name;
    strOutput += "   |   ";
  }
  console.log(strOutput);

  

  for (var j = 0; j < rows.length; j++) {
    strOutput = "";
    strOutput += rows[j].itemID + " | " + rows[j].productName + "   | " + rows[j].deptName + "   | " + rows[j].price + "   | " + rows[j].stockQty;
    console.log(strOutput);
  }
  

  // rows.forEach(function(el){
  //   console.log(el.productName + " " + el.price);
  // });
});

connection.end();
