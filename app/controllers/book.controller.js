const db = require('../config/db.config.js');
const Book = db.Book;

exports.create = (req, res) => {
    let book = {};

    try {
        // Construir objeto libro a partir del cuerpo de la solicitud
        book.Cod_libro = req.body.Cod_libro;
        book.Nombre = req.body.Nombre;
        book.Editorial = req.body.Editorial;
        book.Autor = req.body.Autor;
        book.Genero = req.body.Genero;
        book.Pais_autor = req.body.Pais_autor;
        book.No_paginas = req.body.No_paginas;
        book.Anio_edicion = req.body.Anio_edicion;
        book.Precio_libro = req.body.Precio_libro;
        book.copyrightby = req.body.copyrightby;

        // Guardar en la base de datos
        Book.create(book).then(result => {    
            // enviar mensaje de éxito al cliente
            res.status(200).json({
                message: "Libro subido exitosamente con id = " + result.id,
                book: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo!",
            error: error.message
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        let bookId = req.params.id;
        let book = await Book.findByPk(bookId);

        if (!book) {
            // Responder al cliente si no se encuentra el libro
            res.status(404).json({
                message: "No encontrado para actualizar un libro con id = " + bookId,
                book: "",
                error: "404"
            });
        } else {
            // Actualizar los cambios en la base de datos
            let updatedObject = {
                Cod_libro: req.body.Cod_libro,
                Nombre: req.body.Nombre,
                Editorial: req.body.Editorial,
                Autor: req.body.Autor,
                Genero: req.body.Genero,
                Pais_autor: req.body.Pais_autor,
                No_paginas: req.body.No_paginas,
                Anio_edicion: req.body.Anio_edicion,
                Precio_libro: req.body.Precio_libro,
                copyrightby: req.body.copyrightby
            }
            let result = await Book.update(updatedObject, {returning: true, where: {id: bookId}});
            
            // Responder al cliente
            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar un libro con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Libro actualizado exitosamente con id = " + bookId,
                book: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar un libro con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let bookId = req.params.id;
        let book = await Book.findByPk(bookId);

        if (!book) {
            res.status(404).json({
                message: "No existe un libro con id = " + bookId,
                error: "404",
            });
        } else {
            await book.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con id = " + bookId,
                book: book,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar un libro con id = " + req.params.id,
            error: error.message,
        });
    }
}