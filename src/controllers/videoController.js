const fakeUser = {
    username: "Jung",
    loggedIn: true
};
export const trendingVideos = (req, res) => {
    const videos = [
        {
            title: "First Video",
            rating:5,
            comments:2,
            createdAt: "2 minutes ago",
            views:59,
            id:1,
        },
        {
            title: "Second Video",
            rating:5,
            comments:2,
            createdAt: "3 minutes ago",
            views:59,
            id:2,
        },
        {
            title: "Third Video",
            rating:5,
            comments:2,
            createdAt: "4minutes ago",
            views:98,
            id:3,
        }
    ];
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