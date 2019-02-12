import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.user.name,
      age: props.user.age,
      pet: props.user.pet
    };
  }

  onFormChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'user-name':
        this.setState({
          name: value
        });
        break;
      case 'user-age':
        this.setState({
          age: value
        });
        break;
      case 'user-pet':
        this.setState({
          pet: value
        });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = data => {
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formInput: data
      })
    })
      .then(resp => {
        this.props.toggleModal();
        this.props.loadUser({
          ...this.props.user,
          ...data
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { toggleModal, user } = this.props;
    const { name, age, pet } = this.state;

    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib"
              alt="avatar"
            />
            <h1>{name}</h1>
            <h4>{`Images Submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(
              user.joined
            ).toLocaleDateString()}`}</p>
            <hr />
            <label htmlFor="user-name" className="mt2 fw6">
              Name:
            </label>
            <input
              className="pa2 bate w-100"
              placeholder={name}
              type="text"
              name="user-name"
              id="name"
              onChange={this.onFormChange}
            />
            <label htmlFor="user-age" className="mt2 fw6">
              Age:
            </label>
            <input
              className="pa2 bate w-100"
              placeholder={age}
              type="text"
              name="user-age"
              id="age"
              onChange={this.onFormChange}
            />
            <label htmlFor="user-pet" className="mt2 fw6">
              Pet:
            </label>
            <input
              className="pa2 bate w-100"
              placeholder={pet}
              type="text"
              name="user-pet"
              id="pet"
              onChange={this.onFormChange}
            />
            <div
              className="mt4"
              style={{
                display: 'flex',
                justifyContent: 'space-evenly'
              }}
            >
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                onClick={() => this.onProfileUpdate({ name, age, pet })}
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </main>
          <div className="modal-close" onClick={toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
