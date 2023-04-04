import React, { useEffect, useState } from 'react';
import './ImageUpload.css'

type ImageUploadProps = {
    isEditable: boolean,
    setCurrentImage: (file: File) => void,
    currentImage: File | null,
}

const ImageUpload = ({ isEditable, currentImage, setCurrentImage }: ImageUploadProps) => {

    const [display, setDisplay] = useState<string>('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (currentImage) {
            setDisplay(URL.createObjectURL(currentImage));
        } else {
            setDisplay('https://www.vhv.rs/dpng/d/526-5268314_empty-avatar-png-user-icon-png-transparent-png.png')
        }
    }, [currentImage])

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setCurrentImage(selectedFile);
            setDisplay(URL.createObjectURL(selectedFile));
        }
    };
    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className='profile-pic-container'>
            {isEditable && <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileInputChange} />}
            <img className='profile-pic' src={display} alt="Preview" onClick={handleClick} style={{ cursor: 'pointer' }} />
        </div>
    );
}

export default ImageUpload;
