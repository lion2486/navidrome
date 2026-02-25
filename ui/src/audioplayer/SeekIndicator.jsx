import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fade, Typography, Box } from '@material-ui/core'
import { 
  FastRewind as RewindIcon, 
  FastForward as ForwardIcon 
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    pointerEvents: 'none',
  },
  indicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: theme.spacing(2, 3),
    borderRadius: theme.spacing(1),
    minWidth: 120,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: '1.5rem',
  },
  text: {
    fontSize: '1rem',
    fontWeight: 500,
    fontFamily: 'monospace',
  },
  timeText: {
    fontSize: '0.875rem',
    opacity: 0.8,
    marginTop: theme.spacing(0.5),
  },
}))

/**
 * Component που δείχνει visual feedback όταν γίνεται seeking
 */
const SeekIndicator = ({ 
  isVisible, 
  direction, 
  currentTime, 
  duration,
  onAnimationComplete 
}) => {
  const classes = useStyles()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShow(true)
      // Αυτόματη απόκρυψη μετά από 1.5 δευτερόλεπτα
      const timer = setTimeout(() => {
        setShow(false)
        if (onAnimationComplete) {
          onAnimationComplete()
        }
      }, 1500)

      return () => clearTimeout(timer)
    } else {
      setShow(false)
    }
  }, [isVisible, onAnimationComplete])

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getSeekAmount = () => {
    return direction === 'backward' ? '-10s' : '+10s'
  }

  const getIcon = () => {
    return direction === 'backward' ? <RewindIcon className={classes.icon} /> : <ForwardIcon className={classes.icon} />
  }

  if (!show) return null

  return (
    <Fade in={show} timeout={200}>
      <Box className={classes.root}>
        <Box className={classes.indicator}>
          {getIcon()}
          <Box>
            <Typography className={classes.text}>
              {getSeekAmount()}
            </Typography>
            <Typography className={classes.timeText}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fade>
  )
}

export default SeekIndicator
