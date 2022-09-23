import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { auth, logout } from '../../../firebase/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Menu as CustomMenu } from './Menu'
import { AppBarWrapper, AppBarContext } from './AppbarWrapper'
import { userConstext } from '../../user/userProfileContextWrapper'

const MenuAppBar = () => {
  const [user, loading, error] = useAuthState(auth)
  const userProfileContext = React.useContext(userConstext)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const appBarContext = React.useContext(AppBarContext)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    navigate('/profile')
    handleClose()
  }
  const handleSettingsClick = () => {
    navigate('/settings')
    handleClose()
  }

  const handleLogOut = () => {
    setAnchorEl(null)
    logout()
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => {
              appBarContext.toggleAppBarMenu(true)
            }}
          >
            <MenuIcon />
          </IconButton>
          <CustomMenu isOpen={appBarContext.isAppBarMenuOpen} />
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate('/')
            }}
          >
            Planner
          </Typography>
          {user && (
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <Avatar alt='Remy Sharp' src={userProfileContext.userData.profilePicture} />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
                <MenuItem onClick={handleLogOut}>logout</MenuItem>
              </Menu>
            </div>
          )}
          {!user && (
            <div>
              <Button variant='text' onClick={() => navigate('/login')} style={{ color: '#FFF' }}>
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default function Wrapper() {
  return (
    <AppBarWrapper>
      <MenuAppBar />
    </AppBarWrapper>
  )
}
