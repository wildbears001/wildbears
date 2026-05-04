import express from 'express';
import { getSettings, updateCod, updateSocialLinks, updateRazorpayDiscount, updateDeliveryFee } from '../controllers/settingsController.js';

const router = express.Router();

router.get('/get', getSettings);
router.post('/update-cod', updateCod);
router.post('/update-social', updateSocialLinks);
router.post('/update-razorpay-discount', updateRazorpayDiscount);
router.post('/update-delivery-fee', updateDeliveryFee);

export default router;
