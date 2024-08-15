

const db = require('../config/db.config.js');
const Employee = db.Employee;

exports.create = (req, res) => {
    let employee = {};

    try{
        // Building employee object from upoading request's body
        employee.firstname = req.body.firstname;
        employee.lastname = req.body.lastname;
        employee.address = req.body.address;
        employee.age = req.body.age;
        employee.email = req.body.email;
        employee.dpi = req.body.dpi;
    
        // Save to MySQL database
        Employee.create(employee).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a employee with id = " + result.id,
                employee: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllemployees = (req, res) => {
    // find all employee information from 
    Employee.findAll()
        .then(employeeInfos => {
            res.status(200).json({
                message: "Get all Employees' Infos Successfully!",
                employees: employeeInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getEmployeeById = (req, res) => {
  // find all employee information from 
  let employeeId = req.params.id;
  Employee.findByPk(employeeId)
      .then(employee => {
          res.status(200).json({
              message: " Successfully Get a Employee with id = " + employeeId,
              employees: employee
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}


exports.filteringByAge = (req, res) => {
  let age = req.query.age;

    Employee.findAll({
                      attributes: ['id', 'firstname', 'lastname', 'age', 'address', 'email', 'dpi', 'copyrightby'],
                      where: {age: age}
                    })
          .then(results => {
            res.status(200).json({
                message: "Get all Employees with age = " + age,
                employees: results,
            });
          })
          . catch(error => {
              console.log(error);
              res.status(500).json({
                message: "Error!",
                error: error
              });
            });
}
 
exports.pagination = (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
  
    const offset = page ? page * limit : 0;
  
    Employee.findAndCountAll({ limit: limit, offset:offset })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
          data: {
              "copyrightby": "UMG ANTIGUA",
              "totalItems": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "employees": data.rows
          }
        };
        res.send(response);
      });  
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }    
}

exports.pagingfilteringsorting = (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let age = parseInt(req.query.age);
  
    const offset = page ? page * limit : 0;

    console.log("offset = " + offset);
  
    Employee.findAndCountAll({
                                attributes: ['id', 'firstname', 'lastname', 'age', 'address', 'email', 'dpi'],
                                where: {age: age}, 
                                order: [
                                  ['firstname', 'ASC'],
                                  ['lastname', 'DESC']
                                ],
                                limit: limit, 
                                offset:offset 
                              })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", age = " + age,
          data: {
              "copyrightby": "UmgAntigua",
              "totalItems": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "age-filtering": age,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "employees": data.rows
          }
        };
        res.send(response);
      });  
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }      
}

exports.updateById = async (req, res) => {
    try{
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);
    
        if(!employee){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a employee with id = " + employeeId,
                employee: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                age: req.body.age,
                email: req.body.email,
                dpi: req.body.dpi
            }
            let result = await Employee.update(updatedObject, {returning: true, where: {id: employeeId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a employee with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Employee with id = " + employeeId,
                employee: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Employee with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);

        if(!employee){
            res.status(404).json({
                message: "Does Not exist a employee with id = " + employeeId,
                error: "404",
            });
        } else {
            await employee.destroy();
            res.status(200).json({
                message: "Delete Successfully a employee with id = " + employeeId,
                employee: employee,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a employee with id = " + req.params.id,
            error: error.message,
        });
    }
}