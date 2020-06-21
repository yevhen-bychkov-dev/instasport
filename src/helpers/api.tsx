const URL = 'https://instasport.co/dashboard/api/v1/clubs/?format=json';

export const getDataFromServer = () => {
  return fetch(URL).then(data => data.json());
}