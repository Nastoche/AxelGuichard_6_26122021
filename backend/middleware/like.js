const Sauce = require("../models/Sauce");

exports.likeSauce = (userId, sauceId, res) => {
  Sauce.updateOne(
    { _id: sauceId },
    { $push: { usersLiked: userId }, $inc: { likes: +1 } }
  )
    .then(() => res.status(200).json({ message: `J'aime` }))
    .catch((error) => res.status(400).json({ error }));
};

exports.unlikeSauce = (userId, sauceId, res) => {
  Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      if (sauce.usersLiked.includes(userId)) {
        Sauce.updateOne(
          { _id: sauceId },
          { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
        )
          .then(() => res.status(200).json({ message: `Neutre` }))
          .catch((error) => res.status(400).json({ error }));
      }
      if (sauce.usersDisliked.includes(userId)) {
        Sauce.updateOne(
          { _id: sauceId },
          { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
        )
          .then(() => res.status(200).json({ message: `Neutre` }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.dislikeSauce = (userId, sauceId, res) => {
  Sauce.updateOne(
    { _id: sauceId },
    { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
  )
    .then(() => {
      res.status(200).json({ message: `Je n'aime pas` });
    })
    .catch((error) => res.status(400).json({ error }));
};
