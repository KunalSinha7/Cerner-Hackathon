import React from 'react';

export default class RatingDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      id: props.id
    };
  }

  change = event => {
    this.props.update(this.state.id,event.target.value);
  };

  render() {
    return (
      <div>
        <form>
          <div className="form-row align-items-center">
            <div className="col-auto my-1">
              <label className="mr-sm-2 sr-only" htmlFor="inlineFormCustomSelect">Rating</label>
              <select className="custom-select select-form mr-sm-2 border-0" onChange={this.change}>
                <option selected>Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
