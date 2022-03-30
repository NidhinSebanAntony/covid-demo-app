import Head from "next/head";
import styles from "../styles/Home.module.css";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Link from 'next/link'


export default function Home({ allCountries }) {

  // setting pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>All Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>SI. No.</TableCell>
                  <TableCell>Infected</TableCell>
                  <TableCell>Tested</TableCell>
                  <TableCell>Recovered</TableCell>
                  <TableCell>Deceased</TableCell>
                  <TableCell>Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCountries
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.infected}</TableCell>
                        <TableCell>{row.tested}</TableCell>
                        <TableCell>{row.recovered}</TableCell>
                        <TableCell>{row.deceased}</TableCell>
                        <TableCell>
                          <Button variant="text">
                            <Link href={{
                              pathname: `/country/${row.country}`,
                              query: {
                                moreDataURL: row.moreData,
                                historyDataURL: row.historyData
                              },
                            }}>
                              <a>{row.country}</a>
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={allCountries.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </main>
    </div>
  );
}

//pre-render Home page with the data returned
export async function getServerSideProps() {
  // fetching all countries data api
  const req = await fetch(`https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true`);
  const data = await req.json();

  // passing the response of api as props
  return {
    props: { allCountries: data },
  }
}
