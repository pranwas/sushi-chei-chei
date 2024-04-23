const Menu = require("../models/Menu");
// const Tag = require("../models/Tags");
const mongoose = require("mongoose");

//@desc         Get All Menu
//@route        GET /api/v1/menu
//@access       Public
exports.getMenu = async (req, res, next) => {
    const menu = await Menu.find({});
    return res.status(200).json({ success: true, data: menu });
}

//@desc     Get Menu By Category
//@route    GET /api/v1/menu/:catagory
//@access   Public
exports.getMenuByCategory = async (req, res, next) => {
    try {
        const menu = await Menu.findOne({ category: req.params.category });

        if (!menu) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({
            success: true, data: menu
        });
    } catch (err) {
        return res.status(400).json({ success: false });
    }

};

//@desc         Create New Tag
//@route        POST /api/v1/menu/tags
//@access       Private 
// exports.createTag= async(req, res, next) => {
//     try {
//         const { name } = req.body;
//         const tag = await Tag.create({
//             name,
//         });
//         res.status(201).json({success: true, data: tag});
//     } catch (err) {
//         res.status(400).json({success:false});
//         console.log(err.stack);
//     }
// }

//@desc         Create New Menu
//@route        POST /api/v1/menu
//@access       Private
exports.createMenu = async (req, res, next) => {
    try {
        const { name, price, tags } = req.body;
        const objectIdTagArray = tags.map(tagId => new mongoose.Types.ObjectId(tagId));
        const menu = await Menu.create({
            name: name,
            tags: objectIdTagArray,
            price: price,
        });
        return res.status(201).json({ success: true, data: menu });
    } catch (err) {
        return res.status(400).json({ success: false });
        console.log(err.stack);
    }
}