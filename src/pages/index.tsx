import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { Box, Button, Card, CardContent, Container, Divider, Fab, Grid, Paper, Typography } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Container>
        <Box>
          <Typography variant="h2" gutterBottom>
            Peter vs Mommy - Bad Words Site
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Peter
                  </Typography>
                  <Fab variant="extended">23 bad words</Fab>
                  <Divider sx={{ mt: 2, mb: 2 }}></Divider>
                  <Button variant="outlined">Bad Word Said</Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Mommy
                  </Typography>
                  <Fab variant="extended">35 bad words</Fab>
                  <Divider sx={{ mt: 2, mb: 2 }}></Divider>
                  <Button variant="outlined">Bad Word Said</Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
