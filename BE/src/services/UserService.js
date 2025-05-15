import express from 'express';
import bcrypt from 'bcrypt';
import User from '../model/UserModel.js';
import jwtService from './JwtService.js';

const { genneralAccessToken, genneralRefreshToken } = jwtService;
const router = express.Router()

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin

        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token,
                data: checkUser
            })
        } catch (e) {
            reject(e.message)
        }
    })
}
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone, avatar, isAdmin } = newUser
        try {

            const checkUser = await User.findOne({
                email: email
            })
            if ((checkUser !== null)) {
                resolve({
                    status: 'OK',
                    message: 'The email is already'
                })
            }

            const hash = bcrypt.hashSync(password, 10)
            const createUser = await User.create({
                name, email, password: hash, phone, avatar, isAdmin

            })

            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                })
            }

        } catch (e) {
            reject(e)
        }

    })
}
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });

            if (!checkUser) {
                return reject({ status: 'ERROR', message: 'User not found' });
            }

            const newData = { ...data };

            const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });
            console.log('Updated user', updatedUser);

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser,
            });
        } catch (e) {
            console.log(e.message);
            reject(e);
        }
    });
};
const detailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: user
            })
        } catch (e) {
            reject(e.message)
        }
    })
}
export default {
    loginUser,
    createUser,
    updateUser,
    detailUser
};