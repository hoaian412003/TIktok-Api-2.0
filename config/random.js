import crypto from 'crypto';

const randomId = () => {
    return crypto.randomUUID();
}

export default randomId;
