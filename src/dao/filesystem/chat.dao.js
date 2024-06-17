import fs from 'fs';

export default class ChatDaoFS {
    constructor(path){
        this.path = path;
    }

    createMsg = async (obj) => {
        try {
            const msg = {
                id: await this.#getMaxId() + 1,
                ...obj
            }
            const msgFile = await this.getAll()
            msgFile.push(msg)
            await fs.promises.writeFile(this.path, JSON.stringify(msgFile));
            return msg;
        } catch (error) {
            console.log(error);
        }
    }

    #getMaxId = async () => {
        let maxId = 0;
        const msgs = await this.getAll();
        msgs.map((msg) => {
            if(msg.id > maxId) maxId = msg.id;
        });
        return maxId;
    }

    getAll = async () => {
        try {
            if (fs.existsSync(this.path)){
                const msgs = await fs.promises.readFile(this.path, 'utf-8');
                const msgsJS = JSON.parse(msgs);
                return msgsJS;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    getById = async (id) => {
        const msgFile = await this.getAll();
        const msg = msgFile.find((sms) => sms.id === id);
        if(msg){
            return msg;
        }
        return false;
    }

    updateMsg = async (obj, id) => {
        try {
            const msgsFile = await this.getAll();
            const index = msgsFile.findIndex(msg => msg.id === id);
            if(index === -1){
                throw new Error(`Id ${id} does not exist`);
            } else {
                msgsFile[index] = {...obj, id};
            }
            await fs.promises.writeFile(this.path, JSON.stringify(msgsFile));
        } catch (error) {
            console.log(error);
        }
    }

    deleteMsg = async (id) => {
        const msgsFile = await this.getAll();
        if(msgsFile.length > 0) {
            const newArray = msgsFile.filter( m => m.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
        } else {
            throw new Error('Message not found');
        }
    }

    deleteMsgs = async () => {
        if(existsSync(this.path)) {
        await fs.promises.unlink(this.path);
        }
    }
}