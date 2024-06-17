import ChatDaoMongoDB from "../dao/mongodb/chat.dao.js";
const chatDao = new ChatDaoMongoDB();

export const getAll = async () => {
    try {
        return await chatDao.getAll();
    } catch (error) {
        throw new Error(error);
    }
};

export const createMsg = async (chat) => {
    try {
        return await chatDao.createMsg(chat);
    } catch (error) {
        throw new Error(error);
    }
};