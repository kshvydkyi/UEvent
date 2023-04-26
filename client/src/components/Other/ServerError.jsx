import React from 'react'

const ServerError = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">500</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Server dead</p>
                <p className="lead">
                We are trying to resolve a problem that occurred on the server
                </p>
                <a href="/events/?page=1" className="btn btn-primary">Go Home</a>
            </div>
        </div>
    )
}

export default ServerError;