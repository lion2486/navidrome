import {
  PROGRESS_UPDATE,
  PROGRESS_CLEAR,
  PROGRESS_LOAD,
} from '../actions'

const initialState = {
  // Object με trackId ως key και progress data ως value
  // Format: { [trackId]: { currentTime: number, duration: number, lastPlayed: timestamp } }
  tracks: {},
  // Global settings για progress behavior
  settings: {
    autoSave: true,
    saveInterval: 5000, // milliseconds
  }
}

const reduceUpdateProgress = (state, { data: { trackId, currentTime, duration, lastPlayed } }) => {
  if (!trackId) return state

  return {
    ...state,
    tracks: {
      ...state.tracks,
      [trackId]: {
        currentTime: currentTime || 0,
        duration: duration || 0,
        lastPlayed: lastPlayed || Date.now(),
        progress: duration > 0 ? (currentTime / duration) * 100 : 0,
      }
    }
  }
}

const reduceClearProgress = (state, { data: { trackId } }) => {
  if (!trackId) return state

  const newTracks = { ...state.tracks }
  delete newTracks[trackId]
  
  return {
    ...state,
    tracks: newTracks
  }
}

const reduceLoadProgress = (state, { data }) => {
  return {
    ...state,
    tracks: data.tracks || {},
    settings: { ...state.settings, ...data.settings }
  }
}

export const progressReducer = (previousState = initialState, payload) => {
  const { type } = payload
  switch (type) {
    case PROGRESS_UPDATE:
      return reduceUpdateProgress(previousState, payload)
    case PROGRESS_CLEAR:
      return reduceClearProgress(previousState, payload)
    case PROGRESS_LOAD:
      return reduceLoadProgress(previousState, payload)
    default:
      return previousState
  }
}
