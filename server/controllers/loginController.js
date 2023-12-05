// Controller for requests to login route


// ====== FUNCTIONS ======

function loginPage (req, res) {
    res.render('login');
}


// ====== EXPORTS ======

module.exports = {
    loginPage
}