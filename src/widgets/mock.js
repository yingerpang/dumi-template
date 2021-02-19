const province = {
  data: [
    {
      detaile: '北京市',
      parentId: 'CN',
      regionCode: '11',
      regionId: '11',
      regionName: '北京市',
    },
    {
      detaile: '天津市',
      parentId: 'CN',
      regionCode: '12',
      regionId: '12',
      regionName: '天津市',
    },
    {
      detaile: '河北省',
      parentId: 'CN',
      regionCode: '13',
      regionId: '13',
      regionName: '河北省',
    },
    {
      detaile: '山西省',
      parentId: 'CN',
      regionCode: '14',
      regionId: '14',
      regionName: '山西省',
    },
    {
      detaile: '内蒙古自治区',
      parentId: 'CN',
      regionCode: '15',
      regionId: '15',
      regionName: '内蒙古自治区',
    },
  ],
  errCode: 0,
  errMsg: '成功',
};
const city = [
  {
    parentId: 11,
    data: [
      {
        detaile: '北京市市辖区',
        parentId: '11',
        regionCode: '01',
        regionId: '1101',
        regionName: '北京市市辖区',
      },
      {
        detaile: '北京市区县',
        parentId: '11',
        regionCode: '02',
        regionId: '1102',
        regionName: '北京市区县',
      },
    ],
  },
  {
    parentId: 12,
    data: [
      {
        detaile: '天津市天津市市辖区',
        parentId: '12',
        regionCode: '01',
        regionId: '1201',
        regionName: '天津市市辖区',
      },
      {
        detaile: '天津市天津市区县',
        parentId: '12',
        regionCode: '02',
        regionId: '1202',
        regionName: '天津市区县',
      },
    ],
  },
  {
    parentId: 13,
    data: [
      {
        detaile: '河北省石家庄市',
        parentId: '13',
        regionCode: '01',
        regionId: '1301',
        regionName: '石家庄市',
      },
      {
        detaile: '河北省唐山市',
        parentId: '13',
        regionCode: '02',
        regionId: '1302',
        regionName: '唐山市',
      },
      {
        detaile: '河北省秦皇岛市',
        parentId: '13',
        regionCode: '03',
        regionId: '1303',
        regionName: '秦皇岛市',
      },
      {
        detaile: '河北省邯郸市',
        parentId: '13',
        regionCode: '04',
        regionId: '1304',
        regionName: '邯郸市',
      },
      {
        detaile: '河北省邢台市',
        parentId: '13',
        regionCode: '05',
        regionId: '1305',
        regionName: '邢台市',
      },
      {
        detaile: '河北省保定市',
        parentId: '13',
        regionCode: '06',
        regionId: '1306',
        regionName: '保定市',
      },
      {
        detaile: '河北省张家口市',
        parentId: '13',
        regionCode: '07',
        regionId: '1307',
        regionName: '张家口市',
      },
      {
        detaile: '河北省承德市',
        parentId: '13',
        regionCode: '08',
        regionId: '1308',
        regionName: '承德市',
      },
      {
        detaile: '河北省沧州市',
        parentId: '13',
        regionCode: '09',
        regionId: '1309',
        regionName: '沧州市',
      },
      {
        detaile: '河北省廊坊市',
        parentId: '13',
        regionCode: '10',
        regionId: '1310',
        regionName: '廊坊市',
      },
      {
        detaile: '河北省衡水市',
        parentId: '13',
        regionCode: '11',
        regionId: '1311',
        regionName: '衡水市',
      },
    ],
  },
  {
    parentId: 14,
    data: [
      {
        detaile: '山西省太原市',
        parentId: '14',
        regionCode: '01',
        regionId: '1401',
        regionName: '太原市',
      },
      {
        detaile: '山西省大同市',
        parentId: '14',
        regionCode: '02',
        regionId: '1402',
        regionName: '大同市',
      },
      {
        detaile: '山西省阳泉市',
        parentId: '14',
        regionCode: '03',
        regionId: '1403',
        regionName: '阳泉市',
      },
      {
        detaile: '山西省长治市',
        parentId: '14',
        regionCode: '04',
        regionId: '1404',
        regionName: '长治市',
      },
      {
        detaile: '山西省晋城市',
        parentId: '14',
        regionCode: '05',
        regionId: '1405',
        regionName: '晋城市',
      },
      {
        detaile: '山西省朔州市',
        parentId: '14',
        regionCode: '06',
        regionId: '1406',
        regionName: '朔州市',
      },
      {
        detaile: '山西省晋中市',
        parentId: '14',
        regionCode: '07',
        regionId: '1407',
        regionName: '晋中市',
      },
      {
        detaile: '山西省运城市',
        parentId: '14',
        regionCode: '08',
        regionId: '1408',
        regionName: '运城市',
      },
      {
        detaile: '山西省忻州市',
        parentId: '14',
        regionCode: '09',
        regionId: '1409',
        regionName: '忻州市',
      },
      {
        detaile: '山西省临汾市',
        parentId: '14',
        regionCode: '10',
        regionId: '1410',
        regionName: '临汾市',
      },
      {
        detaile: '山西省吕梁市',
        parentId: '14',
        regionCode: '11',
        regionId: '1411',
        regionName: '吕梁市',
      },
    ],
  },
];

