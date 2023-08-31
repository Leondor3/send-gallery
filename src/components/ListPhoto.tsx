import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { LockKeyOpen, Lock, X, Heart } from '@phosphor-icons/react';
import { firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { button } from '../theme/ThemeContext';


export function ListPhotos() {
    const navigate = useNavigate()

    function handleViewPhotos() {
        navigate('/photos')
    }

    return (
        <button onClick={handleViewPhotos} className={button({ size: 'lg', color: 'secondary' })}>Visualizar Fotos</button>
    );
}
