import menu from '../models/menu.js';
//Create
export const createMenu = async (req, res) => {
    try {
        const { restaurant_id, name, description, price, category } = req.body;
        const newMenu = new menu({ restaurant_id, name, description, price, category });
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//Get by filter
export const getMenus = async (req, res) => {
    try {
        const filter = {};

        if (req.query.price) {
            filter.price = req.query.price;
        }
        if (req.query.category) {
            filter.category =  req.query.category;
        }
        const menus = await menu.find(filter);
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//Read
export const getAllMenus = async (req, res) => {
    try {
        const menus = await menu.find();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }  
};
//Update
export const UpdateMenu = async (req, res) => { 
    try {
        const { restaurant_id, name, description, price, category } = req.body;
        const updatedMenu = await menu.findByIdAndUpdate(
            req.params.id,
            { restaurant_id, name, description, price, category },
            { new: true }
        );
        res.status(200).json(updatedMenu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//delete
export const deleteMenu = async (req, res) => {
    try {   
        const deletedMenu = await menu.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedMenu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
