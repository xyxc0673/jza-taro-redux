export interface ICollection {
    index: string
    barCode: string
    location: string
    state: string
    year: string
  }
  
  export interface IDetail {
    summary
  }
  
  export interface IBook {
    title: string
    author: string
    callNo: string
    isbn: string
    marcNo: string
    docTypeName: string
    imageUrl: string
    publisher: string
    publishYear: string
    remainNumber: string
    totalNumber: string
    detail: IDetail
    books: Array<ICollection>
    liked: boolean
    refresh: boolean
  }