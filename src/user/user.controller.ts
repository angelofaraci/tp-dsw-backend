import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, UserModel } from "./user.entity.js";
import { Types } from "mongoose";
import { ReviewModel } from "../review/review.entity.js";

const repository = UserModel;


//verifies inputs

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id, //REVISAR!!!!!!!!!!!!!!
    username: req.body.username,
    score: req.body.score,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    level: req.body.level,
  };

  next();
}

//adds an User to the repository and returns the correspondant token

async function add(req: Request, res: Response, next: NextFunction) {
  const input = req.body.sanitizedInput;
  input.level = 1;
  input.score = 0;
  const user = await repository.findOne({
    $or: [{ email: input.email }, { username: input.username }],
  });
 
  if (user) {
    if ((user.email == input.email)) {
      return res
        .status(400)
        .send({ message: "User with that email already exists", case:'email' });
    }
    return res.status(400).send({ message: "Username taken", case:'username' });
  }
  const newUser = new repository(input);
  await newUser.save();
  const token = jwt.sign({ _id: newUser._id }, "secretKey");
  return res.status(201).json({ token });
}

//sends email and password of an User and returns the correspondent token

async function getOne(req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;
    const userLogIn = (await repository.findOne({ email: email })) || undefined;
    if (!userLogIn) {
      return res.status(401).send({message: "This email does not correspond to any account", case:'email'});
    }
    if (userLogIn.password !== password) {
      return res.status(401).send({message: "Wrong Password", case:'password'});
    }
    const token = jwt.sign({ _id: userLogIn._id }, "secretKey");
    return res.status(200).json({ token });

}

//sends an _id to the repository and returns the correspondent JSON object

async function getUserData(req: Request, res: Response, next: NextFunction) {
  const userData = await repository.findById(res.locals.userId);
  res.locals.user = userData;
  return res.status(200).json({ userData });
}



async function getAllUsersPublicData(req: Request, res: Response) {
  const input = await repository.find();
  const users = input.map((user) => ({
    username: user.username,
    level: user.level,
    email: user.email,
    score: user.score,
  }));
  if (users){
    return res.status(200).json(users)
  }
  return res.status(401).send({message: 'There was an error'})
}

//change the username of an User

async function changeUsername(req: Request, res: Response, next: NextFunction) {
  const username = req.body.username;
  const exists = await repository.findOne({ username: username });
  if (exists) {
    return res.status(400).send({ message: "This username is already taken" });
  }
  const id = res.locals.userId;
  const user = await repository.findOneAndUpdate(
    { _id: id },
    { username: username },
    { new: true }
  );
  if (user) {
    return res.status(200).json({ user });
  }
  return res.status(401).send({ message: "User not found" });
}

//change the level of an User

async function changeLevel(req: Request, res: Response, next: NextFunction) {
  const input = req.body.sanitizedInput;
  let newLevel = 0
  switch(req.params.action){
    case 'up':
      newLevel = input.level + 1;
      break
    case 'down':
      if(input.level >= 2){
        newLevel =  input.level - 1;
      }
      else return res.status(400).send({message: "Users level cannot be lower than 1"})
      break
    default:
      return res.status(401).send({message: "Action not defined"})
  }
  const user = await repository.findOneAndUpdate(
    { username: input.username },
    { level: newLevel },
    { new: true }
  );
  if (user) {
    return res.status(200).json({ user });
  }
  return res.status(401).send({ message: "User not found" });
}

async function getOneUserPublicData(req: Request, res: Response) {
  const input = await repository.findOne({ username: req.params.username });
  const publicInput = {
    _id: input?._id,
    email: input?.email,
    username: req.params.username,
    level: input?.level,
    score: input?.score,
  };
  if (input) {
    return res.status(200).json({ publicInput });
  }
  return res.status(401).send({ message: "User not found" });
}


//verifies token validity

type Payload = {
  _id: string;
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === null) {
    return res.status(401).send("Unauthorized request");
  }
  const payload= jwt.verify(token, "secretKey") as Payload;
  res.locals.userId = payload._id;
  next();
}

//verifies token role
function verifyTokenRole(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token === null) {
    return res.status(401).send("Unauthorized request");
  }
  const payload = jwt.verify(token, "adminKey");
  next();
}



//delete an User by its id

async function deleteUser(req: Request, res: Response) {
  const id: Types.ObjectId = new Types.ObjectId(req.params.id);
  const result = await repository.findByIdAndDelete(id);
  if (result) {
    return res.status(204).send("User deleted succesfully");
  }
  return res.status(401).send("Something went wrong");
}

//delete an User by its id

async function deleteThisUser(req: Request, res: Response) {
  const id = res.locals.userId;
  const result = await repository.findByIdAndDelete(id);
  if (result) {
    return res.status(204).send("User deleted succesfully");
  }
  return res.status(401).send("Something went wrong");
}


export {
  deleteUser,
  deleteThisUser,
  sanitizeUserInput,
  add,
  getOne,
  verifyToken,
  verifyTokenRole,
  getUserData,
  changeLevel,
  changeUsername,
  getOneUserPublicData,
  getAllUsersPublicData
};
