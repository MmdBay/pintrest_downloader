import { Schema, model, Document } from 'mongoose';

interface User extends Document {
    first_name: string;
    username?: string;
    chat_id: number;
    createdAt?: Date;
}

const userSchema = new Schema<User>({
    first_name: { type: String, required: true },
    username: { type: String },
    chat_id: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const UserModel = model<User>('User', userSchema);

export default UserModel;