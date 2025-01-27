import { createLevel } from "../models/challengeModel.js";

const addLevel = async (data, file) => {
  const { id, userType, levelName, fileName, quiz, type } = data;
  // console.log(err)

  let isVideo = ''
  try {
    if (fileName != null) {
      isVideo = fileName
    } else {
      isVideo = 'no-video'
    }
    // quiz -> array of object;
    const level = await createLevel(userType, levelName, JSON.stringify(quiz), type, isVideo, id);

    return level;

  } catch (error) {

    throw new Error('Level could not add!');
  }
}


export { addLevel }
