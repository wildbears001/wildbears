import express from 'express';
import { getSettings, updateCod, updateSocialLinks } from '../controllers/settingsController.js';

const router = express.Router();

router.get('/get', getSettings);
router.post('/update-cod', updateCod);
router.post('/update-social', updateSocialLinks);

export default router;
