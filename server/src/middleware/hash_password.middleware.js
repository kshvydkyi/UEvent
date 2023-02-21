import crypto from 'crypto';

export const hashPassword = async (password) => {
    try {
        const hash = crypto.createHmac('sha512', 'salt');
        hash.update(password);
        return hash.digest('hex');
    } catch (e) {
        throw e;
    }
};

