import React from 'react';
import './AdPopup.css';

function AdPopup({isOpen, onClose}) {
    if ( !isOpen ) return null;

    return (
        <div className="AdPopup">
            <div className="AdPopup-content">
                <p>Here could be your ad</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default AdPopup;