
import { Canvas, Image, ImageData } from 'canvas';
import faceapi from "face-api.js"
import path from 'path';
import fs from "fs"


faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const loadModels = async () => {
  const modelPath = path.join(__dirname, '../models');
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
};

const compareFaces = async (savedImagePath, uploadedImagePath) => {


  await loadModels();



  const savedImage = await Canvas.loadImage(savedImagePath);
  const uploadedImage = await Canvas.loadImage(uploadedImagePath);

  const savedDescriptor = await faceapi.detectSingleFace(savedImage).withFaceLandmarks().withFaceDescriptor();
  const uploadedDescriptor = await faceapi.detectSingleFace(uploadedImage).withFaceLandmarks().withFaceDescriptor();

  if (!savedDescriptor || !uploadedDescriptor) {
    return false; // Yuz aniqlanmasa
  }

  const distance = faceapi.euclideanDistance(savedDescriptor.descriptor, uploadedDescriptor.descriptor);

  return distance < 0.6; // Threshold: 0.6 dan kichik bo'lsa mos deb hisoblaymiz
};

export default compareFaces 
