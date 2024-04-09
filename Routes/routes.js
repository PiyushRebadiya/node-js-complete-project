const router = require("express").Router();
const multer = require('multer');

const auth = require("../middleware/auth")

const userListController = require('../controller/userlist');
const uploadFileController = require('../controller/uploadfile');


router.get("/userlist", userListController.fetchUserList)
router.get("/userlistauth", auth, userListController.fetchPrivateUserList)
router.post("/userlist", userListController.addUserList)
router.put("/userlist", userListController.updateUserListById)
router.delete("/userlist", userListController.removeUserListById)

//upload file
// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where uploaded files will be stored
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for the uploaded file
        cb(null, Date.now() + '_' + file.originalname);
    }
});
const upload = multer({ storage: storage });
router.post("/upload", auth, upload.single("image"), uploadFileController.uploadFile);

module.exports = router;