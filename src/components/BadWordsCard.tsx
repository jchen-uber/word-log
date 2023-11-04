import { Card, CardContent, Typography, Fab, Divider, List, Collapse, ListItem, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEffect } from "react";
import useHistory from "@/hooks/useHistory";
import dayjs from "dayjs";
import useCounts from "@/hooks/useCounts";

interface BadWordsCardProps {
  person: "Mommy" | "Peter"
}

export async function getStaticPaths() {
  const paths = [{ params: {} }]
    
  return {
    paths,
    fallback: true
  }
}

function BadWordsCard(props: BadWordsCardProps) {
  const { history, mutate, isLoading } = useHistory(props.person)

  const {counts: counts, mutate: mutateCounts, isLoading: isCountsLoading} = useCounts('Counts.'+props.person)
  // let fetchHistory = () => {
  //   fetch(`https://bad-words-site-default-rtdb.firebaseio.com/${props.person}.json?limitToLast=10&orderBy="$key"`).then((response) => {
  //     console.log(response);
  //     return response.json();
  //   }).then((data) => {
  //     console.log(data);
  //   })
  // }

  // useEffect(() => {
  //   fetchHistory();
  // }, [])
  useEffect(() => {
    console.log('hisotry', history);
  }, [history])
  useEffect(() => {
    console.log('counts', counts);
  }, [counts])


  let handleClickAdd = () => {
    console.log('add');
    let created = new Date().valueOf()
    let data = {
      [created] : {
        type: 'say'
      }
    }
    fetch(`https://bad-words-site-default-rtdb.firebaseio.com/${props.person}.json`, {
          method: 'PATCH',
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify(data)
    }).then(() => {
      mutate();
      let count = (counts && counts[props.person]) ? counts[props.person] : 0;
      if (!count) count = 0;
      console.log(count);
      count++;
      let data = {
        [props.person] : count
      }
      return fetch(`https://bad-words-site-default-rtdb.firebaseio.com/Counts.json`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(data)
      });
    }).then(() => {
      mutateCounts();
    })
  }

  return (
    <Card>
    <CardContent>
      <Typography variant="h4" gutterBottom>
        { props.person }
      </Typography>
      <Fab variant="extended">{counts ? counts[props.person] : 0} bad words</Fab>
      <Fab aria-label="add" onClick={handleClickAdd} > <AddIcon /></Fab>
      <Divider sx={{ mt: 2, mb: 2 }}></Divider>
      <Typography variant="h5" gutterBottom>History</Typography>
      <List sx={{ mt: 1 }}>
        {history && Object.entries(history).reverse().map(([key, value]) => (
          <ListItem key={key}>
            { dayjs(parseInt(key)).format('ddd, MMM D, YYYY h:mm A') }
            <IconButton aria-label="delete"><DeleteIcon /></IconButton>
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>    
  )
}

export default BadWordsCard;