import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Chip
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import useProgress from '../hooks/useProgress'
import ProgressIndicator from './ProgressIndicator'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxHeight: 400,
    overflow: 'auto',
  },
  listItem: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  progressContainer: {
    marginTop: theme.spacing(1),
  },
  emptyState: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  trackInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  trackTitle: {
    fontWeight: 500,
    marginBottom: theme.spacing(0.5),
  },
  trackArtist: {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
  progressChip: {
    marginLeft: theme.spacing(1),
    height: 20,
    fontSize: '0.75rem',
  },
}))

/**
 * Component που δείχνει λίστα με όλα τα τραγούδια που έχουν progress
 */
const ProgressList = ({ onTrackSelect, showClearButton = true }) => {
  const classes = useStyles()
  const { getAllProgress, clearTrackProgress, getProgressPercentage } = useProgress()
  
  const progressData = getAllProgress()
  const tracks = Object.entries(progressData)

  const handleClearProgress = (trackId, event) => {
    event.stopPropagation()
    clearTrackProgress(trackId)
  }

  const handleTrackClick = (trackId) => {
    if (onTrackSelect) {
      onTrackSelect(trackId)
    }
  }

  if (tracks.length === 0) {
    return (
      <Box className={classes.emptyState}>
        <Typography variant="body2">
          Δεν υπάρχουν τραγούδια με αποθηκευμένο progress
        </Typography>
      </Box>
    )
  }

  return (
    <List className={classes.root}>
      {tracks.map(([trackId, progress]) => {
        const progressPercentage = Math.round(progress.progress)
        
        return (
          <ListItem
            key={trackId}
            className={classes.listItem}
            button
            onClick={() => handleTrackClick(trackId)}
          >
            <ListItemText
              primary={
                <Box className={classes.trackInfo}>
                  <Typography className={classes.trackTitle}>
                    Track ID: {trackId}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography className={classes.trackArtist}>
                      {progress.duration > 0 
                        ? `${Math.floor(progress.currentTime / 60)}:${Math.floor(progress.currentTime % 60).toString().padStart(2, '0')} / ${Math.floor(progress.duration / 60)}:${Math.floor(progress.duration % 60).toString().padStart(2, '0')}`
                        : 'Άγνωστη διάρκεια'
                      }
                    </Typography>
                    <Chip
                      label={`${progressPercentage}%`}
                      size="small"
                      className={classes.progressChip}
                      color={progressPercentage > 80 ? 'primary' : 'default'}
                    />
                  </Box>
                </Box>
              }
              secondary={
                <Box className={classes.progressContainer}>
                  <ProgressIndicator
                    trackId={trackId}
                    compact
                  />
                </Box>
              }
            />
            {showClearButton && (
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="Διαγραφή progress"
                  onClick={(e) => handleClearProgress(trackId, e)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )
      })}
    </List>
  )
}

export default ProgressList
