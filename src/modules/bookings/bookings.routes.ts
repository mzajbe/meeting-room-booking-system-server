import express from 'express';
import { bookingController } from './bookings.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create',bookingController.createBooking);
router.get('/getb',bookingController.getAllBookings );
router.get('/my-bookings',auth(), bookingController.getUserBookings);
router.get("/user/:userId", bookingController.getBookingsByUser);

// PUT request to update booking
router.put('/bookings/:id', bookingController.updateBooking);
router.put('/bookings/reject/:id', bookingController.rejectBooking);

router.delete('/bookings/:id',bookingController.deleteBooking);


export const BookingsRoutes = router;