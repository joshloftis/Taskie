const Sequelize = require('sequelize');
const router = require('express').Router();
const db = require("../models");
const Op = Sequelize.Op;

router.post('/curr_user/:_UserId/:_TaskId', (req, res, next) => {
  db.Rewards.create({
    description: req.body.description,
    details: req.body.details,
    UserId: req.params._UserId,
    TaskId: req.params._TaskId
  }).then(() => db.Task.update({
    reward: true
    }, {
      where: {
        id: req.params._TaskId
      }
  })).then(reward => res.json(reward)).catch(next);
});

router.get('/curr_user', (req, res, next) => {
  db.Rewards.findAll({
    where: {
      UserId: req.user.id
    },
    include: [db.User, {
      model: db.Task,
        include: [db.User]
    }]
  }).then(reward => res.json(reward)).catch(next);
});

module.exports = router;
