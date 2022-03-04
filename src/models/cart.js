const Contenedor = require('../../Contenedor');
const cartContenedor = new Contenedor('./data/carrito.json');
const productoContenedor = new Contenedor('./data/productos.json')

const createCart = async(newCart)=>{
    newCart.productos = [];
    const idCarritoSaved = await cartContenedor.save(newCart);
    return idCarritoSaved;
};

const getByIdCart = async (idCart) => {
    const carrito = await cartContenedor.getById(idCart);
    if (!carrito){
        return "El producto solicitado no se encuentra."
    }else{
        return carrito;
}};

const deleteCart = async (idCarrito) =>{
    const carritoAEleminiar = await cartContenedor.deleteById(idCarrito)
    
    return  'El producto ha sido eliminado.';
};

const addProductsToCart = async(idCarrito, productosNew)=>{
    const resultadoCart = await cartContenedor.getById(idCarrito);
    const listadoDeIds = productosNew.productos.map((element) =>(element.id));    
    var listadoDeProductos = [];

    for (const i of listadoDeIds) {
        datosDelProductoAIngresar = await productoContenedor.getById(i); 
        listadoDeProductos.push(datosDelProductoAIngresar)
    }

    resultadoCart.productos.push(listadoDeProductos);
    cartContenedor.update(idCarrito, resultadoCart);
    return 'El producto ha sido agregado correctamente.' 
}

const deleteProductToCart = async(idCarrito, idProducto) => {
    const resultadoCart = await cartContenedor.getById(idCarrito);
    const carritoNew = resultadoCart.productos.filter(cart => cart.id != idProducto);

    resultadoCart.productos.splice(carritoNew,1);

    const cartUpdated = await cartContenedor.update(idCarrito,resultadoCart); 
    return cartUpdated;
}

module.exports = {
    createCart,
    getByIdCart,
    deleteCart,
    addProductsToCart,
    deleteProductToCart
};