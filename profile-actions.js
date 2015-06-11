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

  getRegisteredProfiles () {
    apiHelpers.getRegisteredProfiles()
    appDispatcher.dispatch({
      actionType: 'GET_REGISTERED_PROFILES'
    })
  }

  getRegisteredProfilesSuccess (registeredProfiles) {
    appDispatcher.dispatch({
      actionType: 'GET_REGISTERED_PROFILES_SUCCESS',
      registeredProfiles
    })
  }
}

var profileActions = new ProfileActions()

export default profileActions
