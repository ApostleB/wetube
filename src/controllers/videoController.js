const fakeUser = {
    username: "Jung",
    loggedIn: true
};
export const trendingVideos = (req, res) => {
    res.render("home", { pageTitle : "Home" , fakeUser });
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