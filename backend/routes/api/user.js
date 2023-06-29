const express = require('express');
const router = express.Router();


const User= require('../../models/User');


router.get('/test',(req, res) => res.send('Route testing'));

router.get('/', (req,res) =>{
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(404).json({noUserFound:'Pas de user trouvé ...'}))
} );

router.get('/:id', (req,res) =>{
    User.create(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({noUserFound:'Pas de user trouvé ...'}))
} );


router.post('/', (req,res) =>{
    User.create(req.body)
        .then(user => res.json({msg: 'User bien ajoutée'}))
        .catch(err => res.status(404).json({error:'Impossible d\'ajouter utilisateur'}));
} );

router.put('/id', (req,res) =>{
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json({msg: 'Mise à jour éffectué!'}))
        .catch(err => res.status(404).json({error:'Impossible de mettre à jour'}));
} );

router.delete('/:id', (req, res) =>{
  User.findByIdAndRemove(req.params.id, req.body)
  .then(user => res.json({msg: 'Mise à jour éffectué!'}))  
  .catch(err => res.status(404).json({error:'Impossible de mettre à jour'}));
})

module.exports= router;