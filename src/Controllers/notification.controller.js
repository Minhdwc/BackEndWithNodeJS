const Joi = require("joi");
const notification = require("../Services/notification.service");

const create = async (req, res) => {
  try {
    const idUser = req.user;
    const schema = Joi.object({
      userId: idUser._id.tostring(),
      message: Joi.string(),
      isRead: false,
    });
    const { error, values } = schema.validate(req.body);
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    const data = req.body;
    const response = await notification.createNotification(data);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getNotiByUser = async(req, res)=>{
    try{
        const userId = req.user._id;
        const response = await notification.getNotificationOfUser(userId);
        return res.status(200).json(response);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

const update = async(req, res)=>{
    try{
        const userId = req.user._id;
        const data = req.body
        if(!userId){
            return res.status(500).json({message: err.message})
        }
        const response = await notification.updateNoti(userId, data)
        return res.status(200).json(response);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
  create,
  getNotiByUser,
  update
};
