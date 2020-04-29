exports.isPrivate = (req, res, next) => {
    // must be authenticated to go to the next function
    if(req.session.user) {
        return next();
    }
    else {
        res.redirect('/login');
    }
};

exports.isPublic = (req, res, next) => {
    // if authenticated, go to the home page
    if(req.session.user) {
        res.redirect('/');
    }
    else {
        return next();
    }
};