import axios from 'axios'
import profileActions from './profile-actions'

function serialize (rawProfile) {
  return {
    data: {firstName: rawProfile.first, lastName: rawProfile.last, email: rawProfile.email, type: 'users'}
  }
}

function deserialize (apiProfile) {
  return {first: apiProfile.firstName, last: apiProfile.lastName, email: apiProfile.email}
}

class ApiHelpers {
  createProfile (profile) {
    axios({
      method: 'post',
      url: 'http://demo-users-api.herokuapp.com/api/v1/users',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      data: serialize(profile)
    }).then(res => {
      var newProfile = deserialize(res.data.data)
      profileActions.createProfileSuccess(newProfile)
      profileActions.getRegisteredProfiles()
    })
  }

  getRegisteredProfiles () {
    axios({
      method: 'get',
      url: 'http://demo-users-api.herokuapp.com/api/v1/users',
      headers: { 'Content-Type': 'application/vnd.api+json' }
    }).then(res => {
      var registeredProfiles = res.data.data.map(deserialize)
      profileActions.getRegisteredProfilesSuccess(registeredProfiles)
    })
  }
}

var apiHelpers = new ApiHelpers()

export default apiHelpers
