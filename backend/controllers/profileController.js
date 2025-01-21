// controllers/profileController.js
exports.uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      res.status(200).json({
        message: 'Image uploaded successfully',
        imagePath: `/uploads/${req.file.filename}`,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
