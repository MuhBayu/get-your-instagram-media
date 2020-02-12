const unirest = require('unirest');

const getMedia = (url) => {
    let liknfilter = /\/p\/([^\/]+)\/$/;

    if(url.match(liknfilter) !== null){
        var shortcode = url.match(liknfilter)[1];
    } else {
        return null
    }
    return unirest.get(`https://www.instagram.com/p/${shortcode}/?__a=1`).then(data => {
        try {
            if(data.status == 200 && data.body.graphql) {
                return data.body
            } return null
        } catch (error) {
            return null
        }
    }).catch(data => null)
}
module.exports = {
    getMedia,
}