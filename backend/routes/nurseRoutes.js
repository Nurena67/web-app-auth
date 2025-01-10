import express from 'express';
import { 
    getAllNurses,
    getNursesByPatinet,
    assignNurseToPatient,
    getPatientsByNurse,
    removeNurseFromPatient
} from '../controllers/nurseController.js';

const router = express.Router();

router.get('/nurses', getAllNurses);
router.get('/patients/:patientId/nurses', getNursesByPatinet);
router.get('/nurses/:nurseId/patients', getPatientsByNurse);
router.post('/patients/:patientId/assign-nurse', assignNurseToPatient);
router.post('/patients/:patientId/remove-nurse', removeNurseFromPatient);

export default router;