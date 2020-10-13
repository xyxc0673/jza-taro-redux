const messages = {
  changeLog: [],

  programName: '吉珠小助手',

  designBy: 'DESIGN BY XYXC0673',

  version: '1.0.0 (2020-10-24)',
  changeLogName: '更新日志',

  share: '分享',

  loadingText: '加载中',
  modalDefaultTitle: '提示',
  modalHelpTitle: '帮助',

  wrongInputTip: '请检查输入',

  serverErrorText: '服务器出了点问题',
  networkTimeout: '网络超时',

  notLogin: '未登录',

  sessionExpiredServer: '缓存不存在或已过期',
  sessionExpiredClient: '登录已过期',

  days: ['周一', '周二', '周三', '周四', '周五', '周六' , '周日'],
  weekType: ['', '单周', '双周'],
  weekTypeWithAll: ['全周', '单周', '双周'],

  saveSuccess: '保存成功',
  saveFail: '保存失败',

  route: {
    scheduleSetting: '课表设置',
    scheduleManage: '课程管理',
    scheduleRecommend: '班级课表',
    scheduleEdit: '编辑课程',
    scheduleAdd: '添加课程',
  },

  tabbarSchedule: {
    settingList: ['更换课表', '管理课程', '班级课表', '课表设置'],
    holiday: '假期中',
    currWeek: '本周',
    nWeek: '第${week}周'
  },

  tabbarIndex: {
    mySchedule: '我的课表'
  },

  commonBind: {
    title: '统一登录中心',
    idLabel: '账号',
    idPlaceHolder: '请输入账号',
    eduPwdLabel: '教务密码',
    eduPwdPlaceHolder: '请输入教务密码',
    cardPwdLabel: '校园卡密码',
    cardPwdPlaceHolder: '请输入校园卡密码',
    buttonText: '确认',
    noChangeDetected: '看起来没有改变账号或者密码哦',
    noBindDetect: '检测到账号还未绑定，是否前往绑定',
    qaList: [
      {
        id: 1,
        q: '说明',
        a: '绑定账号后，修改原有信息重新提交即可更换绑定账号。'
      },
      {
        id: 2,
        q: '隐私',
        a: '所有账号密码均存储在微信的本地缓存中，服务器只作中转作用。'
      }
    ]
  },

  eduScore: {
    title: '成绩查询',
    pickerTitle: '请选择学年学期',
    confirmBtn: '确定',
    gradeList: ["大一", "大二", "大三", "大四", "大五"],
    termList: ["第一学期", "第二学期"],
  },

  eduSchedule: {
    setting: {
      title: '更换课表',
      pickerTitle: '请选择学年学期',
      confirmBtn: '确定',
      gradeList: ["大一", "大二", "大三", "大四", "大五"],
      termList: ["第一学期", "第二学期"],
      emptySchedule: '课表为空',
      emptyList: '空空如也',
      recommend: {
        title: '班级课表',
        search: '课表查询',
      }
    },
    manage: {
      mine: '',
      deleteCourse: '你确定要删除这个时间的这个课程(${courseName})吗？',
      customize: '自定义'
    },
    advanced: {
      showNotCurrWeekCourse: '显示非本周课程',
      customBackground: '自定义课表背景',
      chooseImage: '选择图片',
      imageStyle: '图片样式',
      origin: '原始图片',
      blur: '高斯模糊',
    },
    recommend: {
      seeLocalSchedule: '查看已经保存的课表',
      loading: '加载中',
      noData: '没有数据喔',
    },
    addCourse: {
      title: '新增课程',
      btn: ''
    },
    editCourse: {
      title: '编辑课程',
      btn: ''
    },
  },

  card: {
    title: '校园卡',
    transaction: '消费记录',
    invalidDate: '开始时间不能大于结束时间',
    total: "总计："
  },

  librarySearch: {
    title: '图书馆',
    inputLabel: '关键字',
    inputButtonText: '检索',
    inputPlaceholder: '书籍检索',
    noResult: '没有找到相关的书籍',
    noMoreResult: '没有更多的书籍啦！',
  },

  libraryBook: {
    author: '作者',
    publisher: '出版社',
    publishYear: '出版日期',
    callNo: '索书号',
    remain: '可借',
    canRead: '可阅览',
    total: '馆藏',
    emptyCallNo: '空',
  },


  libraryDetail: {
    title: '书籍信息',
    summaryTitle: '简介',
    summaryEmpty: '豆瓣上暂时没有简介',
    collectionTitle: '馆藏',
    collectionBarCode: '条形码',
    collectionYear: '年卷期',
    collectionState: '状态',
  },

  libraryReaderLogin: {
    title: '图书馆登录',
    idLabel: '账号',
    idPlaceHolder: '请输入账号',
    pwdLabel: '密码',
    pwdPlaceHolder: '请输入密码',
    captchaLabel: '验证码',
    captchaPlaceHolder: '请输入验证码',
    buttonText: '确定',
    qaList: [
      {
        q: '提示',
        a: '默认密码一般为 12345678。另外在本小程序登录之前，需要在图书馆官网登录然后进行身份认证，否则本小程序将无法处理登录请求',
      },
      {
        q: '有效期',
        a: '登录成功后，登录状态的有效期为一个小时。此间任何有关图书馆个人中心的操作都会重置该有效期。',
      },
      {
        q: '隐私',
        a: '账号密码均储存在微信内部中，但是基于技术实现，服务器会缓存登录成功后的会话一段时间，以用于后续操作。',
      }
    ]
  },

  libraryReaderCenter: {
    title: '个人中心',
    emptyCheckoutTip: '没有记录喔！去借本书吧！',
    lendAt: '借于',
    returnAt: '还于',
    shouldReturnAt: '应还于',
    tab: {
      bookshelf: '书架',
      currentCheckout: '待还',
      historyCheckout: '已还',
    },
    grid: {
      total: '总共借阅',
      current: '当前借阅',
      nearExpire: '即将到期',
    },
    loginStatus: {
      notLogin: '请点击此处登录',
      expired: '登录已过期，请重新登录'
    }
  }
}

export default messages