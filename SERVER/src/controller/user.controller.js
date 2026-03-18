const { Webhook } = require("svix");
const UserModel = require("../models/user.model");

const handleUserCreated = async (
  clerkId,
  emailAddresses,
  firstName,
  lastName,
  imageUrl,
) => {
  try {
    const primaryEmail = emailAddresses?.[0]?.email_address;

    const newUser = new UserModel({
      clerkId,
      email: primaryEmail,
      firstName,
      lastName,
      imageUrl,
      role: "user",
    });

    await newUser.save();
    console.log(`✅ User created in MongoDB: ${clerkId}`);
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
};

const handleUserUpdated = async (
  clerkId,
  emailAddresses,
  firstName,
  lastName,
  imageUrl,
) => {
  try {
    const primaryEmail = emailAddresses?.[0]?.email_address;

    const updatedUser = await UserModel.findOneAndUpdate(
      { clerkId },
      {
        email: primaryEmail,
        firstName,
        lastName,
        imageUrl,
      },
      { new: true },
    );

    if (updatedUser) {
      console.log(`✅ User updated in MongoDB: ${clerkId}`);
    } else {
      console.warn(`⚠️ User not found for update: ${clerkId}`);
    }
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};

const handleUserDeleted = async (clerkId) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete({ clerkId });

    if (deletedUser) {
      console.log(`✅ User deleted from MongoDB: ${clerkId}`);
    } else {
      console.warn(`⚠️ User not found for deletion: ${clerkId}`);
    }
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
};

const clerkWebhookHandler = async (req, res) => {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("CLERK_WEBHOOK_SECRET not configured");
      res.status(500).json({ error: "Webhook secret not configured" });
      return;
    }

    const svixId = req.headers["svix-id"];
    const svixTimestamp = req.headers["svix-timestamp"];
    const svixSignature = req.headers["svix-signature"];

    if (!svixId || !svixTimestamp || !svixSignature) {
      res.status(400).json({ error: "Missing webhook headers" });
      return;
    }

    const wh = new Webhook(webhookSecret);
    let evt;

    try {
      evt = wh.verify(JSON.stringify(req.body), {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });
    } catch (err) {
      console.error("Webhook verification failed:", err.message);
      res.status(401).json({ error: "Invalid webhook signature" });
      return;
    }

    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook received: ${eventType} for user ${id}`);

    switch (eventType) {
      case "user.created":
        await handleUserCreated(
          id,
          email_addresses,
          first_name,
          last_name,
          image_url,
        );
        break;

      case "user.updated":
        await handleUserUpdated(
          id,
          email_addresses,
          first_name,
          last_name,
          image_url,
        );
        break;

      case "user.deleted":
        await handleUserDeleted(id);
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    res.status(200).json({
      statusCode: 200,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  clerkWebhookHandler,
};
