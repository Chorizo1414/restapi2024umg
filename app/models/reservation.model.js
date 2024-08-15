
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
	  customer: {
			type: Sequelize.STRING
	  },
	  room: {
			type: Sequelize.STRING
    },
	  date: {
			type: Sequelize.STRING
	  },

    
    copyrightby: {
      type: Sequelize.STRING,
      defaultValue: 'UMG Antigua'
    }
	});
	
	return Reservation;
}