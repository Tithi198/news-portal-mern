import Contact from "../models/Contact.js";

export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400);
      throw new Error("All contact fields are required");
    }

    await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: "Your message has been received successfully",
    });
  } catch (error) {
    next(error);
  }
};