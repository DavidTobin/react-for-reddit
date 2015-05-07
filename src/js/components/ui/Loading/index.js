import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading text-center">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    );
  }
}

export default Loading;
