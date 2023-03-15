import multer from 'multer'



const fileStorageEngineAvatar = (path) => multer.diskStorage({
    destination: (_req, _file, cb) => {
		cb(null, path);
    },

    filename: (_req, file, cb) => {
      	cb(null, `${file.originalname}`);
		
    },
});

export const uploadLocationImage = multer({ storage: fileStorageEngineAvatar('./assets/location_pic') });
export const uploadEventImage = multer({ storage: fileStorageEngineAvatar('./assets/event_pic') });
export const uploadCompanyImage = multer({ storage: fileStorageEngineAvatar('./assets/company_pic') });
export const uploadAvatarImage = multer({ storage: fileStorageEngineAvatar('./assets/avatars') });

