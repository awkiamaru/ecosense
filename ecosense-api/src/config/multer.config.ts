import * as crypto from 'crypto';
export const fileEditName = (request, file, callback) => {
  const hash = crypto.randomBytes(6).toString('hex');
  const filename = `${hash}-${file.originalname}`;

  callback(null, filename);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
