import React from "react";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Client from "./Client";
import CustomizedInputBase from "./SearchBar";
import Button from "@material-ui/core/Button";

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Donut', 452, 25.0, 51, 4.9),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Honeycomb', 408, 3.2, 87, 6.5),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     createData('KitKat', 518, 26.0, 65, 7.0),
//     createData('Lollipop', 392, 0.2, 98, 0.0),
//     createData('Marshmallow', 318, 0, 81, 2.0),
//     createData('Nougat', 360, 19.0, 9, 37.0),
//     createData('Oreo', 437, 18.0, 63, 4.0),
// ];

// console.log(rows);

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

//TODO: change this in prod
const headRows = [
    { id: 'flowGroup', numeric: false, disablePadding: false, label: 'Flow Group' },
    { id: 'flowName', numeric: false, disablePadding: true, label: 'Flow Name' },
    { id: 'flowExecutionId', numeric: true, disablePadding: false, label: 'Flow Execution ID' },
    { id: 'flowExecutionStatus', numeric: false, disablePadding: true, label: 'Flow Execution Status' },
    { id: 'actions', numeric: false, disablePadding: true, label: 'Actions'}
];

function EnhancedTableHead(props) {
    const {order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}));


const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { handleSearch } = props;
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: false,
            })}
        >
            <div className={classes.title}>
                {(
                    <Typography variant="h6" id="tableTitle">
                        <b>GaaS Monitoring </b>
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {(
                    <CustomizedInputBase inputProp1={'flowGroup'} inputProp2={'flowName'} searchHook={handleSearch}/>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    // numSelected: PropTypes.number.isRequired,
    handleSearch: PropTypes.func.isRequired
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
}));

export default function GaaSMonitoringFlowTable() {
    const classes = useStyles();
    // TODO: set initial sort order
    const [order, setOrder] = React.useState('desc');
    // TODO: set initial sort key
    const [orderBy, setOrderBy] = React.useState('flowExecutionId');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        Client.getFlowStatuses(flowStatuses => setRows(flowStatuses));
    }, []);

    function handleSearch(flowGroup, flowName) {
        setRows([]);
        Client.getSpecificFlowStatuses(flowStatuses => setRows(flowStatuses), flowGroup, flowName);
    }

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    // function handleClick(event, name) {
    //     const selectedIndex = selected.indexOf(name);
    //     let newSelected = [];
    //
    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, name);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }
    //
    //     setSelected(newSelected);
    // }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
    }

    function handleChangeDense(event) {
        setDense(event.target.checked);
    }

    // const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar handleSearch={handleSearch}/>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    const jobDetailLink = `/${row.flowGroup}/${row.flowName}/${row.flowExecutionId}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.flowExecutionId}
                                            selected
                                        >
                                            <TableCell component="th" id={labelId} scope="row">
                                                {row.flowGroup}
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.flowName}
                                            </TableCell>
                                            <TableCell align="right">{row.flowExecutionId}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.flowExecutionStatus}
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {<Button variant="contained" href={jobDetailLink} className={classes.button}>
                                                    Job Details
                                                </Button>}
                                                {<Button variant="contained" color="primary" disabled className={classes.button}>
                                                    Start
                                                </Button>}
                                                {<Button variant="contained" color="secondary" disabled className={classes.button}>
                                                    Stop
                                                </Button>}
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}
