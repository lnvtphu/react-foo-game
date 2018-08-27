// Dependencies
import mongoose from 'mongoose';
const Schema =  mongoose.Schema;

// Schema definition
// postDate: Type timestamp
const userSchema = new Schema(
    {
        email: String,
        password: String,
        displayName: String,
        firstName: String,
        lastName: String,
        status: String,
        createDate: {
            type: Date,
            default: Date.now
        },
        updatedDate: {
            type: Date,
            default: Date.now
        }
    }
);

// Export the schema to use it anywhere else
export default mongoose.model('User', userSchema);