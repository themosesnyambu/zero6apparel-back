import { Router } from 'express';
// import { getModelForClass } from '@typegoose/typegoose';
// import AuthMiddleware from '../middlewares/authMiddleware';
import ReleaseController from '../controllers/releaseController';
// import { Release } from '../models/release';

// const { authenticate } = AuthMiddleware;

// const ReleaseModel = getModelForClass(Release);
const router = Router();

const {
  addNewRelease, getRelease, deleteRelease, updateRelease, getReleases,
} = ReleaseController;

router.post('/', addNewRelease);

router.get('/', [], getReleases);

router.get('/:id', [], getRelease);

router.delete('/:id', deleteRelease);

router.put('/:id', updateRelease);

export default router;
