import multer from 'multer'

const fileStorageEngineAvatar = multer.diskStorage({
    destination: (_req, _file, cb) => {
		cb(null, './assets/avatars');
    },

    filename: (_req, file, cb) => {
      	cb(null, `${file.originalname}`);
		
    },
});

const uploadAvatarImage = multer({ storage: fileStorageEngineAvatar });

export default uploadAvatarImage;

