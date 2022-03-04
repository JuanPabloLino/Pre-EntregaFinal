const ADMIN = true;

const isAdmin = (req, res, next) => {
    if (ADMIN){
        next();
    } else {
        res
            .status(401)
            .json({
                error: `-1`,
                descripción:  `La ruta ${req.path} con el metodo ${req.method} no es autorizada`  
            })
    }
};

module.exports = isAdmin