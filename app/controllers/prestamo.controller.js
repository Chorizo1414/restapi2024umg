const db = require('../config/db.config.js');
const Prestamo = db.Prestamo;

// Crear un nuevo préstamo
exports.create = (req, res) => {
    let prestamo = {};

    try{
        prestamo.codigoLibro = req.body.codigoLibro;
        prestamo.codigoUsuario = req.body.codigoUsuario;
        prestamo.fechaSalida = req.body.fechaSalida;
        prestamo.fechaMaximaDevolver = req.body.fechaMaximaDevolver;
        prestamo.fechaDevolucion = req.body.fechaDevolucion;
    
        // Guardar en la base de datos
        Prestamo.create(prestamo).then(result => {    
            res.status(200).json({
                message: "Préstamo creado exitosamente con número de pedido = " + result.numeroPedido,
                prestamo: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Error al crear el préstamo",
            error: error.message
        });
    }
}

// Obtener un préstamo por ID
exports.getById = (req, res) => {
  let numeroPedido = req.params.id;
  Prestamo.findByPk(numeroPedido)
      .then(prestamo => {
          if(prestamo) {
              res.status(200).json({
                  message: "Préstamo encontrado con número de pedido = " + numeroPedido,
                  prestamo: prestamo
              });
          } else {
              res.status(404).json({
                  message: "Préstamo no encontrado con número de pedido = " + numeroPedido,
                  prestamo: null
              });
          }
      })
      .catch(error => {
        res.status(500).json({
            message: "Error al obtener el préstamo",
            error: error.message
        });
      });
}

// Modificar un préstamo
exports.updateById = async (req, res) => {
    try{
        let numeroPedido = req.params.id;
        let prestamo = await Prestamo.findByPk(numeroPedido);
    
        if(!prestamo){
            res.status(404).json({
                message: "No se encontró un préstamo con número de pedido = " + numeroPedido,
                prestamo: null,
                error: "404"
            });
        } else {    
            let updatedObject = {
                codigoLibro: req.body.codigoLibro,
                codigoUsuario: req.body.codigoUsuario,
                fechaSalida: req.body.fechaSalida,
                fechaMaximaDevolver: req.body.fechaMaximaDevolver,
                fechaDevolucion: req.body.fechaDevolucion
            }
            let result = await Prestamo.update(updatedObject, {returning: true, where: {numeroPedido: numeroPedido}});
            
            if(!result) {
                res.status(500).json({
                    message: "No se pudo actualizar el préstamo con número de pedido = " + numeroPedido,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Préstamo actualizado exitosamente con número de pedido = " + numeroPedido,
                prestamo: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error al actualizar el préstamo",
            error: error.message
        });
    }
}

// Eliminar un préstamo
exports.deleteById = async (req, res) => {
    try{
        let numeroPedido = req.params.id;
        let prestamo = await Prestamo.findByPk(numeroPedido);

        if(!prestamo){
            res.status(404).json({
                message: "No existe un préstamo con número de pedido = " + numeroPedido,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Préstamo eliminado exitosamente con número de pedido = " + numeroPedido,
                prestamo: prestamo,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error al eliminar el préstamo",
            error: error.message,
        });
    }
}
