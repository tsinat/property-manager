'use strict';

var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
    apartment: {type: Number},
    status: {type: String},
    rent: {type: Number},
    utilitiesPrice: {type: Number}
});

var Property = mongoose.model('Property', propertySchema);
module.exports = Property;
