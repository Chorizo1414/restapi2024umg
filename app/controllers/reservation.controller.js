
const db = require('../config/db.config.js');
const Reservation = db.Reservation;

exports.create = (req, res) => {
    let reservation = {};

    try{
        // Building reservation object from upoading request's body
        reservation.number = req.body.number;
        reservation.customer = req.body.customer;
        reservation.room = req.body.room;
        reservation.date = req.body.date;
    
        // Save to MySQL database
        Reservation.create(reservation).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a reservation with id = " + result.id,
                reservation: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllreservations = (req, res) => {
    // find all reservation information from 
    Reservation.findAll()
        .then(reservationInfos => {
            res.status(200).json({
                message: "Get all Reservations' Infos Successfully!",
                reservations: reservationInfos
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

/*
exports.getReservationById = (req, res) => {
  // find all reservation information from 
  let reservationId = req.params.id;
  Reservation.findByPk(reservationId)
      .then(reservation => {
          res.status(200).json({
              message: " Successfully Get a Reservation with id = " + reservationId,
              reservations: reservation
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
*/


/*
exports.filteringByBeds= (req, res) => {
  let age = req.query.age;

    Reservation.findAll({
                      attributes: ['id', 'number', 'beds', 'furniture', 'available', 'copyrightby'],
                      where: {beds: beds}
                    })
          .then(results => {
            res.status(200).json({
                message: "Get all Reservations with beds = " + beds,
                reservations: results,
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
*/

/*
exports.pagination = (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
  
    const offset = page ? page * limit : 0;
  
    Reservation.findAndCountAll({ limit: limit, offset:offset })
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
              "reservations": data.rows
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
*/

/*
exports.pagingfilteringsorting = (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    let beds = parseInt(req.query.beds);
  
    const offset = page ? page * limit : 0;

    console.log("offset = " + offset);
  
    Reservation.findAndCountAll({
                                attributes: ['id', 'number', 'beds', 'furniture', 'available'],
                                where: {beds: beds}, 
                                order: [
                                  ['furniture', 'ASC'],
                                  ['available', 'DESC']
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
              "reservations": data.rows
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
*/

exports.updateById = async (req, res) => {
    try{
        let reservationId = req.params.id;
        let reservation = await Reservation.findByPk(reservationId);
    
        if(!reservation){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a reservation with id = " + reservationId,
                reservation: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                number: req.body.number,
                customer: req.body.customer,
                room: req.body.room,
                date: req.body.date,
            }
            let result = await Reservation.update(updatedObject, {returning: true, where: {id: reservationId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a reservation with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Reservation with id = " + reservationId,
                reservation: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Reservation with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let reservationId = req.params.id;
        let reservation = await Reservation.findByPk(reservationId);

        if(!reservation){
            res.status(404).json({
                message: "Does Not exist a reservation with id = " + reservationId,
                error: "404",
            });
        } else {
            await reservation.destroy();
            res.status(200).json({
                message: "Delete Successfully a reservation with id = " + reservationId,
                reservation: reservation,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a reservation with id = " + req.params.id,
            error: error.message,
        });
    }
}