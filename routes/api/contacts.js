const express = require('express');
const { listContacts, getContactById, removeContact,  addContact,  updateContact  } = require("../../models/contacts");
const { HttpError } = require("../../helpers/index.js");

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    message: 'Get a list of contacts',
    status: 200,
    data: {
      contacts,
    }
  });
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return next(HttpError(404, "Contact not found"));
  }

  return res.json({
    message: 'Get contact by id',
    status: 200,
    data: { contact },
});
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    next(HttpError(404, 'Not found'));
  }
  await removeContact(contactId);
  res.json({
    message: 'contact deleted',
    status: 200,
  });
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router;
