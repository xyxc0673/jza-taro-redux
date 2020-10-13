import Taro from '@tarojs/taro'
import Tip from './tip'

class Route {
  static path = {
    tabbarIndex: '/pages/tabbar/index/index',
    tabbarSchedule: '/pages/tabbar/schedule/index',
    tabbarMe: '/pages/tabbar/me/index',

    commonBind: '/pages/common/bind/index',
    commonAbout: '/pages/common/about/index',
    commonSetting: '/pages/common/setting/index',

    eduScore: '/pages/edu/score/index',
    eduScheduleSetting: '/pages/edu/schedule/setting/index',
    eduScheduleManage: '/pages/edu/schedule/manage/index',
    eduScheduleEdit: '/pages/edu/schedule/edit/index',
    eduAdvancedSchedule: '/pages/edu/schedule/advanced/index',
    eduRecommendIndex: '/pages/edu/schedule/recommend/index',
    eduRecommendSchedule: '/pages/edu/schedule/recommend/schedule',

    cardIndex: '/pages/card/index',

    libraryBookSearch: '/pages/library/search/index',
    libraryBookDetail: '/pages/library/detail/index', 
    libraryReaderBind: '/pages/library/bind/index', 
    libraryReaderCenter: '/pages/library/reader/index', 
  }

  static navTo (path, params = {}) {
    let urlParam = ''
    let paramsKeys = Object.keys(params)
    if (paramsKeys.length !== 0) {
      urlParam = ''
      for (let i = 0; i < paramsKeys.length; i ++) {
        let k = paramsKeys[i]
        urlParam += `${k}=${params[k]}`
        i < paramsKeys.length ? urlParam += '&' : null
      }
    }
    Taro.navigateTo({ url: `${path}?${urlParam}` })
  }
}

export default Route