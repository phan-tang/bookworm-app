import React from 'react';
import './about.scss'

function About() {
    return (
        <>
            {/* <!-- About Us --> */}
            <div className="container about-us">
                {/* <!-- Part Title --> */}
                <div className="row">
                    <div className="part-title">
                        <p>About Us</p>
                    </div>
                </div>
                <div className="line"></div>
                {/* <!-- Bookworm Information --> */}
                <div className="row page-padding-content bookworm-information">
                    {/* <!-- Title --> */}
                    <div className="about-title">
                        <h1>Welcome to Bookworm</h1>
                    </div>
                    <div className="about-content">
                        <div className="row">
                            <span>"Bookworm is an independent New York bookstore and language school with locations in
                                Manhattan and Brooklyn. We specialize in travel books and language classes."</span>
                        </div>
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <h4>Our Story</h4>
                                <p>
                                    The name Bookworm was taken from the original name for New York International Airport,
                                    which was renamed JFK in December 1963.
                                </p>
                                <p>
                                    Our Manhattan store has just moved to the West Village. Our new location is 170 7th Avenue
                                    South, at the corner of Perry Street.
                                </p>
                                <p>
                                    From March 2008 through May 2016, the store was located in the Flatiron District.                            </p>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <h4>Our Vision</h4>
                                <p>
                                    One of the last travel bookstores in the country, our Manhattan store carries a range of
                                    guidebooks (all 10% off) to suit the needs and tastes of every traveller and budget.
                                </p>
                                <p>
                                    We believe that a novel or travelogue can be just as valuable a key to a place as any guidebook,
                                    and our well-read, well-travelled staff is happy to make reading recommendations for any
                                    traveller, book lover, or gift giver.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;