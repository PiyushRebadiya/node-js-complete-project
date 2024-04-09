
const uploadFile = async (req, res) => {
    try {
        const decodedData = req.user;
        if(!decodedData) {
            return res.status(401).send('Unauthorized');
        }
        if (req.body) {
            let displayData = req.file && req.file.filename ? `http://localhost:8080/images/${req.file.filename}` : ""
            res.json({
              "success": true,
              "image": displayData
            })
          }  else {
            console.error("please send type for image...")
          }
    } catch (error) {
        console.log("error", error);
        res.status(500).send('Internal Server Error');
    }

};

module.exports = {
    uploadFile
};