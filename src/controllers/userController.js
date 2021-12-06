import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import "dotenv/config";

export const getJoin = (req, res) => {
    res.render("join", {
        pageTitle: "Join"
    });;
};
export const postJoin = async (req, res) => {
    console.log(req.body);
    const {
        name,
        username,
        email,
        password,
        password2,
        location
    } = req.body;
    console.log("password : ", password);
    console.log("password2 : ", password2);
    if (password !== password2) {
        const errorMessage = "Password confirmation does not match";
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage
        });
    }
    const exists = await User.exists({
        $or: [{
            username
        }, {
            email
        }]
    });
    if (exists) {
        const errorMessage = "This username/email is already taken.";
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage
        });
    }
    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("login");
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle: "error Join",
            errorMessage: "error Join"
        })
    }

};

export const getLogin = (req, res) => {
    res.render("login", {
        pageTitle: "Login"
    });
};

export const postLogin = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const pageTitle = "Login"
    //user가 맞는지 검사하고
    const user = await User.findOne({
        username,
        socialOnly: false
    });
    //없으면 실패처리
    if (!user) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "아이디가 일치하지 않습니다."
        });
    }
    //user는 있으니 패스워드 비교
    const ok = await bcrypt.compare(password, user.password);
    //없으면 실패처리
    if (!ok) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "패스워드가 일치하지 않습니다.",
        });
    }
    //세션 정보 추가
    req.session.loggedIn = true;
    req.session.user = user;
    res.redirect("/");
};

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();

    if ("access_token" in tokenRequest) {
        const {
            access_token
        } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                }
            })
        ).json();
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!emailObj) {
            return res.redirect("/login");
        }

        let user = await User.findOne({
            email: emailObj.email
        });
        if (!user) {
            const user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
}

export const getEdit = (req, res) => {
    return res.render("edit-profile", {
        pageTitle: "Edit Profile",
        user:res.locals.loggedInUser
    })
};

export const postEdit = (req, res) => {
    return res.render("edit-profile");
};

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};

export const see = (req, res) => {
    res.send("See Profile")
};