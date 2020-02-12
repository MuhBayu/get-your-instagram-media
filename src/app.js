var express = require('express');
var reactViews = require('express-react-views');
const {
	getMedia
 } = require('./service/insta')
const path = require('path')
var app = express()

app.set('view engine', 'js')
app.set('views', path.join(__dirname, '/views'));
app.engine('js', reactViews.createEngine())

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', function(req, res) {
  var initialState = {}
  return res.render('Layout', {data: initialState})
})

app.get('/api', async (req, res) => {
    var medias = []
    let {ig_url} = req.query
    let get_medias = await getMedia(ig_url)
    if(get_medias) {
        let {owner, edge_media_to_caption} = get_medias.graphql.shortcode_media
        let profile = {
            username: owner.username,
            displayName: owner.full_name,
            profile_pic_url: owner.profile_pic_url
        }
        if ("edge_sidecar_to_children" in get_medias.graphql.shortcode_media) {
            var shortcode_media_children = get_medias.graphql.shortcode_media.edge_sidecar_to_children.edges
            shortcode_media_children.forEach(mediachil => {
                let media_child_node = mediachil.node
                if (media_child_node.is_video) {
                    medias.push({
                        "url": media_child_node.video_url,
                        "display_url": media_child_node.display_url,
                        "type": "video"
                    })
                } else {
                    medias.push({
                        "url": media_child_node.display_url,
                        "display_url": media_child_node.display_url,
                        "type": "photo"
                    })
                }
            });
        } else {
            var shortcode_media = get_medias.graphql.shortcode_media
            medias.push({
                "url": shortcode_media.is_video ? shortcode_media.video_url : shortcode_media.display_url,
                "display_url": shortcode_media.display_url,
                "type": shortcode_media.is_video ? "video" : "photo"
            })
        }
        return res.json({
            success: true,
            message: "OK",
            data: {
                profile: profile,
                text: edge_media_to_caption.edges[0].node.text,
                medias: medias
            }
        })
    } else {
        return res.json({
            success: false,
            message: "Failed to fetch",
        })
    }
})

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server listening on port ' + port)
})