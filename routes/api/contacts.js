const express = require('express');
const { getContacts, getContact, createNewContact, deleteContact, changeContact } = require('../../controllers/contactsController');
const { useValidation } = require('../../middlewares/validationMiddleware');

const router = express.Router();


router.get('/', getContacts);
router.get('/:contactId', getContact);
router.post('/', useValidation, createNewContact);
router.delete('/:contactId', deleteContact);
router.put('/:contactId', useValidation, changeContact);
 

module.exports = router;