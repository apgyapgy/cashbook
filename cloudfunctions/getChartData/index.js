// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'test-gp4ml'
  // env:'apgy-876ffd'
});
const db = cloud.database();
const $ = db.command.aggregate;
// 云函数入口函数
exports.main = async (event, context) => {
  const _ = db.command;
  return await db.collection('bookList').aggregate().match({
    openid: event.userInfo.openId,
    amtType: event.amtType,
    bookYear:event.year,
    bookMonth: { $gte: event.beginMonth, $lte: event.endMonth }
  }).group({
    _id: {
      bookTypeName: '$bookTypeName',
      bookTypeIcon: '$bookTypeIcon',
      bookTypeId:'$bookTypeId'
    },
    count: $.sum('$bookAmt')
  }).end();
}