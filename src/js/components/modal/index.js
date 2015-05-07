import React from 'react';

class Modal extends React.Component {
  render() {
    if (this.props.open) {
      return (
        <section className={this.getClassNames()}>
          {this.props.children}
        </section>
      );
    } else {
      return (<span>{this.props.children}</span>);
    }
  }

  getClassNames() {
    let classNames = ['modal-view'];

    if (!this.props.open) {
      classNames.push('hide');
    }

    return classNames.join(' ');
  }
}

Modal.propTypes = {
  open: React.PropTypes.bool.isRequired
};

export default Modal;
