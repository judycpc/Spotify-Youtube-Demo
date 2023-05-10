import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: { 'Content-Type': 'application/json' }
});

const predict = async ({ danceability, energy, valence, speechiness, acousticness, instrumentalness, liveness, tempo }) => {
  const data = await instance.post('/predict', { danceability, energy, valence, speechiness, acousticness, instrumentalness, liveness, tempo })
    .then(res => res.data)
    .catch(e => console.error('predict failed', e));

  return data;
};

export { predict };