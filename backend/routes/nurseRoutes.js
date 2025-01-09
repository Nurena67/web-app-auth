import express from 'express';
import { 
    getNursesByPatinet,
    assignNurseToPatient,
    getPatientsByNurse,
    removeNurseFromPatient
} from '../controllers/nurseController.js';

const router = express.Router();

router.get('/patients/:patientId/nurses', getNursesByPatinet);
router.get('/nurses/:nurseId/patients', getPatientsByNurse);
router.post('/patients/:patientId/assign-nurse', assignNurseToPatient);
router.post('/patients/:patientId/remove-nurse', removeNurseFromPatient);

export default router;