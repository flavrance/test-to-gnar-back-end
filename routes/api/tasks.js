const router = require('express').Router();
const tasks = require('../../controllers/task.controller');


router.post('/', tasks.create);
router.get("/:id", tasks.findById);
router.get("/", tasks.findAll);
router.put('/:id/status', tasks.update);


module.exports = router;