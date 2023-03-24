import React from 'react'
import { StandardButton } from '../StandardButton/StandardButton';

type FormProps = {
    text: string;
}
const Form = (props: FormProps) => {
    const { text } = props;
    return (
        <div>
            <h2>{text}</h2>
            <input placeholder='Your email adress' type="email" />
            <input placeholder='Your password' type="password" />
            {text === 'Register' && <input placeholder='Confirm password' type="password" />}
            <StandardButton buttonText={text} url='./bla' />
        </div>
    )
}

export default Form