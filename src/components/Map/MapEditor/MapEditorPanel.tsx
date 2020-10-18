import * as React from 'react';
import '../Map.css'
import { useSelector, useDispatch } from 'react-redux';
import { updateShop } from '../../../redux/shopsReducer';
import { Grid, makeStyles, createStyles, Button, Typography, IconButton } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CreateIcon from '@material-ui/icons/Create';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { openSnackBar } from '../../../redux/snackBarReducer';
import { selectAdjList, selectEditorMode, selectMapShop, setMapScale, selectEntryPoint, setEditorMode, setAdjList, selectMapScale } from '../../../redux/mapReducer';
import { EDITOR_MODES } from '../../../globals/constants';

const useStyles = makeStyles(() =>
    createStyles({
        optionsPanel: {
            width: '35%',
            overflowY: 'scroll',
            position: 'relative',
            padding: 10
        },
        optionsDragBorder: {
            width: '4px',
            backgroundColor: '#595959',
            '&:hover': {
                backgroundColor: "#cccccc",
            },
            height: '100%',
            position: 'absolute',
            top: '0',
            left: '0',
            cursor: 'ew-resize'
        },
        mapGrid: {
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center'
        },
        submit: {
            backgroundColor: 'gray',
        },
        input: {
            display: 'none',
        }
    }),
);

const MapEditorPanel = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const adjList = useSelector(selectAdjList);
    const entryPoint = useSelector(selectEntryPoint);
    const editorMode = useSelector(selectEditorMode);
    const mapScale = useSelector(selectMapScale);
    const shop = useSelector(selectMapShop);

    const changeScaleFactor = (event: any) => {
        const changeFactor = parseInt(event.target.value);
        dispatch(setMapScale(changeFactor));
    }

    const onSaveMap = () => {
        const newShopData = { ...shop, map: JSON.stringify(adjList), mapEntryPoint: entryPoint }
        dispatch(updateShop(newShopData))
    }

    const handleModeChange = (event: React.MouseEvent<HTMLElement>, newMode: string | null) => {
        dispatch(setEditorMode(newMode));
    };

    const importMapFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        var reader = new FileReader();
        reader.readAsText(event.target.files[0], "UTF-8");
        reader.onload = function (evt) {
            dispatch(setAdjList(JSON.parse(evt.target.result as string)));
        }
        reader.onerror = function (evt) {
            dispatch(openSnackBar({ message: 'Unable to load file! Try again later', status: 'warning' }))
        }
    }

    const exportMapToFile = () => {
        var a = document.createElement('a');
        a.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(adjList)));
        a.setAttribute('download', shop.name + '_' + shop.id + '.json');
        a.click()
    }

    return (
        <Grid container className={classes.optionsPanel}>
            <div className={classes.optionsDragBorder}></div>
            <Grid item xs={12} className={classes.mapGrid}>
                <Typography variant="h4">{shop && shop.name}</Typography>
                <Typography variant="h5">{shop && shop.address}</Typography>
            </Grid>
            <Grid item xs={12}>
                <input accept="application/json" onChange={importMapFromFile} className={classes.input} id="import-map-button-file" type="file" />
                <label htmlFor="import-map-button-file">
                    <IconButton title='Import map from file' color="inherit" aria-label="upload picture" component="span">
                        <PostAddIcon />
                    </IconButton>
                </label>
                <label htmlFor="export-map-button-file">
                    <IconButton onClick={exportMapToFile} title='Export map to file' color="inherit" aria-label="upload picture" component="span">
                        <SaveAltIcon />
                    </IconButton>
                </label>
            </Grid>
            <Grid item xs={12} className={classes.mapGrid}>
                <ToggleButtonGroup
                    value={editorMode}
                    exclusive
                    onChange={handleModeChange}
                >
                    <ToggleButton title='Add points' value={EDITOR_MODES.ADDING_POINTS}>
                        <CreateIcon />
                    </ToggleButton>
                    <ToggleButton title='Connect points' value={EDITOR_MODES.CONNECTING_POINTS} aria-label="centered">
                        <LinearScaleIcon />
                    </ToggleButton>
                    <ToggleButton title='Move points' value={EDITOR_MODES.MOVING_POINTS} aria-label="right aligned">
                        <OpenWithIcon />
                    </ToggleButton>
                    <ToggleButton title='Delete points' value={EDITOR_MODES.DELETING} aria-label="justified">
                        <DeleteForeverOutlinedIcon />
                    </ToggleButton>
                    <ToggleButton title='Select entry point' value={EDITOR_MODES.SELECTING_ENTRY_POINT} aria-label="justified">
                        <TransitEnterexitIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} className={classes.mapGrid}>
                <Typography variant="subtitle1"> Editor Mode: {editorMode}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.mapGrid}>
                <div>
                    <label htmlFor="route-scale">Current route scale:</label>
                    <input onChange={changeScaleFactor} type="range" id="route-scale" name="points" min="3" max="10" step="1" value={mapScale} />
                    {mapScale}
                </div>
            </Grid>
            <Grid item xs={12} className={classes.mapGrid}>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={onSaveMap}
                    className={classes.submit}
                >
                    Save Map
                </Button>
            </Grid>
        </Grid>
    )
}

export default MapEditorPanel;