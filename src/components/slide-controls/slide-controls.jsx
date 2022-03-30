import React from 'react';
import {navigate} from 'gatsby';


export const visibleClassNameFromStep = currentStep => step =>
  ((currentStep < step) ? 'hidden' : 'visible');

export const visibleClassNameInStep = currentStep => step =>
  ((currentStep !== step) ? 'hidden' : 'visible');

export const visibleClassNameUntilStep = currentStep => step =>
  ((currentStep > step) ? 'hidden' : 'visible');

function slideControls(WrappedComponent, previousPage, nextPage, totalSteps = 1) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentStep: 1
      };
      this.handleOnKeyDown = this.onKeyDown.bind(this);
    }

    render() {
      return <WrappedComponent {...this.props} currentStep={this.state.currentStep} />;
    }

    componentDidMount() {
      document.addEventListener('keydown', this.handleOnKeyDown, false);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleOnKeyDown, false);
    }

    onKeyDown(event) {
      switch (event.key) {
        case 'Left':
        case 'ArrowLeft':
          if (this.state.currentStep > 1) {
            this.setState({currentStep: this.state.currentStep - 1});
          } else {
            navigate(previousPage);
          }
          break;
        case 'Right':
        case 'ArrowRight':
          if (this.state.currentStep < totalSteps) {
            this.setState({currentStep: this.state.currentStep + 1});
          } else {
            navigate(nextPage);
          }
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
