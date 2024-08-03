import { Schema, model, Document, Types } from 'mongoose';

interface Post extends Document {
    author: Types.ObjectId,
    file_id: String,
    key: String
}

const PostShema = new Schema<Post>({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    file_id: {type: String, required: true},
    key: {type: String, required: true}
})

const PostModel = model<Post>('Post', PostShema)

export default PostModel