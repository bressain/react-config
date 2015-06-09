import clone from 'lodash/lang/clone'
import EventEmitter from 'events'
import appDispatcher from './app-dispatcher'

var profile
var submitted = false

class ProfileStore extends EventEmitter {
  getProfile () {
    return clone(profile)
  }

  isProfileSet () {
    return !!profile
  }

  getSubmitted () {
    return submitted
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
}

var profileStore = new ProfileStore()

profileStore.dispatchToken = appDispatcher.register(function (payload) {
  switch (payload.actionType) {
    case 'ADD_PROFILE_SUCCESS':
      submitted = !submitted
      profile = payload.profile
      profileStore.emitChange()
      break
  }
})

export default profileStore
