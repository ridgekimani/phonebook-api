import { Router, Response } from 'express';
import router from '../routeMiddleware';
import Contact from '../../../models/Contact';
import IRequest from '../../../interfaces/request';

router.route('/:contact').patch(async (req: IRequest, res: Response) => {
  const contactID = req.params.contact;

  if (!contactID) {
    return res.status(400).json({
      error: {
        message: 'Contact id is required'
      }
    });
  }

  const contact = await Contact.findOne({ where: { contactID, userId: req.userId } });
  if (!contact) {
    return res.status(404).json({
      error: {
        message: 'Contact does not exist'
      }
    });
  }
  try {
    await Contact.destroy({ where: { userId: req.userId, contactID } });
    return res.status(204);
  } catch (e) {
    return res.status(e.status);
  }
});

export const UpdateContact: Router = router;
