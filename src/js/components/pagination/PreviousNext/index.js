import React from 'react';
import ThreadStore from '../../../stores/Thread';
import ThreadActions from '../../../actions/Thread';

class Next extends React.Component {
  constructor() {
    super();

    this.state = {
      after: null,
      before: null
    };

    this.onThreadStoreChanged = this.onThreadStoreChanged.bind(this);
  }

  componentDidMount() {
    ThreadStore.addChangeListener(this.onThreadStoreChanged);

    if (ThreadStore.getDataType() !== 'frontpage' || ThreadStore.getAll().length === 0) {
      ThreadActions.getFrontpage();
    }
  }

  render() {
    return (
      <button className={this.getClassNames()} onClick={this.onButtonClick.bind(this)}>{this.getButtonName()}</button>
    );
  }

  getButtonName() {
    return 'Next';
  }

  getClassNames() {
    let classNames = ['btn', 'btn-primary'];

    if (!this.state.after) {
      classNames.push('hide');
    }

    return classNames.join(' ');
  }

  onButtonClick() {
    ThreadActions.getFrontpage({
      after: this.state.after
    });
  }

  onThreadStoreChanged() {
    this.setState({
      before: ThreadStore.getMeta('before'),
      after: ThreadStore.getMeta('after')
    });
  }
}

class Previous extends Next {
  getButtonName() {
    return 'Previous';
  }

  getClassNames() {
    let classNames = ['btn', 'btn-error'];

    if (!this.state.before) {
      classNames.push('hide');
    }

    return classNames.join(' ');
  }

  onButtonClick() {
    ThreadActions.getFrontpage({
      before: this.state.before
    });
  }
}

export {Next as default, Previous};
