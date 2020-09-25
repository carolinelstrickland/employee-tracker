var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Looloo1995",
  database: "employeeTracker_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

 // function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        name: "firstSelection",
        type: "list",
        message: "Would you like to do first?",
        choices: [
            "View all emloyees", 
            "View all employees by department", 
            "View all employees by manager", 
            "Add employee", 
            "Remove employee", 
            "Update employee role", 
            "Update employee manager",
            "View all roles"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.firstSelection === "View all employees") {
          displayEmployees();
        }
        else if(answer.firstSelection === "View all employees by department") {
          displayDepartment();
        } 
        else if(answer.firstSelection === "View all employees by manager") {
            displayManagers();
        }
        else if(answer.firstSelection === "Add employee") {
            addEmployee();
        }
        else if(answer.firstSelection === "Remove employee") {
            removeEmployee();
        }
        else if(answer.firstSelection === "Update employee role") {
            updateRole();
        }
        else if(answer.firstSelection === "Update employee manager") {
            updateManager();
        }
        else if(answer.firstSelection === "View all roles") {
            displayRoles();
        }
        else {
          connection.end();
        };
      });
};

//displayEmployees();
//displayDepartment();
// displayManagers();

function addEmployee(){
    inquirer.prompt([
        {
            name: "employeeFirstName",
            type: "input",
            message: "What is the new employee's first name?"
        },
        {
            name: "employeeLastName",
            type: "input",
            message: "What is the new employee's last name?"
        },
        {
            name: "employeeRole",
            type: "list",
            message: "What is the new employee's role?",
            choices: ["Software Engineer","Salesperson","Legal Team Lead","Lawyer", "Lead Engineer", "Sales Lead"]
        },
    ])
};
// removeEmployee();
// updateRole();
// updateManager();
// displayRoles();

