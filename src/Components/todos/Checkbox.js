
import React, { Component } from 'react';

export default class Checkbox extends Component {
    state = {
        isChecked: false,
    };

    toggleCheckboxChange = () => {
        const { handleCheckboxChange, label } = this.props;

        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked,
            }
        ));

        handleCheckboxChange(label);
    };

    render() {
        const { label } = this.props;
        const { isChecked } = this.state;

        return (
            <div>
                <label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange}
                    />

                    {label}
                </label>
            </div>
        );
    }
}
