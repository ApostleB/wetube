import morgan from "morgan";
import Video from "../models/Video";

export const home = async (req, res) => {
/* 
    callback방식
    //{} = 전부 찾는다
    // Video.find({}, (err, videos) =>  {
    // });
*/
    //DB가 다 불러질때까지 기다린다.
    // await은 function안에서만 사용이 가능하다.
    const videos = await Video.find({}).sort({ createdAt:"desc" });
    return res.render("home", { pageTitle: "Home", videos });
}

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(video){
        return res.render("watch", { pageTitle: `Watching: ${video.title} `, video});
    }else{
        return res.status(404).render("404", { pageTitle: `404 NOT FOUND` });
    }
}

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(video){
        return res.render("edit", { pageTitle: `Editing: ${video.title}`, video});
    }
    return res.status(404).render("404", { pageTitle: "404 NOT FOUND" });
}

// export const postEdit = async (req, res) => {
//     const { id } = req.params;
//     const { title, description, hashtags } = req.body;
//     const video = await Video.exists({ _id: id });
//     if (!video) {
//         return res.render("404", { pageTitle: "Video not found." });
//     }
//     await Video.findByIdAndUpdate(id, {
//       title,
//       description,
//       hashtags: Video.formatHashtags(hashtags)
//     });
//     return res.redirect(`/videos/${id}`);
// };

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {

    return res.render("upload",{ pageTitle: `Upload Video` });
}

export const postUpload = async (req, res) => {
    //video array
    const { title, description, hashtags } = req.body;
    //DB에 저장할 데이터 검증(Validation)
    //const Video = new Video({
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      // .split(",") 미들웨어에서 처리 해줌
      // .map((word) => word.startsWith("#") ? word : `#${word}`)
    });
    //DB에 저장, promise를 return한다.
    
    return res.redirect("/");
};

export const deleteVideo = async (req,res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete({ _id:id });
    return res.redirect("/");
}

export const search = async (req, res) => {
    const { keyword } = req.query;
    if(keyword){
        const videos = await Video.find({
            title: { 
                $regex: new RegExp(`${keyword}`, "i")
            }
        });
        return res.render("search", { pageTitle: `Search : ${videos.length}`, videos });
    }else{
        const videos = [];
        return res.render("search", { pageTitle: "Search", videos });
    }
}