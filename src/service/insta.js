const unirest = require('unirest');

const getMedia = (url) => {
    url = url.replace(/\/$/, '')
    return unirest.get(`${url}/?__a=1`).then(data => {
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