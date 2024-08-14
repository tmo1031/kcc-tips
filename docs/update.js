google.charts.load('current', { packages: ['corechart'] });// Google Charts APIの読み込み
// ヘルパー関数
const min = (a, b) => Math.min(a, b);
const max = (a, b) => Math.max(a, b);
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

const decisions = {
  arts:       { major: '総', minor: '3分',  id: 1, total: 0, text: 0, school: 0, media: 0,  graduate: 32, entry: 28, prog: 0 },
  arts1:      { major: '総', minor: '人文', id: 2, total: 0, text: 0, school: 0, media: 0,  graduate: 6, prog: 0, subjNum: 0, subjNumReq: 2 },
  arts2:      { major: '総', minor: '社会', id: 3, total: 0, text: 0, school: 0, media: 0,  graduate: 6, prog: 0, subjNum: 0, subjNumReq: 2 },
  arts3:      { major: '総', minor: '科学', id: 4, total: 0, text: 0, school: 0, media: 0,  graduate: 6, prog: 0, subjNum: 0, subjNumReq: 2 },
  statT:      { major: '総', minor: '統計T',id: 5, total: 0,                                graduate: 0, prog: 0 },
  artsT:      { major: '総', minor: '3分T', id: 6, total: 0,                                graduate: 24, entry: 18, prog: 0 },
  fl1:        { major: '総', minor: '外語', id: 7, total: 0, text: 0, school: 0, media: 0,  graduate: 8, entry: 6, prog: 0 },
  liberal:    { major: '総', minor: '計',   id: 8, total: 0, text: 0, school: 0, media: 0,  graduate: 48, entry: 36, approve: 48, submit: 48, prog: 0 },
  required:   { major: '専', minor: '必修', id: 9, total: 0, text: 0, school: 0, media: 0,  graduate: 0, approve: 10, prog: 0 },
  elective1:  { major: '専', minor: '選必', id: 10, total: 0, text: 0, school: 0, media: 0, graduate: 0, prog: 0 },
  specialT:   { major: '専', minor: '通信', id: 11, total: 0,                               graduate: 40, prog: 0 },
  special:    { major: '専', minor: '計',   id: 12, total: 0, text: 0, school: 0, media: 0, graduate: 68, entry: 7, approve: 35, submit: 60, prog: 0 },
  text:       { major: '計', minor: '通信', id: 13, total: 0,                               graduate: 70, prog: 0 },
  school:     { major: '計', minor: 'スク', id: 14, total: 0,                               graduate: 30, submit: 15, prog: 0 },
  thesis:     { major: '論', minor: '卒論', id: 15, total: 0, text: 0, school: 0, media: 0, graduate: 8, prog: 0 },
  otherArts:  { major: '総', minor: '他',   id: 16, total: 0, text: 0, school: 0, media: 0 },
  fl2:        { major: '総', minor: '他語', id: 17, total: 0, text: 0, school: 0, media: 0 },
  sports:     { major: '総', minor: '保体', id: 18, total: 0, text: 0, school: 0, media: 0 },
  elective2:  { major: '専', minor: '選択', id: 19, total: 0, text: 0, school: 0, media: 0 },
  total:      { major: '計', minor: '計',   id: 20, total: 0, text: 0, school: 0, media: 0, graduate: 124, prog: 0 },
  apply:      { major: '総', minor: '認定', id: 21, total: 0, text: 0 },
  free:       { major: '計', minor: '任意', id: 22, total: 0, text: 0, school: 0, media: 0, graduate: 16, prog: 0 },
};

const allUnits = [
  'apply', 'arts1Done', 'arts2Done', 'arts3Done', 'fl1Done', 'liberalDone', 'requiredDone', 'elective1Done', 'elective2Done', 'thesisDone',
  'artsTDone', 'fl1TDone', 'liberalTDone', 'specialTDone', 'artsSDone', 'fl1SDone', 'liberalSDone', 'specialSDone',
  'arts1None', 'arts2None', 'arts3None', 'artsNone', 'fl1None', 'liberalNone', 'requiredNone', 'elective1None', 'elective2None', 'thesisNone', 
  'artsTNone', 'specialTNone', 'textNone', 'schoolNone', 'freeNone','totalUp','totalDown',
];
const chartUnits = Object.fromEntries(allUnits.map(unit => [unit, 0]));

