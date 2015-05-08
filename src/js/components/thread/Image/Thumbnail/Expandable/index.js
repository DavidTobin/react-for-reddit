import React from 'react';

import Modal from '../../../../modal';

class ThreadImageThumbnailExpandable extends React.Component {
  constructor() {
    super();

    this.state = {
      modal: false
    };
  }

  render() {
    return (
      <aside className="thread-ImageThumbnailExpandable" onClick={this.onClick.bind(this)}>
        <Modal open={this.state.modal}>
          {this.props.children}
        </Modal>
      </aside>
    );
  }

  onClick(e) {
    e.stopPropagation();

    // Open expanded modal view
    this.setState({
      modal: !this.state.modal
    });
  }
}

ThreadImageThumbnailExpandable.propTypes = {
  children: React.PropTypes.element
};

export default ThreadImageThumbnailExpandable;
