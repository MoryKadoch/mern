const express = require('express');
const router = express.Router();

const Product= require('../../models/product');


router.get('/', (req,res) =>{
    Product.find()
        .then(product => res.json(product) )
        .catch(err => res.status(404).json({noUserFound:'Pas de produit trouvé ...'}))
} );

router.post('/add', (req,res) =>{
    Product.create(req.body)
        .then(product => res.json({msg: 'Produit bien ajoutée'}))
        .catch(err => res.status(404).json({error:'Impossible d\'ajouter Produit'}));
} );

router.put('/:id', (req,res) =>{
    Product.findByIdAndUpdate(req.params.id, req.body)
        .then(product => res.json({msg: 'Mise à jour éffectué!'}))
        .catch(err => res.status(404).json({error:'Impossible de mettre à jour'}));
} );


router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id)
      .then(product => res.json({ msg: 'Produit supprimé !' }))
      .catch(err => res.status(404).json({ error: 'Impossible de supprimer le produit' }));
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
  


module.exports= router;