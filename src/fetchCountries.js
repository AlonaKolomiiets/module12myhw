export default name => {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      }
      throw response;
    })
    .catch(error => {
      console.log('Error!Not found...');
      return [];
    });
};
