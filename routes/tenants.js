var express = require('express');
var router = express.Router();

var Tenant = require('../models/tenant');


//GET /api/tenants  ----> return array of all tenants
//POST /api/tenants ----> create a new tenant

router.get('/', (req, res) => {
    Tenant.find({}, (err, tenants) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(tenants);
        }
    });
});
router.get('/:id', (req, res) => {
    Tenant.findById(req.params.id, (err, tenant) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(tenant);
        }
    });
});
router.get('/categories/:category', (req, res) => {
    console.log(req.params.category);
    Tenant.find({
        'category': req.params.category
    }, (err, tenants) => {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log('result:', tenants);
            res.send(tenants);
        }
    });
});
router.delete('/:id', (req, res) => {

    Tenant.findByIdAndRemove(req.params.id, (err, tenant) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send();
        }
    });
});

router.post('/', (req, res) => {
    console.log(req.body);
    var tenant = new Tenant(req.body);
    tenant.save((err, savedTenant) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(savedTenant)
        }
    });
});

router.put('/:id', (req, res) => {
    //req.params.id ---> document id
    //req.body ---> update obj
    Tenant.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, (err, tenant) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(tenant);
        }
    })
})
module.exports = router;