const chartData = {
  units: chartUnits,
  dataUpOuter: {
    'apply':          { label: '認定', color: 'gray' },
    'arts1Done':      { label: '人文済', color: 'red' },
    'arts2Done':      { label: '社会済', color: 'red' },
    'arts3Done':      { label: '自然済', color: 'red' },
    'fl1Done':        { label: '必修語済', color: 'red' },
    'liberalDone':    { label: '総合済', color: 'red' },
    'arts1None':      { label: '人文未', color: 'lightsalmon' },
    'arts2None':      { label: '社会未', color: 'lightsalmon' },
    'arts3None':      { label: '自然未', color: 'lightsalmon' },
    'artsNone':       { label: '3分野未', color: 'lightsalmon' },
    'fl1None':        { label: '必修語未', color: 'lightsalmon' },
    'liberalNone':    { label: '総合未', color: 'lightsalmon' },
    'requiredDone':   { label: '必修済', color: 'navy' },
    'elective1Done':  { label: '選択必済', color: 'navy' },
    'elective2Done':  { label: '選択済', color: 'navy' },
    'requiredNone':   { label: '必修未', color: 'lightsteelblue' },
    'elective1None':  { label: '選択必未', color: 'lightsteelblue' },
    'elective2None':    { label: '選択未', color: 'lightsteelblue' },
    'thesisDone':     { label: '卒論済', color: 'fuchsia' },
    'thesisNone':     { label: '卒論未', color: 'pink' },
  },
  dataUpMiddle: {
    'artsDone':       { label: '3分野済', color: 'red' , calc: ['apply', 'arts1Done', 'arts2Done', 'arts3Done']},
    'fl1Done':        { label: '必修語済', color: 'red' },
    'liberalDone':    { label: '総合済', color: 'red' },
    'artsNone':       { label: '3分野未', color: 'lightsalmon' , calc: ['arts1None', 'arts2None', 'arts3None', 'artsNone']},
    'fl1None':        { label: '必修語未', color: 'lightsalmon' },
    'liberalNone':    { label: '総合未', color: 'lightsalmon' },
    'requiredDone':   { label: '必修済', color: 'navy' },
    'elective1Done':  { label: '選択必済', color: 'navy' },
    'elective2Done':  { label: '選択済', color: 'navy' },
    'requiredNone':   { label: '必修未', color: 'lightsteelblue' },
    'elective1None':  { label: '選択必未', color: 'lightsteelblue' },
    'elective2None':  { label: '選択未', color: 'lightsteelblue' },
    'thesisDone':     { label: '卒論済', color: 'fuchsia' },
    'thesisNone':     { label: '卒論未', color: 'pink' },
  },
  dataUpInner: {
    'liberalDone':    { label: '総合済', color: 'red', calc: ['apply', 'arts1Done', 'arts2Done', 'arts3Done', 'fl1Done', 'liberalDone']},
    'liberalNone':    { label: '総合未', color: 'lightsalmon', calc: ['arts1None', 'arts2None', 'arts3None', 'artsNone', 'fl1None', 'liberalNone']},
    'specialDone':    { label: '専門済', color: 'navy', calc: ['requiredDone', 'elective1Done', 'elective2Done']},
    'specialNone':    { label: '専門未', color: 'lightsteelblue', calc: ['requiredNone', 'elective1None', 'elective2None']},
    'thesisDone':     { label: '卒論済', color: 'fuchsia' },
    'thesisNone':     { label: '卒論未', color: 'pink' },
  },
  dataDownOuter: {
    'apply':            { label: '認定', color: 'gray' },
    'artsTDone':        { label: '3分T済', color: 'red' },
    'fl1TDone':         { label: '必語T済', color: 'red' },
    'liberalTDone':     { label: '他総T済', color: 'red' },
    'specialTDone':     { label: '専テキ済', color: 'navy' },
    'artsTNone':        { label: '3分T未', color: 'lightsalmon' },
    'specialTNone':     { label: '専テキ未', color: 'lightsteelblue' },
    'textNone':         { label: 'テキ未', color: 'powderblue' },
    'artsSDone':        { label: '3分スク済', color: 'red' },
    'fl1SDone':         { label: '必語スク済', color: 'red' },
    'liberalSDone':     { label: '他総スク済', color: 'red' },
    'specialSDone':     { label: '専スク済', color: 'navy' },
    'schoolNone':       { label: 'スク未', color: 'wheat' },
    'freeNone':         { label: '任意未', color: 'white' },
    'thesisDone':       { label: '卒論済', color: 'fuchsia' },
    'thesisNone':       { label: '卒論未', color: 'pink' },
  },
  dataDownMiddle: {
    'textDone':         { label: 'テキ済', color: 'aqua', calc: ['apply', 'artsTDone', 'fl1TDone', 'liberalTDone', 'specialTDone'] },
    'textNone':         { label: 'テキ未', color: 'powderblue', calc: ['artsTNone', 'specialTNone', 'textNone'] },
    'schoolDone':       { label: 'スク済', color: 'gold', calc: ['artsSDone', 'fl1SDone', 'liberalSDone', 'specialSDone'] },
    'schoolNone':       { label: 'スク未', color: 'wheat' },
    'freeNone':         { label: '任意未', color: 'white' },
    'thesisDone':       { label: '卒論済', color: 'fuchsia' },
    'thesisNone':       { label: '卒論未', color: 'pink' },
  }
};

