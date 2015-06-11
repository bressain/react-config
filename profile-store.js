import clone from 'lodash/lang/clone'
import EventEmitter from 'events'
import appDispatcher from './app-dispatcher'

var profile
var submitted = false
var registeredProfiles = []

class ProfileStore extends EventEmitter {
  constructor () {
    super()
    this.dispatchToken = appDispatcher.register(this.handleDispatch)
  }

  getProfile () {
    return clone(profile)
  }

  isProfileSet () {
    return !!profile
  }

  getSubmitted () {
    return submitted
  }

  getRegisteredProfiles () {
    return registeredProfiles
  }

  listen (listener) {
    this.addListener('change', listener)
  }

  unlisten (listener) {
    this.removeListener('change', listener)
  }

  emitChange () {
    this.emit('change', arguments)
  }

  handleDispatch (payload) {
    switch (payload.actionType) {
      case 'ADD_PROFILE_SUCCESS':
        submitted = !submitted
        profile = payload.profile
        profileStore.emitChange()
        break
      case 'GET_REGISTERED_PROFILES_SUCCESS':
        registeredProfiles = payload.registeredProfiles
        profileStore.emitChange()
        break
    }
  }
}

var profileStore = new ProfileStore()

export default profileStore
