import mongoose from 'mongoose'

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: [true, "Please provide employee degree"],
    },
    university: {
        type: String,
        required: [true, "Please provide university name"],
    },
    graduationYear: {
        type: String,
        required: [true, "Please provide graduation year"],
    }
});

export { educationSchema };