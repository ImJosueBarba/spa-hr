const jwt = require('jsonwebtoken');
require ("dotenv").config();

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
  
    console.log('Token recibido:', token);  // Verifica que el token esté llegando correctamente
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verificado:', verified);  // Verifica que el token sea válido
      req.user = verified;
      next();
    } catch (err) {
      console.error('Error al verificar el token:', err);
      res.status(403).json({ message: 'Invalid token' });
    }
  }
  
module.exports = authenticateToken;


