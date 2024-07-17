import Email from "../models/email.js";

export const saveSentEmails = (request, response) => {
  try {
    const email = new Email(request.body);
    email.save();

    response.status(201).json("Email saved successfully.");
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const getEmails = async (request, response) => {
  try {
    let emails;
    if (request.params.type === "trash") {
      emails = await Email.find({ trash: true });
    } else if (request.params.type === "allmail") {
      emails = await Email.find({});
    } else {
      emails = await Email.find({ type: request.params.type });
    }
    return response.status(200).json(emails);
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const moveEmailsToBin = async (request, response) => {
  try {
    await Email.updateMany(
      { _id: { $in: request.body } },
      { $set: { trash: true, starred: false, type: "" } }
    );
    return response.status(200).json("Emails Deleted successfully");
  } catch (error) {
    response.status(500).json(error.message);
  }
};
