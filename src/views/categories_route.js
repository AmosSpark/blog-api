const express = require("express"),
  router = express.Router();

const categoriesControl = require("../controllers/categories_control"); // categories control

// GET CATEGORIES

router.get("/", categoriesControl.getCategories_control);

// GET A CATEGORY

router.get("/:id", categoriesControl.getACategory_control);

// GET FIRST N AMOUNT OF CATEGORY

router.get("/first/:n", categoriesControl.getFirstNAmountOfCategory_control);

// CREATE A CATEGORY

router.post("/", categoriesControl.createACategory_control);

// UPDATE A CATEGORY

router.put("/:id", categoriesControl.updateACategory_control);

// DELETE A CATEGORY

router.delete("/:id", categoriesControl.deleteACategory_control);

module.exports = router;
