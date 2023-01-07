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
    return res.status(404).json({ message: 'Not found' })
  }

  return res.status(200).json(contact);
})


router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = { id: nanoid(4), name: name, email: email, phone: phone };
  
  if (!name) {
    return res.status(400).json({ message: 'name is required field' })
  } else if (!email) {
     return res.status(400).json({ message: 'email is required field' })
  } else if (!phone) {
     return res.status(400).json({ message: 'phone is required field' })
  }

  const newContact = await addContact(body);

  return res.status(201).json(newContact);
})


router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  await removeContact(contactId);

  return res.status(200).json({ message: 'Contact deleted' });
})
 

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if(!req.body || !name || !email || !phone) {
    return res.status(400).json({ message: 'Missing fields: name, email and phone!' })
  }
 
  const changeContact = await updateContact(contactId, req.body);
  
  if (!changeContact) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json(changeContact);
})

module.exports = router;