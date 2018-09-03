// Dependencies
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema definition
// postDate: Type timestamp
const tiemSchema = new Schema(
    {
        name: String,
        description: String,
        price: Number,
        picture: [String],
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
export default mongoose.model('Item', itemSchema);