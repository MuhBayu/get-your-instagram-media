var React = require('react')
var ReactDOMServer = require('react-dom/server')
var Index = require('./Index')

class Layout extends React.Component {
  render() {
    const data = this.props.data;

    const contentHtml = ReactDOMServer.renderToString(<Index {...data} />);

    return (
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="/app.css"
          />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: contentHtml}} />
          <script src="/main.js" />
          <script>main()</script>
        </body>
        <footer style={{marginTop:'100px'}} className="text-center py-3">
          <div className="container">
            <p>Made with ❤️+ Express + React from MuhBayu</p>
            <p>
              <a href="https://github.com/MuhBayu/get-your-instagram-media" target="_blank" className="text-dark"><i className="fa fa-github fa-3x"></i></a>
            </p>
          </div>
        </footer>
      </html>
    );
  }
}

module.exports = Layout;