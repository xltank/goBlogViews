const errorCode = {
  1000: {
    message: '设备更换，需要重新登录',
    ps: ''
  },		
  1001: {
    message: 'ip 不合法',
    ps: ''
  },	 	
  1002: {
    message: 'viz 报错',
    ps: ''
  },	
  1003: {
    message: '用户状态不对',
    ps: '具体状态看 status 参数'
  },	
  1004: {
    message: '登录过期',
    ps: ''
  },
  1005: {
    message: '登录设备更换，发送了换设备邮件',
    ps: ''
  },
  1006: {
    message: '邮件里重设密码跳转链接问题',
    ps: '不是系统生成的'
  },
  1007: {
    message: '验证码和邮件的不一致',
    ps: '',
    lang: 'login.noSameVerificationCode'
  },
  1008: {
    message: '密码修改错误',
    ps: '旧密码不对'
  },
  1009: {
    message: '没有用户信息',
    ps: '',
    lang: 'login.infoIncorrect'
  },
  1010: {
    message: '邮件已被使用',
    ps: '邮件状态不是pending',
    lang: 'login.mailUse'
  },
  1011: {
    message: '组不为空',
    ps: '组不为空',
  },
  1012: {
    message: '邮件发送失败',
    ps: '邮件系统问题',
    lang: 'serverError.emailSendFail'
  },
  1013: {
    message: '账号密码错误',
    ps: '账号密码错误',
  },
  1014: {
    message: '解冻邮件已经发送',
    ps: '解冻邮件已经发送',
  },
  1015: {
    message: '重复批量创建',
    ps: '重复批量创建',
	lang: 'serverError.createRepeat'
  },
  1016: {
    message: '没有可创建的用户数据',
    ps: '没有可创建的用户数据',
	lang: 'serverError.noCreateUser'
  },
  2000: {
    message: '服务器错误，请稍后再试',
    ps: '',
    lang: 'serverError.server'
  },
  2001: {
    message: '邮件不存在',
    ps: '',
    lang: 'serverError.emailNotFound'
  },
  2002: {
    message: '链接已过期，请重新发送邮件',
    ps: '',
    lang: 'serverError.emailLinkExpired'
  },
  2003: {
    message: '链接已过期，请重新发送邮件',
    ps: '',
    lang: 'serverError.verificationCode'
  },
  2004: {
    message: '新密码不能与前五个旧密码相同',
    ps: '',
    lang: 'login.noOldSamePass'
  },
  2005: {
    message: '看板名重复',
    ps: '',
    lang: ''
  },
};

// 后台需要的四个模块名
const module = {
  DESIGN: 'DESIGN',
  COMMUNICATION: 'COMMUNICATION',
  MARKET_TREND: 'MARKET',
  PRODUCT: 'PRODUCT'
};

const HEARTBEAT = 1000 * 60

const WIDGETS = [];

export default {
  errorCode, module, WIDGETS, HEARTBEAT
}
