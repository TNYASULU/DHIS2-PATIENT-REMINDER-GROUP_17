import axios from 'axios';
import { encode } from 'base-64';

const SERVER = 'http://localhost:8080';
const CLIENT_ID = 'thyolera';
const CLIENT_SECRET = '6cb7539bc-c704-3696-d2ad-7c8fbac8fcf';
const USERNAME = 'admin';
const PASSWORD = 'district';

const authenticateAndGetAccessToken = async () => {
  try {
    const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const encodedCredentials = encode(credentials);

    const response = await axios.post(
      `${SERVER}/uaa/oauth/token`,
      `grant_type=password&username=${USERNAME}&password=${PASSWORD}`,
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

const fetchDataElements = async (accessToken) => {
  try {
    const response = await axios.get(`${SERVER}/api/25/dataElements.json`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Data Elements:', response.data);
    return response.data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

export { authenticateAndGetAccessToken, fetchDataElements };
