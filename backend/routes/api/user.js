const express = require('express');
const router = express.Router();


const User= require('../../models/User');


router.get('/test',(req, res) => res.send('Route testing'));

router.get('/', (req,res) =>{
    User.find()
        .then(user => res.json(user) )
        .catch(err => res.status(404).json({noUserFound:'Pas de user trouvé ...'}))
} );

router.get('/:id', (req,res) =>{
    User.create(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({noUserFound:'Pas de user trouvé ...'}))
} );


router.post('/signup', (req,res) =>{
    User.create(req.body)
        .then(user => res.json({msg: 'User bien ajoutée'}))
        .catch(err => res.status(404).json({error:'Impossible d\'ajouter utilisateur'}));
} );

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    User.findOne({ email: email, password: password })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            // Authentification réussie, faire autre chose si nécessaire
            console.log(user);
            res.status(200).json({ message: 'Authentification réussie' });
        })
        .catch(err => res.status(500).json({ error: 'Erreur lors de la recherche de l\'utilisateur' }));
});

router.get('/find/:id', (req, res) => {
    const id = req.params.id;
    User.findOne({ id : id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            // Authentification réussie, faire autre chose si nécessaire
            console.log(user);
            res.status(200).json(user);
        })
        .catch(err => res.status(500).json({ error: 'Erreur lors de la recherche de l\'utilisateur' }));
});



router.put('/:id', (req,res) =>{
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json({msg: 'Mise à jour éffectué!'}))
        .catch(err => res.status(404).json({error:'Impossible de mettre à jour'}));
} );

router.delete('/:id', (req, res) =>{
  User.findByIdAndRemove({"_id": req.params.id})
  .then(user => res.json({msg: 'Mise à jour éffectué!'}))  
  .catch(err => res.status(404).json({error:'Impossible de mettre à jour'})); r
})

module.exports= router;