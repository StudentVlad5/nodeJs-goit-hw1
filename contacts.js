const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = await data.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  let data = await listContacts();
  const idContact = await data.findIndex((item) => item.id == contactId);
  if (idContact === -1) {
    return null;
  }
  const updatedContacts = data.filter((_, index) => index !== idContact);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  const removeContact = data[idContact];
  data = await listContacts();
  console.table(data)
return removeContact
}

async function addContact(contact) {
  const data = await listContacts();
  const updatedContact = { ...contact, id: v4() };
  data.push(updatedContact);
  console.table(data);
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return updatedContact;
}

async function updateContact(contact) {
  const contacts = await listContacts();
  const { id } = contact;
  const idContact = contacts.findIndex((item) => item.id === id);
  if (idContact === -1) {
    return null;
  }
  contacts[idContact] = { ...contact };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
