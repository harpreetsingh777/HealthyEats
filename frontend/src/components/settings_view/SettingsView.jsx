import React, { Component } from 'react'
import { Label, Dropdown } from 'semantic-ui-react'
import Tabs from '../tabs_view/Tabs.jsx'

import './SettingsView.css'
import UserProfile from "../UserProfile";

let GenderOptionsEnum = {
    Male: 0,
    Female: 1
};

let AgeRangeOptionsEnum = {
    Young: 0,
    Middle: 1,
    Old: 2
};

let ActivityLevelOptionsEnum = {
    Low: 0,
    Moderate: 1,
    High: 2
};

const genderOptions = [
    {text: "Male", value: GenderOptionsEnum.Male},
    {text: "Female", value: GenderOptionsEnum.Female}
];

const ageRangeOptions = [
    {text: "0-18", value: AgeRangeOptionsEnum.Young},
    {text: "18-50", value: AgeRangeOptionsEnum.Middle},
    {text: "Above 50", value: AgeRangeOptionsEnum.Old}
];

const activityLevelOptions = [
    {text: "Low", value: ActivityLevelOptionsEnum.Low},
    {text: "Moderate", value: ActivityLevelOptionsEnum.Moderate},
    {text: "High", value: ActivityLevelOptionsEnum.High}
];

class SettingsView extends Component {
    constructor() {
        super();
        this.state = {
            gender: -1,
            ageRange: -1,
            activityLevel: -1
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
        let genderDropdown;
        if (this.state.gender === -1) {
            genderDropdown = <Dropdown placeholder="Gender"
                                       selection
                                       options={genderOptions}
                                       onChange={this.setGender} size={'massive'}
                                       id='genderDropdown'/>;
        } else {
            genderDropdown = <Dropdown placeholder="Gender"
                                       selection
                                       value = {this.state.gender}
                                       options={genderOptions}
                                       onChange={this.setGender} size={'massive'}
                                       id='genderDropdown'/>;
        }

        let ageRangeDropdown;
        if (this.state.ageRange === -1) {
            ageRangeDropdown = <Dropdown placeholder="Age Range"
                                         selection
                                         options={ageRangeOptions}
                                         onChange={this.setAgeRange} size={'massive'}
                                         id='ageRangeDropdown'/>;
        } else {
            ageRangeDropdown = <Dropdown placeholder="Age Range"
                                         selection
                                         value = {this.state.ageRange}
                                         options={ageRangeOptions}
                                         onChange={this.setAgeRange} size={'massive'}
                                         id='ageRangeDropdown'/>;
        }

        let activityLevelDropdown;
        if (this.state.activityLevel === -1) {
            activityLevelDropdown = <Dropdown placeholder="Activity Level"
                                              selection
                                              options={activityLevelOptions}
                                              onChange={this.setActivityLevel} size={'massive'}
                                              id='activityLevelDropdown'/>;
        } else {
            activityLevelDropdown = <Dropdown placeholder="Activity Level"
                                              selection
                                              value = {this.state.activityLevel}
                                              options={activityLevelOptions}
                                              onChange={this.setActivityLevel} size={'massive'}
                                              id='activityLevelDropdown'/>;
        }


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
                        {genderDropdown}
                    </div>
                    <div>
                        <Label size='big' color='black'>
                            Select Age Range
                        </Label>
                        {ageRangeDropdown}
                    </div>
                    <div>
                        <Label size='big' color='black'>
                            Select Activity Level
                        </Label>
                        {activityLevelDropdown}
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
                let key = data[0].gender;
                let value = GenderOptionsEnum[key];

                this.setState({
                    gender: value
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
                let key = data[0].age_range;
                let value = AgeRangeOptionsEnum[key];

                this.setState({
                    ageRange: value
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
                let key = data[0].activity_level;
                let value = ActivityLevelOptionsEnum[key];

                this.setState({
                    activityLevel: value
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    setGender(e, data) {
        let username = UserProfile.getUsername();

        let gender = Object.keys(GenderOptionsEnum).find(k =>
                                GenderOptionsEnum[k] === data.value);

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
        });

        this.setState({
            gender: data.value
        });
    }

    setAgeRange(e, data) {
        let username = UserProfile.getUsername();
        let ageRange = Object.keys(AgeRangeOptionsEnum).find(k =>
            AgeRangeOptionsEnum[k] === data.value);

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
        });

        this.setState({
            ageRange: data.value
        });
    }

    setActivityLevel(e, data) {
        let username = UserProfile.getUsername();
        let activityLevel = Object.keys(ActivityLevelOptionsEnum).find(k =>
            ActivityLevelOptionsEnum[k] === data.value);

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
        });

        this.setState({
            activityLevel: data.value
        });
    }
}

export default SettingsView