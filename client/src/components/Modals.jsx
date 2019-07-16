import React from 'react';

export default function Modal({ id }) {
  return (
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Find a Song</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <input className="form-control" placeholder="Enter Song Title"/>
            </div>
          </div>
          <div className="modal-footer">
            <div>
              <button type="button" className="btn btn-primary">
                Search
              </button>
              <button type="button" className="btn btn-secondary ml-2" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
