const express = require('express');
const userRouter = express.Router();

// User model
let userModel = require('../models/user.js');

userRouter.route('/').get((req, res, next) => {
    userModel.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

userRouter.route('/create').post((req, res, next) => {
    userModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

userRouter.route('/edit/:id').get((req, res, next) => {
    userModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Update student
userRouter.route('/update/:id').post((req, res, next) => {
    userModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
})

// Delete student
userRouter.route('/delete/:id').delete((req, res, next) => {
    userModel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = userRouter;