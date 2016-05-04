var express = require('express');
var router = express.Router();

var Property = require('../models/property');


router.get('/', (req, res) => {
    Property.find({}, (err, properties) => {
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
    Property.find({rent:req.body.value}, (err, properties) => {
            if (err) {
                res.status(400).send(err);
            } else {
                console.log(properties);
                res.send(properties);
            }
    });
})
router.get('/categories/:category', (req, res) => {
    console.log(req.params.category);
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
    console.log(req.body);
    var property = new Property(req.body);
    property.save((err, savedProperty) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(savedProperty)
        }
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
