export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDAzM2M1YWFlODk0OGRmYWZlYWFmOThhM2MxNDVmNCIsIm5iZiI6MTcyMTc3MDM5OC4xNzIyODcsInN1YiI6IjY2OWZiYjljNWRmYjllYThkZjhmMmEzNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vEyit2DV4HjN-lSfuecmAPpgAIzKHYq6sviLZsA-GZc'
    }
  };
  
  fetch('https://api.themoviedb.org/3/trending/all/day', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));