const dbPool = require('../config/database');
const jwt = require('jsonwebtoken');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM akun';

    return dbPool.execute(SQLQuery);
}

const getUserbyID = (idUser) => {
    const SQLQuery = `SELECT * FROM akun WHERE id=?`;
    return dbPool.execute(SQLQuery, [idUser]);
};

const getUserByEmail = (email) => {
    const SQLQuery = `SELECT * FROM akun WHERE email=?`
    return dbPool.execute(SQLQuery, [email]);
}

const createNewUser = async (body) => {
    const SQLQuery = `INSERT INTO akun (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

    return dbPool.execute(SQLQuery, [body.first_name, body.last_name, body.email, body.password]);
}

const loginUser = (email, password) => {
    const SQLQuery = 'SELECT * FROM akun WHERE email = ? AND password = ?';
    
    return dbPool.execute(SQLQuery, [email, password]);
};

const updateUser = (body, idUser) => {
    const SQLQuery = `UPDATE akun 
                      SET first_name=?, last_name=?, email=?, password=? 
                      WHERE id=?`;

    const values = [body.first_name, body.last_name, body.email, body.password, idUser];

    return dbPool.execute(SQLQuery, values);
};


const deleteUser = (idUser) => {
    const SQLQuery = `DELETE FROM akun WHERE id=?`;

    return dbPool.execute(SQLQuery, [idUser]);
};

const createToken = (user) => {
    return jwt.sign({ user }, secretKey, { expiresIn: '1h' });
  };


module.exports = {
    getAllUsers,
    getUserbyID,
    createNewUser,
    updateUser,
    deleteUser,
    loginUser,
    getUserByEmail,
    createToken,
    getUserByEmail,
}