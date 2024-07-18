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
    } else if (request.params.type === "starred") {
      emails = await Email.find({ starred: true, trash: false });
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

export const deleteEmails = async (request, response) => {
  try {
    await Email.deleteMany({ _id: { $in: request.body } });
    return response.status(200).json("Emails deleted successfully");
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const toggleStarredEmails = async (request, response) => {
  try {
    await Email.updateOne(
      {
        _id: request.body.id,
      },
      {
        $set: { starred: request.body.value },
      }
    );
    return response.status(200).json("Email is starred.");
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const updateType = async (request, response) => {
  try {
    const { id, type } = request.body;

    const email = await Email.findById(id);

    if (!email) {
      return response.status(404).json({ error: "Email not found." });
    }

    if (email.trash === true) {
      if (email.trash === false) {
        await Email.findByIdAndUpdate(id, { type: type, trash: true });
      }
    } else {
      await Email.findByIdAndUpdate(id, { type: type, trash: false });
    }

    return response.status(200).json("Email type updated.");
  } catch (error) {
    response.status(500).json(error.message);
  }
};
