import express from "express";
import userController from "../controllers/userController.mjs";

const userRouter = express.Router();

userRouter

  //Get Requests
  .get("/", userController.index)

  //Post Requests
  .post("/signup", userController.Signup)
  .post("/login", userController.login)
  // .post("/sendEmail", userController.sendEmail)
  //Forgot Routers
  .post("/auth/reset-password", userController.resetPassword)
  .post("/auth/forgot-password", userController.forgotPassword) 

  
  //delete Requests
  .delete("/deleteuser/:id", userController.deleteUser)

  //Patch Requests
  .patch("/edituser/:id", userController.editUser)

  //Logout Routes
// optional: in-memory blacklist (for JWT)
const blacklistedTokens = new Set();

userRouter.post("/logout", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      blacklistedTokens.add(token); // block token
    }
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Logout failed", error });
  }
})
  


  export default userRouter;
