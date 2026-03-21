import express from 'express';
import { addAdmin, listAdmins, deleteAdmin } from '../controllers/adminManagerController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/add', adminAuth, addAdmin);
router.get('/list', adminAuth, listAdmins);
router.post('/delete', adminAuth, deleteAdmin);

export default router;
