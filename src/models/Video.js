import mongoose, { mongo } from "mongoose";

//데이터 형태 정의
const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: Date,
    hashtag: [ {type:String } ],
    meta: {
        views:Number,
        rating:Number,
    }
})

const Video = mongoose.model("Video", videoSchema);
export default Video;