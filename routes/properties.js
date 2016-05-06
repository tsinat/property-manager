var express = require('express');
var router = express.Router();

var Property = require('../models/property');
var Tenant = require('../models/tenant');



router.get('/', (req, res) => {

    //find all properties where property.residents.length < properties.bedrooms

    Property.find()
        .$where('this.bedrooms > this.residents.length')
        .exec((err, properties) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(properties);
            }
    });
});

router.get('/:id', (req, res) => {
    Property.findById(req.params.id, (err, property) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(property);
        }
    });
});
router.post('/getsome', (req, res) => {
    Property.find({
        rent: req.body.value
    }, (err, properties) => {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log(properties);
            res.send(properties);
        }
    });
})
router.get('/categories/:category', (req, res) => {
    Property.find({
        'category': req.params.category
    }, (err, properties) => {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log('result:', properties);
            res.send(properties);
        }
    });
});
router.delete('/:id', (req, res) => {
    Property.findByIdAndRemove(req.params.id, (err, property) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send();
        }
    });
});

router.post('/', (req, res) => {
    var property = new Property(req.body);
    property.save((err, savedProperty) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(savedProperty)
        }
    });
});
//add tenant to property
router.put('/:tenantId/rent/:propertyId', (req, res) => {

    var tenantId = req.params.tenantId;
    var propertyId = req.params.propertyId;

    Property.findById(propertyId, (err1, property) => {
        Tenant.findById(tenantId, (err2, tenant) => {
            if (err1 || err2) return res.status(400).send(err1 || err2);

            property.residents.push(tenantId);
            tenant.livesin.push(propertyId);

            property.save((err1, savedProperty) => {
                tenant.save((err2, savedTenant) => {
                    res.status(err1 || err2 ? 400 : 200).send(err1 || err2 || savedProperty);
                })
            });
        })

    });
});
//remove tenant from property
router.put('/:tenantId/removed/:propertyId', (req, res) => {

    var tenantId = req.params.tenantId;
    var propertyId = req.params.propertyId;

    Property.findById(propertyId, (err1, property) => {
        Tenant.findById(tenantId, (err2, tenant) => {
            if (err1 || err2) return res.status(400).send(err1 || err2);

            property.residents = property.residents.filter(id => {
                return id.toString() !== tenantId.toString();
            });

            tenant.livesin = tenant.livesin.filter(id => {
                return id.toString() !== propertyId.toString();
            });
            property.save((err1) => {
                tenant.save((err2) => {
                    res.status(err1 || err2 ? 400 : 200).send(err1 || err2);
                });
            });
        });

    });
});
router.put('/:id', (req, res) => {
    //req.params.id ---> document id
    //req.body ---> update obj
    Property.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, (err, property) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(property);
        }
    })
})
module.exports = router;
