/**
 * This file handles all the cv routes
 */
const express = require('express');
const router = express.Router();
const mongoXlsx = require('mongo-xlsx'); // converts to excel file

const CV = require('../Models/cv');

// gets a user's cv
router.get('/:user_id', (req, res, next) => {
    CV.getCVByUserId(req.params.user_id, (err, cv) => {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(cv);
        }
    });
});

// create cv route (stores data in db)
router.post('/create', (req, res, next) => {
    const cv = req.body; // gets data sent to this URL
    
    CV.addCV(cv, (err, cv) => {
        // check for errors
        if (err) {
            res.json({success: false, msg: 'Failed to create CV'});
        } else {
            res.json({success: true, msg: 'CV successfully created'});
        }
    });
});

// Update cv
router.put('/update/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    const cv = req.body;
    CV.updateCV(user_id, cv, {}, (err, cv) => {
        if (err) {
            res.send(err);
        }
        // what is returned
        res.json({
            success: true,
            msg: 'Successfully updated'
        });
    });
});


// Delete cv
router.delete('/delete/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    CV.removeCV(user_id, (err, cv) => {
        if (err) {
            res.send(err);
        }
        res.json({success: true, msg: 'The Ciricullum vitae has been deleted successfully'});
    });
});

// export route
router.get('/export/:id', (req, res) => {
    CV.getCVById(req.params.id, (err, cv) => {
        if(err) {
            res.send(err);
        }else {
            const data = [cv];
            const model = mongoXlsx.buildDynamicModel(data);

            // generates Excel
            mongoXlsx.mongoData2Xlsx(data, model, function(err, data) {
                if(err) {
                    res.send(err);
                }
                res.json({success: true, msg: 'File converted succesfully.'});
            });
        }
    });
});

module.exports = router;