const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'KEY';

const Product = require('../../models/Product');

// Function d'authentification
function auth(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ message: 'Accès refusé. Pas d\'en-tête d\'autorisation fourni.' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Accès refusé. Pas de token fourni.' });

    try {
        const payload = jwt.verify(token, secretKey);
        req.user = payload; 
        if(req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès refusé. Vous n\'êtes pas un administrateur.' });
        }
        next();
    }
    catch (ex) {
        res.status(400).json({ message: 'Token invalide.' });
    }
}

router.get('/', (req, res) => {
  Product.find()
    .then(product => res.json(product))
    .catch(err => res.status(404).json({ noProductFound: 'Pas de produit trouvé ...' }))
});

router.post('/add', auth, (req, res) => {
  Product.create(req.body)
    .then(product => res.json({ msg: 'Produit bien ajouté' }))
    .catch(err => res.status(404).json({ error: 'Impossible d\'ajouter le produit' }));
});

router.put('/:id', auth, (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(product => res.json({ msg: 'Mise à jour effectuée!' }))
    .catch(err => res.status(404).json({ error: 'Impossible de mettre à jour' }));
});


router.delete('/:id', auth, (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(product => res.json({ msg: 'Produit supprimé !' }))
    .catch(err => res.status(404).json({ error: 'Impossible de supprimer le produit' }));
});

router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(404).json({ noProductFound: 'Pas de produit trouvé ...' }))
});

// Route pour déduire la quantité commandée du stock
router.post('/deduct-stock/:id', (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.id;

  Product.findById(productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ error: 'Quantité commandée supérieure au stock disponible' });
      }

      product.stock -= quantity;

      return product.save()
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => res.status(500).json({ error: 'Erreur lors de la mise à jour du stock' }));
    })
    .catch(err => res.status(500).json({ error: 'Erreur lors de la recherche du produit' }));
});

module.exports = router;