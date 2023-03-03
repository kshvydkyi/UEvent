import { createClient } from '@google/maps';

const googleMapsClient = createClient({
    key: 'AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8',
    Promise: Promise
  });

export const checkAdress = async (lat, lng) => {
    try {
      // console.log(+lat, +lng);
        const response = await googleMapsClient.reverseGeocode({
          latlng: [lat, lng]
        }).asPromise();
        const result = response;
        console.log( 'aboba', result);
        if (result) {
          return result.place_id;
        } else {
          throw new Error('No results found');
        }
      } catch (err) {
        console.log(err)
        throw new Error(err);
      }
}