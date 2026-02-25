const keyHandlers = (audioInstance, playerState, setSeekIndicator) => {
  const nextSong = () => {
    const idx = playerState.queue.findIndex(
      (item) => item.uuid === playerState.current.uuid,
    )
    return idx !== null ? playerState.queue[idx + 1] : null
  }

  const prevSong = () => {
    const idx = playerState.queue.findIndex(
      (item) => item.uuid === playerState.current.uuid,
    )
    return idx !== null ? playerState.queue[idx - 1] : null
  }

  const seekBackward = () => {
    if (audioInstance && audioInstance.currentTime !== undefined) {
      const seekAmount = 10 // 10 seconds back
      const newTime = Math.max(audioInstance.currentTime - seekAmount, 0)
      audioInstance.currentTime = newTime

      // Εμφάνιση seek indicator
      if (setSeekIndicator) {
        setSeekIndicator({
          isVisible: true,
          direction: 'backward',
          currentTime: newTime,
          duration: audioInstance.duration || 0,
        })
      }
    }
  }

  const seekForward = () => {
    if (
      audioInstance &&
      audioInstance.currentTime !== undefined &&
      audioInstance.duration !== undefined
    ) {
      const seekAmount = 10 // 10 seconds forward
      const newTime = Math.min(
        audioInstance.currentTime + seekAmount,
        audioInstance.duration,
      )
      audioInstance.currentTime = newTime

      // Show seek indicator
      if (setSeekIndicator) {
        setSeekIndicator({
          isVisible: true,
          direction: 'forward',
          currentTime: newTime,
          duration: audioInstance.duration || 0,
        })
      }
    }
  }

  return {
    TOGGLE_PLAY: (e) => {
      e.preventDefault()
      audioInstance && audioInstance.togglePlay()
    },
    VOL_UP: () =>
      (audioInstance.volume = Math.min(1, audioInstance.volume + 0.1)),
    VOL_DOWN: () =>
      (audioInstance.volume = Math.max(0, audioInstance.volume - 0.1)),
    PREV_SONG: (e) => {
      if (!e.metaKey && prevSong()) audioInstance && audioInstance.playPrev()
    },
    CURRENT_SONG: () => {
      window.location.href = `#/album/${playerState.current?.song.albumId}/show`
    },
    NEXT_SONG: (e) => {
      if (!e.metaKey && nextSong()) audioInstance && audioInstance.playNext()
    },
    SEEK_BACKWARD: (e) => {
      e.preventDefault()
      seekBackward()
    },
    SEEK_FORWARD: (e) => {
      e.preventDefault()
      seekForward()
    },
  }
}

export default keyHandlers
