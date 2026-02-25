# Progress Store

The Progress Store is a Redux store that saves the progress of songs played in Navidrome.

## Features

- **Auto-save**: Progress is automatically saved every 5 seconds
- **Persistence**: Data is stored in localStorage
- **Easy to use**: Custom hooks and components for easy integration
- **Performance**: Throttled updates for better performance

## Data Structure

```javascript
{
  tracks: {
    [trackId]: {
      currentTime: number,    // Current time in seconds
      duration: number,       // Total duration in seconds
      lastPlayed: timestamp,  // Last played timestamp
      progress: number        // Progress percentage (0-100)
    }
  },
  settings: {
    autoSave: boolean,        // Whether auto-save is enabled
    saveInterval: number      // Save interval in ms
  }
}
```

## Usage

### 1. Using the useProgress Hook

```javascript
import { useProgress } from '../hooks/useProgress'

const MyComponent = () => {
  const {
    tracks,
    updateTrackProgress,
    clearTrackProgress,
    getProgress,
    getProgressPercentage,
    hasProgress
  } = useProgress()

  // Update progress
  const handleProgressUpdate = (trackId, currentTime, duration) => {
    updateTrackProgress(trackId, currentTime, duration, Date.now())
  }

  // Check if progress exists
  if (hasProgress('track123')) {
    const progress = getProgress('track123')
    console.log(`Progress: ${progress.progress}%`)
  }

  return <div>...</div>
}
```

### 2. Using Components

```javascript
import { ProgressIndicator, ProgressList } from '../components'

// Progress indicator for a song
<ProgressIndicator 
  trackId="track123"
  track={{ title: "Song Title", artist: "Artist Name" }}
  showDetails={true}
  compact={false}
/>

// List of all songs with progress
<ProgressList 
  onTrackSelect={(trackId) => console.log('Selected:', trackId)}
  showClearButton={true}
/>
```

### 3. Using Actions

```javascript
import { useDispatch } from 'react-redux'
import { updateProgress, clearProgress } from '../actions'

const MyComponent = () => {
  const dispatch = useDispatch()

  // Update progress
  dispatch(updateProgress('track123', 120, 300, Date.now()))

  // Clear progress
  dispatch(clearProgress('track123'))
}
```

## API Reference

### useProgress Hook

#### Returns
- `tracks`: Object with all progress data
- `settings`: Progress store settings
- `updateTrackProgress(trackId, currentTime, duration, lastPlayed)`: Update progress
- `clearTrackProgress(trackId)`: Clear progress
- `getProgress(trackId)`: Get progress for specific track
- `getAllProgress()`: Get all progress data
- `getProgressPercentage(trackId)`: Progress percentage (0-100)
- `getLastPlayedTime(trackId)`: Last played timestamp
- `hasProgress(trackId)`: Boolean if progress exists

### ProgressIndicator Component

#### Props
- `trackId` (string, required): Track ID
- `track` (object): Track object with title, artist etc.
- `showDetails` (boolean): Whether to show details
- `compact` (boolean): Compact mode

### ProgressList Component

#### Props
- `onTrackSelect` (function): Callback when track is selected
- `showClearButton` (boolean): Whether to show clear button

## Configuration

The progress store can be configured through the `settings` object:

```javascript
// In progress reducer
settings: {
  autoSave: true,        // Enable auto-save
  saveInterval: 5000     // Save interval (5 seconds)
}
```

## Integration with Player

The progress store is automatically integrated with the Player component and saves progress every 5 seconds. No additional configuration is needed.
