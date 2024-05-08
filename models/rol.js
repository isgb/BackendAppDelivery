const db = require('../config/config');

const Rol = {};

Rol.create = (id_user, id_rol) => {
    const sql = `
    INSERT INTO
        user_has_roles(
            id_user,
            id_rol,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?, ?)
    `;

    db.query(
        sql,
        [id_user,id_rol, new Date(), new Date()],
        (err, user) => {
            if(err){
                console.log('Error:', err);
                result(err, null);
            }
            else{
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )
}

import.exports = Rol;