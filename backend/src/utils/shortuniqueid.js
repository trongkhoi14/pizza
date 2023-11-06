const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: process.env.LENGTH_UID });

module.exports = uid;