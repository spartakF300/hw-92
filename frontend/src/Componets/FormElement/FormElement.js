import React from 'react';
import PropTypes from 'prop-types';
import {Col, FormFeedback, FormGroup, Input, Label} from "reactstrap";

const FormElement = props => {
    let inputChildren = null;
    if (props.type === 'select') {
        const options = [
            {id: '', title: 'Please select' + props.title + '...'},
            ...props.options
        ];
        inputChildren = options.map(o => (
            <option key={o.id} value={o.id}>{o.title}</option>
        ))
    }

    return (
        <FormGroup row>
            <Label for={props.propertyName} sm={2}>{props.title}</Label>
            <Col sm={10}>
                <Input
                    type={props.type} required={props.required}
                    id={props.propertyName} name={props.propertyName}
                    value={props.value}
                    placeholder={props.placeholder}
                    invalid={!!props.error}
                    onChange={props.onChange}
                    autoComplete={props.autoComplete}
                    children={inputChildren}
                />
                {props.error && (
                    <FormFeedback>
                        {props.error}
                    </FormFeedback>
                )}
            </Col>
        </FormGroup>
    );
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.object),
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
};
export default FormElement