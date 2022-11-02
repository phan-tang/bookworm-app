import React from 'react';
import 'react-dom';
import './footer.scss';
import bookworm_icon from '../../../../assets/bookworm_icon.svg';

function Footer() {
    return (
        <div className="footer">
            <div className="row">
                <span className="brand-icon">
                    <a>
                        <img src={bookworm_icon} alt="" />
                    </a>
                </span>
                <span className="brand-information">
                    <h5>BOOKWORM</h5>
                    <p>Address</p>
                    <p>Phone</p>
                </span>
            </div>
        </div>
    );
}

export default Footer;