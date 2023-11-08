import { Card, CardContent, Typography, Fab, Divider, List, Collapse, ListItem, IconButton, ListItemText } from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
//import SayIcon from '@mui/icons-material/VoiceChat';
//import VideoIcon from '@mui/icons-material/OndemandVideo';
import { useEffect } from "react";
import useHistory from "@/hooks/useHistory";
import dayjs from "dayjs";
import useCounts from "@/hooks/useCounts";
import { TransitionGroup } from 'react-transition-group';
import SayIcon from '@mui/icons-material/RecordVoiceOver';
import VideoIcon from '@mui/icons-material/LiveTv';

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

interface RenderItemOptions {
  key: string;
  value: any;
  handleRemoveItem: (item: string) => void;
}

function renderItem({ key, value, handleRemoveItem }: RenderItemOptions) {
  return (
    <ListItem>
      <IconButton>
        {value["type"] == "say" && <SayIcon />}
        {value["type"] == "video" && <VideoIcon />}
      </IconButton>
      {dayjs(parseInt(key)).format("ddd, MMM D, YYYY h:mm A")}
      <IconButton
        aria-label="delete"
        onClick={() => handleRemoveItem(key)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
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


  let handleClickAdd = (type: string) => {
    console.log('add');
    let created = new Date().valueOf()
    let data = {
      [created] : {
        type: type
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

  const handleDelete = (key:string) => {
    fetch(`https://bad-words-site-default-rtdb.firebaseio.com/${props.person}/${key}.json`, {
          method: 'DELETE',
          headers: { "Content-Type": "application/json", }
    }).then(() => {
      mutate();
      let count = (counts && counts[props.person]) ? counts[props.person] : 0;
      if (!count) count = 0;
      console.log(count);
      count--;
      if (count < 0) count = 0;
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
          {props.person}
        </Typography>
        <Fab variant="extended">
          {counts ? counts[props.person] : 0} bad words
        </Fab>
        <Fab aria-label="add" onClick={() => handleClickAdd("say")}>
          {" "}
          <SayIcon />
        </Fab>
        <Fab aria-label="add" onClick={() => handleClickAdd("video")}>
          {" "}
          <VideoIcon />
        </Fab>
        <Divider sx={{ mt: 2, mb: 2 }}></Divider>
        <Typography variant="h5" gutterBottom>
          History
        </Typography>
        <List sx={{ mt: 1 }}>
          <TransitionGroup>
          {history &&
            Object.entries(history)
              .reverse()
              .map(([key, value]) => (
                <Collapse key={key}>{renderItem({ key, value, handleRemoveItem: handleDelete })}</Collapse>

              ))}
          </TransitionGroup>
        </List>
      </CardContent>
    </Card>
  );
}

export default BadWordsCard;