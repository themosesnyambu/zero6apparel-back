import { Router } from 'express';
import ReleaseController from '../controllers/releaseController';

const router = Router();

const {
  addNewRelease, getReleases, getRelease, deleteRelease, updateRelease,
} = ReleaseController;

router.post('/', addNewRelease);

router.get('/', [], getReleases);
router.get('/:id', [], getRelease);

router.delete(':/id', deleteRelease);

router.put('/:id', updateRelease);

export default router;
