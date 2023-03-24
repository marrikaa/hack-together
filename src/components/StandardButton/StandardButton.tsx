import { useNavigate } from 'react-router-dom';

type StandardButtonProps = {
    url: string;
    buttonText: string;
}

export const StandardButton = ({ url, buttonText }: StandardButtonProps) => {
    const navigate = useNavigate();
    const go = () => {
        navigate(url);
    }

    return (
        <button className='red-button' onClick={go}>{buttonText}</button>
    )
}
