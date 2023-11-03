import useSWR, { Fetcher } from "swr"

//const fetcher = (...args) => fetch(...args).then(res => res.json())
const fetcher: Fetcher<History, string> = (person) => 
  fetch(`https://bad-words-site-default-rtdb.firebaseio.com/${person}.json?limitToLast=10&orderBy="$key"`)
    .then(res => res.json())


function useHistory (person: string) {
  const { data, error, mutate, isLoading } = useSWR(person, fetcher)
 
  return {
    history: data,
    isLoading,
    isError: error,
    mutate: mutate,
  }
}

export default useHistory;