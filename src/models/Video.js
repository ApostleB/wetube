import mongoose from "mongoose";

//데이터 형태 정의
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, },
  description: { type: String, required: true, trim: true, },
  createdAt: { type: Date, required:true, default:Date.now},
  hashtag: [{ type: String, trim:true }],
  meta: {
    views: { type: Number, default:0, required:true },
    rating: { type: Number, default:0, required:true },
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;