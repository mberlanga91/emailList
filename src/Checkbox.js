import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  state = {
    isChecked: false,
  }
  
  

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;
    const { email } = this.props;
    
    

    return (
      <div className="input-group">
          
        <span className="input-group-addon">
          <input
                            type="checkbox"
                            value={label}
                            checked={isChecked}
                            onChange={this.toggleCheckboxChange}
                            id="a"
                        />
        </span>
        <label for="a" className="text-left list-group-item align-baseline">
          {label} <br/> {email}
          
        </label>
      </div>
    );
   
  } 
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;