var solfege = require('solfegejs');

/**
 * The request bar for HTML response
 */
var RequestBar = solfege.util.Class.create(function()
{

}, 'solfege.bundle.serverDebugger.RequestBar');
var proto = RequestBar.prototype;

/**
 * The server middleware
 *
 * @param   {Object}                request     The request
 * @param   {Object}                response    The response
 * @param   {GeneratorFunction}     next        The next function
 */
proto.middleware = function*(request, response, next)
{
    // Handle the next middleware
    yield *next;

    // Display the bar if it is a HTTP response
    var contentType = response.getHeader('Content-Type');
    if (contentType === 'text/html') {
        response.body = response.body + '<div id="solfegejs-requestbar"></div>';
    }
};


module.exports = RequestBar;
