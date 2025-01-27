// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, verifyToken, addUser } from '../services/authService.js';
import { addLevel } from '../services/challengeService.js';
import multer from 'multer';
import path from 'path';
import fs from "fs";

const router = express.Router();

// const fileFilter = (req, file, cb) => {
//   const filetypes = /.mp4|.avi|.mkv/
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

//   if (extname) {
//     return cb(null, true);
//   } else {
//     cb('Error: Videos Only!');
//   }
// };
const fileStorage = () => {
  return {

    fileStorage: multer.diskStorage({
      destination: function (req, file, cb) {
        let { id } = req.body;

        let fieldName = file.fieldname;
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        let currentDateFolder = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        let dir = `./uploads/${currentDateFolder}/${id}`;
        console.log("fileName---> 3" + id, dir);

        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
      },
      filename: function (req, file, cb) {
        const name = file.originalname.split(".");

        // Math.floor(Date.now() / 1000) +
        const fileName = name[0] + path.extname(file.originalname);
        cb(null, fileName);

      },

    }),

  }
}

const upload = multer({
  storage: fileStorage().fileStorage,
  dest: "/uploads",
  // fileFilter,
  limits: { fileSize: 100000000 },
})


// Sample route
router.get('/', (req, res) => {
  res.send('Server is running!');
});

// Register route
router.post('/register', async (req, res) => {
  const data = req.body;
  try {
    // const verifyUser = await findUserByEmail(email);
    // console.log("verifyUser", verifyUser)
    // only super Admin can create parent and child.
    // parent and child both can sign-up

    const user = await registerUser(data);
    return res.status(201).json({ message: 'User registered successfully', user });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // const { token } = await loginUser(email, password);
    const user = await loginUser(email, password);
    res.json({ message: 'Login successful', user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});



// Token validation route (protected)
router.post('/validate-token', async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = await verifyToken(token);
    res.json({ message: 'Token is valid', userId: decoded.userId });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});


// // **** Users-Start ***//

// addUser as parent
router.post('/addUser', async (req, res) => {
  const data = req.body
  try {
    const user = await addUser(data)
    if (!user) {
      return res.status(400).json({ message: "invalid user-type" });

    }
    return res.status(201).json({ message: 'User add successfully', user });
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }

});
// **** Users-End ***//


// **** Challenges-Start ***//

// Add Challenge Level
router.post('/addLevel', async (req, res) => {
  const data = req.body;

  try {
    const level = await addLevel(data);
    if (!level) {
      return res.status(400).json({ message: 'Something went wrong', level });
    }
    return res.status(201).json({ message: 'Level add successfully', level });


  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/uploadMedia', upload.single("video"), async (req, res) => {
  const { id } = req.body;
  const file = req.file;
  console.log("video--> 1", file, id)
  try {
    let mediaUrls = {
      video: null,
    };
    if (file) {
      mediaUrls.video = `./uploads/${file.filename}`;
      return res.status(201).json({ message: 'Level add successfully', mediaUrls });

    }
    return res.status(400).json({ message: "something went wrong!" });
  } catch (err) {

    return res.status(500).json({ message: err.message });

  }

})


// **** Challenges-End ***//

export default router;