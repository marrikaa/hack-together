import React, { useEffect, useState } from 'react';
import ProfileImages from '../../assets/images/profileImages';
import './SelectImagePopUp.css';

type SelectImagePopUpProps = {
    currentImageIndex: number,
    setSelectedIndex: (i: number) => void,
    setVisible: (b: boolean) => void,
}

export const SelectImagePopUp = ({ currentImageIndex, setSelectedIndex, setVisible }: SelectImagePopUpProps) => {

    const select = (index: number) => {
        setSelectedIndex(index);
    }

    const close = () => {
        setVisible(false);
    }

    return (
        <div className='pop-up-container'>
            <div className='pop-up'>
                <div className='profile-image-pop-up-container'>
                    {ProfileImages.map((img, i) => {
                        return <img src={img} alt='' className={currentImageIndex === i ? 'image-picker-image selected' : 'image-picker-image'} onClick={() => select(i)} />
                    })}
                </div>
                <button onClick={close} className='red-button'>Select</button>
            </div>
        </div>
    )
}
