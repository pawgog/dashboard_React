import React from 'react';
import {
  sortByStatus,
  getNameInitials,
  getProperStatusName,
} from './Functions';
import translateWords from './Languages';
import Spinner from './Spinner';
import Error from './Error';
import queryString from 'query-string';
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
    lang: 'en',
    search: '',
    status: '',
    spinnerActive: true,
    errorPage: false,
    applicants: [],
    applicantsStatus: {},
    applicantsStatusDefault: {
      appointment_set: [],
      property_viewed: [],
      interested: [],
      offer_accepted: [],
    },
  };

  componentDidMount() {
    fetch('https://dashboard-applicants234.herokuapp.com/applicants')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          applicants: data,
          applicantsStatus: sortByStatus(data),
        })
      )
      .then(() => {
        this.setState({
          spinnerActive: false,
          errorPage: false,
        });
      })
      .catch((error) => {
        this.setState({
          spinnerActive: false,
          errorPage: true,
        });
      });
    this.getQueryString();
  }

  getQueryString = () => {
    const query = queryString.parse(this.props.location.search);
    if (Object.keys(query).length > 0) {
      if (query.search !== '') {
        this.setState({
          search: query.search,
        });
      } else {
        this.props.history.push({
          pathname: '/page/',
        });
      }
    }
  };

  filterApplicants = () => {
    const { applicants, search } = this.state;
    const filterApplicants = applicants.filter((val) => {
      return (
        val.name.toLowerCase().includes(search.toLowerCase()) ||
        val.email.toLowerCase().includes(search.toLowerCase())
      );
    });

    this.setState({ applicantsStatus: sortByStatus(filterApplicants) });
  };

  filterStatus = (status) => {
    const { applicants } = this.state;
    const filterStatus = applicants.filter((val) => {
      return val.status.includes(status);
    });

    this.setState({ applicantsStatus: sortByStatus(filterStatus) });
  };

  searchApplicant = (e) => {
    if (e.keyCode === 13) {
      this.props.history.push({
        pathname: '/page/',
        search: `search=${this.state.search}`,
      });
      this.filterApplicants();
    }
  };

  setApplicant = (e) => {
    this.setState({ search: e.target.value });
  };

  changeLang = (e) => {
    this.setState({ lang: e.target.value });
  };

  changeStatus = (e) => {
    this.filterStatus(e.target.value);
    this.setState({ status: e.target.value });
  };

  changeBid = () => {
    const { applicants } = this.state;
    const filterBid = applicants.filter((val) => {
      return val.bid !== '';
    });

    this.setState({ applicantsStatus: sortByStatus(filterBid), status: '' });
  };

  render() {
    const {
      spinnerActive,
      errorPage,
      lang,
      applicantsStatus,
      applicantsStatusDefault,
      status,
      search,
    } = this.state;

    return (
      <>
        {spinnerActive ? (
          <Spinner />
        ) : (
          <div className="applicants-body">
            {!errorPage ? (
              <>
                <div className="applicants-top-bar">
                  <div className="applicants-top-bar__back">
                    <Button className="btn" startIcon={<ArrowBack />}>
                      {translateWords('Applicants', lang)}
                    </Button>
                  </div>
                  <div className="applicants-top-bar__statistic">
                    <div className="applicants-top-bar__statistic__content">
                      <div className="applicants-top-bar--bold">25</div>
                      <div>Total</div>
                    </div>
                    <div className="applicants-top-bar__statistic__content">
                      <div className="applicants-top-bar--bold">10</div>
                      <div>{translateWords('New', lang)}</div>
                    </div>
                    <div className="applicants-top-bar__statistic__content">
                      <div className="applicants-top-bar--bold">5</div>
                      <div>{translateWords('Viewed', lang)}</div>
                    </div>
                    <div className="applicants-top-bar__statistic__content">
                      <div className="applicants-top-bar--bold">3</div>
                      <div>{translateWords('Appointment', lang)}</div>
                    </div>
                    <div className="applicants-top-bar__statistic__content">
                      <div className="applicants-top-bar--bold">6</div>
                      <div>{translateWords('Others', lang)}</div>
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
                    value={search}
                    onKeyDown={(e) => this.searchApplicant(e)}
                    onChange={(e) => this.setApplicant(e)}
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
                      onChange={(e) => this.changeBid(e)}
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
                      {Object.keys(applicantsStatusDefault).map((key) => {
                        return (
                          <option key={key} value={key}>
                            {getProperStatusName(key)}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl
                    className="applicants-select__lang"
                    size="small"
                    variant="outlined"
                  >
                    <InputLabel htmlFor="select-status">
                      {translateWords('Languages', lang)}
                    </InputLabel>
                    <Select
                      native
                      id="select-lang"
                      onChange={(e) => this.changeLang(e)}
                      label="Language"
                      value={lang}
                    >
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                    </Select>
                  </FormControl>
                </div>
                {Object.keys(applicantsStatus).map((key) => {
                  if (applicantsStatus[key].length > 0) {
                    return (
                      <div key={key} className="applicants-list">
                        <h4>
                          {getProperStatusName(translateWords(key, lang))} (
                          {applicantsStatus[key].length})
                        </h4>
                        <div className="applicants-list__cards">
                          {applicantsStatus[key].map((val) => {
                            return (
                              <Card
                                key={val._id}
                                className="applicants-list__card"
                              >
                                <div className="applicants-list__circle">
                                  <span>{getNameInitials(val.name)}</span>
                                </div>
                                <h5>{val.name}</h5>
                                <div>{val.tel_number}</div>
                                <div>{val.email}</div>
                                <div className="applicants-list__appointment">
                                  {translateWords('Appointment', lang)}{' '}
                                  {val.date}
                                </div>
                                {val.bid !== '' ? (
                                  <div className="applicants-list__bid">
                                    Bid: {val.bid}
                                  </div>
                                ) : null}
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </>
            ) : (
              <Error />
            )}
          </div>
        )}
      </>
    );
  }
}

export default Dashboard;
