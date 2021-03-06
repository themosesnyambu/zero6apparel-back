import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  secret:
        process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
};
