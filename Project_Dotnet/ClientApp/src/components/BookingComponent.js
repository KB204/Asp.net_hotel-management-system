import React, { useState } from 'react';
import './BookingComponent.css';

function BookingComponent() {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Additional validation logic if needed

        // Show the modal after submitting the form
        setShowModal(true);
    };

    const handleModalSubmit = () => {
        // Handle the API request to save reservation data to the database
        // You can use fetch or axios to send the data to your API endpoint
        // After successful submission, you can close the modal and reset form fields

        // For demonstration purposes, I'm just logging the data to the console
        console.log('Booking data submitted:', { checkInDate, checkOutDate });

        // Reset form fields and close the modal
        setCheckInDate('');
        setCheckOutDate('');
        setShowModal(false);
    };

    return (
        <div className="container-fluid booking pb-5 wow fadeIn position-absolute" data-wow-delay="0.1s" style={{ visibility: 'visible', animationDelay: '0.1s', animationName: 'fadeIn' }}>
            <div className="container">
                <div className="bg-white shadow" style={{ padding: '35px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-2">
                            <div className="col-md-10">
                                <div className="row g-2 justify-content-center">
                                    <div className="col-md-5">
                                        <div className="date" id="date1" data-target-input="nearest">
                                            <input
                                                type="text"
                                                className="form-control datetimepicker-input"
                                                placeholder="Check in"
                                                data-target="#date1"
                                                data-toggle="datetimepicker"
                                                value={checkInDate}
                                                onChange={(e) => setCheckInDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="date" id="date2" data-target-input="nearest">
                                            <input
                                                type="text"
                                                className="form-control datetimepicker-input"
                                                placeholder="Check out"
                                                data-target="#date2"
                                                data-toggle="datetimepicker"
                                                value={checkOutDate}
                                                onChange={(e) => setCheckOutDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary w-100 btn-animeuwu">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Reservation Details</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Add necessary form fields for additional reservation details */}
                                {/* For example: Name, Email, etc. */}
                                {/* You can use state variables to manage these form fields */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleModalSubmit}>
                                    Confirm Reservation
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingComponent;
