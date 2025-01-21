
import User from "../models/User.js";

const uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const userId = req.user.userId 

      const user = await User.findOne({_id : userId });

    
        user.image = `/uploads/${req.file.filename}`;
        user.verificationExpires = undefined;

        
        await user.save();
      
  
      res.status(200).json({
        message: 'Image uploaded successfully',
        imagePath: `/uploads/${req.file.filename}`,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };


  export default uploadImage