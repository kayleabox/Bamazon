var inquirer      = require("inquirer");
var mysql         = require("mysql");
var createManager = require("./users.js")
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
    connection.query("SELECT * FROM supervisors WHERE user_name = ? AND password = ?", [userName, pword], 
    function(err, response){
        if(err)  throw err;
        if(response[0] != undefined){
            currentUser = userName;
            viewProducts();
        }
        else{
            console.log("no matches found in the database. you must be a supervisor.");
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
                choices:["view products", "view departments", "view product sales by dep", "add new department"]
            }]).then(function(answer, err){
                if(err) throw err;
                switch(answer.action){
                    case "view products":
                        viewProducts();
                    break;
                    case "view departments":
                        viewDepartments();
                    break;
                    case "view product sales by dep":
                        viewByDep();
                    break;
                    case "add new department":
                        inquirer.prompt([{
                            type:"input",
                            name:"dep",
                            message:"what is the department name?"
                        },
                        {
                            type:"input",
                            name:"costs", 
                            message:"what is the overhead cost?"
                        }]).then(function(ans, err){
                            addDepartment(ans.dep, parseFloat(ans.costs));
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

function viewDepartments(){
    connection.query("SELECT * FROM departments", function(err, response){
        if(err) throw err;
        printTable(response);
   })
}


function viewByDep(){
    connection.query("SELECT departments.department_name, departments.overhead_costs, SUM(products.product_sales) AS product_sales, SUM(products.product_sales) - departments.overhead_costs AS total_profit FROM products LEFT JOIN departments ON departments.department_name = products.department_name GROUP BY department_name",
    function(err, response){
        if(err) throw err;
        printTable(response);
    })
}

function addDepartment(dep, cost){
    connection.query("INSERT INTO departments SET ?", {department_name:dep, overhead_costs:cost},
    function(err, response){
        if(err) throw err;
        viewDepartments();
    })
}

function printTable(response){

    console.log("______________________________________________________________\n");
    console.log("--------------------------------------------------------------");
    console.log("                      STATS FOR PRODUCTS                      ");
    console.table(response);        
    console.log("--------------------------------------------------------------");
    console.log("______________________________________________________________\n\n");

    showOptions();
}


