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

    connection.query("CREATE DATABASE IF NOT EXISTS bamazon_db", function(err, response){
        if(err) throw err;
    })

    connection.query("USE bamazon_db", 
    function(err, response){
        if(err) throw err;
    })

    connection.query("CREATE TABLE IF NOT EXISTS products(item_id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, product_name VARCHAR(45) NOT NULL, department_name VARCHAR(45) NOT NULL, price DECIMAL(10, 2) DEFAULT 0, product_sales DECIMAL(10, 2) DEFAULT 0, stock_quantity INTEGER(10) DEFAULT 0)", 
    function(err, response){
        if(err) throw err;
    })

    // //1
    // connection.query("INSERT INTO products SET ?", {product_name:'peaches', department_name:'produce', price:0.50, stock_quantity:100}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //2
    // connection.query("INSERT INTO products SET ?", {product_name:'apples', department_name:'produce', price:0.60, stock_quantity:200}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //3
    // connection.query("INSERT INTO products SET ?", {product_name:'chocolate', department_name:'dessert', price:5.00, stock_quantity:115}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //4
    // connection.query("INSERT INTO products SET ?",{product_name:'ice cream', department_name:'dessert', price:6.00, stock_quantity:200}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //5
    // connection.query("INSERT INTO products SET ?",{product_name:'shirt', department_name:'clothing', price:20.00, stock_quantity:100},  
    // function(err, response){
    //     if(err) throw err;
    // })
    // //6
    // connection.query("INSERT INTO products SET ?", {product_name:'jeans', department_name:'clothing', price:50.00, stock_quantity:200}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //7
    // connection.query("INSERT INTO products SET ?", {product_name:'socks', department_name:'clothing', price:2.00, stock_quantity:200}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //8
    // connection.query("INSERT INTO products SET ?", {product_name:'shoes', department_name:'clothing', price:34.50, stock_quantity:39}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //9
    // connection.query("INSERT INTO products SET ?", {product_name:'cats', department_name:'pet', price:100.00, stock_quantity:100}, 
    // function(err, response){
    //     if(err) throw err;
    // })    
    // //10
    // connection.query("INSERT INTO products SET ?", {product_name:'soup', department_name:'food', price:0.90, stock_quantity:200}, 
    // function(err, response){
    //     if(err) throw err;
    // })    


    connection.query("CREATE TABLE IF NOT EXISTS customers(id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, user_name VARCHAR(45) NOT NULL, password VARCHAR(50) NOT NULL)", 
    function(err, response){
        if(err) throw err;
    })

    connection.query("CREATE TABLE IF NOT EXISTS managers(id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, user_name VARCHAR(45) NOT NULL, password VARCHAR(50) NOT NULL DEFAULT 'managersrock', security_key VARCHAR(36) NOT NULL, department VARCHAR(50))", 
    function(err, response){
        if(err) throw err;
    })

    connection.query("CREATE TABLE IF NOT EXISTS supervisors(id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, user_name VARCHAR(45) NOT NULL, password VARCHAR(50) NOT NULL, security_key VARCHAR(36) NOT NULL, store_num INTEGER(11) NOT NULL)", 
    function(err, response){
        if(err) throw err;
    })

    connection.query("CREATE TABLE IF NOT EXISTS departments(department_id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, department_name VARCHAR(45) NOT NULL, overhead_costs DECIMAL(10, 2) DEFAULT 0)", 
    function(err, response){
        if(err) throw err;
    })

})