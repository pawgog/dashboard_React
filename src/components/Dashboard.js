import React from 'react';
import { sortByStatus, getNameInitials } from './Functions';
import {
  Card,
  Button,
  FormControl,
  InputLabel,
  Select,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { ArrowBack, Search } from '@material-ui/icons';

class Dashboard extends React.Component {
  state = {
    search: '',
    status: '',
    applicants: [],
    applicantsStatus: {
      appointment_set: [],
      property_viewed: [],
      interested: [],
    },
  };

  componentDidMount() {
    fetch('http://localhost:4001/applicants')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          applicants: data,
          applicantsStatus: sortByStatus(data),
        })
      );
  }

  searchApplicant = (e) => {
    this.setState({ search: e.target.value });
    console.log('search', e.target.value);
  };

  changeStatus = (e) => {
    this.setState({ status: e.target.value });
    console.log('Change Status', e.target.value);
  };

  render() {
    const { applicantsStatus, status } = this.state;

    return (
      <>
        <div className="applicants-body">
          <div className="applicants-top-bar">
            <div className="applicants-top-bar__back">
              <Button className="btn" startIcon={<ArrowBack />}>
                Applicants
              </Button>
            </div>
            <div className="applicants-top-bar__statistic">
              <div className="applicants-top-bar__statistic__content">
                <div className="applicants-top-bar--bold">25</div>
                <div>Total</div>
              </div>
              <div className="applicants-top-bar__statistic__content">
                <div className="applicants-top-bar--bold">10</div>
                <div>New</div>
              </div>
              <div className="applicants-top-bar__statistic__content">
                <div className="applicants-top-bar--bold">5</div>
                <div>Viewed</div>
              </div>
              <div className="applicants-top-bar__statistic__content">
                <div className="applicants-top-bar--bold">3</div>
                <div>Appointment</div>
              </div>
              <div className="applicants-top-bar__statistic__content">
                <div className="applicants-top-bar--bold">6</div>
                <div>Others</div>
              </div>
            </div>
          </div>
          <div className="applicants-search">
            <TextField
              id="applicant"
              className="applicants-input"
              placeholder="Search for applicant"
              type="search"
              size="small"
              variant="outlined"
              onChange={(e) => this.searchApplicant(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl
              className="applicants-select"
              size="small"
              variant="outlined"
            >
              <InputLabel htmlFor="select-bids">Bids</InputLabel>
              <Select
                native
                id="select-bids"
                onChange={(e) => this.changeStatus(e)}
                label="Bids"
                value={status}
              >
                <option aria-label="None" value="" />
                <option value="Bids">Bids</option>
              </Select>
            </FormControl>
            <FormControl
              className="applicants-select"
              size="small"
              variant="outlined"
            >
              <InputLabel htmlFor="select-status">Status</InputLabel>
              <Select
                native
                id="select-status"
                onChange={(e) => this.changeStatus(e)}
                label="Status"
                value={status}
              >
                <option aria-label="None" value="" />
                <option value="appointment_set">Appointment Set</option>
                <option value="property_viewed">Property Viewed</option>
                <option value="interested">Interested</option>
                <option value="offer_accepted">Offer Accepted</option>
              </Select>
            </FormControl>
          </div>
          <div className="applicants-list">
            <h4>Appointment set ({applicantsStatus.appointment_set.length})</h4>
            <div className="applicants-list__cards">
              {applicantsStatus.appointment_set.map((val) => {
                return (
                  <Card key={val._id} className="applicants-list__card">
                    <div className="applicants-list__circle">
                      <span>{getNameInitials(val.name)}</span>
                    </div>
                    <h5>{val.name}</h5>
                    <div>{val.tel_number}</div>
                    <div>{val.email}</div>
                    <div>Appointment {val.date}</div>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="applicants-list">
            <h4>Property viewed ({applicantsStatus.property_viewed.length})</h4>
            <div className="applicants-list__cards">
              {applicantsStatus.property_viewed.map((val) => {
                return (
                  <Card key={val._id} className="applicants-list__card">
                    <div className="applicants-list__circle">
                      <span>{getNameInitials(val.name)}</span>
                    </div>
                    <h5>{val.name}</h5>
                    <div>{val.tel_number}</div>
                    <div>{val.email}</div>
                    <div>Appointment {val.date}</div>
                    {val.bid !== '' ? <div>Bid: {val.bid}</div> : null}
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="applicants-list">
            <h4>Interested ({applicantsStatus.interested.length})</h4>
            <div className="applicants-list__cards">
              {applicantsStatus.interested.map((val) => {
                return (
                  <Card key={val._id} className="applicants-list__card">
                    <div className="applicants-list__circle">
                      <span>{getNameInitials(val.name)}</span>
                    </div>
                    <h5>{val.name}</h5>
                    <div>{val.tel_number}</div>
                    <div>{val.email}</div>
                    <div>Appointment {val.date}</div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
