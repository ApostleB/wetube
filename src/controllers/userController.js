import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req,res) => {
    res.render("join", { pageTitle:"Join" });;
};
export const postJoin = async (req, res) => {
    console.log(req.body);
    const { name, username, email, password, password2, location } = req.body;
    console.log("password : ", password);
    console.log("password2 : ", password2);
    if(password !== password2){
        const errorMessage = "Password confirmation does not match";
        return res.status(400).render("join", { pageTitle: "Join", errorMessage });
    }
    const exists = await User.exists({ 
        $or: [ {username}, {email} ]
    });
    if (exists) {
        const errorMessage = "This username/email is already taken.";
        return res.status(400).render("join", { pageTitle: "Join", errorMessage });
    }
    try{
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("login");
    }catch(error){
        return res.status(400).render("join",{ pageTitle: "error Join", errorMessage: "error Join"})
    }
    
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login"
    //user가 맞는지 검사하고
    const user = await User.findOne({ username });
    //없으면 실패처리
    if(!user){
        return res.status(400).render("login",{ 
            pageTitle, 
            errorMessage:"아이디가 일치하지 않습니다."
        });
    }
    //user는 있으니 패스워드 비교
    const ok = await bcrypt.compare(password, user.password);
    //없으면 실패처리
    if(!ok){
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

export const edit = (req, res) => {
    res.send("Edit User");
};

export const remove = (req, res) => {
  res.send("Remove User");
};


export const logout = (req,res) => {
    res.send("Logout");
};

export const see = (req, res) => {
    res.send("See Profile")
};