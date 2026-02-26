# Keyboard Shortcuts for Audio Player

The Navidrome audio player supports various keyboard shortcuts for easy navigation and control.

## 🎵 Player Controls

### Basic Controls

- **Space** - Play/Pause
- **Left Arrow (←)** - Previous song
- **Right Arrow (→)** - Next song
- **Up Arrow (↑)** - Seek 10 seconds backward
- **Down Arrow (↓)** - Seek 10 seconds forward

### Volume Control

- **=** - Increase volume (+10%)
- **-** - Decrease volume (-10%)

### Navigation

- **Shift + C** - Go to current album
- **M** - Toggle menu

### Favorites (if enabled)

- **L** - Toggle love/favorite

## 🎯 Seeking Functionality

### How Seeking Works

- **Up Arrow**: Moves playback 10 seconds backward
- **Down Arrow**: Moves playback 10 seconds forward
- **Visual Feedback**: Shows an indicator displaying the direction and new time

### Visual Indicator

When you press up/down arrows, an overlay indicator appears showing:

- Seeking direction (← or →)
- Seek amount (±10s)
- Current time / Total duration

## 🔧 Technical Details

### Seek Amount

The default seek amount is 10 seconds, but can be changed in `keyHandlers.jsx`:

```javascript
const seekAmount = 10 // Change this value for different seek amount
```

### Boundaries

- Seeking cannot go backward beyond 0
- Seeking cannot go forward beyond the total duration of the song

### Performance

- Seeking is done directly on the HTML5 audio element
- Does not affect the progress store
- Visual indicator appears for 1.5 seconds

## 🎨 Customization

### Changing Seek Amount

To change the seek amount, edit `ui/src/audioplayer/keyHandlers.jsx`:

```javascript
const seekAmount = 15 // 15 seconds instead of 10
```

### Changing Visual Indicator

The visual indicator can be customized in `ui/src/audioplayer/SeekIndicator.jsx`:

- Colors
- Size
- Display duration
- Position

### Changing Keyboard Mapping

To change keyboard shortcuts, edit `ui/src/hotkeys.js`:

```javascript
SEEK_BACKWARD: { name: 'seek_backward', sequence: 'up', group: 'Player' },
SEEK_FORWARD: { name: 'seek_forward', sequence: 'down', group: 'Player' },
```

## 🚀 Usage Examples

### In Component

```javascript
// Keyboard shortcuts work automatically when the Player component is loaded
// No additional configuration needed
```

### Testing

1. Play a song
2. Press **Up Arrow** to go 10 seconds backward
3. Press **Down Arrow** to go 10 seconds forward
4. Observe the visual indicator that appears

## 📱 Mobile Support

Keyboard shortcuts only work in desktop browsers. On mobile devices, use the player's touch controls.
