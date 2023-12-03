import { Router } from 'express';
import { registerUser,
    getUsers,
    getUserById,
    deleteuserById,
    updateUserById,
    loginUser,
    signupGuest,
    sendPasswordResetEmail,
    loginGuest,
    changePassword,
    editGuest
    
 } from './users.controllers.js';
import { validateSignin,validateSignupEmployee,validateSignupGuest } from './users.validations.js';

const usersRouters = Router();
usersRouters.post("/", (req, res) => {
    res.json({
      message: "Home Page",
    });
  });

usersRouters.post("/users/signupUser", registerUser);
usersRouters.post("/users/signin" ,loginUser );
usersRouters.post("/users/signupGuest",signupGuest);
usersRouters.post('/users/loginGuest', loginGuest);
usersRouters.get('/users/', getUsers);
usersRouters.get('/users/:id', getUserById);
usersRouters.delete('/users/:id', deleteuserById);
usersRouters.put('/users/:id',updateUserById)
usersRouters.post('/send-password-reset-email', sendPasswordResetEmail)
usersRouters.patch('/users/change-password/:id', changePassword)
usersRouters.put('/editGuest/:userId', editGuest)


///untuk reset pass
usersRouters.post('/users/resetpassword/',sendPasswordResetEmail)

export default usersRouters;



