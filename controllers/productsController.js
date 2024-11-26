const Product = require("../models/product");
const storage = require("../utils/cloud_storage");
const asyncForEach = require("../utils/async_foreach");

module.exports = {
  async getAll(req, res) {
    Category.getAll((err, data) => {
      if (err) {
        console.log("ENTRO EN EL ERROR");
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de listar las categorias",
          error: err,
        });
      }

      return res.status(201).json(data);
    });
  },

  async create(req, res) {
    const product = JSON.parse(req.body.product); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

    const files = req.files;
    let inserts = 0;
    if (files.length === 0) {
      return res.status(501).json({
        success: false,
        message: "Error al registrar el producto no tiene imagenes.",
      });
    } else {
      Product.create(product, (err, id_product) => {

        if (err) {
          console.log("ENTRO EN EL ERROR");
          return res.status(501).json({
            success: false,
            message: "Hubo un error con el registro del producto",
            error: err,
          });
        }

        product.id = id_product;
        const start = async () => {
          await asyncForEach(files, async (file) => {
            const path = `image_${Date.now()}`;
            const url = await storage(file, path);

            if (url != undefined && url != null) {

                if(inserts === 0){
                    product.image1 = url;
                }
                else if(insert === 1){
                    product.image2 = url;
                }
                else if(insert === 2){
                    product.image3 = url;
                }
            }

            await Product.update(product, (err, data) => {
                if (err) {
                    return res.status(501).json({
                      success: false,
                      message: "Hubo un error con el registro del producto",
                      error: err,
                    });
                  }

                  inserts = inserts + 1;

                  if(inserts === files.length){ // TERMINO DE ALMACENAR LAS TRES IMAGENES
                    return res.status(201).json({
                        success: true,
                        message: "El producto se almaceno correctamente",
                        data: data,
                      }); 
                  }
            })
          });
        };

        start();

      });
    }
  },

  async updateWithImage(req, res) {
    const category = JSON.parse(req.body.category); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);

      if (url != undefined && url != null) {
        category.image = url;
      }
    }

    Category.update(category, (err, id) => {
      if (err) {
        console.log("ENTRO EN EL ERROR");
        return res.status(501).json({
          success: false,
          message: "Hubo un error con la actualización del categoria",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El categoria se actualizo correctamente",
        data: `${id}`,
      });
    });
  },

  async update(req, res) {
    const category = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

    Product.update(category, (err, id) => {
      if (err) {
        console.log("ENTRO EN EL ERROR");
        return res.status(501).json({
          success: false,
          message: "Hubo un error con la actualización del categoria",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El categoria se actualizo correctamente",
        data: `${id}`,
      });
    });
  },

  async delete(req, res) {
    const id = req.params.id;
    Category.delete(id, (err, data) => {
      if (err) {
        return res.status(501).json({
          success: false,
          message: "Hubo un error al momento de eliminar la categoria",
          error: err,
        });
      }

      return res.status(201).json({
        success: true,
        message: "El categoria se elimino correctamente",
        data: `${id}`,
      });
    });
  },
};
