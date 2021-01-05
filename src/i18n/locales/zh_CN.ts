const zh_CN = {
  app: 'By the sea',
  appName: '吉珠小助手',

  wrongInputTip: '请检查输入',
  modalHelpTitle: '帮助',
  modalDefaultTitle: '提示',

  confirm: '确认',
  cancel: '取消',
  loading: '加载中...',
  search: '检索',

  saveSuccess: '保存成功',
  saveFail: '保存失败',

  guide: '欢迎使用！点击这里获取你的课表或者班级课表~',

  changeLog: '正式发布 1.0.0 版本',

  clearStorage: '确定要清除数据吗？（注意：该操作会清空本地所有数据）',

  shareTitle: '一起去看海呀~',

  unmaintained: '功能失效，暂停使用',

  serverErrorText: '服务器出了点问题，稍后再尝试~',

  sessionExpiredServer: '登录缓存已过期',

  networkTimeout: '请求超时',

  feedback: {
    or: '或者',
    contact: '与开发者对话',
    feedback: '提交工单反馈',
    clear: '清除所有数据'
  },

  tabbar: {
    time: '时刻',
    schedule: '课表',
    me: '我的'
  },

  route: {
    scheduleSetting: '更换课表',
    scheduleAdvanced: '课表设置',
    scheduleManage: '课程管理',
    scheduleRecommend: '班级课表',
    scheduleEdit: '编辑课程',
    scheduleAdd: '添加课程',
    commonSetting: '设置',
    card: '校园卡',
    librarySearch: '图书馆',
    libraryReaderCenter: '个人中心'
  },

  updateManager: {
    title: '更新提示',
    content: '新版本已经准备好了，是否重启小程序？',
  },

  hello: {
    new: '你好，世界',
    morning: '美好的一天开始啦！',
    afternoon: '下午好',
    evening: '晚上好',
    holiday: '假期快乐！',
  },

  day: {
    monday: '周一',
    Tuesday: '周二',
    Wednesday: '周三',
    Thursday: '周四',
    Friday: '周五',
    Saturday: '周六',
    Sunday: '周日'
  },

  grade: {
    first: '大一',
    second: '大二',
    third: '大三',
    forth: '大四',
    five: '大五'
  },

  term: {
    first: '第一学期',
    last: '第二学期'
  },

  weekType: {
    all: '全周',
    odd: '单周',
    even: '双周'
  },

  tabbarIndex: {
    scheduleCard: {
      title: '我的课表',
      emptyClass: '今天不用上课哦~'
    },
    magicBox: {
      score: '教务成绩',
      recommendSchedule: '班级课表',
      card: '校园卡',
      librarySeach: '图书查询',
      myLibrary: '我的图书馆',
      calendar: '校园日历'
    },
    balanceCard: {
      notConnect: '未连接',
      balance: '校园卡'
    }
  },

  tabbarSchedule: {
    currWeek: '本周',
    holiday: '假期中'
  },

  tabbarMe: {
    bindTip: '请关联相关的账号',
    edu: '教务',
    card: '校园卡',
    library: '图书馆',
    setting: '设置',
    feedback: '反馈',
    about: '关于'
  },
  about: {
    author: '项目作者',
    openSource: '项目开源',
    changeLog: '更新日志',
    thanksList: '鸣谢列表',
    shareApp: '分享小程序',
    devModeTip: [
      '继续点击{{times}}次以进入开发者模式',
      {
        times: 0
      }
    ],
    thanks: {
      speical: '特别鸣谢 SNOOPY',
      taro: '提供 技术框架',
      undraw: '提供 好看的插图',
      remix: '提供 好看的图标',
      snoopy: '提供 相关设计帮助'
    }
  },
  commonSetting: {
    language: {
      title: '应用语言',
      cn: '中文',
      en: 'English',
      system: '自动'
    }
  },
  commonBind: {
    eduTitle: '教务系统登录',
    cardTitle: '校园卡登录',
    idLabel: '账号',
    idPlaceHolder: '请输入账号',
    pwdLabel: '密码',
    eduPwdLabel: '教务密码',
    eduPwdPlaceHolder: '请输入教务系统密码',
    cardPwdLabel: '校园卡密码',
    cardPwdPlaceHolder: '请输入校园卡密码',
    noChangeDetected: '看起来没有改变账号或者密码哦',
    noBindDetect: '检测到账号还未绑定，是否前往绑定',
    qaList: {
      q1: '说明',
      a1: '绑定账号后，修改原有信息重新提交即可更换绑定账号。',
      q2: '隐私',
      a2: '所有账号密码均存储在微信的本地缓存中，服务器只作中转作用。'
    }
  },
  card: {
    title: '校园卡',
    transaction: '消费记录',
    invalidDate: '开始时间不能大于结束时间',
    total: '总计：'
  },
  eduScore: {
    title: '成绩查询',
    all: '所有成绩',
    pickerTitle: '请选择学年学期',
    confirmBtn: '确定',
    emptyTipLeft: '点击',
    emptyTipRight: '分析在校成绩以及学分',
    analysisTitle: '分析模式',
    pass: '及格',
    fail: '不及格',
    total: '总学分',
    acp: '平均学分绩点',
    gpa: 'GPA',
    basic: '基本信息',
    advanced: '得分情况',
    category: '类别分布',
    level: '分数分布',
    credit: '学分',
    point: '绩点',
    searchTitle: [
      '总共 {{scoreLength}} 科',
      {
        scoreLength: 0
      }
    ],
    qaList: {
      q1: '分类规则',
      a1: 'A > 90, 90 < B <= 80, 80 < C <= 70, 70 < D <= 60, E < 60',
    }
  },
  eduSchedule: {
    outOfRange: '已经到头啦~',
    setting: {
      title: '更换课表',
      pickerTitle: '请选择学年学期',
      emptySchedule: '课表为空',
      emptyList: '空空如也',
      recommend: {
        title: '班级课表',
        search: '课表查询'
      }
    },
    manage: {
      mine: '',
      deleteCourse: [
        '你确定要删除这个时间的这个课程{{courseName}}吗？',
        {
          courseName: undefined
        }
      ],
      customize: '自定义'
    },
    advanced: {
      title: '课表设置',
      showNotCurrWeekCourse: '显示非本周课程',
      customBackground: '自定义课表背景',
      chooseImage: '选择图片',
      imageStyle: '图片样式',
      origin: '原始图片',
      blur: '高斯模糊'
    },
    recommend: {
      seeLocalSchedule: '查看已经保存的课表',
      loading: '加载中',
      noData: '没有数据喔',
      grade: ['{{grade}}级', { grade: undefined }],
      pin: '课表钉在了首页',
      unpin: '课表取消钉在首页'
    },
    addCourse: {
      title: '新增课程',
      success: '新增课程成功'
    },
    editCourse: {
      title: '编辑课程',
      courseName: '课程名称',
      teacher: '任课教师',
      location: '上课地点',
      incompleteInformation: '信息输入不完整',
      success: '课程修改成功',
      session: [
        '第 {{session}} 节',
        {
          session: 0
        }
      ],
      week: [
        '第 {{week}} 周',
        {
          week: 0
        }
      ],
      sessions: '节次',
      weeks: '周次',
    }
  },
  librarySearch: {
    title: '图书馆',
    inputLabel: '关键字',
    inputButtonText: '检索',
    inputPlaceholder: '书籍检索',
    noResult: '没有找到相关的书籍',
    noMoreResult: '没有更多的书籍啦！',
    like: '添加到书架',
    dislike: '从书架中移除'
  },

  libraryBook: {
    author: '作者',
    publisher: '出版社',
    publishYear: '出版日期',
    callNo: '索书号',
    remain: '可借',
    canRead: '可阅览',
    total: '馆藏',
    emptyCallNo: '空'
  },

  libraryDetail: {
    title: '书籍信息',
    summaryTitle: '简介',
    summaryEmpty: '豆瓣上暂时没有简介',
    collectionTitle: '馆藏',
    collectionBarCode: '条形码',
    collectionYear: '年卷期',
    collectionState: '状态'
  },

  libraryReaderLogin: {
    title: '图书馆登录',
    idLabel: '账号',
    idPlaceHolder: '请输入账号',
    pwdLabel: '密码',
    pwdPlaceHolder: '请输入密码',
    captchaLabel: '验证码',
    captchaPlaceHolder: '请输入验证码',
    qaList: {
      q1: '提示',
      a1:
        '默认密码一般为 12345678。另外在本小程序登录之前，需要在图书馆官网登录然后进行身份认证，否则本小程序将无法处理登录请求',
      q2: '有效期',
      a2:
        '登录成功后，登录状态的有效期为一个小时。此间任何有关图书馆个人中心的操作都会重置该有效期。',
      q3: '隐私',
      a3:
        '账号密码均储存在微信内部中，但是基于技术实现，服务器会缓存登录成功后的会话一段时间，以用于后续操作。'
    }
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
      historyCheckout: '已还'
    },
    grid: {
      total: '总共借阅',
      current: '当前借阅',
      nearExpire: '即将到期'
    },
    loginStatus: {
      notLogin: '请点击此处登录',
      expired: '登录已过期，请重新登录'
    }
  }
}

export default zh_CN
export type locale = typeof zh_CN
