const {Webhook} = require("svix")

const clerkWebhookHandler = async (req, res) => {
    try {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

        if(!webhookSecret){
            console.error("CLERK_WEBHOOK_SECRET not configared")

       res.status(500).json({
            statusCode : 500,
            message : "CLERK_WEBHOOK_SECRET not configared",
            error : error,
        })
    }


    // Get webhook headers
    const svixId = req.headers["svix-id"];
    const svixTimestamp = req.headers["svix-timestamp"];
    const svixSignature = req.headers["svix-signature"];

    if(!svixId || svixTimestamp || svixSignature){
        res.status(400).json({
            statusCode : 400,
            message : "Missing webhook headers",
            error : error,
        })
    }

    // create webhook instance

    const wh = new Webhook(webhookSecret)
    let evt;

    try{
        // Verify webhook signature
        evt = wh.verify(JSON.stringify(req.body),{
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature,
        });
    } catch (err) {
        console.error("webhook verification failed", err.message);
       res.status(400).json({
            statusCode : 400,
            message : "Invalid Signature",
            error : err,
        })
    }

    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const eventType = evt.type;

    console.log(`webhook received : ${eventType} for user ${id}`)

    // user create
    // user update
    // user delete

    switch(eventType){
        case "user.created":
        await handleUserCreated(id, email_addresses, first_name, last_name, image_url)
        break;
        case "user.updated" :
        await handleUserUpdated(id, email_addresses, first_name, last_name, image_url)
        break;
        case "user.deleted" :
        await handleUserDeleted(id)
        break;

        default :
        console.log(`Unhandled event type $${eventType}`);
            
     }

        res.status(200).json({
            statusCode : 200,
            message : "webhook processed successfully",
        })

    } catch (error) {
        res.status(500).json({
            statusCode : 500,
            message : "Internal server error",
            error : error,
        })
    }
}

// create new user in db
const handleUserCreated = async (
    clerkId,
    emailAddresses,
    firstName,
    lastName,
    imageUrl,
) => {
    try {
        const newUser = new User({
            clerkId,
            email: emailAddresses[0].email_address,
            firstName,
            lastName,
            imageUrl,
            role:"user",
        });
        await newUser.save();
        console.log(`User created in MongoDB: ${clerkId}`);
    }catch(error) {
        console.error("Error creating user:", error.message);
        throw error;
    }
    };

    const handleUserDeleted = async (clerkId) => {
        try {
            const deletedUser = await User.findOneAndDelete({ clerkId });

            if (deletedUser) {
                console.log(`User deleted from mongoDB: ${clerkId}`);
            } else {
                console.warn(`User not found for delation: ${clerkId}`);
            }
            } catch (error) {
                console.error("Error deleting user:", error.message);
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
        const updatedUser = await User.findOneAndUpdate(
            { clerkId },
            {
            email: emailAddresses[0].email_address,
            firstName,
            lastName,
            imageUrl,
            },
            { new: true}
        );

        if (updatedUser) {
            console.log(`User updated is MongoDB: ${clerkId}`);
        } else {
            console.warn(`User not found for update: ${clerkId}`);
        }
        } catch (error) {
            console.error(`Error updating user:`, error.message);
            throw error;
        }
    };

    module.exports = {
        clerkWebhookHandler,
    }