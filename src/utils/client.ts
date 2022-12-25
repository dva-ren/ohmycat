// const path = require('path')
import OSS from 'ali-oss'
const client = new OSS({
  // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-chengdu',
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: 'LTAI5tGNXR8DkxvvyP5YxUWx',
  accessKeySecret: 'pdx41W5pYQfT80bg6BR0615NxI5Oww',
  // 填写Bucket名称。
  bucket: 'iiu',
})

// async function put() {
//   try {
//     // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
//     // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
//     const result = await client.put('exampleobject.txt', path.normalize('D:\\localpath\\examplefile.txt'))
//     console.log(result)
//   }
//   catch (e) {
//     console.log(e)
//   }
// }
export default client
