import client from './client'

// 上传文件
export function upload(filePath: string, file: File) {
  if (!filePath.endsWith('/'))
    filePath = `${filePath}/`
  return new Promise((resolve, reject) => {
    // 上传OSS
    try {
    // 随机命名
      const random_name
      = `${filePath
      + random_string(6)
      }_${
      Date.now()
      }.${
      file.name ? file.name.split('.').pop() : '_null.png'}`
      // 上传文件
      client.put(random_name, file).then((result) => {
        resolve(result)
      })
    }
    catch (error) {
      console.error(error)
      // eslint-disable-next-line no-console
      console.log('上传失败')
      reject(error)
    }
  })
}

// 随机生成文件名
function random_string(len = 32) {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz12345678'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < len; i++)
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  return pwd
}
