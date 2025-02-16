const Contact = require('../models/Contact');

async function getAllLinkedContacts(primaryContactId) {
  const contacts = await Contact.find({
    $or: [
      { _id: primaryContactId },
      { linkedId: primaryContactId }
    ],
    deletedAt: null
  }).sort('createdAt');

  return contacts;
}

module.exports = {
  getAllLinkedContacts
};