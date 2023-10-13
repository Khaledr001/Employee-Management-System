import {User} from '../models/User.js';

const findUserbyEmailOrName = async ({ name }) => 
    await User.findOne({ $or: [{ email: name }, { name }] });



export { findUserbyEmailOrName };
