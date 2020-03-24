'use strict'

const CONFIG = require('../models/dbConfig');

const KNEX = require('knex');


// module.exports = KNEX({
// 	client: 'mysql',
// 	connection: {
// 		host: 'aarg4a23ut0g3b.cd0xtdyumzkw.us-east-2.rds.amazonaws.com',
// 		user: 'medRadEr21',
// 		password: 'eiacosmanthys999',
// 		database: 'educihumana',
// 		port:3306
// 	}
// });

module.exports = KNEX({
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'edutest2',
		port:3306
	}
});
