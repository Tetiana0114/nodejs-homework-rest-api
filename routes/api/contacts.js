const express = require('express');
const { getContacts, getContact, createNewContact, deleteContact, changeContact, updateStatusContact  } = require('../../controllers/contactsController');
const { addContactsValidation } = require('../../middlewares/validationMiddleware');
const { addContactSchema, updateContactSchema, updateStatusSchema } = require('../../schemas/contactsSchemas');

const router = express.Router();


router.get('/', getContacts);
router.get('/:contactId', getContact);
router.post('/', addContactsValidation(addContactSchema), createNewContact);
router.delete('/:contactId', deleteContact);
router.put('/:contactId', addContactsValidation(updateContactSchema), changeContact);
router.patch('/:contactId/favorite', addContactsValidation(updateStatusSchema), updateStatusContact);
 

module.exports = router;