export default {
  pages: [
      'pages/tabbar/index/index',
      'pages/tabbar/schedule/index',
      'pages/tabbar/me/index',

      'pages/common/bind/index',
      'pages/common/about/index',
      'pages/common/setting/index',

      'pages/edu/score/index',

      'pages/edu/schedule/setting/index',
      'pages/edu/schedule/manage/index',
      'pages/edu/schedule/edit/index',
      'pages/edu/schedule/advanced/index',
      'pages/edu/schedule/recommend/index',
      'pages/edu/schedule/recommend/schedule',

      'pages/card/index',

      'pages/library/search/index',
      'pages/library/detail/index',

      'pages/library/bind/index',
      'pages/library/reader/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      list: [
        {
          text: '',
          pagePath: 'pages/tabbar/index/index',
          iconPath: 'assets/images/palette-line__unselected.png',
          selectedIconPath: 'assets/images/palette-line__selected.png'
        },
        {
          text: '',
          pagePath: 'pages/tabbar/schedule/index',
          iconPath: 'assets/images/table-line__unselected.png',
          selectedIconPath: 'assets/images/table-line__selected.png'
        },
        {
          text: '',
          pagePath: 'pages/tabbar/me/index',
          iconPath: 'assets/images/user-smile-line__unselected.png',
          selectedIconPath: 'assets/images/user-smile-line__selected.png'
        }
      ],
      color: '#999999',
      selectedColor: '#000',
      backgroundColor: '#fff',
      borderStyle: 'white'
    },
    networkTimeout: {
      request: 5000
    }
}
