const router = require("express").Router();
const userListController = require('../controller/userlist');
const auth = require("../middleware/auth")

router.get("/userlist" ,userListController.fetchUserList)
router.get("/userlistauth", auth , userListController.fetchPrivateUserList)
router.post("/userlist" ,userListController.addUserList)
router.put("/userlist" ,userListController.updateUserListById)
router.delete("/userlist" ,userListController.removeUserListById)

module.exports = router;