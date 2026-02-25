export const PROGRESS_UPDATE = 'PROGRESS_UPDATE'
export const PROGRESS_CLEAR = 'PROGRESS_CLEAR'
export const PROGRESS_LOAD = 'PROGRESS_LOAD'

export const updateProgress = (trackId, currentTime, duration, lastPlayed) => ({
  type: PROGRESS_UPDATE,
  data: {
    trackId,
    currentTime,
    duration,
    lastPlayed,
  },
})

export const clearProgress = (trackId) => ({
  type: PROGRESS_CLEAR,
  data: { trackId },
})

export const loadProgress = (tracks, settings) => ({
  type: PROGRESS_LOAD,
  data: { tracks, settings },
})

// Helper function για να πάρουμε το progress ενός τραγουδιού
export const getTrackProgress = (state, trackId) => {
  return state.progress?.tracks?.[trackId] || null
}

// Helper function για να πάρουμε όλα τα progress data
export const getAllProgress = (state) => {
  return state.progress?.tracks || {}
}
