import Car from './../models/car';

const addCar = async (req, res, next) => {
  const car = new Car(req.body);
  try {
    await car.save();
    return res.status(200).json({ message: 'Ajouter avec succes!' });
  } catch (error) {
    return res.json({
      error: 'Une erreur se produite, svp reesayer plus tard!',
      message_error: error,
    });
  }
};
const carOne = async (req, res, next) => {
  try {
    await Car.findById(req.params.id, (error, car) => {
      if (error || !car) {
        res.json({ error: 'Utilisateur non trouver!' });
      }
      return res.json(car);
    });
  } catch (error) {
    res
      .status(404)
      .json({ error: 'Une erreur se produite, svp reesayer plus tard!' });
  }
};
const list = async (req, res, next) => {
  await Car.find({})
    .sort({ nom: 'asc' })
    .exec((error, car) => {
      if (error || !car) {
        res.json({ error: 'Une erreur se produite!' });
      }
      res.json(car);
    });
};
const addComment = async (req, res, next) => {
  await Car.findByIdAndUpdate(
    req.params.id,
    {
      $addToSet: {
        comment: req.body,
      },
    },
    { safe: true, upsert: true },
    (error) => {
      if (error) {
        return res.json({ error: error + 'this the error' });
      }
      return res.json({ message: 'comment successfully!' });
    },
  );
};

export default { addCar, addComment, carOne, list };
