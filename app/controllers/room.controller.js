

const db = require('../config/db.config.js');
const Room = db.Room;

exports.create = (req, res) => {
    let room = {};

    try{
        // Building room object from upoading request's body
        room.number = req.body.number;
        room.beds = req.body.beds;
        room.furniture = req.body.furniture;
        room.available = req.body.available;
    
        // Save to MySQL database
        Room.create(room).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a room with id = " + result.id,
                room: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllrooms = (req, res) => {
    // find all room information from 
    Room.findAll()
        .then(roomInfos => {
            res.status(200).json({
                message: "Get all Rooms' Infos Successfully!",
                rooms: roomInfos
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
exports.getRoomById = (req, res) => {
  // find all room information from 
  let roomId = req.params.id;
  Room.findByPk(roomId)
      .then(room => {
          res.status(200).json({
              message: " Successfully Get a Room with id = " + roomId,
              rooms: room
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

    Room.findAll({
                      attributes: ['id', 'number', 'beds', 'furniture', 'available', 'copyrightby'],
                      where: {beds: beds}
                    })
          .then(results => {
            res.status(200).json({
                message: "Get all Rooms with beds = " + beds,
                rooms: results,
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
  
    Room.findAndCountAll({ limit: limit, offset:offset })
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
              "rooms": data.rows
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
  
    Room.findAndCountAll({
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
              "rooms": data.rows
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
        let roomId = req.params.id;
        let room = await Room.findByPk(roomId);
    
        if(!room){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a room with id = " + roomId,
                room: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                number: req.body.number,
                beds: req.body.beds,
                furniture: req.body.furniture,
                available: req.body.available,
            }
            let result = await Room.update(updatedObject, {returning: true, where: {id: roomId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a room with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Room with id = " + roomId,
                room: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Room with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let roomId = req.params.id;
        let room = await Room.findByPk(roomId);

        if(!room){
            res.status(404).json({
                message: "Does Not exist a room with id = " + roomId,
                error: "404",
            });
        } else {
            await room.destroy();
            res.status(200).json({
                message: "Delete Successfully a room with id = " + roomId,
                room: room,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a room with id = " + req.params.id,
            error: error.message,
        });
    }
}