window.showCharts = function () {
  const departmentConfig = {
    '文学部': { stat: 0, required: 28, elective: 0},
    '経済学部': { stat: 4, required: 17, elective: 0},
    '法学部': { stat: 0, required: 10, elective: 20}
  };
  
  const selectedDept = $('#department option:selected').val();
  const deptConfig = departmentConfig[selectedDept] || { stat: 0, required: 0, elective: 0};

  const deptUpdates = {
    statT: { graduate: deptConfig.stat },
    required: { graduate: deptConfig.required },
    elective1: { graduate: deptConfig.elective }
  };
  
  Object.keys(deptUpdates).forEach(condition => {
    Object.assign(decisions[condition], deptUpdates[condition]);
  });
    
  const courseConfig = {
    '普通課程': { arts: 6, artsSubN: 2, school: 30, applyText: 0},
    '特別課程': { arts: 4, artsSubN: 1, school: 22, applyText: 18},
    '学士入学': { 
      arts: 0, artsSubN: 0, school: 15,
      applyText: ($('#department option:selected').val() === '経済学部' && !document.getElementById('apply_stat').checked) ? 36 : 40
    }
  };

  const selectedCourse = $('#course option:selected').val();
  const crsConfig = courseConfig[selectedCourse] || { arts: 6, artsSubN: 2, school: 30, applyText: 0};

  const courseUpdates = {
    arts1: { graduate: crsConfig.arts, subjNumReq: crsConfig.artsSubN},
    arts2: { graduate: crsConfig.arts, subjNumReq: crsConfig.artsSubN},
    arts3: { graduate: crsConfig.arts, subjNumReq: crsConfig.artsSubN},
    school: { graduate: crsConfig.school, submit: crsConfig.school}
  };

  Object.keys(courseUpdates).forEach(condition => {
    Object.assign(decisions[condition], courseUpdates[condition]);
  });

  calcValue();
  setChartData();
  callDrawChart();
}

