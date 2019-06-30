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
    REQUIRED_SUBJECT: 'Please enter your ${fieldname}.',
    REQUIRED_OBJECT: 'Please enter ${fieldname}.',
    NAME: {
      ERROR_MESSAGE: 'Only letters and spaces are allowed',
      REGEX: '^[a-zA-Z ]*$'
    },
    EMAIL: {
      ERROR_MESSAGE: 'Invalid Email'
    },
    PHONE_NUMBER: {
      ERROR_MESSAGE: 'Please enter 10 digit phone number',
      REGEX: '^[0-9]{10}$'
    },
    MIN_LENGTH: '${fieldName} should be atleast ${length} characters/digits long',
    MAX_LENGTH: '${fieldName} can be atmost ${length} characters/digits long',
    NUMBER_OF_SEATS: {
      ERROR_MESSAGE: 'Number of seats selected is more than available seats'
    }
  },
  BOOKING_SUCCESS: 'Tickets booked.'

};
