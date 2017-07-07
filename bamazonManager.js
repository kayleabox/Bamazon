var inquirer     = require("inquirer");
var mysql        = require("mysql");
var manager      = require("./users.js");
                   require("console.table");



//information to create database connection
var connection = mysql.createConnection({
    host    : "localhost",
    port    : "3306"     ,

    user    : "root"     ,
    password: "cabbage"  , 
    database: "bamazon_db"
});


//query the database
connection.connect(function(err){
    var currentUser;
    if(err) throw err;
    console.log("connected as id " + connection.threadId);

    connection.query("USE bamazon_db", 
    function(err, response){
        if(err) throw err;
    });
        
    signIn();
});

function signIn(){
    inquirer.prompt([{
        type:"input",
        name:"userName",
        message:"enter your user name: "
    },
    {
        type:"password",
        name:"password",
        message:"enter your password",
    }]).then(function(answer, err){
        if(err) throw err;
        checkCredentials(answer.userName, answer.password);
    });
}

function checkCredentials(userName, pword){
    connection.query("SELECT * FROM managers WHERE user_name = ? AND password = ?", [userName, pword], 
    function(err, response){
        if(err)  throw err;
        if(response[0] != undefined){
            currentUser = userName;
            viewProducts();
        }
        else{
            console.log("no matches found in the database. you must be a manager.");
            signIn();
        }
    })
}

function showOptions(){
    inquirer.prompt([{
        type:"confirm",
        name:"change",
        message:"do you need to edit inventory?"
    }]).then(function(answer, err){
        if(err) throw err;
        if(answer.change){
            inquirer.prompt([{
                type:"list",
                name:"action",
                message:"what would you like to do?",
                choices:["view products", "view low inventory", "add inventory", "add products"]
            }]).then(function(answer, err){
                if(err) throw err;
                switch(answer.action){
                    case "view products":
                        viewProducts();
                    break;
                    case "view low inventory":
                        viewLowInventory();
                    break;
                    case "add inventory":
                        inquirer.prompt([{
                            type: "input",
                            name:"id",
                            message:"what is the id of the product you wish to add?"
                        },
                        {
                            type:"input",
                            name:"amount",
                            message: "how many would you like to add?"
                        }]).then(function(answer, err){
                            addInventory(answer.id, answer.amount);
                        })
                    break;
                    case "add products":
                        inquirer.prompt([{
                            type:"input",
                            name:"name",
                            message:"what product would you like to add"
                        },
                        {
                            type:"input",
                            name:"dep",
                            message:"what department is the product in?"
                        },
                        {
                            type:"input",
                            name:"price", 
                            message:"what is the price of the product?"
                        },
                        {
                            type:"input",
                            name:"amount",
                            message:"how many do you need to add?"
                        }]).then(function(ans, err){
                            addProduct(ans.name, ans.dep, ans.price, ans.amount);
                        })     
                    break;
                }
            })
        }
        else{console.log("goodbye!")}
    })
}

// View Products for Sale
function viewProducts(){
    connection.query("SELECT * FROM products", function(err, response){
        if(err) throw err;
        printTable(response);
   })
}

// View Low Inventory
function viewLowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 50", function(err, response){
        printTable(response);
    })
}

// Add to Inventory
function addInventory(id, num){
    connection.query("SELECT * FROM products WHERE item_id = ?", [id], function(err, response){
        var newTotal = parseFloat(response[0].stock_quantity) + parseFloat(num);
        connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newTotal}, {item_id:id}], 
        function(err, response){
            if(err) throw err;
            viewProducts();
        })
    })
}

// Add New Product
function addProduct(name, dep, price, quant){
    connection.query("INSERT INTO products SET ?", {product_name:name, department_name:dep, price:price, stock_quantity:quant},
    function(err, response){
        if(err) throw err;
        viewProducts();
    })
}

function printTable(response){

    console.log("This is the current store inventory: \n\n");
    console.log("______________________________________________________________\n");
    console.log("--------------------------------------------------------------");
    console.log("                      STATS FOR PRODUCTS                      ");
    console.table(response);        
    console.log("--------------------------------------------------------------");
    console.log("______________________________________________________________\n\n");

    showOptions();
}