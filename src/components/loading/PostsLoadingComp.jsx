import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const PostsLoadingComp = ({ isLoading }) => {
  return (
    isLoading && (
      <Box sx={{ width: "100%",margin:"auto" }}>
        <CircularProgress sx={{  }} />
      </Box>
    )
  )
}

export default PostsLoadingComp