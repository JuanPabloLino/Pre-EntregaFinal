// Planteo de constantes //
const express = require('express');
const carritoRouter = express.Router();
const Contenedor = require('../../contenedor');
const { createCart, deleteCart, getByIdCart, addProductsToCart, deleteProductToCart } = require( '../models/cart' );
const productosContenedor = new Contenedor('./data/productos.json');

// Inicio lógica de carrito // 

carritoRouter.post('/', async (req, res) =>{
    let cart = req.body;
    const idCartSaved = await createCart(cart);
    res.send(`El ID del carrito es: ${idCartSaved}`)
});

    
carritoRouter.delete('/:id', async (req, res) =>{
    idCarrito = Number(req.params.id)

    const carritoAEliminiar = await deleteCart(idCarrito)
    res.send({carritoAEliminiar})
});

carritoRouter.get('/:id/productos', async (req, res) =>{
    const idCarrito = Number(req.params.id)

    const carritoElegido = await getByIdCart(idCarrito)
    res.send({carritoElegido});
}); 

carritoRouter.post('/:id/productos', async (req, res) =>{
    const idCarrito = Number(req.params.id)
    const cartNew  = req.body

    const carritoUpdated = await addProductsToCart(idCarrito, cartNew)
    res.send({carritoUpdated})
}); 

carritoRouter.delete('/:id/productos/:id_prod', async (req, res) =>{
    idCarrito = Number(req.params.id);
    idProducto = Number(req.params.id_prod)

    const productoEliminiarEnCarrito = await deleteProductToCart(idCarrito,idProducto)
    res.send({productoEliminiarEnCarrito})
});

// Fin Lógica de carrito // 

module.exports = carritoRouter;