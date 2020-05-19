import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const defaults = {
    fontSize: '.75rem',
    borderRadius: 50,
    minWidth: 120,
    padding: '16px',
}

export function PrimaryButton(props) {
    const Component = styled(Button)({
        ...defaults,
        background: 'black',
        border: 'none',
        color: 'white',
    });
    return <Component {...props}>{props.children}</Component>
}

export function SecondaryButton(props) {
    const Component = styled(Button)({
        ...defaults,
        background: 'transparent',
        border: '2px solid white',
        color: 'white',
    });
    return <Component {...props}>{props.children}</Component>
}