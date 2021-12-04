const Admin = require('../../models/admin');

exports.getIndexPage = (req, res, next) => {
    const adminName = res.locals.currentUserName;
    Admin.findOne({name: adminName})
    .then(admin => {
        //"admin/indexPage"
        res.send({
            pageTitle: "Admin Index Page",
            path: "/admin/indexPage",
            editing: false,
            admin: admin
        });
    })
    
}