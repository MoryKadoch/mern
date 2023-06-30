const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'KEY';

const User = require('../../models/User');

function auth(roles = []) {
    return (req, res, next) => {
        const authHeader = req.header('Authorization');
        if (!authHeader) return res.status(401).json({ message: 'Accès refusé. Pas d\'en-tête d\'autorisation fourni.' });

        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Accès refusé. Pas de token fourni.' });

        try {
            const payload = jwt.verify(token, secretKey);
            req.user = payload;

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Accès refusé. Vous n\'avez pas le rôle requis.' });
            }

            next();

        } catch (ex) {
            res.status(400).json({ message: 'Token invalide.' });
        }
    };
}

router.get('/', auth(['admin']), (req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ noUserFound: 'Pas de user trouvé ...' }))
});

router.get('/:id', auth(['admin', 'user']), (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ noUserFound: 'Pas de user trouvé ...' }))
});

router.post('/signup', (req, res) => {
    const { password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors du hachage du mot de passe' });
        }

        User.create({ ...req.body, password: hashedPassword })
            .then(user => {
                const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '12h' });
                res.json({ msg: 'User bien ajouté', token, role: user.role });
            })
            .catch(err => res.status(404).json({ error: 'Impossible d\'ajouter utilisateur' }));
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            bcrypt.compare(password, user.password, (err, success) => {
                if (err) {
                    return res.status(500).json({ error: 'Erreur lors de la comparaison du mot de passe' });
                }

                const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '12h' });
                res.status(200).json({ message: 'Authentification réussie', token, role: user.role });
            });
        })
        .catch(err => res.status(500).json({ error: 'Erreur lors de la recherche de l\'utilisateur' }));
});

router.put('/:id', auth(['admin', 'user']), (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json({ msg: 'Mise à jour éffectué!' }))
        .catch(err => res.status(404).json({ error: 'Impossible de mettre à jour' }));
});

router.delete('/:id', auth(['admin']), (req, res) => {
    User.findByIdAndRemove(req.params.id, req.body)
        .then(user => res.json({ msg: 'Mise à jour éffectué!' }))
        .catch(err => res.status(404).json({ error: 'Impossible de mettre à jour' }));
})

module.exports = router;