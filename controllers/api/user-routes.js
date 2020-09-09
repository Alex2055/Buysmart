const router = require('express').Router();
const { User } = require('../../models');

//get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get single user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'This user does not exist.'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Add new user
router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    });
});

//Update user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: 'User does not exist.'});
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
.then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'This user does not exist.'});
        return;
    }
    res.json(dbUserData)
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;