const router = require("express").Router();
const userListController = require('../controller/userlist');
const loginController = require('../controller/login');
const auth = require("../middleware/auth")

router.get("/userlist" ,userListController.fetchUserList)
router.get("/userlistauth", auth , userListController.fetchPrivateUserList)
router.post("/userlist" ,userListController.addUserList)
router.put("/userlist" ,userListController.updateUserListById)
router.delete("/userlist" ,userListController.removeUserListById)

router.get("/login" ,loginController.loginHandler)
module.exports = router;