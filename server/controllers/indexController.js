// Controller for requests to the index route


// ====== FUNCTIONS ======

function testIndexRoute (req, res) {
    res.send('<h1>TEST ROUTE</h1>');
}


// ====== EXPORTS ======

module.exports = {
    testIndexRoute
}