import mongoose from "mongoose";

const chatCollection = 'messages';
const chatSchema = new mongoose.Schema({
    user: String,
    message: String
});

export const ChatModel = new mongoose.model(
    chatCollection,
    chatSchema
);