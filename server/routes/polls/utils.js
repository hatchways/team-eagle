const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

// Connecting to s3 object
const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
});

// Upload method using multer to upload files to bucket for polls
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'hatchways-social-app',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

const parseArrOfFriendLists = (list) => {
  return list.map((item) => {
    return ((_id) => ({ _id }))(list);
  });
};

module.exports = upload;
// module.exports = parseArrOfFriendLists;
