var inquirer = require('inquirer');
var db = require('./conn.js');

db.connection.connect(function(err) {
    if (err) {console.log(err)};
});


function printTable(query) {
  db.connection.query(query, function(error, rows, fields){
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


  })
}

function listItems () {
  printTable('SELECT * FROM tblProducts ORDER BY itemID');
}


function lowInventory (){
  printTable('SELECT * FROM tblProducts WHERE stockQty < 5');
}

function addToInventory() {
  listItems();
  inquirer.prompt([{
    type: 'input',
    message: 'input ID of the item to add: ',
    name: 'item'
  },
  {
    type: 'input',
    message: 'input quantity to add: ',
    name: 'qty'
  }
  ]).then(function(response){
    var currentStockQty = 0;
    
    //retrieve the current qty in stock
     db.connection.query('SELECT stockQty FROM tblProducts WHERE itemID = ' + response.item, function(err, rows){
      if (err) {console.log(err)}
        else {
          currentStockQty = rows[0].stockQty;
          var newStockQty = currentStockQty + parseInt(response.qty);
          // var query = 'UPDATE tblProducts SET stockQty =' + newStockQty + ' WHERE itemID = "' + response.item + '"';

          db.connection.query('UPDATE tblProducts SET ? WHERE ?', [{stockQty: newStockQty}, {itemID: response.item}], function(err, rows){
            if (err) {console.log(err)};
            console.log(rows);
          });
        };


     });
  });
}

function addNewProduct() {
  inquirer.prompt([
  {
    type: 'input',
    message: 'Product name: ',
    name: 'productName'
  }
  ,{
    type: 'input',
    message: 'Price: ',
    name: 'price'
  }
  , {
    type: 'input',
    message: 'Department: ',
    name: 'deptName'
  }
  , {
    type: 'input',
    message: 'Quantity: ',
    name: 'stockQty'
  }
  ]).then(function(response){
    // console.log(response);
    db.connection.query('INSERT INTO tblProducts SET ?', [
        {productName: response.productName
        ,deptName: response.deptName
        ,price: response.price
        ,stockQty: response.stockQty}
      ], function(err, result) {
      if (err) throw err;
      // console.log(result);
    });
  });
}

function begin() {
  inquirer.prompt([{
    type: 'rawlist',
    message: 'Pick one: ',
    choices: ['View Products for sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product'],
    name: "choice"

  }]).then(function(response){
    console.log(response.choice);
    switch (response.choice) {
      case 'View Products for sale':
        listItems();
        break;

      case 'View Low Inventory':
        lowInventory();
        break;

      case 'Add To Inventory':
        addToInventory();
        break;

      case 'Add New Product':
        addNewProduct();
        break;
    }
        
  });
}

begin();