const area = [
  {
    parentId: 1101,
    data: [
      {
        detaile: '北京市市辖区东城区',
        parentId: '1101',
        regionCode: '01',
        regionId: '110101',
        regionName: '东城区',
      },
      {
        detaile: '北京市市辖区西城区',
        parentId: '1101',
        regionCode: '02',
        regionId: '110102',
        regionName: '西城区',
      },
      {
        detaile: '北京市市辖区崇文区',
        parentId: '1101',
        regionCode: '03',
        regionId: '110103',
        regionName: '崇文区',
      },
      {
        detaile: '北京市市辖区宣武区',
        parentId: '1101',
        regionCode: '04',
        regionId: '110104',
        regionName: '宣武区',
      },
      {
        detaile: '北京市市辖区朝阳区',
        parentId: '1101',
        regionCode: '05',
        regionId: '110105',
        regionName: '朝阳区',
      },
      {
        detaile: '北京市市辖区丰台区',
        parentId: '1101',
        regionCode: '06',
        regionId: '110106',
        regionName: '丰台区',
      },
      {
        detaile: '北京市市辖区石景山区',
        parentId: '1101',
        regionCode: '07',
        regionId: '110107',
        regionName: '石景山区',
      },
      {
        detaile: '北京市市辖区海淀区',
        parentId: '1101',
        regionCode: '08',
        regionId: '110108',
        regionName: '海淀区',
      },
      {
        detaile: '北京市市辖区门头沟区',
        parentId: '1101',
        regionCode: '09',
        regionId: '110109',
        regionName: '门头沟区',
      },
      {
        detaile: '北京市市辖区房山区',
        parentId: '1101',
        regionCode: '11',
        regionId: '110111',
        regionName: '房山区',
      },
      {
        detaile: '北京市市辖区通州区',
        parentId: '1101',
        regionCode: '12',
        regionId: '110112',
        regionName: '通州区',
      },
      {
        detaile: '北京市市辖区顺义区',
        parentId: '1101',
        regionCode: '13',
        regionId: '110113',
        regionName: '顺义区',
      },
      {
        detaile: '北京市市辖区昌平区',
        parentId: '1101',
        regionCode: '14',
        regionId: '110114',
        regionName: '昌平区',
      },
      {
        detaile: '北京市市辖区大兴区',
        parentId: '1101',
        regionCode: '15',
        regionId: '110115',
        regionName: '大兴区',
      },
      {
        detaile: '北京市市辖区怀柔区',
        parentId: '1101',
        regionCode: '16',
        regionId: '110116',
        regionName: '怀柔区',
      },
      {
        detaile: '北京市市辖区平谷区',
        parentId: '1101',
        regionCode: '17',
        regionId: '110117',
        regionName: '平谷区',
      },
    ],
  },
  {
    parentId: 1202,
    data: [
      {
        detaile: '天津市宁河县',
        parentId: '1202',
        regionCode: '21',
        regionId: '120221',
        regionName: '宁河县',
      },
      {
        detaile: '天津市静海县',
        parentId: '1202',
        regionCode: '23',
        regionId: '120223',
        regionName: '静海县',
      },
      {
        detaile: '天津市蓟县',
        parentId: '1202',
        regionCode: '25',
        regionId: '120225',
        regionName: '蓟县',
      },
    ],
  },
  {
    parentId: 1301,
    data: [
      {
        detaile: '河北省石家庄市市辖区',
        parentId: '1301',
        regionCode: '01',
        regionId: '130101',
        regionName: '市辖区',
      },
      {
        detaile: '河北省石家庄市长安区',
        parentId: '1301',
        regionCode: '02',
        regionId: '130102',
        regionName: '长安区',
      },
      {
        detaile: '河北省石家庄市桥东区',
        parentId: '1301',
        regionCode: '03',
        regionId: '130103',
        regionName: '桥东区',
      },
      {
        detaile: '河北省石家庄市桥西区',
        parentId: '1301',
        regionCode: '04',
        regionId: '130104',
        regionName: '桥西区',
      },
      {
        detaile: '河北省石家庄市新华区',
        parentId: '1301',
        regionCode: '05',
        regionId: '130105',
        regionName: '新华区',
      },
      {
        detaile: '河北省石家庄市井陉矿区',
        parentId: '1301',
        regionCode: '07',
        regionId: '130107',
        regionName: '井陉矿区',
      },
      {
        detaile: '河北省石家庄市裕华区',
        parentId: '1301',
        regionCode: '08',
        regionId: '130108',
        regionName: '裕华区',
      },
      {
        detaile: '河北省石家庄市井陉县',
        parentId: '1301',
        regionCode: '21',
        regionId: '130121',
        regionName: '井陉县',
      },
      {
        detaile: '河北省石家庄市正定县',
        parentId: '1301',
        regionCode: '23',
        regionId: '130123',
        regionName: '正定县',
      },
      {
        detaile: '河北省石家庄市栾城县',
        parentId: '1301',
        regionCode: '24',
        regionId: '130124',
        regionName: '栾城县',
      },
      {
        detaile: '河北省石家庄市行唐县',
        parentId: '1301',
        regionCode: '25',
        regionId: '130125',
        regionName: '行唐县',
      },
      {
        detaile: '河北省石家庄市灵寿县',
        parentId: '1301',
        regionCode: '26',
        regionId: '130126',
        regionName: '灵寿县',
      },
      {
        detaile: '河北省石家庄市高邑县',
        parentId: '1301',
        regionCode: '27',
        regionId: '130127',
        regionName: '高邑县',
      },
      {
        detaile: '河北省石家庄市深泽县',
        parentId: '1301',
        regionCode: '28',
        regionId: '130128',
        regionName: '深泽县',
      },
      {
        detaile: '河北省石家庄市赞皇县',
        parentId: '1301',
        regionCode: '29',
        regionId: '130129',
        regionName: '赞皇县',
      },
      {
        detaile: '河北省石家庄市无极县',
        parentId: '1301',
        regionCode: '30',
        regionId: '130130',
        regionName: '无极县',
      },
      {
        detaile: '河北省石家庄市平山县',
        parentId: '1301',
        regionCode: '31',
        regionId: '130131',
        regionName: '平山县',
      },
      {
        detaile: '河北省石家庄市元氏县',
        parentId: '1301',
        regionCode: '32',
        regionId: '130132',
        regionName: '元氏县',
      },
      {
        detaile: '河北省石家庄市赵县',
        parentId: '1301',
        regionCode: '33',
        regionId: '130133',
        regionName: '赵县',
      },
      {
        detaile: '河北省石家庄市辛集市',
        parentId: '1301',
        regionCode: '81',
        regionId: '130181',
        regionName: '辛集市',
      },
      {
        detaile: '河北省石家庄市藁城市',
        parentId: '1301',
        regionCode: '82',
        regionId: '130182',
        regionName: '藁城市',
      },
      {
        detaile: '河北省石家庄市晋州市',
        parentId: '1301',
        regionCode: '83',
        regionId: '130183',
        regionName: '晋州市',
      },
      {
        detaile: '河北省石家庄市新乐市',
        parentId: '1301',
        regionCode: '84',
        regionId: '130184',
        regionName: '新乐市',
      },
      {
        detaile: '河北省石家庄市鹿泉市',
        parentId: '1301',
        regionCode: '85',
        regionId: '130185',
        regionName: '鹿泉市',
      },
    ],
  },
  {
    parentId: 1401,
    data: [
      {
        detaile: '山西省太原市市辖区',
        parentId: '1401',
        regionCode: '01',
        regionId: '140101',
        regionName: '市辖区',
      },
      {
        detaile: '山西省太原市小店区',
        parentId: '1401',
        regionCode: '05',
        regionId: '140105',
        regionName: '小店区',
      },
      {
        detaile: '山西省太原市迎泽区',
        parentId: '1401',
        regionCode: '06',
        regionId: '140106',
        regionName: '迎泽区',
      },
      {
        detaile: '山西省太原市杏花岭区',
        parentId: '1401',
        regionCode: '07',
        regionId: '140107',
        regionName: '杏花岭区',
      },
      {
        detaile: '山西省太原市尖草坪区',
        parentId: '1401',
        regionCode: '08',
        regionId: '140108',
        regionName: '尖草坪区',
      },
      {
        detaile: '山西省太原市万柏林区',
        parentId: '1401',
        regionCode: '09',
        regionId: '140109',
        regionName: '万柏林区',
      },
      {
        detaile: '山西省太原市晋源区',
        parentId: '1401',
        regionCode: '10',
        regionId: '140110',
        regionName: '晋源区',
      },
      {
        detaile: '山西省太原市清徐县',
        parentId: '1401',
        regionCode: '21',
        regionId: '140121',
        regionName: '清徐县',
      },
      {
        detaile: '山西省太原市阳曲县',
        parentId: '1401',
        regionCode: '22',
        regionId: '140122',
        regionName: '阳曲县',
      },
      {
        detaile: '山西省太原市娄烦县',
        parentId: '1401',
        regionCode: '23',
        regionId: '140123',
        regionName: '娄烦县',
      },
      {
        detaile: '山西省太原市古交市',
        parentId: '1401',
        regionCode: '81',
        regionId: '140181',
        regionName: '古交市',
      },
    ],
  },
  {
    parentId: 1302,
    data: [
      {
        detaile: '河北省唐山市市辖区',
        parentId: '1302',
        regionCode: '01',
        regionId: '130201',
        regionName: '市辖区',
      },
      {
        detaile: '河北省唐山市路南区',
        parentId: '1302',
        regionCode: '02',
        regionId: '130202',
        regionName: '路南区',
      },
      {
        detaile: '河北省唐山市路北区',
        parentId: '1302',
        regionCode: '03',
        regionId: '130203',
        regionName: '路北区',
      },
      {
        detaile: '河北省唐山市古冶区',
        parentId: '1302',
        regionCode: '04',
        regionId: '130204',
        regionName: '古冶区',
      },
      {
        detaile: '河北省唐山市开平区',
        parentId: '1302',
        regionCode: '05',
        regionId: '130205',
        regionName: '开平区',
      },
      {
        detaile: '河北省唐山市丰南区',
        parentId: '1302',
        regionCode: '07',
        regionId: '130207',
        regionName: '丰南区',
      },
      {
        detaile: '河北省唐山市丰润区',
        parentId: '1302',
        regionCode: '08',
        regionId: '130208',
        regionName: '丰润区',
      },
      {
        detaile: '河北省唐山市滦县',
        parentId: '1302',
        regionCode: '23',
        regionId: '130223',
        regionName: '滦县',
      },
      {
        detaile: '河北省唐山市滦南县',
        parentId: '1302',
        regionCode: '24',
        regionId: '130224',
        regionName: '滦南县',
      },
      {
        detaile: '河北省唐山市乐亭县',
        parentId: '1302',
        regionCode: '25',
        regionId: '130225',
        regionName: '乐亭县',
      },
      {
        detaile: '河北省唐山市迁西县',
        parentId: '1302',
        regionCode: '27',
        regionId: '130227',
        regionName: '迁西县',
      },
      {
        detaile: '河北省唐山市玉田县',
        parentId: '1302',
        regionCode: '29',
        regionId: '130229',
        regionName: '玉田县',
      },
      {
        detaile: '河北省唐山市唐海县',
        parentId: '1302',
        regionCode: '30',
        regionId: '130230',
        regionName: '唐海县',
      },
      {
        detaile: '河北省唐山市遵化市',
        parentId: '1302',
        regionCode: '81',
        regionId: '130281',
        regionName: '遵化市',
      },
      {
        detaile: '河北省唐山市迁安市',
        parentId: '1302',
        regionCode: '83',
        regionId: '130283',
        regionName: '迁安市',
      },
    ],
  },
];

