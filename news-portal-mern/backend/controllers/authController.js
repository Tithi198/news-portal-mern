import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const sendUserResponse = (res, user, statusCode=200) => {
  res.status(statusCode).json({
    token: generateToken(user._id),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role
    }
  });
};

export const registerUser = async (req,res,next) => {
  try{
    const {name,email,password} = req.body;
    if(!name || !email || !password) throw new Error("Name, email, password required");
    const userExists = await User.findOne({email});
    if(userExists) throw new Error("User already exists");
    const user = await User.create({name,email,password});
    sendUserResponse(res,user,201);
  }catch(error){ next(error) }
};

export const loginUser = async (req,res,next) => {
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && await user.matchPassword(password)){
      sendUserResponse(res,user);
    }else{
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }catch(error){ next(error) }
};

export const getMe = async (req,res) => {
  res.json({user: req.user});
};