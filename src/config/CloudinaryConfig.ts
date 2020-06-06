import * as R from 'ramda';

export default {
  apiSecret: R.defaultTo(
    'cloudinary://313448414825867:RKBdQ07T6wye25ZfWnMK3GSwS-E@dpgjcwt54',
    process.env.CLOUDINARY_API_SECRET,
  ),
  apiKey: R.defaultTo('313448414825867', process.env.CLOUDINARY_API_KEY),
  cloudName: R.defaultTo('dpgjcwt54', process.env.CLOUDINARY_NAME),
};
