
module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define('book', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Cod_libro: {
			type: Sequelize.INTEGER
	  },
	  Nombre: {
			type: Sequelize.STRING
  	},
	  Editorial: {
			type: Sequelize.STRING
	  },
	  Autor: {
			type: Sequelize.STRING
    },
      Genero: {
            type: Sequelize.STRING,
    },
	  Pais_autor: {
			type: Sequelize.STRING
    },
      No_paginas: {
        type: Sequelize.INTEGER
    },
      Anio_edicion: {
        type: Sequelize.DATE,
        validate: {
            isDate: true // Validación para asegurar que sea una fecha
            }
    },
    Precio_libro: {
        type: Sequelize.DECIMAL(10, 2), 
        validate: {
            isDecimal: true // Validación para asegurar que sea un número decimal
        }
    },
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Book;
}