function calcValue () {
  // ヘルパー関数
  const clamp = (condition, ifTrue, ifFalse) => condition ? ifTrue : ifFalse;
  const calcTotal = (data = [], indices = []) => {
    if (!Array.isArray(data)) {
      return 0;
    }    
    // インデックスが指定されていない場合、デフォルトで全要素の合計を計算
    if (indices.length === 0) {
      return data.reduce((sum, value) => sum + (parseInt(value) || 0), 0);
    }
    // インデックスが指定されている場合、そのインデックスに基づいて合計を計算
    return indices.reduce((sum, index) => sum + (parseInt(data[index]) || 0), 0);
  };
  const course = profile.value.course;
  //console.log(grades);

  [decisions.arts1.subjNum, decisions.arts2.subjNum, decisions.arts3.subjNum] = [subjNum[1], subjNum[2], subjNum[3]];
  // テキストの計算
  const applyText = decisions.apply.text = min(40, units[0][0]);
  decisions.arts1.text = min(20, units[1][0]);
  decisions.arts2.text = min(20, units[2][0]);
  decisions.arts3.text = min(20, units[3][0]);
  decisions.statT.text = min(4, units[4][0]);
  decisions.fl1.text = min(6, units[5][0]);
  decisions.fl2.text = min(4, units[6][0]);
  decisions.sports.text = min(4, units[7][0]);
  decisions.special.text = min(68, sum(units[8][0],units[9][0],units[10][0]));

  decisions.arts.text = min(40, sum(decisions.arts1.text,decisions.arts2.text,decisions.arts3.text));
  decisions.arts.text = min(40, applyText + clamp(applyText == 36, decisions.statT.text, decisions.arts.text));
  decisions.fl1.text = min(8,clamp(document.getElementById('apply_fl1').checked, 8, decisions.fl1.text));
  decisions.otherArts.text = min(8, sum(decisions.fl2.text,decisions.sports.text));
  decisions.liberal.text = min(48, sum(decisions.arts.text,decisions.otherArts.text,decisions.fl1.text));
  decisions.total.text = min(86, decisions.liberal.text + decisions.special.text);
  decisions.free.text = max(0, sum(decisions.total.text, max(0, decisions.artsT.graduate - decisions.artsT.total), max(0, decisions.specialT.graduate - decisions.specialT.total)) - decisions.text.graduate);

  // スクーリングの計算
  decisions.arts1.school = min(12, units[1][1]);
  decisions.arts2.school = min(12, units[2][1]);
  decisions.arts3.school = min(12, units[3][1]);
  decisions.fl1.school = min(4, units[5][1]);
  decisions.fl2.school = min(4, units[6][1]);
  decisions.sports.school = min(4, units[7][1]);
  decisions.special.school = min(28, sum(units[8][1],units[9][1],units[10][1]));
  decisions.arts1.media = min(10, units[1][2]);
  decisions.arts2.media = min(10, units[2][2]);
  decisions.arts3.media = min(10, units[3][2]);
  decisions.fl1.media = min(2, units[5][2]);
  decisions.special.media = min(10, sum(units[8][2],units[9][2],units[10][2]));
  const medias = [decisions.arts1.media,decisions.arts2.media,decisions.arts3.media,decisions.fl1.media,decisions.special.media];
  [decisions.arts1.media,decisions.arts2.media,decisions.arts3.media,decisions.fl1.media,decisions.special.media] = adjustValues(medias, 10);

  decisions.arts1.school = min(12, sum(decisions.arts1.school,decisions.arts1.media));
  decisions.arts2.school = min(12, sum(decisions.arts2.school,decisions.arts2.media));
  decisions.arts3.school = min(12, sum(decisions.arts3.school,decisions.arts3.media));
  decisions.fl1.school = min(4, sum(decisions.fl1.school,decisions.fl1.media));
  decisions.special.school = min(28, sum(decisions.special.school,decisions.special.media));

  const artsSchools = [decisions.arts1.school,decisions.arts2.school,decisions.arts3.school];
  [decisions.arts1.school,decisions.arts2.school,decisions.arts3.school] = adjustValues(artsSchools, 12);
  decisions.arts.school = min(12, sum(decisions.arts1.school, decisions.arts2.school, decisions.arts3.school));
  decisions.otherArts.school = min(8, sum(decisions.fl2.school,decisions.sports.school));
  decisions.liberal.school = min(24, sum(decisions.arts.school, decisions.fl1.school, decisions.otherArts.school));
  decisions.special.school = min(28, decisions.special.school);

  // スクーリングの調整
  function adjustValues(values, max) {
    let sum = values.reduce((acc, val) => acc + val, 0);    // 合計を計算
    while (sum > max) {                                     // 合計がmax以内になるまでループ
      let maxIndex = values.indexOf(Math.max(...values));   // 最大値を取得
      values[maxIndex] -= 2;                                // 最大値から2を引く  
      sum = values.reduce((acc, val) => acc + val, 0);      // 新しい合計を計算
    }
    return values;    // 結果を返す
  }
  decisions.total.school = min(46, decisions.liberal.school + decisions.special.school);
  decisions.free.school = max(0, decisions.total.school - decisions.school.graduate)

  // 合計の計算
  decisions.apply.total = min(40, decisions.apply.text);
  decisions.arts.total = min(40, sum(decisions.arts.text, decisions.arts.school));
  decisions.arts1.total = min(20, sum(decisions.arts1.text, decisions.arts1.school));
  decisions.arts2.total = min(20, sum(decisions.arts2.text, decisions.arts2.school));
  decisions.arts3.total = min(20, sum(decisions.arts3.text, decisions.arts3.school));
  decisions.statT.total = min(4, decisions.statT.text);
  decisions.artsT.total = min(40, decisions.arts.text);
  decisions.fl1.total = min(8, sum(decisions.fl1.text,decisions.fl1.school));
  decisions.fl2.total = min(4, decisions.fl2.text + decisions.fl2.school);
  decisions.sports.total = min(4, decisions.sports.text + decisions.sports.school);
  decisions.otherArts.total = min(8, decisions.otherArts.text + decisions.otherArts.school);
  decisions.liberal.total = min(48, decisions.liberal.text + decisions.liberal.school);
  decisions.required.total = min(68, calcTotal(units[8]));
  decisions.elective1.total = min(68, calcTotal(units[9]));
  decisions.elective2.total = min(68, calcTotal(units[10]));
  decisions.specialT.total = min(68, decisions.special.text);
  decisions.special.total = min(68, decisions.special.text + decisions.special.school);
  decisions.text.total = min(86, decisions.liberal.text + decisions.special.text);
  decisions.school.total = min(46, decisions.liberal.school + decisions.special.school);
  decisions.thesis.total = min(8, units[11][0]);
  decisions.total.total = min(decisions.text.total + decisions.school.total, decisions.liberal.total + decisions.special.total)+ decisions.thesis.total;
  decisions.free.total = min(16, sum(decisions.free.text,decisions.free.school));

  const capAtZero = (rawTotal) => clamp(course == '学士入学', 0, rawTotal);
  const propertiesToCap = ['text','school','total'];
  const itemsToCap = ['arts1','arts2','arts3','fl2','sports'];
  propertiesToCap.forEach(prop => {
    itemsToCap.forEach(item => {
        decisions[item][prop] = capAtZero(decisions[item][prop]);
    });
  });

  // 進捗の計算
  const updateProg = (item) => {
    const prog = item.graduate === 0 ? 1 : Math.min(item.total / item.graduate, 1);
    item.prog = (item.subjNumReq > 0 && prog === 1) ? (item.subjNum >= item.subjNumReq ? prog : 0.99) : prog;
  };
  const getElementId = (key, suffix) => `${key}-${suffix}`;
  const formatter = new Intl.NumberFormat('ja', { style: 'percent' });

  //console.log(decisions);

  // プロパティの設定
  // ここあとで直す
  const properties = {
    graduate: ['total', 'graduate'],
    entry: ['total', 'entry'],
    approve: ['total', 'approve'],
    submit: ['total', 'submit']
  };

  // 関数定義
  const updateProperties = (item, key) => {
    const propertyKeys = ['total', 'entry', 'approve', 'submit', 'graduate', 'prog'];
    propertyKeys.forEach(property => {
      const elementId = getElementId(key, property);
      const value = property === 'prog' ? formatter.format(item[property]) : item[property];
      $(document.getElementById(elementId)).text(value !== undefined ? value : '');
    });
  };

  const updateConditions = (item, key) => {
    Object.entries(properties).forEach(([status, [totalProp, compareProp]]) => {
      if (item[compareProp] !== undefined) {
        const id = `${key}-${status}`;
        const condition = item[totalProp] >= item[compareProp];
        document.getElementById(id).className = condition ? 'done' : 'none';
      }
    });
  };

  // メイン処理
  Object.entries(decisions)
    .filter(([key, item]) => item.id <= 15) // id が15以下のエントリーを選択
    .forEach(([key, item]) => {
      updateProg(item); // updateProg 関数を適用
      updateProperties(item, key);
      updateConditions(item, key);
    });

    $('#Apply-text').text(applyText);
}

