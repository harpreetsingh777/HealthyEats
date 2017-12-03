let UserProfile = (function() {
    let username = "";
    let firstName = "";
    let lastName = "";

    let getUsername = function() {
        return username;
    };

    let setUsername = function(name) {
        username = name;
    };

    let getFirstName = function() {
        return firstName;
    };

    let setFirstName = function(name) {
        firstName = name;
    };

    let getLastName = function() {
        return lastName;
    };

    let setLastName = function(name) {
        lastName = name;
    };

    return {
        getUsername: getUsername,
        setUsername: setUsername,
        getFirstName: getFirstName,
        setFirstName: setFirstName,
        getLastName: getLastName,
        setLastName: setLastName
    }
})();

export default UserProfile;