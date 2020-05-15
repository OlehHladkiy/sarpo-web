import * as R from 'ramda';
import moment from 'moment';

export const normalizeBasicConferenceToCreate = (
  dataToCreate: Record<string, any>,
): Record<string, any> => {
  const [startDateMoment, endDateMoment] = R.propOr([], 'date', dataToCreate);
  const [startTimeMoment, endTimeMoment] = R.propOr([], 'time', dataToCreate);

  return {
    ...R.omit(['date', 'time'], dataToCreate),
    startDate: startDateMoment.format('lll'),
    endDate: endDateMoment.format('lll'),
    startTime: startTimeMoment.format('LT'),
    endTime: endTimeMoment.format('LT'),
  };
};

export const normalizeBasicToInitial = (
  conference: Record<string, any>,
): Record<string, any> => ({
  ...R.pick(
    ['title', 'organizer', 'address', 'type', 'dateType'],
    R.defaultTo({}, conference),
  ),
  date: [
    moment(R.prop('startDate', conference)),
    moment(R.prop('endDate', conference)),
  ],
  time: [
    moment(
      `${moment(R.prop('startDate', conference)).format(
        'dddd, MMMM D YYYY',
      )} ${R.prop('startTime', conference)}`,
    ),
    moment(
      `${moment(R.prop('startDate', conference)).format(
        'dddd, MMMM D YYYY',
      )} ${R.prop('endTime', conference)}`,
    ),
  ],
});

export const getConferenceDate = (
  startDate: string | Date,
  startTime: string,
): string => `${moment(startDate).format('dddd, MMMM D YYYY')} at ${startTime}`;
