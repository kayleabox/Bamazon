var inquirer     = require("inquirer");
var mysql        = require("mysql");
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
    if(err) throw err;
    console.log("connected as id " + connection.threadId);

    connection.query("USE bamazon_db", 
    function(err, response){
        if(err) throw err;
    });

    getUserStatus();

    
});

function getUserStatus(){
    inquirer.prompt([{
        type   : "confirm",
        name   : "before",
        message: "have you shopped with us before?"
    }]).then(function(answer, err){
        if(err) throw err;
        if(answer.before){
            signIn();
        }
        else{
            createUser();
        }
    })
}

function signIn(){
    inquirer.prompt([{
        type:"input",
        name:"username",
        message:"enter your user name: "
    },
    {
        type:"password",
        name:"password",
        message:"enter your password",
    }]).then(function(answer, err){
        if(err) throw err;
        checkCredentials(answer.username, answer.password);
    });
}

function checkCredentials(username, password){
    connection.query("SELECT * FROM customers WHERE user_name = ? AND password = ?", [username, password], 
    function(err, response){
        if (err) throw err;
        if (response[0] != undefined) {
            if (response[0].password == password) {
                console.log("you are logged in!");
                printTable(buy);
            }
        }
        else {
            console.log("we could not find you in our database!");
            getUserStatus();
        }
    })
}



function createUser(){
    inquirer.prompt([{
        type   : "input",
        name   : "username",
        message: "enter your user name."
    },
    {
        type   : "password",
        name   : "password",
        message: "enter your password"
    },
    {
        type   : "password",
        name   : "confirm",
        message: "enter your password"
    }]).then(function (create, err) {
        if(err) throw err;
        if(create.username !== undefined && create.password !== undefined && create.password == create.confirm){
            connection.query("SELECT * FROM customers WHERE user_name=? AND password=?", [create.username, create.password], 
            function(err, response){
                if(err) throw err;
                if(response[0] != undefined){
                    if( response[0].password == create.password){
                        console.log("you already have an account!")
                        printTable(buy);
                    }
                }
                else{
                    connection.query("INSERT INTO customers SET ?", {user_name:create.username, password:create.password},
                    function(err, response){
                        if(err) throw err;
                        printTable(buy);
                    })
                }
            })
        }
        else {
            console.log("All fields must be defined and passwords must match.")
            createUser();
        }
    })
}

function buy(){
        //ask the customer what they want and how many
    inquirer.prompt([{
        type:"input",
        name:"id",
        message:"what is the item id?"
    },
    {
        type:"input",
        name:"quantity",
        message:"how many would you like?"
    }]).then(function(answer, err){
        connection.query("SELECT * FROM products WHERE item_id = ?", [answer.id], function(err, response){
            console.log(response[0]);
            var inventory = parseFloat(response[0].stock_quantity);
            var customerQuantity = parseFloat(answer.quantity);
            if(inventory >= customerQuantity){
                var newInventory = inventory - customerQuantity; 
                connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity:newInventory}, {item_id:answer.id}], function(err, response){
                    connection.query("SELECT * FROM products WHERE item_id = ?", [answer.id], function(err, response){
                        if(err) throw err;
                        var totalCost = customerQuantity * parseFloat(response[0].price);
                        var productSales = parseFloat(response[0].product_sales) + totalCost;
                        var id = response[0].item_id;
                        console.log(id);
                        console.log(productSales);
                        console.log("You bought " + customerQuantity + " " + response[0].product_name + " for " + totalCost.toFixed(2));
                        connection.query("UPDATE products SET ? WHERE ?", [{product_sales: productSales}, {item_id:id}],
                        function(err, response){
                            if(err) throw err;
                            printTable(buy);
                        })
                    })

                })
            }
            else{console.log("we don't have enough!");}
        })
    });
}



function printTable(callback){
    connection.query("SELECT * FROM products", function(err, response){
        if(err) throw err;
        console.log("--------------------------------------------------------------");
        console.log("                      STATS FOR PRODUCTS                      ");
        console.table(response);        
        console.log("--------------------------------------------------------------");

        inquirer.prompt([{
            type:"confirm",
            name:"buySomething",
            message:"would you like to buy something?"
        }]).then(function(answer, err){
            if(err) throw err;
            if(answer.buySomething){
                callback();
            }
            else{console.log("come back soon! goodbye!");}
        })
   })

}