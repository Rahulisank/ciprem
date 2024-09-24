
const db = require("./config/dbp"); // Ensure this path is correct
 
let conversations = {}; // Store active conversations in memory for quick access

const socketConnection = (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join_conversation', ({ conversationId, userId }) => {
        socket.join(conversationId);
        console.log(`User ${userId} joined conversation ${conversationId}`);
    });

    socket.on('send_message', async ({ conversationId, senderId, message }) => {
        const timestamp = new Date().toISOString();
        const newMessage = { senderId, message, timestamp };

        // Save the message in the database
        try {
            const query = `INSERT INTO messages (conversation_id, sender_id, message, timestamp) VALUES (?, ?, ?, ?)`;
            await pool.query(query, [conversationId, senderId, message, timestamp]);

            // Emit the message to everyone in the conversation room
            socket.to(conversationId).emit('receive_message', newMessage);

        } catch (error) {
            console.error("Error saving message to the database:", error);
        }

        // Also store in the in-memory conversations (optional for quick access)
        if (!conversations[conversationId]) {
            conversations[conversationId] = {
                _id: conversationId,
                messages: [],
                createdAt: timestamp,
                updatedAt: timestamp,
            };
        }
        conversations[conversationId].messages.push(newMessage);
        conversations[conversationId].updatedAt = timestamp;
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
};

const getAllConversations = async (userId) => {
    try {
        const query = `SELECT conversation_id, MAX(timestamp) AS last_message_time 
                       FROM messages 
                       WHERE sender_id = ? OR conversation_id IN 
                           (SELECT conversation_id FROM messages WHERE sender_id = ?)
                       GROUP BY conversation_id
                       ORDER BY last_message_time DESC`;
        const [rows] = await pool.query(query, [userId, userId]);
        return rows;
    } catch (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
};

const getMessages = async (conversationId) => {
    try {
        const query = `SELECT sender_id, message, timestamp FROM messages WHERE conversation_id = ? ORDER BY timestamp ASC`;
        const [rows] = await pool.query(query, [conversationId]);
        return rows;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};

module.exports = { socketConnection, getAllConversations, getMessages };
