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
        message: "What would you like to do?",
        choices: [
            "View all employees", 
            "View all departments", 
            "Add employee",
            "Add role", 
            "Add department",
            "Update employee role", 
            "View all roles",
            "Exit"
          ]
      })
      .then(function(answer) {
        if (answer.firstSelection === "View all employees") {
          displayEmployees();
        }
        else if(answer.firstSelection === "View all departments") {
          displayDepartment();
        } 
        else if(answer.firstSelection === "Add employee") {
            addEmployee();
        }
        else if(answer.firstSelection === "Add role") {
            addRole();
        } 
        else if(answer.firstSelection === "Add department") {
            addDepartment();
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

function displayEmployees(){
  connection.query("SELECT * FROM employee", function(err, result){
    if (err) throw err;
    console.table(result, ["id", "firstName", "lastName"]);
    start();
  })
};

function displayDepartment(){
  connection.query("SELECT * FROM department", function(err, result){
    if (err) throw err;
    console.table(result);
    start();
  })
};

const addEmployee = () => {
	let department = 'SELECT * FROM department'; //department query
  let employees = 'SELECT * FROM employee'; // employee quuery
	connection.query(department, function (error, results) { //open connection on department
    if (error) throw error;
    //mapping and passing directly, without extra steps, you know what name and value are already :) 
		const departments = results.map(result => ({
			value: result.id,
			name: result.name,
		}));
		connection.query(employees, function (error, results) { //open connection on employee
      if (error) throw error; 
      //map results, contcat first and last name, and push at the end None, su user can have a choise not to select a manager
			const manager = results.map(employee => ({
				name: employee.firstName + ' ' + employee.lastName,
				value: employee.id,
			}));
			manager.push({
				name: 'None',
				value: null,
			});
			inquirer
				.prompt([
					{
						type: 'input',
						name: 'firstName',
						message: "What is the employee's first name?",
					},
					{
						type: 'input',
						name: 'lastName',
						message: "What is the employee's last name?",
					},
					{
						type: 'list',
						name: 'managerId',
						message: 'Select employee manager',
						choices: manager, //pass manager
					},
					{
						type: 'list',
						name: 'roleId',
						message: 'Which department this employee belongs to?',
						choices: departments, //pass departments
					},
				])
				.then(response => {
					console.log(response);
					const sqlQuery = 'INSERT INTO employee SET ?';
					connection.query(sqlQuery, response, function (error, results) {
						if (error) throw error;
						console.log('Inserted');
						start();
					});
				});
		});
	});
};

function addRole(){
  connection.query("SELECT * FROM department", function(err,results){
    if (err) throw err;
    let departments = [];
    departments = results.map(department => ({
      departmentId: department.id, departmentName: department.name
    }))
  inquirer.prompt([
    {
      name: "roleTitle",
      type: "input",
      message: "What is the new role?"
    },
    {
      name: "roleSalary",
      type: "input",
      message: "What is the salary for this role?"
    },
    {
      name: "departmentId",
      type: "list",
      message: "What department does this role belong to?",
      choices: departments.map(department => ({
        value: department.departmentId, name: department.departmentName,
      }))
    }
  ]).then(function(answer){
    let newRole = {
      title: answer.roleTitle, salary: answer.roleSalary, departmentId: answer.departmentId
    }
    connection.query("INSERT INTO employeeRole SET ?", newRole, function(err,result){
      if (err) throw err;
      console.log("Role has been added.")
      start();
    })
  })
})
};

function addDepartment(){
  inquirer.prompt([
  {
    name: "departmentSelection",
    type: "input",
    message: "What is the name of the new department?"
  }
  ]).then(function(answer){
    connection.query("INSERT into department SET ?", {name: answer.departmentSelection}, function(err,result){
      if (err) throw err;
      console.log("Department has been created.");
      start();
    })
  })
};

function updateRole(){

};

function displayRoles(){
  connection.query("SELECT * FROM employeeRole LEFT JOIN department ON employeeRole.departmentId = department.id", function(err, result){
    if (err) throw err;
    console.table(result, ["id","title","salary","name"]);
    start();
  })
  
};






