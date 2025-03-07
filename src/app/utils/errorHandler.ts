export function handleError(error: unknown) {
    if(error instanceof Error){
        console.log(error.message)
    } else {
        console.log('An Unknown Error Occured')
    }
}