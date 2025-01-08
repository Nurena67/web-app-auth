import express from 'express';
import { 
    getNursesByPatinet,
    assignNurseToPatient
} from '../controllers/nurseController.js';

const router = express.Router();

router.get('/patients/:patientId/nurses', getNursesByPatinet);
router.post('/patients/:patientId/assign-nurse', assignNurseToPatient);

export default router;