enum DEV_TYPE {
  DEV = "dev",
  MOCK = "mock",
  PROD = "prod", 
}

const devType = DEV_TYPE.PROD

const domain = {
  dev: 'http://127.0.0.1:1080',
  mock: "http://api.mock.com",
  prod: 'https://jza.bythesea.cn'
}

const apiBaseUrl = {
  dev: domain['dev'],
  mock: domain['mock'],
  prod: `${domain['prod']}/api`
}

const shareImageUrl = `${domain['prod']}/images/shareImage.png`

export default {
  devType,
  DEV_TYPE,
  domain,
  apiBaseUrl,
  shareImageUrl,
}