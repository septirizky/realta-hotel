// users.controller.js
import jwt from 'jsonwebtoken';
import bcrypt, { compareSync } from 'bcrypt';
import { validationResult } from 'express-validator';
import sendEmail from "./sendEmail.js"
import { Op } from 'sequelize';
import models,{sequelize} from '../../model/init-models.js';
const { users, user_password,user_profiles,user_roles } = models;

//////////////////// ini utk employee
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, phone_number } = req.body;
    const existingUser = await users.findOne({ where: { user_email: email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Generate salt and hash 
    const salt =await bcrypt.genSalt(10);
    console.log(salt)
    const passwordHash =await bcrypt.hash(password, salt);
    console.log(passwordHash)

    const newUser = await users.create({
      user_full_name: username,
      user_email: email,
      user_phone_number: phone_number,
      user_modified_date: new Date()
    });

    await user_password.create({
      uspa_user_id: newUser.user_id,
      uspa_passwordhash: passwordHash,
      uspa_passwordsalt: salt.substring(0,10),////ini tu utk membatasi genSalt nya,kalau tidak ada bakal error karena akan melebihi 10
    });
    console.log()

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error registering user' });
  }
};


////////////////////////
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ where: { user_email: email } });
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: 'Invalid' });
    }

    const userPassword = await user_password.findOne({ where: { uspa_user_id: user.user_id } });
    console.log(userPassword)
    if (!userPassword || !userPassword.uspa_passwordhash) {
      return res.status(400).json({ message: 'Password not found or empty' });
    }

    const passwordMatch = await bcrypt.compare(password, userPassword.uspa_passwordhash);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { user},
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json( {token} );
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error logging in' });
  }
};



//////////////////////////
export const getUsers = async (req, res) => {
  try {
    const userList = await users.findAll();
    res.json(userList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil daftar pengguna.' });
  }
};


///////////////////////////
export const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pengguna.' });
  }
};


/////////////////////////
export const deleteuserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await users.destroy({
      where: { user_id: userId }
    });
    if (deleted) {
      return res.status(200).json({ message: 'User deleted' });
    }
    throw new Error('User not found');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};


////////////////////////////////
export const updateUserById = async(req,res)=>{
  try {
    const { username, email, password, confirmPassword } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const hashedConfirmPassword = confirmPassword ? await bcrypt.hash(confirmPassword, 10) : undefined;

    const [rowCount, updatedUsers] = await users.update(
      {
        user_full_name: username || '',
        user_email: email || '',
        password: hashedPassword || '', 
        confirmPassword: hashedConfirmPassword || '', 
      },
      {
        where: { user_id: req.params.id },
        returning: true,
      }
    );

    if (rowCount === 1) {
      res.status(200).json(updatedUsers[0]);
    } else {
      res.status(400).json({ message: `Users ID ${req.params.id} has not been updated` });
    }
  } catch (e) {
    res.status(400).json(e);
  }
}


////////// ini untuk signup guest
export const signupGuest = async (req, res) => {
  try {
    
    const { phone_number } = req.body;
    console.log(phone_number)
    const getUser=await users.count({ where:{
      user_full_name:{[Op.like]:'guest%'} }
    })
    const user_id = getUser + 1;

    const newUser = await users.create({
      
      user_phone_number: phone_number,
      user_full_name : `guest${+ user_id}`
    });
    
      
    res.status(201).json({ message: 'Guest signed up successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error signing up guest' });
  }
};

export const loginGuest = async (req, res) => {
  try {
    const { phone_number } = req.body;

    const existingUser = await users.findOne({ where: { user_phone_number: phone_number } });

    if (!existingUser) {
      return res.status(401).json({ message: 'Guest not found.' });
    }

    const token = jwt.sign({ user_id: existingUser.user_id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in guest' });
  }
};


//////persiapan utk forget password
export const sendPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Temukan pengguna berdasarkan alamat surel
    const user = await models.users.findOne({ where: { user_email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Buat token
    const resetToken = jwt.sign({ user_id: user.user_id }, process.env.SECRET_KEY, { expiresIn: '30m' });

    // Logika pengiriman surel
    const emailContent = `Password reset link: https://yourapp.com/reset-password?token=${resetToken}`;
    sendEmail(email, 'Password Reset', emailContent);

    res.status(200).json({ message: 'Email sent for password reset' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending password reset email' });
  }
};


/////// insert profile 
export const insertProfile = async (req, res) => {
  try {
    const {
      user_full_name,
      user_type,
      user_company_name,
      user_email,
      user_phone_number,
      uspro_national_id,
      uspro_birt_date,
      uspro_job_title,
      uspro_marital_status,
      uspro_gender,
      usro_role_id 
    } = req.body;

    const insertUsers = await users.create({
      user_full_name,
      user_type,
      user_company_name,
      user_email,
      user_phone_number,
      user_modified_date: new Date(), 
    });

    const newUserProfile = await user_profiles.create({
      uspro_national_id,
      uspro_birt_date,
      uspro_job_title,
      uspro_marital_status,
      uspro_gender,
      uspro_user_id : insertUsers.user_id,
    });
    const newUserRole = await user_roles.create({
      usro_user_id : insertUsers.user_id,
      usro_role_id,
    });
    

    const responData={
      insertUsers,
      newUserProfile,
      newUserRole
    }
    res.status(200).json({ data: responData, message: 'Success' });
  } catch (error) {

    res.status(500).json({ message: `Error occurred: ${error.message}` });
  }
};

/////////////////////////////untuk ganti password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, retypePassword } = req.body;
    const userId = req.params.id; // Anda perlu menyimpan ID pengguna dari autentikasi

    if (newPassword !== retypePassword) {
      return res.status(400).json({ message: 'New password and retype password do not match' });
    }
    const userPassword = await user_password.findOne({
      where: { uspa_user_id: userId }
    });

    if (!userPassword) {
      return res.status(404).json({ message: 'User password data not found' });
    }
    const isPasswordValid = await compareSync(currentPassword, userPassword.uspa_passwordhash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userPassword.update({
      uspa_passwordhash: hashedPassword,
      uspa_passwordsalt: salt.substring(0, 10) // Batasi panjang salt jika diperlukan
    });

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating password' });
  }
};
