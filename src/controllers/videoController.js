const fakeUser = {
    username: "Jung",
    loggedIn: true
};
export const trendingVideos = (req, res) => {
    const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return res.render("home", { pageTitle : "Home", videos  });
}

export const see = (req, res) => {
    res.render("watch", { pageTitle: "Watch" });
}

export const edit = (req, res) => {
    res.render("edit", { pageTitle: "Edit" });
}

export const search = (req, res) => {
   res.send("search");
}

export const upload = (req, res) => {
    res.send("upload");
}

export const deleteVideo = (req,res) => {
    res.send("delete Video");
}