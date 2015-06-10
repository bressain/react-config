import axios from 'axios'
import profileActions from './profile-actions'

class ApiHelpers {
  createProfile (profile) {
    function serialize (rawProfile) {
      return {
        data: {firstName: rawProfile.first, lastName: rawProfile.last, email: rawProfile.email, type: 'users'}
      }
    }
    function deserialize (apiProfile) {
      return {first: apiProfile.data.firstName, last: apiProfile.data.lastName, email: apiProfile.data.email}
    }

    axios({
      method: 'post',
      url: 'http://demo-users-api.herokuapp.com/api/v1/users',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      data: serialize(profile)
    }).then(res => {
      console.log('res.data', res.data)
      var newProfile = deserialize(res.data)
      profileActions.createProfileSuccess(newProfile)
    })
  }
}

var apiHelpers = new ApiHelpers()

export default apiHelpers
