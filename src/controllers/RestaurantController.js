import restaurant from "../models/restaurant";

//Create 
export const createRestaurant = async (req, res) => {
    try {

        const { name, address, phone, opening_hours } = req.body;
        const newRestaurant = new restaurant({ name, address, phone, opening_hours });
        
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get by filter
export const getRestaurants = async (req, res) => {
    try {
        const filter = {};
        if (req.query.name) {
            filter.name = req.query.name;
        }
        if (req.query.address) {
            filter.address = req.query.address;
        }
        const restaurants = await restaurant.find(filter);
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Read
export const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//Update
export const UpdateRestaurant = async (req, res) => {
    try {
        const { name, address, phone, opening_hours } = req.body;
        const updatedRestaurant = await restaurant.findByIdAndUpdate(
            req.params.id,
            { name, address, phone, opening_hours },
            { new: true }
        );
        res.status(200).json(updatedRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//delete
export const deleteRestaurant = async (req, res) => {
    try {
        const deletedRestaurant = await restaurant.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

