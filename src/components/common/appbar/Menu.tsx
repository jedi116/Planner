import React from "react";
import Box from '@mui/material/Box';    
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import {AppBarContext} from './AppbarWrapper'
import {useNavigate} from 'react-router-dom';
import logoImage from '../../../assests/Planner.png';

interface MenuProps {
    isOpen: boolean;
}

export const Menu: React.FC<MenuProps> = ({isOpen}) => {
    const appBarContext = React.useContext(AppBarContext)
    const listOfItems = ['Home', 'Profile', 'Dashbaord']
    const navigate = useNavigate();
    return(
        <div>
            <Drawer
                anchor='left'
                open={appBarContext.isAppBarMenuOpen}
                onClose={() => appBarContext.toggleAppBarMenu(false)}

            >
              <div className='appBar__menu'>
              <img src={logoImage} className ='appBar__menu__image' />  
              {
                    listOfItems.map((item, index) =>(
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemText 
                                primary={item} 
                                onClick = {() => {
                                    appBarContext.toggleAppBarMenu(false)
                                    navigate(`/${item}`)
                                  }}  
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
              }
              </div>
            </Drawer>
        </div>
    )
} 