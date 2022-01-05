import { Customer } from "@prisma/client";
import express, { Request, Response } from "express";
import customerController from "../../../controllers/customer-controller";
import { uploadToStorage } from "../../../services/storage-service";
import multer from "multer";
import fs from "fs";

const router = express.Router();

router.get("/customers", async (req, res) => {
  const id = (req as any).authUserId;
  try {
    const customers = await customerController.fetch(id);
    return res.json({ customers });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Não foi possível obter os clientes." });
  }
});

async function saveCustomer(req: Request, res: Response) {
  const id = (req as any).authUserId;
  const customer: Customer = req.body;
  const status = customer.id > 0 ? 200 : 201;
  const errorMessage = customer.id > 0 ? "atualizar" : "criar";
  try {
    const updated = await customerController.save(id, customer);
    return res.status(status).json({ updated });
  } catch (e) {
    console.log("saveCustomer", e);
    return res
      .status(500)
      .json({ message: `Não foi possível ${errorMessage} o cliente.` });
  }
}

router.post("/customers", async (req, res) => {
  saveCustomer(req, res);
});

router.put("/customers", async (req, res) => {
  saveCustomer(req, res);
});

const upload = multer({
  dest: "./uploads/",
});

router.post(
  "/customers/profile-picture",
  upload.array("file"),
  async (req, res) => {
    const id = (req as any).authUserId;
    const customerId = Number(req.body.id);
    console.log("body: ", req.body.id);
    console.log("files: ", req.files);
    if (req.files) {
      try {
        // 1/1/arquivo
        const response = await uploadToStorage(
          // @ts-ignore
          req.files[0],
          `${id}/${customerId}/profile-picture`
        );
        const pictureUrl = response["secure_url"];
        if (pictureUrl) {
          await customerController.updatePicture(customerId, pictureUrl);
          return res.json({ success: true });
        }
      } catch (e) {
        console.log(e);
      } finally {
        // @ts-ignore
        fs.unlinkSync(req.files[0].path);
      }
    }
    return res
      .status(500)
      .json({ message: `Não foi possível salvar a imagem de perfil.` });
  }
);

export default router;