function setChartData () {
  chartData.units.apply = decisions.apply.total;
  chartData.units.arts1Done = decisions.arts1.total;
  chartData.units.arts2Done = decisions.arts2.total;
  chartData.units.arts3Done = decisions.arts3.total;
  chartData.units.fl1Done = decisions.fl1.total;
  chartData.units.liberalDone = decisions.otherArts.total;
  chartData.units.requiredDone = decisions.required.total;
  chartData.units.elective1Done = decisions.elective1.total;
  chartData.units.elective2Done = decisions.elective2.total;
  chartData.units.thesisDone = decisions.thesis.total;
  chartData.units.artsTDone = sum(chartData.units.arts1Done,chartData.units.arts2Done,chartData.units.arts3Done);
  chartData.units.fl1TDone = decisions.fl1.text;
  chartData.units.liberalTDone = decisions.otherArts.text;
  chartData.units.specialTDone = decisions.special.text;
  chartData.units.artsSDone = decisions.arts.school;
  chartData.units.fl1SDone = decisions.fl1.school;
  chartData.units.liberalSDone = decisions.otherArts.school;
  chartData.units.specialSDone = decisions.special.school;
  chartData.units.arts1None = max(0, decisions.arts1.graduate - decisions.arts1.total);
  chartData.units.arts2None = max(0, decisions.arts2.graduate - decisions.arts2.total);
  chartData.units.arts3None = max(0, decisions.arts3.graduate - decisions.arts3.total)
    + decisions.statT.graduate>0 ? max(0,decisions.statT.graduate - decisions.statT.total):0;
  chartData.units.fl1None = max(0, decisions.fl1.graduate - decisions.fl1.total);
  const applyAlloc = chartData.units.apply;
  const arts1Alloc = sum(decisions.arts1.total,chartData.units.arts1None);
  const arts2Alloc = sum(decisions.arts2.total,chartData.units.arts2None);
  const arts3Alloc = sum(decisions.arts3.total,chartData.units.arts3None);
  const artsNone = chartData.units.artsNone = max(0, decisions.arts.graduate - sum(applyAlloc,arts1Alloc,arts2Alloc,arts3Alloc));
  const artsAlloc = sum(applyAlloc,arts1Alloc,arts2Alloc,arts3Alloc,artsNone);
  const fl1Alloc = sum(decisions.fl1.total,chartData.units.fl1None);
  chartData.units.liberalNone = max(0, decisions.liberal.graduate - sum(artsAlloc,fl1Alloc,decisions.otherArts.total));
  chartData.units.requiredNone = max(0, decisions.required.graduate - decisions.required.total);
  chartData.units.elective1None = max(0, decisions.elective1.graduate - decisions.elective1.total);
  const requiredAlloc = sum(decisions.required.total,chartData.units.requiredNone);
  const elective1Alloc = sum(decisions.elective1.total,chartData.units.elective1None);
  chartData.units.elective2None = max(0, decisions.special.graduate - sum(requiredAlloc,elective1Alloc,decisions.elective2.total));
  chartData.units.thesisNone = max(0, decisions.thesis.graduate - decisions.thesis.total);
  const thesisAlloc = sum(decisions.thesis.total, chartData.units.thesisNone);
  chartData.units.artsTNone = max(0, decisions.artsT.graduate - decisions.artsT.total)
    + (decisions.statT.graduate>0 ? max(0,decisions.statT.graduate - decisions.statT.total) : 0);
  chartData.units.specialTNone = max(0, decisions.specialT.graduate - decisions.specialT.total);
  const artsTAlloc = sum(decisions.artsT.total,chartData.units.artsTNone);
  const specialTAlloc = sum(decisions.specialT.total,chartData.units.specialTNone);
  chartData.units.textNone = max(0, decisions.text.graduate - sum(artsTAlloc,specialTAlloc));
  chartData.units.schoolNone = max(0, decisions.school.graduate - decisions.school.total);
  const textAlloc = sum(artsTAlloc, specialTAlloc, chartData.units.textNone);
  const schoolAlloc = sum(decisions.school.total, chartData.units.schoolNone);
  chartData.units.totalUp = sum(
    chartData.units.apply,chartData.units.arts1Done,chartData.units.arts2Done,chartData.units.arts3Done,chartData.units.fl1Done,chartData.units.liberalDone,
    chartData.units.requiredDone,chartData.units.elective1Done,chartData.units.elective2Done,chartData.units.thesisDone);
  chartData.units.totalDown = sum(
    chartData.units.apply,chartData.units.artsTDone,chartData.units.fl1TDone,chartData.units.liberalTDone,chartData.units.specialTDone,
    chartData.units.liberalSDone,chartData.units.specialSDone,chartData.units.thesisDone);
  chartData.units.freeNone = max(0, decisions.total.graduate - sum(chartData.units.totalDown,chartData.units.artsTNone,chartData.units.specialTNone,chartData.units.textNone,chartData.units.schoolNone,chartData.units.thesisNone));
}

