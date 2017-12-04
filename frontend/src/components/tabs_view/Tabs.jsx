import React, { Component } from 'react'
import { Button, Label } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import UserProfile from '../UserProfile'

import './Tabs.css'
import ListIcon from '../../assets/list_icon.svg'
import FavoriteIcon from '../../assets/favorite_icon.svg'
import SettingsIcon from '../../assets/setting_icon.svg'
import SuggestedIcon from '../../assets/suggested_icon.svg'
import LogoutIcon from '../../assets/logout_icon.svg'

class Tabs extends Component {

    render() {
        return(
            <div className="mainContainer">
                <div className="topContainer">
                    <div>
                        <Label size='massive' color='black'>
                            Welcome to HealthyEats {UserProfile.getFirstName()} {UserProfile.getLastName()}!
                        </Label>
                    </div>
                    <div className="buttonsContainer">
                        <Link to="/recipes">
                            <Button animated='fade' inverted={false} size='huge' id="listButton">
                                <Button.Content visible>
                                    <img src={ListIcon} alt={"all recipes"}/>
                                </Button.Content>
                                <Button.Content hidden>
                                    Recipes
                                </Button.Content>
                            </Button>
                        </Link>
                        <Link to="/suggested">
                            <Button animated='fade' inverted={false} size='huge' id="suggestedButton">
                                <Button.Content visible>
                                    <img src={SuggestedIcon} alt="suggested recipes"/>
                                </Button.Content>
                                <Button.Content hidden>
                                    Top Picks
                                </Button.Content>
                            </Button>
                        </Link>
                        <Link to="/favorites">
                            <Button animated='fade' inverted={false} size='huge' id="favoriteButton">
                                <Button.Content visible>
                                    <img src={FavoriteIcon} alt="favorited recipes"/>
                                </Button.Content>
                                <Button.Content hidden>
                                    Favorites
                                </Button.Content>
                            </Button>
                        </Link>
                        <Link to="/settings">
                            <Button animated='fade' inverted={false} size='huge' id="settingButton">
                                <Button.Content visible>
                                    <img src={SettingsIcon} alt="settings"/>
                                </Button.Content>
                                <Button.Content hidden>
                                    Settings
                                </Button.Content>
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button animated='fade' inverted={false} size='huge' id="logoutButton">
                                <Button.Content visible>
                                    <img src={LogoutIcon} alt="logout"/>
                                </Button.Content>
                                <Button.Content hidden>
                                    Log Out
                                </Button.Content>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tabs