import axios from "axios"

export function handleError(error: unknown) {
    if(error instanceof Error){
      console.error('Error:', error.message);
      return { error: error.message };
    } else {
      console.error('Unknown error:', error);
      return { error: 'An unexpected error occurred' };
    }
}

export function handleErrorWithAxios(error: unknown){
    if(axios.isAxiosError(error)){
        console.log(error.response?.data?.message || 'Unknown Axios Error')
      } else if (error instanceof Error){
        console.log('Unkown Error', error)
      } else {
        console.log('Error Object Returned', error)
      }
}