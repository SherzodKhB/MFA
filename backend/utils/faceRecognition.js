
import { Canvas, Image, ImageData, loadImage } from 'canvas';
import faceapi from "face-api.js"
import path from 'path';
import fs from "fs"

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// const loadModels = async () => {
//   const modelPath = path.join(__dirname, '../models');

//   await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
//   await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
//   await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
// };


// const loadModels = async () => {
//   const modelPath = path.join(__dirname, '../models');
  
//   // Har bir model uchun bo'linmalarni aniq yuklash
//   await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath, 'ssd_mobilenetv1_model-shard');
//   await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath, 'face_recognition_model-shard');
//   await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath, 'face_landmark_68_model-shard');
// };

const loadModels = async () => {
  const modelPath = path.join(__dirname, '../models');
  console.log("Loading models from:", modelPath); // Model manzilini tekshirish

  try {
    // SSD MobileNet v1 modelining bo'linmalarini yuklash
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath, 'ssd_mobilenetv1_model-shard1');
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath, 'ssd_mobilenetv1_model-shard2');

    // Face Recognition modelining bo'linmalarini yuklash
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath, 'face_recognition_model-shard1');
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath, 'face_recognition_model-shard2');

    // Face Landmark 68 modelining bo'linmalarini yuklash
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath, 'face_landmark_68_model-shard1');
    // await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath, 'face_landmark_68_model-shard2');

    console.log("Models loaded successfully!");
  } catch (err) {
    console.error("Error loading models:", err);
  }
};


const compareFaces = async (savedImagePath, uploadedImagePath) => {

  await loadModels();

  
  try {
    const savedImage = await loadImage(savedImagePath);
    const uploadedImage = await loadImage(uploadedImagePath);
 
  const savedDescriptor = await faceapi.detectSingleFace(savedImage).withFaceLandmarks().withFaceDescriptor();
  const uploadedDescriptor = await faceapi.detectSingleFace(uploadedImage).withFaceLandmarks().withFaceDescriptor();

  if (!savedDescriptor || !uploadedDescriptor) {
    return false; // Yuz aniqlanmasa
  }
  const distance = faceapi.euclideanDistance(savedDescriptor.descriptor, uploadedDescriptor.descriptor);
  
  return distance < 0.6; // Threshold: 0.6 dan kichik bo'lsa mos deb hisoblaymiz
 
} catch (err) {
  console.error('Error detect images:', err);

}


};

export default compareFaces 
