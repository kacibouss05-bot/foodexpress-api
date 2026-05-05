import mongoose from 'mongoose';
import Menu from '../models/menu.js';

export const createMenu = async (req, res) => {
  try {
    const newMenu = await Menu.create(req.body);
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMenus = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;
    const sort = ['price', 'category'].includes(req.query.sort) ? req.query.sort : 'category';
    const order = req.query.order === 'desc' ? -1 : 1;
    const filter = {};

    if (req.query.category) {
      filter.category = new RegExp(req.query.category, 'i');
    }

    if (req.query.restaurant_id && mongoose.isValidObjectId(req.query.restaurant_id)) {
      filter.restaurant_id = req.query.restaurant_id;
    }

    const [items, total] = await Promise.all([
      Menu.find(filter).sort({ [sort]: order }).skip(skip).limit(limit),
      Menu.countDocuments(filter),
    ]);

    res.status(200).json({
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMenuById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid menu id' });
    }

    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    return res.status(200).json(menu);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMenu = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid menu id' });
    }

    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    return res.status(200).json(updatedMenu);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid menu id' });
    }

    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);

    if (!deletedMenu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    return res.status(200).json(deletedMenu);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
