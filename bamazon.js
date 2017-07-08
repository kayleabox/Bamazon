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
    // connection.query("INSERT INTO products SET ?", {product_name:'peaches', department_name:'produce', price:0.50, stock_quantity:100, product_sales:1000}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //2
    // connection.query("INSERT INTO products SET ?", {product_name:'apples', department_name:'produce', price:0.60, stock_quantity:200, product_sales:1000}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //3
    // connection.query("INSERT INTO products SET ?", {product_name:'chocolate', department_name:'dessert', price:5.00, stock_quantity:115, product_sales:2000}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //4
    // connection.query("INSERT INTO products SET ?",{product_name:'ice cream', department_name:'dessert', price:6.00, stock_quantity:200, product_sales:5000}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //5
    // connection.query("INSERT INTO products SET ?",{product_name:'shirt', department_name:'clothing', price:20.00, stock_quantity:100, product_sales:3000},  
    // function(err, response){
    //     if(err) throw err;
    // })
    // //6
    // connection.query("INSERT INTO products SET ?", {product_name:'jeans', department_name:'clothing', price:50.00, stock_quantity:200, product_sales:2000}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //7
    // connection.query("INSERT INTO products SET ?", {product_name:'socks', department_name:'clothing', price:2.00, stock_quantity:200, product_sales:1500}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //8
    // connection.query("INSERT INTO products SET ?", {product_name:'shoes', department_name:'clothing', price:34.50, stock_quantity:39, product_sales:3000}, 
    // function(err, response){
    //     if(err) throw err;
    // })
    // //9
    // connection.query("INSERT INTO products SET ?", {product_name:'cats', department_name:'pet', price:100.00, stock_quantity:100, product_sales:6000}, 
    // function(err, response){
    //     if(err) throw err;
    // })    
    // //10
    // connection.query("INSERT INTO products SET ?", {product_name:'soup', department_name:'food', price:0.90, stock_quantity:200, product_sales:1000}, 
    // function(err, response){
    //     if(err) throw err;
    // })    


    connection.query("CREATE TABLE IF NOT EXISTS customers(id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, first_name VARCHAR(45) NOT NULL, last_name VARCHAR(45) NOT NULL, user_name VARCHAR(45) NOT NULL, password VARCHAR(50) NOT NULL, start_date DATE )", 
    function(err, response){
        if(err) throw err;
    })

    connection.query("CREATE TABLE IF NOT EXISTS managers(id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, first_name VARCHAR(45) NOT NULL, last_name VARCHAR(45) NOT NULL, user_name VARCHAR(45) NOT NULL, password VARCHAR(50) NOT NULL, security_key VARCHAR(36) NOT NULL, department VARCHAR(50), start_date DATE )", 
    function(err, response){
        if(err) throw err;
    })

    // connection.query("INSERT INTO managers SET ?", {first_name: 'jim', last_name:'smith', user_name:'manager', password:'manager', security_key:'UUID()', department:'all'}, 
    // function(err, response){
    //     if(err) throw err;
    // })    

    connection.query("CREATE TABLE IF NOT EXISTS supervisors(id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, first_name VARCHAR(45) NOT NULL, last_name VARCHAR(45) NOT NULL, user_name VARCHAR(45) NOT NULL, password VARCHAR(50) NOT NULL, security_key VARCHAR(36) NOT NULL, store_num INTEGER(11) NOT NULL, start_date DATE )", 
    function(err, response){
        if(err) throw err;
    })

    // connection.query("INSERT INTO supervisors SET ?", {user_name:'super', password:'super', security_key:"UUID()", store_num:1}, 
    // function(err, response){
    //     if(err) throw err;
    // })    

    connection.query("CREATE TABLE IF NOT EXISTS departments(department_id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY, department_name VARCHAR(45) NOT NULL, overhead_costs DECIMAL(10, 2) DEFAULT 0)", 
    function(err, response){
        if(err) throw err;
    })

    // connection.query("INSERT INTO departments SET ?", {department_name:'produce', overhead_costs:"1000"}, 
    //     function(err, response){
    //      if(err) throw err;
    // })

    // connection.query("INSERT INTO departments SET ?", {department_name:'dessert', overhead_costs:"3000"}, 
    //     function(err, response){
    //      if(err) throw err;
    // })    

    // connection.query("INSERT INTO departments SET ?", {department_name:'clothing', overhead_costs:"2000"}, 
    //     function(err, response){
    //      if(err) throw err;
    // })    

    // connection.query("INSERT INTO departments SET ?", {department_name:'pet', overhead_costs:"4000"}, 
    //     function(err, response){
    //      if(err) throw err;
    // })

    // connection.query("INSERT INTO departments SET ?", {department_name:'food', overhead_costs:"1000"}, 
    //     function(err, response){
    //      if(err) throw err;
    // })

})