const en_US = {
  app: '测试环境',
  appName: 'JZ Assistant Lite',

  wrongInputTip: 'Please check your input',
  modalHelpTitle: 'Help',
  modalDefaultTitle: 'Tip',

  saveSuccess: 'Save successfully',
  saveFail: 'Failed to save',

  confirm: 'Confirm',
  cancel: 'Cancel',
  loading: 'Loading...',
  search: 'Search',

  guide: 'Welcome! Tap here to get your schedule or others~',

  changeLog: 'Version 1.0.0 Launches',

  clearStorage: 'Sure to clear storage?',

  shareTitle: `Let's go see the sea together~ `,

  unmaintained: 'Unmaintained and Suspended for use',

  serverErrorText: 'Something wrong happended. Try again later~',

  sessionExpiredServer: 'Please login again',

  networkTimeout: 'Request timeout',

  feedback: {
    or: 'OR',
    contact: 'Contact',
    feedback: 'Feedback',
    clear: 'Clear Storage'
  },

  tabbar: {
    time: 'Time',
    schedule: 'Schedule',
    me: 'Me'
  },

  route: {
    scheduleSetting: 'Change Schedule',
    scheduleAdvanced: 'Advanced Schedule',
    scheduleManage: 'Manage Course',
    scheduleRecommend: 'Class Schedule',
    scheduleEdit: 'Edit Course',
    scheduleAdd: 'Add Course',
    commonSetting: 'Setting',
    card: 'Campus Card',
    librarySearch: 'Library',
    libraryReaderCenter: 'Reader Center'
  },

  updateManager: {
    title: 'Update Notice',
    content: 'New version is ready, sure to restart now?',
  },

  hello: {
    new: 'Hello, World',
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: `It's night`,
    holiday: 'Happy Holiday!',
  },

  day: {
    monday: 'Mon.',
    Tuesday: 'Tue.',
    Wednesday: 'Wed.',
    Thursday: 'Thu.',
    Friday: 'Fri.',
    Saturday: 'Sat.',
    Sunday: 'Sun.'
  },

  grade: {
    first: 'First Year',
    second: 'Second Year',
    third: 'Third Year',
    forth: 'Fourth Year',
    five: 'Five Year'
  },

  term: {
    first: 'First Term',
    last: 'Last Term'
  },

  weekType: {
    all: 'All Weeks',
    odd: 'Odd Weeks',
    even: 'Even Weeks'
  },

  tabbarIndex: {
    scheduleCard: {
      title: 'My Schedule',
      emptyClass: 'No course today~'
    },
    magicBox: {
      score: 'Score',
      recommendSchedule: 'Class Schedule',
      card: 'eCard',
      librarySeach: 'Book Search',
      myLibrary: 'My Library',
      calendar: 'Calendar'
    },
    balanceCard: {
      notConnect: 'No Binding',
      balance: 'Balance'
    }
  },

  tabbarSchedule: {
    currWeek: 'Current',
    holiday: 'On Holiday'
  },

  tabbarMe: {
    bindTip: 'Please bind the account',
    edu: 'Edu',
    card: 'eCard',
    library: 'Library',
    setting: 'Setting',
    feedback: 'Feedback',
    about: 'About'
  },
  about: {
    author: 'App Author',
    openSource: 'Open Source',
    changeLog: 'Change Log',
    thanksList: 'Thanks List',
    shareApp: 'Share With Your Friends',
    devModeTip: [
      '{{times}} more taps to enter dev mode',
      {
        times: 0
      }
    ],
    thanks: {
      speical: 'Big Thanks To SNOOPY',
      taro: 'Providing Cool Framework',
      undraw: 'Providing Cool Drawing',
      remix: 'Providing Cool Icon',
      snoopy: 'Providing Design Help'
    }
  },
  commonSetting: {
    language: {
      title: 'App Language',
      cn: '中文',
      en: 'English',
      system: 'Auto'
    }
  },
  commonBind: {
    eduTitle: 'Edu Login',
    cardTitle: 'Card Login',
    idLabel: 'Account',
    idPlaceHolder: 'Please input account',
    pwdLabel: 'Password',
    eduPwdLabel: 'Edu Password',
    eduPwdPlaceHolder: 'Please input edu password',
    cardPwdLabel: 'Card Password',
    cardPwdPlaceHolder: 'Please input card password',
    noChangeDetected: 'It seems nothing changed',
    noBindDetect: `Do you want to bind account because you haven't bind yet?`,
    qaList: {
      q1: 'Tip',
      a1: 'Modify origin information and submit if you want to change account.',
      q2: 'Privacy',
      a2: 'All your data are stored in Wechat Local Storage.'
    }
  },
  card: {
    title: 'Card',
    transaction: 'Transaction',
    invalidDate: 'Start time should be ealier than end time',
    total: 'Total: '
  },
  eduScore: {
    title: 'Score',
    all: 'ALL THE SCORES',
    pickerTitle: 'Please Select',
    confirmBtn: 'Confirm',
    emptyTipLeft: 'Click',
    emptyTipRight: 'To analyze all the scores and credits',
    analysisTitle: 'Analysis Mode',
    pass: 'Pass',
    fail: 'Fail',
    total: 'Total Credits',
    acp: 'Avg. Credit Point',
    gpa: 'GPA',
    basic: 'Basic',
    advanced: 'Advanced',
    category: 'Category',
    level: 'Level',
    qaList: {
      q1: 'Rules',
      a1: 'A > 90, 90 < B <= 80, 80 < C <= 70, 70 < D <= 60, E < 60',
    }
  },
  eduSchedule: {
    setting: {
      title: 'Change Schedule',
      pickerTitle: 'Please Select',
      emptySchedule: 'No course in schedule',
      emptyList: 'Nothing Here',
      recommend: {
        title: 'Class Schedule',
        search: 'Search'
      }
    },
    manage: {
      mine: '',
      deleteCourse: [
        'Do you want to delete {{courseName}} on this day?',
        {
          courseName: undefined
        }
      ],
      customize: 'Custom'
    },
    advanced: {
      title: 'Advanced Schedule',
      showNotCurrWeekCourse: 'Display Courses of Other Weeks',
      customBackground: 'Custom Schedule Background',
      chooseImage: 'Choose Image',
      imageStyle: 'Image Type',
      origin: 'Origin',
      blur: 'Blur'
    },
    recommend: {
      seeLocalSchedule: 'View Local Class Schedule',
      loading: 'Loading',
      noData: 'No data',
      grade: ['{{grade}}', { grade: undefined }],
      pin: 'The schedule is pined on Time now',
      unpin: 'The schedule is not pined now'
    },
    addCourse: {
      title: 'New Course',
      success: 'The course has been added to schedule.'
    },
    editCourse: {
      title: 'Edit Course',
      courseName: 'Course Name',
      teacher: 'Teacher',
      location: 'Location',
      incompleteInformation: 'Information incomplete',
      success: 'The information has been modified.',
      session: [
        ' Session {{session}}',
        {
          session: 0
        }
      ],
      week: [
        'Week {{week}}',
        {
          week: 0
        }
      ],
      sessions: 'Sessions',
      weeks: 'Weeks',
    }
  },
  librarySearch: {
    title: '图书馆',
    inputLabel: '关键字',
    inputButtonText: '检索',
    inputPlaceholder: 'Keyword',
    noResult: 'No related book!',
    noMoreResult: 'No more books!',
    like: 'Add to Book Shelf',
    dislike: 'Remove from Book Shelf'
  },

  libraryBook: {
    author: 'Author',
    publisher: 'Publisher',
    publishYear: 'Publish Date',
    callNo: 'Call No.',
    remain: 'Lendable',
    canRead: 'Readable',
    total: 'Collection',
    emptyCallNo: 'None'
  },

  libraryDetail: {
    title: '书籍信息',
    summaryTitle: '简介',
    summaryEmpty: '豆瓣上暂时没有简介',
    collectionTitle: 'Collection',
    collectionBarCode: 'Bar Code',
    collectionYear: 'Annual Volume',
    collectionState: 'Status'
  },

  libraryReaderLogin: {
    title: 'Reader Login',
    idLabel: 'Account',
    idPlaceHolder: 'Input account',
    pwdLabel: 'Password',
    pwdPlaceHolder: 'Input Password',
    captchaLabel: 'Captcha',
    captchaPlaceHolder: 'Input Captcha',
    qaList: {
      q1: 'Tip',
      a1:
        'Default Password is set to 12345678。Auth verification is necessary on official OPAC site before using the app.',
      q2: 'Validation',
      a2:
        'Login session validate in one hour and any operation related would update the expired time.',
      q3: 'Privacy',
      a3:
        'All your data are stored in Wechat Local Storage but session will stored in server for a while based on the code.'
    }
  },

  libraryReaderCenter: {
    title: 'OPAC',
    emptyCheckoutTip: 'No Record! Get some books read',
    lendAt: 'Lend at',
    returnAt: 'Return at',
    shouldReturnAt: 'Should Return at',
    tab: {
      bookshelf: 'Shelf',
      currentCheckout: 'Current',
      historyCheckout: 'History'
    },
    grid: {
      total: 'Total',
      current: 'Loan',
      nearExpire: 'Expiring'
    },
    loginStatus: {
      notLogin: 'Tap here to login',
      expired: 'Status has expired, please login again'
    }
  }
}

export default en_US
export type locale = typeof en_US
