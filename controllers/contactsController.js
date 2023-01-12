const { Contact } = require('../models/contactsModel');


async function getContacts(req, res, next) {
  try {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getContact(req, res, next) {
  try {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }
    return res.status(200).json(contact);
    
  } catch (error) {
    next(error);
  }
}


async function createNewContact(req, res, next) {
  try {
  const { name, email, phone } = req.body;
  const body = {  name: name, email: email, phone: phone };

  const newContact = await Contact.create(body);

  return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}


async function deleteContact(req, res, next) {
  try {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  await Contact.findByIdAndRemove(contactId);
  return res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
}


async function changeContact(req, res, next) {
  try {
  const { contactId } = req.params;

  const changeContact = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!changeContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  return res.status(200).json(changeContact);
  } catch (error) {
    next(error);
  }
}


module.exports = {
    getContacts,
    getContact,
    createNewContact,
    deleteContact,
    changeContact,
};