import express from 'express';
import { 
    createPatient, 
    getPatients,
    getPatientDetail, 
    updatePatient, 
    deletePatient } from '../controllers/patientController.js';

import {verifyUser } from '../middleware/AuthUser.js'

const router = express.Router();

router.post('/', verifyUser, createPatient);
router.get('/', verifyUser, getPatients);
router.get('/:medicalRecordNumber', verifyUser, getPatientDetail);
router.put('/:medicalRecordNumber', verifyUser, updatePatient);
router.delete('/:medicalRecordNumber', verifyUser, deletePatient);

export default router;
