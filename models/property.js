'use strict';

var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
    apartment: {type: Number},
    status: {type: String},
    rent: {type: Number},
    bedrooms: {type: Number},
    utilitiesPrice: {type: Number},
    residents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }]
});

var Property = mongoose.model('Property', propertySchema);
module.exports = Property;
