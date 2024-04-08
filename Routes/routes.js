const router = require("express").Router();
const userListController = require('../controller/userlist');

router.get("/userlist" ,userListController.fetchUserList)
router.post("/userlist" ,userListController.addUserList)
router.put("/userlist" ,userListController.updateUserListById)
router.delete("/userlist" ,userListController.removeUserListById)

module.exports = router;