import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: { 'Content-Type': 'application/json' }
});

const predict = async ({ Danceability, Energy, Loudness, Speechiness, Acousticness, Liveness, Valence, Tempo, Duration_ms }) => {
  const data = await instance.post('/predict', { Danceability, Energy, Loudness, Speechiness, Acousticness, Liveness, Valence, Tempo, Duration_ms })
    .then(res => res.data)
    .catch(e => console.error('predict failed', e));

  return data;
};

export { predict };