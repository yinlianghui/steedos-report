const utils = require('./utils');
const request = require('graphql-request').request;
import packageJSON from '../package.json';

let reporter = {
  async getReport(id) {
    let object = utils.getObject('reports');
    let report = await object.findOne(id);
    return report;
  },
  async getData(report) {
    if (report.graphql) {
      let proxy = packageJSON.proxy ? packageJSON.proxy : "";
      let url = `${proxy}/graphql/default`;
      let dataResult = await request(url, report.graphql);
      let items = dataResult[`${report.object_name}`];
      if (items && items.length) {
        let processChildren = (item, parentKey, object) => {
          /**
            把{
              "object_name": [{
                "_id": "R9HquKmR5fHbDqdWq",
                "name": "测试1",
                "organization": {
                  "_id": "P7XMJMjKoSz4yaK49",
                  "name": "组织A"
                }
              }]
            }
            中的organization转成 "organization._id", "organization.name"，
            转换后结果： {
              "object_name": [{
                "_id": "R9HquKmR5fHbDqdWq",
                "name": "测试1",
                "organization": {
                  "_id": "P7XMJMjKoSz4yaK49",
                  "name": "组织A"
                },
                "organization._id": "P7XMJMjKoSz4yaK49",
                "organization.name": "组织A"
              }]
            }
            支持无限层递归
            */
          for(let k in object){
            let childKey = `${parentKey}.${k}`;
            let childValue = object[k];
            if (typeof childValue === "object") {
              processChildren(item, childKey, childValue);
            }
            else{
              item[childKey] = childValue;
            }
          }
        }
        items.forEach((item) => {
          for (let k in item) {
            if (typeof item[k] === "object") {
              processChildren(item, k, item[k]);
            }
          }
        });
      }
      return dataResult;
    }
    else {
      let object = utils.getObject(report.object_name);
      let dataResult = await object.find({
        fields: report.fields,
        filters: report.filters
      });
      let result = {};
      result[`${report.object_name}`] = dataResult;
      return result;
    }
  }
};

module.exports = reporter;
