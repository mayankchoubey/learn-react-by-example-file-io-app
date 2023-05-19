import express from "express";
import multer from "multer";
import crypto from "crypto";
import { nanoid } from "nanoid";
import { readFile, stat, unlink, writeFile } from "fs/promises";

const storage = multer.memoryStorage();
const app = express();
const upload = multer({ storage });

const port = 3001;
const algorithm = "aes-256-ctr";
const uploadPath = process.cwd() + "/uploads";

let key = "file-encryption-key";
key = crypto.createHash("sha256").update(key).digest("base64").substr(0, 32);
const iv = crypto.randomBytes(16);

app.put("/api/files", upload.single("uploadedFile"), async (req, res) => {
  const fileId = nanoid(6);
  const fileName = `${uploadPath}/${fileId}`;
  await writeFile(fileName, encrypt(req.file.buffer));
  const metaFileName = `${fileName}.meta`;
  await writeFile(
    metaFileName,
    JSON.stringify({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
    }),
  );
  res.json({ fileUrl: `http://localhost:3000/${fileId}` });
});

app.get("/api/files/:fileId/meta", async (req, res) => {
  const fileId = req.params.fileId;
  const fileName = `${uploadPath}/${fileId}.meta`;
  try {
    const fileMeta = JSON.parse(await readFile(fileName, "utf-8"));
    res.json(fileMeta);
  } catch (e) {
    res.status(404).send();
  }
});

app.get("/api/files/:fileId", async (req, res) => {
  const fileId = req.params.fileId;
  const fileName = `${uploadPath}/${fileId}`;
  try {
    if (await stat(fileName)) {
      const encFileBuf = await readFile(fileName);
      const decFileBuf = decrypt(encFileBuf);
      await writeFile(fileName, decFileBuf);
      res.sendFile(fileName);
      res.on("finish", async () => {
        await unlink(fileName);
        await unlink(`${fileName}.meta`);
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`File.io vanilla app listening on port ${port}`);
});

const encrypt = (buffer) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const result = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return result;
};

function decrypt(buffer) {
  let encryptedBuffer = Buffer.from(buffer);
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted;
}
