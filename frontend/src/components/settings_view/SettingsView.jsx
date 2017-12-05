import React, { Component } from 'react'
import { Button, Label, Dropdown } from 'semantic-ui-react'
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

        this.gender = "";
        this.ageRange = "";
        this.activityLevel = "";

        this.setGender = this.setGender.bind(this);
        this.setAgeRange = this.setAgeRange.bind(this);
        this.setActivityLevel = this.setActivityLevel.bind(this);

        this.saveUserSettings = this.saveUserSettings.bind(this);
    }

    componentDidMount() {
        this.populateDropdowns();
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
                <div className="listButtonsContainer">
                    <Button size='big' id="saveButton" onClick={this.saveUserSettings}>
                        Save
                    </Button>
                </div>
            </div>
        )
    }

    // Handers
    populateDropdowns() {
        let username = UserProfile.getUsername();

        let url = '/users/user/' + username;
        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => jsonResponse.data)
            .then((users) => {
                let user = users[0];

                let genderKey = user.gender;
                let ageRangeKey = user.age_range;
                let activityLevelKey = user.activity_level;

                let genderValue = GenderOptionsEnum[genderKey];
                let ageRangeValue = AgeRangeOptionsEnum[ageRangeKey];
                let activityLevelValue = ActivityLevelOptionsEnum[activityLevelKey];

                this.setState({
                    gender: genderValue,
                    ageRange: ageRangeValue,
                    activityLevel: activityLevelValue
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    saveUserSettings() {
        let username = UserProfile.getUsername();

        let gender = this.gender;
        let ageRange = this.ageRange;
        let activityLevel = this.activityLevel;
        
        let putObject = {
            username: username,
            gender: gender,
            age_range: ageRange,
            activity_level: activityLevel
        };

        let bodyData = JSON.stringify(putObject);

        let url = '/users/settings';

        fetch(url, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: bodyData
        });
    }

    setGender(e, data) {
        this.gender = Object.keys(GenderOptionsEnum).find(k =>
            GenderOptionsEnum[k] === data.value);
        this.setState({
            gender: data.value
        });
    }

    setAgeRange(e, data) {
        this.ageRange = Object.keys(AgeRangeOptionsEnum).find(k =>
            AgeRangeOptionsEnum[k] === data.value);
        this.setState({
            ageRange: data.value
        });
    }

    setActivityLevel(e, data) {
        this.activityLevel = Object.keys(ActivityLevelOptionsEnum).find(k =>
            ActivityLevelOptionsEnum[k] === data.value);
        this.setState({
            activityLevel: data.value
        });
    }
}

export default SettingsView