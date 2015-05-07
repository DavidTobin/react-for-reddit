import React from 'react';

class ThreadImageThumbnail extends React.Component {
  constructor() {
    super();

    this.state = {
      resolve: false
    };
  }

  render() {
    if (this.props.resolve) {
      if (this.props.resolve.match('\.gifv') !== null) {
        let videoUrl = this.props.resolve.replace('gifv', 'webm');

        return (
          <div className="thread-ImageThumbnail">
            <video className="img-responsive img-thumbnail" autoPlay loop src={videoUrl}>
              <img src={this.props.src} className="img-responsive img-thumbnail" />
            </video>
          </div>
        );
      }
    }

    return (
      <div className="thread-ImageThumbnail" onClick={this.onClickLoadResolveImage.bind(this)}>
        <img src={this.state.resolve ? this.props.resolve : this.props.src} className="img-responsive img-thumbnail" />
      </div>
    );
  }

  onClickLoadResolveImage() {
    console.log(this);

    if (this.props.resolve && !this.state.resolve) {
      this.setState({
        resolve: true
      });
    }
  }
}

ThreadImageThumbnail.propTypes = {
  src: React.PropTypes.string.isRequired,
  resolve: React.PropTypes.string
};

export default ThreadImageThumbnail;
