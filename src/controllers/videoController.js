import morgan from "morgan";
import User from "../models/User";
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
    //중요~
    const video = await Video.findById(id).populate("owner")
    if(!video){
        return res.status(404).render("404", { pageTitle: `404 NOT FOUND` });
    }
    return res.render("videos/watch", { pageTitle: `Watching: ${video.title} `, video});
}
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const {user: { _id }} = req.session;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", { pageTitle: "404 NOT FOUND" });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.render("videos/edit", { pageTitle: `Editing: ${video.title}`, video});
}

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { user: { _id }} = req.session;
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
    return res.render("videos/upload",{ pageTitle: `Upload Video` });
}
export const postUpload = async (req, res) => {
    console.log("NEW!!!!!!!!!",req.session);
    const {
        session:{
            user:{_id},
        },
        body:{
            title,description,hashtags
        },
        file
    } = req;
    
    try{
        const newVideo = await Video.create({
            title,
            fileUrl: file.path,
            description,
            owner: _id,
            hashtags: Video.formatHashtags(hashtags),
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
    }catch(error){
        console.log("videoController->postUpload 에러 : ",error)
    }
    return res.redirect("/");
};
export const deleteVideo = async (req,res) => {
    const { id } = req.params;
    const {user: { _id }} = req.session;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
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
        return res.render("videos/search", { pageTitle: `Search : ${videos.length}`, videos });
    }else{
        const videos = [];
        return res.render("videos/search", { pageTitle: "Search", videos });
    }
}