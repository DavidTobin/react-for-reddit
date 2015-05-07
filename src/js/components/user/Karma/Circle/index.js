import React from 'react';

class UserKarmaCircle extends React.Component {
  render() {
    return (
      <aside className={this.getClassNames()}>
        {this.props.karma}
      </aside>
    );
  }

  getClassNames() {
    let classNames = ['user-KarmaCircle'];

    if (this.props.karma < 0) {
      classNames.push('negative');
    } else if (this.props.karma <= 1 && this.props.karma >= 0) {
      classNames.push('neutral');
    }

    return classNames.join(' ');
  }
}

UserKarmaCircle.propTypes = {
  karma: React.PropTypes.number.isRequired,
  size: React.PropTypes.oneOf(['small', 'medium', 'large'])
};

export default UserKarmaCircle;
