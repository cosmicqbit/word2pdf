import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import docxtopdf from "docx-pdf";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Setting up the file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// File conversion handling

app.post("/convertfile", upload.single("file"), (req, res, next) => {
  try {
    // Check if file is uploaded or not
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Output file path
    let outputPath = path.join(
      __dirname,
      "files",
      `${req.file.originalname}.pdf`
    );

    // console.log("req.file.path: ", req.file.path);

    docxtopdf(req.file.path, outputPath, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error converting docx to pdf",
        });
      }

      // Download the converted file
      res.download(outputPath, () => {
        console.log("File Downloaded");
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.use(cors);

// Port listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
