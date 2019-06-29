export const Constants = {
  API_URI_PREFIX: 'assets/mockJsons/',
  API_URI_SUFFIX: {
    GET_EVENT_LIST: 'eventList.json'
  },
  TICKET_BOOKING_TEXT: {
    AVAILABLE: 'Book Now',
    SOLD_OUT: 'Sold Out'
  },
  MAX_SEATS_PER_PERSON: 6,
  VALIDATION_MESSAGES: {
    REQUIRED: '${fieldname} is Required.',
    ALPHA_NUMERIC: {
      ERROR_MESSAGE: 'Only letters and spaces are allowed',
      REGEX: '^[a-zA-Z0-9]*$'
    },
    EMAIL: {
      ERROR_MESSAGE: 'Invalid Email'
    },
    PHONE_NUMBER: {
      ERROR_MESSAGE: 'Please enter 10 digit phone number',
      REGEX: '^[0-9]{10}$'
    },
    NUMBER_OF_SEATS: {
      ERROR_MESSAGE: 'Sorry, can not book tickets more that available quantity'
    }
  },
  BOOKING_SUCCESS: 'Tickets booked.'

};
