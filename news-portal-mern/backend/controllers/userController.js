import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const updateProfile = async (req,res,next) => {
  try{
    const user = await User.findById(req.user._id);
    if(!user) { res.status(404); throw new Error("User not found"); }

    const {name,email,bio,avatar,password} = req.body;
    if(email && email!==user.email){
      const emailTaken = await User.findOne({email});
      if(emailTaken){ res.status(400); throw new Error("Email already used"); }
    }

    user.name = name||user.name;
    user.email = email||user.email;
    user.bio = bio??user.bio;
    user.avatar = avatar??user.avatar;
    if(password) user.password = password;

    const updatedUser = await user.save();
    res.json({token: generateToken(updatedUser._id), user: updatedUser});
  }catch(error){ next(error) }
};