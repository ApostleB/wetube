# 동영상 스트리밍 사이트 Wetube

+ 사용기술
    + Node.js
    + express
        + express session
            + Mongo Store
        + express flash
    + Mongo DB
        + mongoose
    + Pug
    + sass
    + webpack
    + Vanillar JS
    + MVC Model

# [UPDATE 1] SET UP
    What?

# [UPDATE 2] SET UP 
	npm 의존성, pakage.json
	Babel
	Nodemon
}

# [UPDATE 3] INTRODUCTION TO EXPRESS
    server
    middleware
    controller    


# [UPDATE 4] ROUTERS
    Cleaning the Code
    import, export
    URL Parmeter
    URL 정규표현식

    / -> Home
    /join -> Join
    /login -> Login
    /search -> Search

    /users/:id -> See User
    /users/logout -> Log Out
    /users/:id/edit -> Edit My Profile
    /users/:id/delete -> Delete My Profile

    /videos/:id  -> See Video
    /videos/:id/edit  -> Edit Video
    /videos/:id/delete  -> Delete Video
    /videos/upload -> Upload Video


    /videos/comments  -> Comment on a Video
    /videos/comments/delete  -> Delete A Comment of a Video


# [UPDATE 5] TEMPLATES
    Configurating PUG
    Pratials
    Extending Templates
    Variables to Templates
    MVP Styles
    Conditionals (if)
    Iteration(for each)
    Mixins(pug 재사용)


# [UPDATE 6] MONGODB, MONGOOSE
    Array Database
    post Routing
    MongoDB Setting
    server.js/init.js분할git 
    db Validation
    db Middlewares static
    db search
    video CRUD

# [UPDATE 7] USER AUTHENTICATION
    Create UserModel
    
# [UPDATE 8] USER PROFILE
    Custom Middleware
    Password Model
    Static Files Add
    Video Owner Check
    Bugfix

# [UPDATE 9] WEBPACK
    Webpack Configuration
    SCSS Loder
    nodemon config/setting

# [UPDATE  10] STYLES
    SCSS Styling

# [UPDATE 11 VIDEO PLAYER]
    Vanillar JS for Custom Player
        Controller Event

# [UPDATE 12 VIEWS API]
    Count Views
        + Vanillar JS fetch Post

# [UPDATE 13 VIDEO RECORDER]
    Video Recording
        웹캠 없음으로 화면공유로 대체


# [UPDATE 13 FLASH MESSAGE]
    flash message for redirect

# [UPDATE 14 COMMENT]
    Comments Model Define

# [UPDATE 15 DEPLOYMENT]
