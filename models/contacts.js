const fs = require('fs/promises');
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function readContacts() {
  const contactsRaw = await fs.readFile(contactsPath);
  return JSON.parse(contactsRaw);
}

async function writeContacts(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 4));
}


const listContacts = async () => {
    return await readContacts();
}


const getContactById = async (contactId) => { 
    const contacts = await readContacts();
    return  contacts.find((contact) => contact.id === contactId);
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
