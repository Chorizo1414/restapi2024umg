
module.exports = (sequelize, Sequelize) => {
	const Reservation = sequelize.define('reservation', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  number: {
			type: Sequelize.INTEGER
	  },
	  beds: {
			type: Sequelize.STRING
	  },
	  furniture: {
			type: Sequelize.STRING
    },
	  available: {
			type: Sequelize.STRING
	  },

    
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Reservation;
}