const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const cat = await Category.findAll({ include: [{ model: Product }] });
    // .then((cat) => {
    res.status(200).json(cat);
    // })
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catId = await Category.findByPk(req.params.id, { include: [{ model: Product }] })
    // .then((catId) => {
    if (!catId) {
      res.status(404).send('No category found with the ID provided, try another one');
    };
    res.status(200).json(catId);
    // })
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', (req, res) => {
  // create a new category
  try {
    Category.create(req.body);
    res.status(200).send('Category created succesfully!');
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const editCat = await Category.update({ category_name: req.body.category_name }, { where: { id: req.params.id } })
    if (!editCat) {
      res.status(404).send('No category found with the ID provided, try another one')
    };
    res.status(200).send('Category edited succesfully!');
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCat = await Category.destroy({ where: { id: req.params.id } })
        if (!deletedCat) {
          res.status(404).send('No category found with the ID provided, try another one');
        };
        res.status(200).send('Category deleted succesfully!');
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
