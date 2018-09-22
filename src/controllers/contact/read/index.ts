import { Router, Response } from 'express';
import router from '../routeMiddleware';
import User from '../../../models/User';
import Contact from '../../../models/Contact';
import IRequest from '../../../interfaces/request';
router.route('/:contact?').get(async (req: IRequest, res: Response) => {
  const contactID = req.params.contact;
  if (contactID) {
    const contact = await Contact.findOne({ where: { contactID, userId: req.userId } });
    if (contact) {
      return res.status(200).json({
        success: {
          contact
        }
      });
    }
    return res.status(404).json({
      error: {
        message: 'Contact does not exist'
      }
    });
  }
  // Return all contacts
  const user = await User.findOne({ where: { email: req.user }, include: [Contact] });
  if (user) {
    return res.status(200).json({
      success: {
        contacts: user.contacts
      }
    });
  }
  return res.status(404).json({
    error: {
      message: 'User does not exist'
    }
  });
});
export const ReadContacts: Router = router;
