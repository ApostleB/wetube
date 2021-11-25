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
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
}

export const watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", { pageTitle: `Watching: `});
}

export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle: `Editing: `});
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
}

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
        hashtags: hashtags.split(",").map(word => `#${word}`), 
    })
    //DB에 저장, promise를 return한다.
    
    return res.redirect("/");
};