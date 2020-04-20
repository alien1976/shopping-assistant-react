import * as React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Drawer, List, ListItem, ListItemIcon, Divider, ListItemText } from '@material-ui/core';

interface IMenuDrawerProps {
    isOpened: boolean
    toggleDrawer: () => void
}

const MenuDrawer = ({ isOpened, toggleDrawer }: IMenuDrawerProps) => {
    return (
        <Drawer anchor='left' open={isOpened} onClose={toggleDrawer}>
            <div
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
            >
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    );
}

export default React.memo(MenuDrawer);