import express from 'express';
import { 
    getAllNurses,
    getNursesByPatinet,
    assignNurseToPatient,
    getPatientsByNurse,
    removeNurseFromPatient,
    updateNursesForPatient
} from '../controllers/nurseController.js';

const router = express.Router();

router.get('/nurses', getAllNurses);
router.get('/patients/:patientId/nurses', getNursesByPatinet);
router.get('/nurses/:nurseId/patients', getPatientsByNurse);
router.post('/patients/:patientId/assign-nurse', assignNurseToPatient);
router.delete('/patients/:patientId/remove-nurse', removeNurseFromPatient);
router.put('/patients/:patientId/update-nurse', updateNursesForPatient);

export default router;