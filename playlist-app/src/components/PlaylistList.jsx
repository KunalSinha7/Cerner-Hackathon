import React from 'react';

export default class PlaylistList extends React.Component {
  constructor(props) {
    super(props);
    this.ownerList = [
      {
        name: 'End of The Road'
      },

    ];
    this.contributorList = [
      {
        name: 'End of The Road'
      },
      {
        name: '2MUCH'
      },
      {
        name: 'Send Me On My Way'
      },
      {
        name: 'You Reposted in the Wrong Neighborhood'
      },
    ];
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="d-flex container col-1 justify-content-center">
            <h1 className="playlist-header">PlayLists</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-1">

          </div>
          <div className="col-4">
            <table className="p-table table table-sm table-striped table-bordered">
              <thead className="">
              <tr>
                <th scope="col" className="table-sub d-flex container justify-content-center">Owner Playlists</th>
              </tr>
              </thead>
              <tbody>
              {this.ownerList.map((val, index) => (
                <tr key={index}>
                  <td className="d-flex container justify-content-center">
                    <button className="btn btn-link">{val.name}</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="col-2">

          </div>
          <div className="col-4">
            <table className="p-table table table-sm table-striped table-bordered">
              <thead>
              <tr>
                <th scope="col" className="table-sub d-flex container justify-content-center">Contributor Playlists</th>
              </tr>
              </thead>
              <tbody>
              {this.contributorList.map((val, index) => (
                <tr key={index}>
                  <td className="d-flex container justify-content-center">
                    <button className="btn btn-link">{val.name}</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="col-1">

          </div>
        </div>
      </div>
    );
  }
}
