import Taro, { setStorageSync } from '@tarojs/taro'
import { BOOK_SHELF } from './constant'

class Library {
    static getBookShelf(): Array<any> {
        return Taro.getStorageSync(BOOK_SHELF) || []
    }

    static setBookShelf(shelf) {
        Taro.setStorageSync(BOOK_SHELF, shelf)
    }
}

export default Library