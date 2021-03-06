import User from '../models/user';
import Bcryptjs from 'bcryptjs';

const add = async (req, res, next) => {
  req.body.password = Bcryptjs.hashSync(req.body.password, 10);
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({ message: 'Inscription avec succes!' });
  } catch (error) {
    return res.json({
      error: 'Une erreur se produite, svp reesayer plus tard!',
      message_error: error,
    });
  }
};
const userOne = async (req, res, next) => {
  try {
    await User.findById(req.params.id, (error, user) => {
      if (error || !user) {
        res.json({ error: 'Utilisateur non trouver!' });
      }
      return res.json(user);
    });
  } catch (error) {
    res
      .status(404)
      .json({ error: 'Une erreur se produite, svp reesayer plus tard!' });
  }
};
const list = async (req, res, next) => {
  await User.find({})
    .sort({ firstname: 'asc' })
    .exec((error, user) => {
      if (error || !user) {
        res.json({ error: 'Une erreur se produite!' });
      }
      res.json(user);
    });
};
const remove = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id, (err) => {
      if (err) res.status(404).json({ error: 'Erreur' });

      res.status(200).json({ nessage: 'Supression avec succes!' });
    });
  } catch (error) {
    res.status(404).json({ error: 'Erreur' });
  }
};
export default {
  add,
  userOne,
  list,
  remove,
};
