import { useSelector, useDispatch } from 'react-redux'
import { updateProgress, clearProgress, getTrackProgress } from '../actions'

/**
 * Custom hook για χρήση του progress store
 * @returns {Object} Progress utilities και data
 */
export const useProgress = () => {
  const dispatch = useDispatch()
  const progressState = useSelector((state) => state.progress)

  const updateTrackProgress = (trackId, currentTime, duration, lastPlayed) => {
    dispatch(updateProgress(trackId, currentTime, duration, lastPlayed))
  }

  const clearTrackProgress = (trackId) => {
    dispatch(clearProgress(trackId))
  }

  const getProgress = (trackId) => {
    return getTrackProgress(progressState, trackId)
  }

  const getAllProgress = () => {
    return progressState.tracks || {}
  }

  const getProgressPercentage = (trackId) => {
    const progress = getProgress(trackId)
    return progress ? progress.progress : 0
  }

  const getLastPlayedTime = (trackId) => {
    const progress = getProgress(trackId)
    return progress ? progress.lastPlayed : null
  }

  const hasProgress = (trackId) => {
    return !!getProgress(trackId)
  }

  return {
    // Data
    tracks: progressState.tracks,
    settings: progressState.settings,
    
    // Actions
    updateTrackProgress,
    clearTrackProgress,
    
    // Getters
    getProgress,
    getAllProgress,
    getProgressPercentage,
    getLastPlayedTime,
    hasProgress,
  }
}

export default useProgress
