'use strict';

var mongoose = require('mongoose');

var tenantSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String},
    apartment: {type: Number},
    phone: {type: Number},
    livesin: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

var Tenant = mongoose.model('Tenant', tenantSchema)
module.exports = Tenant;
