// Dependencies
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema definition
// postDate: Type timestamp
const gameSchema = new Schema(
    {
        name: String,
        year: Number,
        description: String,
        picture: String,
        postDate: {
            type: Date,
            default: Date.now
        }
    }
);

// Export the schema to use it anywhere else
export default mongoose.model('Game', gameSchema);