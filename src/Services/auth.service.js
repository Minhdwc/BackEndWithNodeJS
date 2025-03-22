const bcrypt = require('bcrypt')
const user = require('../Models/user')
const authMiddleware = require('../middleware/authMiddleware')

const register = (data)=>{
    return new Promise(async (resolve, rejects) => {
        try {
          const password = data.password;
          const hashPass = await bcrypt.hash(password, 10)
          const newUser = await user.create({...data, password: hashPass});
          if (newUser) {
            resolve({
              status: "Created",
              data: newUser,
              message: "User created",
            });
          }
        } catch (e) {
          rejects(e);
        }
      });
}

const login = (email, password) => {
    return new Promise(async(resolve, reject) => {
      try {
        const emailUser = await user.findOne({email: email})
        if (!emailUser) {
          resolve({
            status: "Error",
            message: "User not found",
          });
          return;
        }
        const checkPass = await bcrypt.compare(password, emailUser.password);
        if(!checkPass){
          resolve({
            status: "Error",
            message: "Invalid password"
          })
        }
        const dataUser = {
          _id: emailUser.id,
          name: emailUser.name,
          email: emailUser.email,
          role: emailUser.role
        }
        const accessTokenLife = "2h"
        const refreshTokenLife = "7d"
        const userLogged = await authMiddleware.generateToken(dataUser, process.env.ACCESS_TOKEN,
          accessTokenLife, refreshTokenLife);
        resolve({
          status: "Success",
          message: "Login successful",
          data: {
            userLogged
          },
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  const profile = (id)=>{
    return new Promise(async(resolve, reject)=>{
      try{
        const userFound = await user.findById(id)
        if(!userFound){
          resolve({
            status: 'Not found',
            message: 'User not found',
          })
        }
        resolve({
          status: "Success",
          message: "Profile retrieved successfully",
          data: userFound,
        });
      }catch(e){
        reject(e);
      }
    })
  }

module.exports = {
    register,
    login,
    profile
}