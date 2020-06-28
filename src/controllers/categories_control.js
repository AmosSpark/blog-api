const Categorie = require("../models/dbmodels/categories_model");

// GET CATEGORIES

exports.getCategories_control = async (req, res) => {
  const findCategories = await Categorie.find(); // get all categories
  const categories = findCategories;
  res.json(categories);
};

// GET A CATEGORY

exports.getACategory_control = async (req, res) => {
  const id = req.params.id;
  const findCategory = await Categorie.findById(id); // get a category by id
  // validate
  if (findCategory) {
    const category = findCategory;
    res.json({ status: true, category });
  } else {
    res.status(400).json({ status: `false, category id: ${id} not available` });
  }
};

// GET FIRST N AMOUNT OF CATEGORY

exports.getFirstNAmountOfCategory_control = async (req, res) => {
  const n = parseInt(req.params.n);
  const categories = await Categorie.find().limit(n);
  // validate
  if (n > Categorie.length - 1) {
    res.status(400).json({
      status: `false, requested number of draft should not be more than ${
        Categorie.length - 1
      }`,
    });
  } else {
    res.json({ status: true, categories });
  }
};

// CREATE A CATEGORY

exports.createACategory_control = async (req, res) => {
  const newCategory = new Categorie({
    id: req.body.id,

    name: req.body.name,

    description: req.body.description,
  });
  // save
  const category = await newCategory.save();
  res.json({ status: true, category });
};

// UPDATE A CATEGORY

exports.updateACategory_control = async (req, res) => {
  const id = req.params.id;
  const findCategory = await Categorie.findById(id);
  // validate
  if (findCategory) {
    const updateCategory = req.body;
    findCategory.set({
      // update id
      id: updateCategory.id ? updateCategory.id : findCategory.id,
      // update name
      name: updateCategory.name ? updateCategory.name : findCategory.name,
      // update description
      description: updateCategory.description
        ? updateCategory.description
        : findCategory.description,
    });
    // save
    const category = await findCategory.save();
    res.json({ status: true, category });
  } else {
    res.status(400).json({ status: `false, category id: ${id} not available` });
  }
};

// DELETE A CATEGORY

exports.deleteACategory_control = async (req, res) => {
  const id = req.params.id;
  const findCategoryAndRemove = await Categorie.findByIdAndRemove(id);
  // validate
  if (findCategoryAndRemove) {
    const category = findCategoryAndRemove;
    res.json({ status: true, category });
  } else {
    res.status(400).json({ status: `false, category id: ${id} not available` });
  }
};
