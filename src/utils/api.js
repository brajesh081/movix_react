import axios from "axios";

const BASE_URL="https://api.themoviedb.org/3"
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWExN2NlZjNjODc4NGQzZjUyOWQ4ZDE0NTgxZmJmOCIsInN1YiI6IjY1ZTM2MzM3ZmUwNzdhMDE2MjBlM2YyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xjx7IJ838IBkM4k12I00XOCOZV6JCta9IkPAAVDDOOY";

const headers = {
  Authorization: "bearer " + TMDB_TOKEN
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get( BASE_URL +  url, {
      headers,
      params
    })
    return data;
  } catch(err) {
    console.log(err);
    return err;
  }
}


