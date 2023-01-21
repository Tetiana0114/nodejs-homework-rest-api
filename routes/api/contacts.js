const express = require('express');
const { getContacts, getContact, createNewContact, deleteContact, changeContact, updateStatusContact  } = require('../../controllers/contactsController');
const { addBodyValidation } = require('../../middlewares/validationMiddleware');
const { addContactSchema, updateContactSchema, updateStatusSchema } = require('../../schemas/contactsSchemas');

const router = express.Router();


router.get('/', getContacts);
router.get('/:contactId', getContact);
router.post('/', addBodyValidation(addContactSchema), createNewContact);
router.delete('/:contactId', deleteContact);
router.put('/:contactId', addBodyValidation(updateContactSchema), changeContact);
router.patch('/:contactId/favorite', addBodyValidation(updateStatusSchema), updateStatusContact);
 

module.exports = router;