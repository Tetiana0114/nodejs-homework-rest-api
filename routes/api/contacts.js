const express = require('express');
const { nanoid } = require('nanoid');
const { listContacts, getContactById, removeContact,  addContact,  updateContact  } = require("../../models/contacts");

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' })
  }

  return res.status(200).json(contact);
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = { id: nanoid(4), name: name, email: email, phone: phone };

  await addContact(body);

  res.status(201).json(body);
})

// "delete" needs fixing

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' })
  }

  return res.status(200).json({ message: 'Contact deleted' });
})



router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router;