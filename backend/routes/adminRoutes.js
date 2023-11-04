import express from 'express'
import * as adminController from './../controllers/adminController.js'
const router = express.Router();

router
.route('/discount')
.get(adminController.checkCouponAvailability, adminController.getDiscount)

router
.route('/stats')
.get(adminController.getStats)

export default router