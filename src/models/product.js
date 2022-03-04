const Contenedor = require('../../Contenedor');

const productosContenedor = new Contenedor('./data/productos.json');

const getAllProducts = async () =>{
    const list = await productosContenedor.getAll();
    return list;
};
const createProducts = async(newProducto)=>{
    const idProductosSaved = await productosContenedor.save(newProducto);
    return idProductosSaved;
};
const getByIdProducts = async (idProduct) => {
    const producto = await productosContenedor.getById(idProduct);
            if (!producto){
        return "El producto solicitado por su ID no se encuentra."
    }else{
        return producto;
    }
};
const updateProducts = async(idProduct,newData)=>{
    const productoUpdate = await productosContenedor.update(idProduct,newData)
        if (!productoUpdate){
        return 'El producto solicitado no se encuentra.';
        }else {
            return productoUpdate;
        }
};
const deleteProducts = async (idProducto) =>{
    const productoAEliminiar = await productosContenedor.getById(idProducto)
    if (productoAEliminiar === null ){
        return ({ error : 'El producto solicitado no se encuentra.'})
    }else {
        await productosContenedor.deleteById(idProducto);
        return({ message : 'El producto ha sido eliminado.' });
    }
};

module.exports = {
    getAllProducts,
    createProducts,
    getByIdProducts,
    updateProducts,
    deleteProducts
}