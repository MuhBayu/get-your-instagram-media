var React = require('react')

class Card extends React.Component {
    render() {
        return (
            <div className="col-md-4 mt-3" key={this.props.index}>
                <div className="card">
                    {this.props.data.type == 'photo' ? 
                        <img className="card-img-top" src={this.props.data.display_url} alt="Card image"/>
                    : 
                    <div className="embed-responsive embed-responsive-16by9">
                    <video width="400" controls>
                        <source src={this.props.data.url} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                    </div>
                    }
                    <div className="card-footer">
                        <a href={this.props.data.url + "&dl=1"} className="btn btn-primary btn-sm">Download</a>
                    </div>
                </div>
            </div>
        )
    }
}

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
        ig_url: null,
        ig_medias: [],
        results: null
    };
  }
  onChange(e) {
      this.setState({ig_url:e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault();
    fetch('/api?ig_url='+this.state.ig_url).then(data => data.json()).then(data => {
        if(data.success) {
            this.setState({ig_medias: data.data.medias});
            this.setState({results: data.data});
        } else {
            alert("Failed")
        }
    }).catch(err => alert('Failed'))
  }
  render() {
    return (
      <div className="container mt-4">
        <form className="" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Input Instagram post URL" value={this.state.text} onChange={this.onChange}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">Get</button>
                </div>
            </div>
          </div>
        </form>
        {this.state.results ? 
        <div className="card mt-4">
            <div className="row no-gutters">
                <div className="col-auto">
                    <img src={this.state.results.profile.profile_pic_url} className="img-fluid" alt="" />
                </div>
                <div className="col">
                    <div className="card-block px-4">
                        <h5 className="card-title mt-2">{this.state.results.profile.displayName}</h5>
                        <p className="card-text">{this.state.results.text}</p>
                    </div>
                </div>
            </div>
        </div>
        : null}
        <div className="row">
            {Object.values(this.state.ig_medias).map((data, index) => {
                return (
                    <Card index={index} data={data} />
                )
            })}
        </div>
      </div>
    );
  }
}

module.exports = Index;