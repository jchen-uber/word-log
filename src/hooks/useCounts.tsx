import useSWR, { Fetcher } from "swr"

//const fetcher = (...args) => fetch(...args).then(res => res.json())
interface Counts {
  Peter? : number,
  Mommy? : number,
}

const fetcher: Fetcher<Counts, string> = (person) => 
  fetch(`https://bad-words-site-default-rtdb.firebaseio.com/Counts.json`)
    .then(res => res.json())


function useCounts (person: string) {
  const { data: counts, error, mutate, isLoading } = useSWR(person, fetcher)
 
  return {
    counts: counts,
    isLoading,
    isError: error,
    mutate: mutate,
  }
}

export default useCounts;