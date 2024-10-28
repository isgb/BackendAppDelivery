const Category = require('../models/category');
const storage = require('../utils/cloud_storage');

module.exports = {
    async create(req, res) {

        const category = JSON.parse(req.body.category); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                category.image = url;
            }
        }

        Category.create(category, (err, id) => {

            if (err) {
                console.log('ENTRO EN EL ERROR');
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El categoria se registro correctamente',
                data: `${id}` 
            });

        });

    },
}