// グラフを描画する関数
function drawChart() {
  const [WidthOutside, HeightOutside] = [240, 240];
  const [ChartSize, ChartSizeRatioOuter, ChartSizeRatioMiddle, ChartSizeRatioInner] = [1, 0.75, 0.5, 0.25];

  // 基本設定オプション
  const baseOptions = {
    chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
    pieSliceText: 'value',
    legend: 'none',
  };

  // グラフオプションを生成する関数
  const getChartOptions = (chartRatio, pieHoleRatio) => ({
    ...baseOptions,
    width: WidthOutside * chartRatio,
    height: HeightOutside * chartRatio,
    pieHole: pieHoleRatio,
    colors: [],
    backgroundColor: pieHoleRatio === 1 ? undefined : 'transparent',
  });

  // 各グラフのオプション設定
  const options = {
    UpOuter: getChartOptions(ChartSize, ChartSizeRatioOuter),
    UpMiddle: getChartOptions(ChartSizeRatioOuter, ChartSizeRatioMiddle / ChartSizeRatioOuter),
    UpInner: getChartOptions(ChartSizeRatioMiddle, ChartSizeRatioInner / ChartSizeRatioMiddle),
    DownOuter: getChartOptions(ChartSize, ChartSizeRatioOuter),
    DownMiddle: getChartOptions(ChartSizeRatioOuter, ChartSizeRatioMiddle / ChartSizeRatioOuter),
  };

  // グラフ設定の配列
  const chartConfigs = [
    { dataKey: 'dataUpOuter', elementId: 'donutChartUpOuter', options: options.UpOuter },
    { dataKey: 'dataUpMiddle', elementId: 'donutChartUpMiddle', options: options.UpMiddle },
    { dataKey: 'dataUpInner', elementId: 'donutChartUpInner', options: options.UpInner },
    { dataKey: 'dataDownOuter', elementId: 'donutChartDownOuter', options: options.DownOuter },
    { dataKey: 'dataDownMiddle', elementId: 'donutChartDownMiddle', options: options.DownMiddle }
  ];

  chartConfigs.forEach(({ dataKey, elementId, options }) => {
    const data = google.visualization.arrayToDataTable(
      [['Category', 'Units']]
      .concat(Object.entries(chartData[dataKey]).map(([key, { label, calc }]) => {
        const units = calc ? calc.reduce((sum, item) => sum + (chartData.units[item] || 0), 0) : chartData.units[key];
        return [label, units];
      }))
    );
    options.colors = Object.values(chartData[dataKey]).map(item => item.color);
    new google.visualization.PieChart(document.getElementById(elementId)).draw(data, options);
  });
  $('#total_units').text(chartData.units.totalUp);
  $('#total_units2').text(chartData.units.totalDown);
}

function ensureGoogleChartsLoaded(callback) {
  if (google && google.visualization && google.visualization.arrayToDataTable) {
    callback();
  } else {
    google.charts.setOnLoadCallback(callback);
  }
}

// 他の処理から呼び出す場合
function callDrawChart() {
  ensureGoogleChartsLoaded(drawChart);
}