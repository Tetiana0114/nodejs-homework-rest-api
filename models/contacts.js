const fs = require('fs/promises');
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function readContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsRaw);
  return contacts;
}

async function writeContacts(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 4));
}


const listContacts = async () => {
    const contacts = await readContacts();
    return contacts;
}

const getContactById = async (contactId) => { 
    const contacts = await readContacts();
    const contactById = contacts.find((contact) => contact.id === contactId);
    return contactById;
}

const removeContact = async (contactId) => { 
    const contacts = await readContacts();
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    await writeContacts(updatedContacts);
}

const addContact = async (body) => { }

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
