// Controller for chat routes


// ====== FUNCTIONS ======

function chatPage (req, res) {
    console.log(req.user._id.toHexString());
    res.render('chat');
}


// ====== EXPORTS ======

module.exports = {
    chatPage
}