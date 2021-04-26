import CryptoJS from 'crypto-js/crypto-js'

// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse('daoye12300000000') //""中与后台一样  密码

/**
 * AES加密
 */
export function Encrypt(word, keyStr, type) {
  if (!word) return ''
  let key = KEY
  if (keyStr) {
    for (var i = 0; keyStr.length < 16; i++) {
      keyStr = keyStr + '0'
    }
    key = CryptoJS.enc.Utf8.parse(keyStr)
  }

  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  if (type === 'base64') {
    return encrypted.toString() // 返回Base64编码
  }
  return encrypted.ciphertext.toString().toUpperCase()
}

/**
 * AES 解密
 *
 */
export function Decrypt(word, keyStr, type) {
  if (!word) return ''
  let key = KEY
  if (keyStr) {
    for (var i = 0; keyStr.length < 16; i++) {
      keyStr = keyStr + '0'
    }
    key = CryptoJS.enc.Utf8.parse(keyStr)
  }
  let srcs
  if (type === 'base64') {
    srcs = word
  } else {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
    srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  }

  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
