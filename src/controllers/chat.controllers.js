import * as service from "../services/chat.services.js";

export const getAll = async (req, res, next) => {
    try {
      const messages = await service.getAll();
      res.render("chat", { messages });
    } catch (error) {
      res.render("error");
    }
  };