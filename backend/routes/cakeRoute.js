import express from "express";
import {
  addCake,
  listCake,
  removeCake,
  updateCake,
  getCake,
} from "../controllers/cakeController.js";
import multer from "multer";

const cakeRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

cakeRouter.post("/add", upload.single("image"), addCake);
cakeRouter.get("/list", listCake);
cakeRouter.delete("/remove/:id", removeCake);
cakeRouter.put("/update/:id", upload.single("image"), updateCake);
cakeRouter.get("/:id", getCake);
export default cakeRouter;