export const loadProvince = () => {
  return new Promise(function(resolve, reject) {
    // 一段耗时的异步操作
    const { data } = province;
    const provinceEnums = [],
      provinceEnumNames = [];
    data.map((item, key) => {
      provinceEnums.push(item.regionId + '_' + item.regionName);
      provinceEnumNames.push(item.regionName);
    });
    resolve({
      provinceEnums,
      provinceEnumNames,
    }); // 数据处理完成
    // reject('失败') // 数据处理出错
  });
};
export const loadCity = params => {
  return new Promise(function(resolve, reject) {
    // 一段耗时的异步操作
    const cityEnums = [],
      cityEnumNames = [];
    let result = [];
    city.filter(item => {
      if (item.parentId == params.val) {
        result = item.data;
      }
    });
    result.map((item, key) => {
      cityEnums.push(item.regionId + '_' + item.regionName);
      cityEnumNames.push(item.regionName);
    });
    resolve({
      cityEnums,
      cityEnumNames,
    }); // 数据处理完成
    // reject('失败') // 数据处理出错
  });
};

export const loadArea = params => {
  return new Promise(function(resolve, reject) {
    // 一段耗时的异步操作
    const areaEnums = [],
      areaEnumNames = [];
    let result = [];
    area.filter(item => {
      if (item.parentId == params.val) {
        result = item.data;
      }
    });
    result.map((item, key) => {
      areaEnums.push(item.regionId + '_' + item.regionName);
      areaEnumNames.push(item.regionName);
    });
    resolve({
      areaEnums,
      areaEnumNames,
    }); // 数据处理完成
    // reject('失败') // 数据处理出错
  });
};
