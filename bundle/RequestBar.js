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
 * @public
 * @param   {Object}                request     The request
 * @param   {Object}                response    The response
 * @param   {GeneratorFunction}     next        The next function
 */
proto.middleware = function*(request, response, next)
{
    var timerStart = process.hrtime();

    // Handle the next middleware
    yield *next;

    var timerDuration = process.hrtime(timerStart);
    var timerNanoseconds = timerDuration[0] * 1e9 + timerDuration[1];

    // Display the bar if it is a HTTP response
    var contentType = response.getHeader('Content-Type');
    if (contentType === 'text/html') {
        response.body = response.body + this.getHtml();
    }
};



/**
 * Get the HTML of the request bar
 *
 *
 * @return  {String} The HTML string
 */
proto.getHtml = function()
{
    var css = '<style type="text/css">' +
        '.solfegejs-requestbar {' +
            'position: fixed;' +
            'bottom: 0;' +
            'left: 0;' +
            'width: 100%;' +
            'height: 30px;' +
            'box-sizing: border-box;' +
            'background: #ccc;' +
            'border-top: solid 1px #666;' +
            'padding: 0;' +
            'font-size: 14px;' +
        '}' +
        '.solfegejs-requestbar * {' +
            'display: inline-block;' +
            'vertical-align: middle;' +
        '}' +

        '.solfegejs-requestbar-logo {' +
            'display: inline-block;' +
        '}' +
        '.solfegejs-requestbar-logo svg {' +
            'vertical-align: middle;' +
            'margin: 0 5px;' +
        '}' +
        '.solfegejs-requestbar-version {' +
            'vertical-align: middle;' +
            'line-height: 30px;' +
        '}' +
    '</style>';

    var html = '<div class="solfegejs-requestbar">';

    // Display the logo and the version
    html += '<span class="solfegejs-requestbar-logo">' + 
        '<svg width="20" height="20" viewBox="0 0 120 120">' +
            '<circle cx="60" cy="60" r="60" fill="black" />' +
            '<line x1="70" y1="20" x2="70" y2="90" stroke="white" stroke-width="4" />' +
            '<circle cx="56" cy="90" r="15" fill="white"/>' +
            '<path d="M 70,20 q 5,25 20,25 Q 71,50 71,40" fill="white" stroke="white" stroke-width="2"/>' +
        '</svg>' +
        '<span class="solfegejs-requestbar-version">' + solfege.version + '</span>' +
    '</span>';

    html += '</div>';

    return css + html;
};


module.exports = RequestBar;
