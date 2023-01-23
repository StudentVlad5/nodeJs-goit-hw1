const contactsOperations = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "contacts id")
  .option("-n, --name <type>", "contacts name")
  .option("-e, --email <type>", "contacts email")
  .option("-p, --phone <type>", "contacts phone");

program.parse(process.argv);
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contactsOperations.listContacts();
      console.table(contactsList);
      break;
    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`contact whith id = ${id} not found`);
      }
      console.log(contact);
      break;
    case "remove":
      const contactToRemove = await contactsOperations.removeContact(id);
      if (!contactToRemove) {
        throw Error(`contact whith id = ${id} not found`);
      }
      console.log(contactToRemove);
      break;
    case "add":
      const contacToAdd = await contactsOperations.addContact({
        name,
        email,
        phone,
      });
      console.log(contacToAdd);
      break;
    case "updateById":
      const contacToUpdate = await contactsOperations.updateContact({
        id,
        name,
        email,
        phone,
      });
      if (!contacToUpdate) {
        throw new Error(`contact whith id = ${id} not found`);
      }
      console.log(contacToUpdate);
      break;
    default:
      console.log(`No ${action} type of action`);
  }
}

invokeAction(options);
