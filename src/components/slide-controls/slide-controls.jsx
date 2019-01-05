import React from 'react';
import {navigate} from 'gatsby';

function slideControls(WrappedComponent, previousPage, nextPage) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return <WrappedComponent {...this.props} />
    }

    componentDidMount(){
      document.addEventListener('keydown', this.onKeyDown, false);
    }

    componentWillUnmount(){
      document.removeEventListener('keydown', this.onKeyDown, false);
    }

    onKeyDown(event) {
      switch (event.key) {
        case 'Left':
        case 'ArrowLeft':
          navigate(previousPage);
          break;
        case 'Right':
        case 'ArrowRight':
          navigate(nextPage);
          break;
        case 'Esc':
        case 'Escape':
          navigate('/');
          break;
        default:
      }
    }
  };
}

export default slideControls;
