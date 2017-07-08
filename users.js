
module.exports = {

Supervisor: function(firstName, lastName, userName, password, startDate, storeNum){
    this.supervisor = this;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.startDate = startDate;
    this.storeNum = storeNum;
    this.accountType = "supervisors"
    this.securityKey;
    this.id;

    this.storeData = function(manager){
        connection.query("INSERT INTO supervisors (security_key, first_name, last_name, user_name, password, start_date, store_num) values( UUID(), ? ,? ,? ,?, ?, ?)",
        [supervisor.firstName, supervisor.lastName, supervisor.userName, supervisor.password, supervisor.startDate, supervisor.storeNum],
        function(err, response){
            if(err) throw err;
            console.log(response);
            var id = response.insertId
            connection.query("SELECT * FROM supervisors WHERE id = ?", [id], function(err, response){
                if(err) throw err;
                console.log("new supervisor " + response[0].user_name + " " + response[0].security_key +" is now in the system.");
                supervisor.id = response[0].id;
                supervisor.securityKey = response[0].security_key;
            })
        });
    }

    this.storeData(this.supervisor);

},

Manager: function(firstName, lastName, userName, password, startDate, department){
    this.manager = this;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.startDate = startDate;
    this.department = department;
    this.accountType = "managers"
    this.securityKey;
    this.id;

    this.storeData = function(manager){
        connection.query("INSERT INTO managers (security_key, first_name, last_name, user_name, password, start_date, department) values( UUID(), ? ,? ,? ,?, ?, ?)",
        [manager.firstName, manager.lastName, manager.userName, manager.password, manager.startDate, manager.department],
        function(err, response){
            if(err) throw err;
            console.log(response);
            var id = response.insertId
            connection.query("SELECT * FROM managers WHERE id = ?", [id], function(err, response){
                if(err) throw err;
                console.log("new manager " + response[0].user_name + " " + response[0].security_key +" is now in the system.");
                manager.id = response[0].id;
                manager.securityKey = response[0].security_key;
            })
        });
    }

    this.storeData(this.manager);

},


Customer: function(firstName, lastName, userName, password, startDate){
    this.customer = this;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.startDate = startDate;
    this.accountType = "customers"
    this.securityKey;
    this.id;

    this.storeData = function(customer){
        connection.query("INSERT INTO customers (security_key, first_name, last_name, user_name, password, start_date) values( UUID(), ? ,? ,? ,?, ?, ?)",
        [customer.firstName, customer.lastName, customer.userName, customer.password, customer.startDate],
        function(err, response){
            if(err) throw err;
            console.log(response);
            var id = response.insertId
            connection.query("SELECT * FROM customers WHERE id = ?", [id], function(err, response){
                if(err) throw err;
                console.log("new customer " + response[0].user_name + " " + response[0].security_key +" is now in the system.");
                customer.id = response[0].id;
                customer.securityKey = response[0].security_key;
            })
        });
    }

    this.storeData(this.customer);

},

   updatePassword: function(user, password){
        user.password = password;
        connection.query("UPDATE "+user.accountType+" SET ? WHERE ?", [{password:password}, {security_key:user.securityKey}], function(err, response){
            if(err)throw err;
            console.log("updated password to " + password);
        })
    },

    updateUsername: function(user, userName){
        user.userName = userName;
        connection.query("UPDATE "+user.accountType+" SET ? WHERE ?", [{user_name:userName}, {id:user.id}], function(err, response){
            if(err)throw err;
            console.log("updated password to " + userName);
        })
    },

    deleteUser: function(user){
        connection.query("DELETE FROM " + user.accountType + " WHERE security_key = ?", [user.securityKey], 
        function(err, response){
            if(err) throw err;
            console.log(response);
            console.log(user.userName + " " + user.securityKey + " has been deleted from " + user.accountType);
        });
    }

};