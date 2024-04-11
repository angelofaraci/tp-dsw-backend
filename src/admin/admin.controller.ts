import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Admin, AdminModel } from "./admin.entity.js";

const repository = AdminModel;

//verifies inputs

function sanitizeAdminInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id, //REVISAR!!!!!!!!!!!!!!
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  next();
}

//adds an Admin to the repository

async function add(req: Request, res: Response, next: NextFunction) {
  const input = req.body.sanitizedInput;
  const admin = await repository.findOne({ id: input.id });
  if (admin) {
    return res.status(400).send({ message: "Admin already exists" });
  }
  const newAdmin = new repository(input);
  await newAdmin.save();
  const token = jwt.sign({ _id: newAdmin.id, class: Admin }, "adminKey");
  return res.status(201).json({ token });
}

//sends email and password of an Admin and returns the correspondent token
async function getOne(req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const adminLogIn =
      (await repository.findOne({ email: email })) || undefined;
    if (!adminLogIn) {
      throw new Error("Wrong Email");
    }
    if (adminLogIn.password !== password) {
      throw new Error("Wrong Password");
    }
    const token = jwt.sign({ _id: adminLogIn._id, class: Admin }, "adminKey");
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(401).send({ message: error.message });
  }
}


//sends an _id to the repository and returns the correspondent JSON object

async function getAdminData(req: Request, res: Response, next: NextFunction) {
  const adminData = await repository.findById(res.locals.adminId);
  res.locals.admin = adminData;
  return res.status(200).json({ adminData });
}

//verifies token validity

function verifyToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === null) {
    return res.status(401).send("Unauthorized request");
  }
  const payload: any = jwt.verify(token, "adminKey");
  res.locals.adminId = payload._id;
  res.locals.adminClass = payload.class;
  res.status(200).send("Authorized");
  next();
}

//finds an object by id and updates by the req body
async function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const input = req.body.sanitizedInput;
  const admin = await repository.findOneAndUpdate({ id: input.id }, input);
  if (!admin) {
    return res.status(404).send({ message: "Admin not found" });
  }
  return res
    .status(200)
    .send({ message: "Admin updated successfully", data: admin });
}

//finds an object by id and deletes it
async function remove(req: Request, res: Response) {
  const id = req.params.id;
  const admin = await repository.findOneAndDelete({ id: id });
  if (!admin) {
    return res.status(404).send({ message: "Admin not found" });
  }
  return res.status(200).send({ message: "Admin deleted successfully" });
}
export {
  sanitizeAdminInput,
  add,
  getOne,
  verifyToken,
  getAdminData,
  update,
  remove,
};
