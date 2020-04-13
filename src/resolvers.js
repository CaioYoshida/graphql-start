const User = require('./database/schemas/User');
const Car = require('./database/schemas/Car');

module.exports={
  Query: {
    users: () => User.find().populate('cars').exec(),
    user: (_, { id }) => User.findById(id),

    cars: () => Car.find().populate('owner').exec(),
    car: (_, { id }) => Car.findById(id),
  },

  Mutation: {
    createUser: (_, { name, email }) => User.create({ name, email }),
    updateUser: async (_, { id, name, email }) => {
      const updatedUser = await User.findOneAndUpdate({ _id: id }, 
      {
        name,
        email,
      }, { new: true, useFindAndModify: false });

      return updatedUser;
    },
    deleteUser: (_, { id }) => User.findByIdAndDelete(id),

    createCar: async (_, { owner, model, brand, year, mileage }) => {
      const newCar = await Car.create({
        owner,
        model,
        brand,
        year,
        mileage,
      });

      await newCar.save();

      if (owner !== null || owner !== '') {
        const carOwner = await User.findById(owner);

        await carOwner.cars.push(newCar._id);

        await carOwner.save();
      }

      return newCar; 
    },
    updateCar: async (_, { id, owner, model, brand, year, mileage }) => {
      const selectedCar = await Car.findById(id);
      
      if (selectedCar.owner !== owner && owner !== null) {
        await User.updateOne(
          { _id: selectedCar.owner },
          { $pull: { cars: selectedCar._id } }
        );

        await User.updateOne(
          { _id: owner },
          { $push: { cars: selectedCar._id } }
        );
      } 
      
      const updatedCar = await Car.findOneAndUpdate({ _id: id }, 
      {
        owner,
        model,
        brand,
        year,
        mileage
      }, { new: true, useFindAndModify: false });

      return updatedCar;

    },
    deleteCar: async (_, { id }) => {
      const deletedCar = await Car.findById(id);

      await User.updateOne(
        { _id: deletedCar.owner }, 
        { $pull: { cars: deletedCar._id } }
      );
      
      await Car.findByIdAndDelete(id);
    },
  },
}