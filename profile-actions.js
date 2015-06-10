import apiHelpers from './api-helpers'
import appDispatcher from './app-dispatcher'

class ProfileActions {
  createProfile (profile) {
    apiHelpers.createProfile(profile)
    appDispatcher.dispatch({
      actionType: 'ADD_PROFILE',
      profile
    })
  }
  createProfileSuccess (profile) {
    appDispatcher.dispatch({
      actionType: 'ADD_PROFILE_SUCCESS',
      profile
    })
  }
  resetProfile () {
    appDispatcher.dispatch({
      actionType: 'ADD_PROFILE_SUCCESS',
      profile: {}
    })
  }
}

var profileActions = new ProfileActions()

export default profileActions
