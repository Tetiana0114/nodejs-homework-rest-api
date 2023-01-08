const express = require('express');
const { getContacts, getContact, createNewContact, deleteContact, changeContact } = require('../../controllers/contactsController');
const { addContactsValidation } = require('../../middlewares/validationMiddleware');
const { addContactSchema, updateContactSchema } = require('../../schemas/contactsSchemas');

const router = express.Router();


router.get('/', getContacts);
router.get('/:contactId', getContact);
router.post('/', addContactsValidation(addContactSchema), createNewContact);
router.delete('/:contactId', deleteContact);
router.put('/:contactId', addContactsValidation(updateContactSchema), changeContact);
 

module.exports = router;