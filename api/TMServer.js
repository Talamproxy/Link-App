import { TM_KEY } from './TMKey';
import axios from 'axios';

const YTServer = axios.create({
  baseURL: 'https://app.ticketmaster.com/discovery/v2/',
});

// adds token, if we have one to all requests.
YTServer.interceptors.request.use(
  async (config) => {
    // called when request is made.
    config.headers.Accept = 'application/json';
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (err) => {
    // called when error
    return Promise.reject(err);
  }
);

export const getEvents = async (callback) => {
  const response = await YTServer.get(
    `events.json?city=grand%20rapids&apikey=${TM_KEY}`
  );
  callback(response.data);  
};


export const getCitiesAPI = async (callback,city) => { 

  const response = await YTServer.get(
    `events.json?city=${city}&apikey=9irEViQDovsD42clqG99FQMAH5t3AEnv`
  );
  callback(response.data);  
};

export default YTServer;