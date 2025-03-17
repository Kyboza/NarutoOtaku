import axios from "axios"

export function handleError(error: unknown) {
    if(error instanceof Error){
        console.log(error.message)
    } else {
        console.log('An Unknown Error Occured')
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