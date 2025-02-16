const Contact = require('../models/Contact');
const { getAllLinkedContacts } = require('../utils/contactUtils');

const identifyContact = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res.status(400).json({ error: 'Either email or phoneNumber is required' });
    }

    const query = { deletedAt: null };
    if (email) query.email = email;
    if (phoneNumber) query.phoneNumber = phoneNumber;

    const existingContacts = await Contact.find(query).sort('createdAt');

    if (existingContacts.length === 0) {
      const newContact = await Contact.create({ email, phoneNumber, linkPrecedence: 'primary' });

      return res.json({
        contact: {
          primaryContactId: newContact._id,
          emails: [email].filter(Boolean),
          phoneNumbers: [phoneNumber].filter(Boolean),
          secondaryContactIds: []
        }
      });
    }

    let primaryContact = existingContacts.find(c => c.linkPrecedence === 'primary');

    if (!primaryContact) {
      primaryContact = existingContacts.find(c => !c.linkedId) || existingContacts[0];
      await Contact.findByIdAndUpdate(primaryContact._id, {
        linkPrecedence: 'primary',
        linkedId: null
      });
    }

    const hasNewInfo = (email && !existingContacts.some(c => c.email === email)) ||
                      (phoneNumber && !existingContacts.some(c => c.phoneNumber === phoneNumber));

    const alreadyExistsAsSecondary = existingContacts.some(
      c => c.linkedId && c.email === email && c.phoneNumber === phoneNumber
    );

    if (!alreadyExistsAsSecondary && hasNewInfo) {
      await Contact.create({
        email,
        phoneNumber,
        linkedId: primaryContact._id,
        linkPrecedence: 'secondary'
      });
    }

    const otherPrimaryContacts = existingContacts.filter(
      c => c.linkPrecedence === 'primary' && c._id.toString() !== primaryContact._id.toString()
    );

    if (otherPrimaryContacts.length > 0) {
      await Promise.all(
        otherPrimaryContacts.map(async (contact) => {
          await Contact.findByIdAndUpdate(contact._id, {
            linkPrecedence: 'secondary',
            linkedId: primaryContact._id
          });
        })
      );
    }

    const allContacts = await getAllLinkedContacts(primaryContact._id);

    const emails = [...new Set(allContacts.map(c => c.email).filter(Boolean))];
    const phoneNumbers = [...new Set(allContacts.map(c => c.phoneNumber).filter(Boolean))];
    const secondaryContactIds = allContacts
      .filter(c => c.linkPrecedence === 'secondary')
      .map(c => c._id);

    if (primaryContact.email && emails.includes(primaryContact.email)) {
      emails.splice(emails.indexOf(primaryContact.email), 1);
      emails.unshift(primaryContact.email);
    }
    if (primaryContact.phoneNumber && phoneNumbers.includes(primaryContact.phoneNumber)) {
      phoneNumbers.splice(phoneNumbers.indexOf(primaryContact.phoneNumber), 1);
      phoneNumbers.unshift(primaryContact.phoneNumber);
    }

    res.json({
      contact: {
        primaryContactId: primaryContact._id,
        emails,
        phoneNumbers,
        secondaryContactIds
      }
    });
  } catch (error) {
    console.error('Error in /identify endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  identifyContact
};
