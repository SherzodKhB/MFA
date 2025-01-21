import User from "../models/User.js";

const checkPhoto = async (req, res, next) => {

  const userId = req.user.userId 

  const user = await User.findOne({_id : userId });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  } 
  
  if (user.image) {
    return res.status(404).json({ message: 'Rasm allaqachon yuklagan' });
  }

  next()
}



export default checkPhoto