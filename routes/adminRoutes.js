const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const userController = require('../controllers/userController');
const { isPrivate } = require('../middlewares/checkAuth.js');

router.get('/adminmanagebooking', isPrivate, (req, res) => {
    res.render('adminmanagebooking', { title: 'Manage Users Bookings' });
});

router.get('/adminmanageuser', isPrivate, (req, res) => {
    res.render('adminmanageuser', { title: 'Manage Users' });
});


// router.get('/:id', isPrivate, userController.deleteUser);

// router.post('/search', isPrivate, userController.searchUser);

// router.post('/adminmanagebooking', isPrivate, bookingController.getAllBookings);

// router.post('/adminmanageuser', isPrivate, userController.getAllUsers);

module.exports = router;