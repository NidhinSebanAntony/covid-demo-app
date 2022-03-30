import * as React from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from 'next/link'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import moment from 'moment'
import CircularProgress from '@mui/material/CircularProgress';

// MUI BASIC TABS SETUP
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Country({ moreData, historyDataURL }) {

    //userRouter build in hook for getting the query data
    const router = useRouter()
    const { id } = router.query

    // Setting mui tab and pagination
    const [value, setValue] = React.useState(0);
    const [loading, setLoading] = React.useState(true)
    const [histData, setHistData] = React.useState(null)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // history api is called on request
    const handleHistory = async () => {
        if (histData && histData.length > 0) {
            //if history data is already fetched no api call is intantiated again
        } else {
            setLoading(true)
            const reqHistoryData = await fetch(historyDataURL);
            const historyData = await reqHistoryData.json();
            setHistData(historyData)
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{id}</title>
            </Head>

            <main className={styles.main}>
                <h4 className={styles.title}>
                    Country Specific Data of {id}
                </h4>
                <Button variant="text">
                    <Link href={{
                        pathname: `/`,

                    }}>
                        <a>Back Home</a>
                    </Link>
                </Button>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Current Data" {...a11yProps(0)} />
                            <Tab label="History Data" {...a11yProps(1)} onClick={handleHistory} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <TableContainer component={Paper} className={styles.horizontal_table}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Country</TableCell>
                                        <TableCell align="right">{id}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Infected</TableCell>
                                        <TableCell align="right">{moreData.infected}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Deceased</TableCell>
                                        <TableCell align="right">{moreData.deceased}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Recovered</TableCell>
                                        <TableCell align="right">{moreData.recovered}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Active Cases</TableCell>
                                        <TableCell align="right">{moreData.activeCases}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Tested</TableCell>
                                        <TableCell align="right">{moreData.tested}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">Critical</TableCell>
                                        <TableCell align="right">{moreData.critical}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {loading &&
                            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                                <CircularProgress />
                            </Box>
                        }
                        {!loading &&
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>SI. No.</TableCell>
                                                <TableCell>Total Cases</TableCell>
                                                <TableCell>Total Deaths</TableCell>
                                                <TableCell>Total Tested</TableCell>
                                                <TableCell>As Per Time</TableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {histData
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    return (
                                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>{row.totalCases}</TableCell>
                                                            <TableCell>{row.totalDeaths}</TableCell>
                                                            <TableCell>{row.totalTested}</TableCell>
                                                            <TableCell>{moment(row.lastUpdatedAtApify).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                                                            <TableCell>{row.deceased}</TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={histData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        }
                    </TabPanel>
                </Box>
            </main>
        </div>
    )
}

//pre-render Country Specific page with the data returned
export async function getServerSideProps(context) {

    const reqMoreData = await fetch(context.query.moreDataURL);
    const moreData = await reqMoreData.json();

    return {
        props: {
            moreData: moreData,
            historyDataURL: context.query.historyDataURL
        },
    }

}

