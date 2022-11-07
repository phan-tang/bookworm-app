import React from 'react';
import 'react-dom';
import './footer.scss';
import bookworm_icon from '../../../../assets/bookworm_icon.svg';
import bookworm_icon_white from '../../../../assets/bookworm_icon_white.svg';

function Footer() {
    return (
        <div className="footer">
            <div className="row">
                <span className="brand-icon">
                    <img src={bookworm_icon_white} alt="" />
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