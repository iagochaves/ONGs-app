const knex = require('knex');
const config = require('../../knexfile');

const choose = process.env.NODE_ENV === 'test' ? config.test : config.development;

const conn = knex(choose);

module.exports = conn;