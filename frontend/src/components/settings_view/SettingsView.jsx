import React, { Component } from 'react'
import { Label, Dropdown } from 'semantic-ui-react'
import Tabs from '../tabs_view/Tabs.jsx'

import './SettingsView.css'
import UserProfile from "../UserProfile";

const genderOptions = [
    {text: "Male", value: "Male"},
    {text: "Female", value: "Female"}
];

const ageRangeOptions = [
    {text: "0-18", value: "Young"},
    {text: "18-50", value: "Middle"},
    {text: "Above 50", value: "Old"}
];

const activityLevelOptions = [
    {text: "Low", value: "Low"},
    {text: "Moderate", value: "Moderate"},
    {text: "High", value: "High"}
];

class SettingsView extends Component {
    constructor() {
        super();
        this.state = {
            gender: null,
            ageRange: null,
            activityLevel: null
        };

        this.setGender = this.setGender.bind(this);
        this.setAgeRange = this.setAgeRange.bind(this);
        this.setActivityLevel = this.setActivityLevel.bind(this);
    }

    componentDidMount() {
        this.getGender();
        this.getAgeLevel();
        this.getActivityLevel();
    }

    render() {
        return (
            <div className="listMainContainer">
                <div className="tabsContainer">
                    <Tabs />
                </div>
                <div className="listButtonsContainer">
                    <div>
                        <Label size='big' color='black'>
                            Select Gender
                        </Label>
                        <Dropdown placeholder="Gender"
                                  selection defaultValue={0}
                                  options={genderOptions}
                                  onChange={this.setGender} size={'massive'}
                                  id='genderDropdown'/>
                    </div>
                    <div>
                        <Label size='big' color='black'>
                            Select Age Range
                        </Label>
                        <Dropdown placeholder="Age Range"
                                  selection defaultValue={0}
                                  options={ageRangeOptions}
                                  onChange={this.setAgeRange} size={'massive'}
                                  id='ageRangeDropdown'/>
                    </div>
                    <div>
                        <Label size='big' color='black'>
                            Select Activity Level
                        </Label>
                        <Dropdown placeholder="Activity Level"
                                  selection defaultValue={0}
                                  options={activityLevelOptions}
                                  onChange={this.setActivityLevel} size={'massive'}
                                  id='activityLevelDropdown'/>
                    </div>
                </div>
            </div>
        )
    }

    // Handers
    getGender() {
        let username = UserProfile.getUsername();

        let url = "/users/gender/" + username;
        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => jsonResponse.data)
            .then ((data) => {
                console.log(data[0].gender);
                this.setState({
                    gender: data[0].gender
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getAgeLevel() {
        let username = UserProfile.getUsername();

        let url = "/users/age_range/" + username;
        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => jsonResponse.data)
            .then ((data) => {
                console.log(data[0].age_range);
                this.setState({
                    ageRange: data[0].age_range
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getActivityLevel() {
        let username = UserProfile.getUsername();

        let url = "/users/activity_level/" + username;
        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => jsonResponse.data)
            .then ((data) => {
                console.log(data[0].activity_level);
                this.setState({
                    activityLevel: data[0].activity_level
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    setGender(e, data) {
        let username = UserProfile.getUsername();
        let gender = data.value;

        let putObject = {
            username: username,
            gender: gender
        };

        let bodyData = JSON.stringify(putObject);

        let url = '/users/gender';

        fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: bodyData
        })
    }

    setAgeRange(e, data) {
        let username = UserProfile.getUsername();
        let ageRange = data.value;

        let putObject = {
            username: username,
            age_range: ageRange
        };

        let bodyData = JSON.stringify(putObject);

        let url = '/users/age_range';

        fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: bodyData
        })
    }

    setActivityLevel(e, data) {
        let username = UserProfile.getUsername();
        let activityLevel = data.value;

        let putObject = {
            username: username,
            activity_level: activityLevel
        };

        let bodyData = JSON.stringify(putObject);

        let url = '/users/activity_level';

        fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: bodyData
        })
    }
}

export default SettingsView