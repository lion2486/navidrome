import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { LinearProgress, Typography, Box } from '@material-ui/core'
import useProgress from '../hooks/useProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(1),
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.palette.grey[300],
    '& .MuiLinearProgress-bar': {
      borderRadius: 2,
    },
  },
  progressText: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
  },
  trackInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
  },
  trackTitle: {
    fontSize: '0.875rem',
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '70%',
  },
  timeInfo: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
  },
}))

/**
 * Component που δείχνει το progress ενός τραγουδιού
 * @param {Object} props
 * @param {string} props.trackId - ID του τραγουδιού
 * @param {Object} props.track - Track object με title, artist κλπ
 * @param {boolean} props.showDetails - Αν θα δείξει λεπτομέρειες
 * @param {boolean} props.compact - Compact mode
 */
const ProgressIndicator = ({
  trackId,
  track = {},
  showDetails = true,
  compact = false,
}) => {
  const classes = useStyles()
  const { getProgress, getProgressPercentage, getLastPlayedTime } =
    useProgress()

  const progress = getProgress(trackId)
  const progressPercentage = getProgressPercentage(trackId)
  const lastPlayed = getLastPlayedTime(trackId)

  if (!progress || progressPercentage === 0) {
    return null
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Τώρα'
    if (diffMins < 60) return `${diffMins} λεπτά πριν`
    if (diffHours < 24) return `${diffHours} ώρες πριν`
    return `${diffDays} ημέρες πριν`
  }

  if (compact) {
    return (
      <Box className={classes.root}>
        <LinearProgress
          className={classes.progressBar}
          variant="determinate"
          value={progressPercentage}
        />
      </Box>
    )
  }

  return (
    <Box className={classes.root}>
      {showDetails && (
        <Box className={classes.trackInfo}>
          <Typography className={classes.trackTitle}>
            {track.title || 'Άγνωστο τραγούδι'}
          </Typography>
          <Typography className={classes.timeInfo}>
            {formatTime(progress.currentTime)} / {formatTime(progress.duration)}
          </Typography>
        </Box>
      )}

      <LinearProgress
        className={classes.progressBar}
        variant="determinate"
        value={progressPercentage}
      />

      {showDetails && lastPlayed && (
        <Typography className={classes.progressText}>
          Τελευταία ακρόαση: {formatDate(lastPlayed)}
        </Typography>
      )}
    </Box>
  )
}

export default ProgressIndicator
