import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
});

export default function CustomizedInputBase(props) {
    const classes = useStyles();
    const [flowGroup, setFlowGroup] = React.useState('');
    const [flowName, setFlowName] = React.useState('');
    function handleOnChangeFlowGroup(event) {
        // console.log("event: " + event.target.value);
        // const val = event.target.value;
        setFlowGroup(event.target.value);
    }

    function handleOnChangeFlowName(event) {
        // console.log("event: " + event.target.value);
        // const val = event.target.value;
        setFlowName(event.target.value);
    }


    function handleClick() {
        props.searchHook(flowGroup, flowName)
    }
    return (
        <Paper className={classes.root}>
            {/* <IconButton className={classes.iconButton} aria-label="Menu">
        <MenuIcon />
      </IconButton> */}
            <InputBase
                className={classes.input}
                placeholder={props.inputProp1}
                inputProps={{ 'aria-label': props.inputProp1 }}
                onChange={handleOnChangeFlowGroup}
            />
            <Divider className={classes.divider} />
            <InputBase
                className={classes.input}
                placeholder={props.inputProp2}
                inputProps={{ 'aria-label': props.inputProp2 }}
                onChange={handleOnChangeFlowName}
            />
            <IconButton className={classes.iconButton} aria-label="Search" onClick={handleClick}>
                <SearchIcon />
            </IconButton>
            {/* <Divider className={classes.divider} />
      <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
        <DirectionsIcon />
      </IconButton> */}
        </Paper>
    );
}
