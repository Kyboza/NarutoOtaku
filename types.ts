export type ITopCharacters = {
    _id: string,
    name: string,
    likes: number,
    image: string,
  }

export type IReply = {
    _id: string;
    commentContent: string;
    commentUsername: string;
    commentImg: string;
}


export type IItemCart =  {
      _id: string,
      name: string,
      image: string,
      price: number,
      bgimage: string,
      amount: number,
      storage: number
}
