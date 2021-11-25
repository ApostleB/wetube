import Video from "../models/Video";

export const home = (req, res) => {
    console.log("Start");
    //{} = 전부 찾는다
    Video.find({}, (err, videos) =>  {
        console.log("Finished");
        //db검색이 끝나고 rendering을 시켜줘야 하기 때문에
        return res.render("home", { pageTitle : "Home", videos: [] });
    });
    console.log("hello")    //이게 먼저 출력된다.
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

export const postUpload = (req, res) => {
    //video array
    const { title } = req.body

    return res.redirect("/");
};