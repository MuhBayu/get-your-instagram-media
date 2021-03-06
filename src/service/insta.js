const unirest = require('unirest');

const getMedia = (url) => {
    let url_split= url.replace(/\/$/i, '').split('/')
    if(url_split && url_split.length > 4) {
        var shortcode = url_split[4]
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