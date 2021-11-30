import mongoose from "mongoose";

// export const formatHashtags = (hashtags) => 
        

//데이터 형태 정의
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, },
  description: { type: String, required: true, trim: true, },
  createdAt: { type: Date, required:true, default:Date.now},
  hashtags: [{ type: String, trim:true }],
  meta: {
    views: { type: Number, default:0, required:true },
    rating: { type: Number, default:0, required:true },
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);


export default Video;


/**
 * videoSchema.pre('save', async function() {
    // console.log("Document를 생성했습니다.",this);
    //this.title = "HAHAHA!"; //새로 생성하는 documents는 타이틀이 무조건 이 값
    this.hashtag = this.hashtag[0]
        .split(",")
        .map(word => word.startsWith("#") ? word : `#${word}`);
})
 */