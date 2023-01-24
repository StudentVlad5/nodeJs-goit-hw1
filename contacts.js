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
  let contactIndex;
  const updatedContacts = data.filter(({ id }, index) => {
    if (id === contactId) {
      contactIndex = index;
    }
    return id !== contactId;
  });

  if (contactIndex) {
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return data[contactIndex];
  }
  return null;
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
  const data = await listContacts();
  const { id } = contact;
  const updatedContacts = data.map((contact) => {
    if (contact.id === id) {
      return { ...data, ...contact };
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return updatedContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
