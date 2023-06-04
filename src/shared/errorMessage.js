import Notiflix from 'notiflix'; 
 
Notiflix.Notify.init({ 
  width: '280px', 
  position: 'center-top', 
  distance: '15px', 
  timeout: 5000, 
  opacity: 1, 
  warning: { 
    background: '#4B2A99', 
    textColor: '#EBD8FF', 
    notiflixIconColor: '#ffc107', 
  }, 
}); 

export function errorMessage(error) { 
  switch (error.response.status) { 
    case 400: 
      Notiflix.Notify.warning( 
        `${error.message}. Try it again\nError ${error.response.status}`
      ); 
          break; 
      case 401: 
      Notiflix.Notify.warning( 
        `${error.message}. Try it again\nError ${error.response.status}`
      ); 
          break; 
      case 409: 
      Notiflix.Notify.warning( 
          `${error.message}. Try another one or log in. 
        Error ${error.response.status}`
      ); 
      break;
    case 500: 
      Notiflix.Notify.warning( 
        `Unfortunately, something has gone wrong. Please refresh your browser\nError ${error.response.status}` 
      ); 
      break; 
    default: 
      Notiflix.Notify.warning( 
        `Oops, something went wrong...Try it again\nError ${error.response.status} ${error.response.statusText} `
      ); 
  } 
}