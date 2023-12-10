const UsersModel = require('../models/users');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {
        const [data] = await UsersModel.getAllUsers()
    res.status(200).json({
        message: 'get success',
        data: data
    })
    } catch (error) {
        res.status(500).json({
            message: 'server error',
            serverMessage: error
        })
    }
    
}

const getUserbyID = async (req, res) => {
    const { idUser } = req.params;

    try {
        const [data] = await UsersModel.getUserbyID(idUser);

        if (!data.length) {
            return res.status(404).json({
                message: 'Data not found',
            });
        }

        res.status(200).json({
            message: 'Get by ID success',
            data: data[0],
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        });
    }
};

const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const [data] = await UsersModel.getUserByEmail(email);

        if (!data.length) {
            return res.status(404).json({
                message: 'Data not found',
            });
        }

        res.status(200).json({
            message: 'Get by ID success',
            data: data[0],
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error,
        });
    }
};

const createNewUser = async (req, res) => {
    const {body} = req;

    if(!body.first_name || !body.last_name || !body.email || !body.password){
        return res.status(400).json({
            message: 'Anda mengirimkan data yang salah',
            data: null,
        })
    }

    try {
        await UsersModel.createNewUser(body);
        res.status(201).json({
            message: 'CREATE new user success',
            data: body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const [data] = await UsersModel.loginUser(email, password);
        if(!data){
            return res.status(400).json({
                message: 'Cek kembali email dan password anda',
            });
        }
        const token = jwt.sign({ email: email }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login berhasil',
            data: data,
            token: token
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            serverMessage: error
        })
    }
}

const updateUser = async (req, res) => {
    const {idUser} = req.params;
    const {body} = req;
    try {
        await UsersModel.updateUser(body, idUser);
        res.status(201).json({
            message: 'UPDATE user success',
            data: {
                id: idUser,
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const deleteUser = async (req, res) => {
    const {idUser} = req.params;
    try {
        await UsersModel.deleteUser(idUser);
        res.status(200).json({
            message: 'DELETE user success',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

module.exports = {
    getAllUsers,
    getUserbyID,
    createNewUser,
    updateUser,
    deleteUser,
    loginUser,
    getUserByEmail
}