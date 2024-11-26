const db = require('../config/config');
const Product = {};

// Product.getAll = (result) => {
//     const sql = `
//     SELECT 
//         id,
//         name,
//         description,
//         image
//     FROM
//         categories
//     ORDER BY
//         name
//     `;

//     db.query(
//         sql,
//         (err, data) => {
//             if(err){
//                 console.log('Error:', err);
//                 result(err, null);
//             }
//             else{
//                 console.log('ID de la nueva categoria:', data);
//                 result(null, data);
//             }
//         }
//     )

// }

Product.create = (product, result) => {

    const sql = ` 
    INSERT INTO 
        products 
    (
        name,
        description,
        price,
        image1,
        image2,
        image3,
        id_category,
        created_at,
        updated_at
    )   
    VALUES(?, ?, ?, ? ,?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if(err){
                console.log('Error:', err);
                result(err, null);
            }
            else{
                console.log('ID del nuevo producto:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

};

Product.update = (product, result) => {
    const sql = `
        UPDATE
            products
        SET
            name = ?,
            description = ?,
            price = ?,
            image1 = ?,
            image2 = ?,
            image3 = ?,
            id_category = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query(
        sql,
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            product.id
        ],
        (err, data) => {
            if(err){
                console.log('Error:', err);
                result(err, null);
            }
            else{
                console.log('ID del producto actualizado:', data.id);
                result(null, data.id);
            }
        }
    )
}

// Category.delete = (id,result) => {

//     const sql = `
//         DELETE FROM
//             categories
//         WHERE
//             id = ?
//     `;
//     db.query(
//         sql,
//         id,
//         (err, res) => {
//             if(err){
//                 console.log('Error:', err);
//                 result(err, null);
//             }
//             else{
//                 console.log('ID de la categoria eliminada:', id);
//                 result(null, id);
//             }
//         }
//     )

// }

module.exports = Product;