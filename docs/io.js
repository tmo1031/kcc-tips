/* ToDo
-[x] スクーリングの処理作成
-[x] スクーリングマスター作成
-[] スクーリングの際にレポ合否を判定しない処理を追加
*/
const units = Array.from({ length: 12 }, () => Array(3).fill(0));
var subjNum = new Array(5).fill(0);
const maxYear = 21;
const groups = 6;
const eventPerYear = 6;
const PlanningRows = maxYear*eventPerYear;
const profile = {
  Element1:{year: null, month: null, department: null, section: null, course: null, language: null, stat: null, appLang: null, years: null, months: null},
  Element2:{year: null, month: null, department: null, section: null, course: null, language: null, stat: null, appLang: null, years: null, months: null},
  value   :{year: null, month: null, department: null, section: null, course: null, language: null, stat: null, appLang: null, years: null, months: null},
}
const elements = [
  { prefix: 'Arts1', index: 1 },
  { prefix: 'Arts2', index: 2 },
  { prefix: 'Arts3', index: 3 },
  { prefix: 'Stat', index: 4 },
  { prefix: 'FL1', index: 5 },
  { prefix: 'FL2', index: 6 },
  { prefix: 'Sports', index: 7 },
  { prefix: 'Required', index: 8 },
  { prefix: 'Elective1', index: 9 },
  { prefix: 'Elective2', index: 10 },
  { prefix: 'Thesis', index: 11 }
];
const labels = {dept: '-', sect: '-', course: '-', };
var entries = [];
document.addEventListener("DOMContentLoaded", function() {
  initializeTables();
  setupEventListeners();
  refresh('byCourse');      
});

function whiteOut() {
  const stringToCheck = '--';
  const tableBody = document.querySelector('#PlanningTable tbody');
  const selectElements = tableBody.querySelectorAll('select');
  selectElements.forEach(select => {
    const selectedValue = select.value;
    if (selectedValue.includes(stringToCheck)) {
      select.value = ' ';
    }
  });
}

function writePlanningTable() {
  function getVisibleRows() {
    const rows = document.querySelectorAll('#ActualBody tr'); // #ActualBody 内のすべての tr 要素を取得
    const visibleRows = Array.from(rows).filter(row => !row.classList.contains('hidden')); // hidden クラスを持たない行をフィルタリング  
    return visibleRows;
  }
  const getGroup = (rowId) => {
    const groupMap = {'0':'A群','1':'B群','2':'C群','3':'D群','4':'E群','5':'F群'};
    const lastChar = rowId.slice(-1);
    return groupMap[lastChar] || '';
  }
  const visibleRows = getVisibleRows();
  const csvRows = [];

  csvRows.push('受講時期,群,科目名,評価,レポ合否,単位数,区分,形態');

  visibleRows.forEach(row => {
    const examName = row.querySelector('.examName').textContent;
    const groupName = getGroup(row.id);
    const subjectName = row.querySelector('.subjectName').textContent;
    const gradeReport = row.querySelector('.radio-group input[type="radio"]:checked').value;
    const unit = row.querySelector('.unit-input').value;
    const gradeExam = row.querySelector('.dropdown').value;
    const subCategory = row.querySelector('.subDropdown').value;
    const subForm = row.querySelector('.formDropdown').value;
    console.log(examName,groupName,subjectName,gradeExam,gradeReport,unit,subCategory,subForm);
    csvRows.push([
      examName,
      groupName,
      subjectName,
      gradeExam,
      gradeReport,
      unit,
      subCategory,
      subForm
    ].map(cell => `"${cell.replace(/"/g, '""')}"`).join(','));
  });
  // CSVデータを文字列として作成
  const csvString = csvRows.join('\n');
  
  // UTF-8 with BOM
  const bom = '\uFEFF'; // BOM
  const csvWithBom = bom + csvString;

  // プレビュー用のテキストエリアを作成
  const previewWindow = window.open('', 'CSV Preview', 'width=600,height=400');
  previewWindow.document.write('<html><head><title>CSV Preview</title></head><body>');
  previewWindow.document.write('<h2>CSV Preview</h2>');
  previewWindow.document.write('<textarea id="csv-preview" style="width:100%; height:300px;">');
  previewWindow.document.write(csvWithBom.replace(/</g, '&lt;').replace(/>/g, '&gt;')); // HTMLエスケープ
  previewWindow.document.write('</textarea>');
  previewWindow.document.write('<br><button id="download-btn">Download CSV</button>');
  previewWindow.document.write('<br><button onclick="window.close();">Close</button>');
  previewWindow.document.write('<script>');
  previewWindow.document.write('document.getElementById("download-btn").addEventListener("click", function() {');
  previewWindow.document.write('  const blob = new Blob([document.getElementById("csv-preview").value], { type: "text/csv" });');
  previewWindow.document.write('  const url = URL.createObjectURL(blob);');
  previewWindow.document.write('  const a = document.createElement("a");');
  previewWindow.document.write('  a.href = url;');
  previewWindow.document.write('  a.download = "GradeList.csv";');
  previewWindow.document.write('  document.body.appendChild(a);');
  previewWindow.document.write('  a.click();');
  previewWindow.document.write('  document.body.removeChild(a);');
  previewWindow.document.write('  URL.revokeObjectURL(url);');
  previewWindow.document.write('});');
  previewWindow.document.write('</script>');
  previewWindow.document.write('</body></html>');
  previewWindow.document.close();
}; 

function readPlanningTable() {
  function inputName(i, j, name) {
    const select = document.getElementById(`subject-${i}-${j}`);
    if (select) {
      select.value = name;
    }
  }
  function inputGrade(i, j, name, gradeExam, gradeReport, unit, subCategory, subForm) {
    function selectRadioButton(selectRow, valueToSelect) {
      // ラジオボタンの親要素を取得
      const radioGroup = selectRow.querySelector('.radio-group');
      if (!radioGroup) return; // 親要素が存在しない場合は何もせずに終了    
      const radioButtons = radioGroup.querySelectorAll('input[type="radio"]');
      radioButtons.forEach(radio => {
        if (radio.value === valueToSelect) {
          radio.checked = true; 
        }
      });
    }

    const selectRow = document.getElementById(`actual-${i}-${j}`);
    const subjectName = selectRow.querySelector('.subjectName').textContent;

    if (selectRow && subjectName === name) {
      selectRow.querySelector('.dropdown-cell').querySelector('.dropdown').value = gradeExam;
      selectRadioButton(selectRow, gradeReport);
      selectRow.querySelector('.unit-input').value = unit;
      selectRow.querySelector('.subDropdown').value = subCategory;
      selectRow.querySelector('.formDropdown').value = subForm;      
    }
  }
  function getIndex(examName, groupName) {
    const parsedYear = parseInt(examName.slice(0,2))+2000;
    const examNameLast = examName.slice(4);
    const year = profile.value.year;
    const month = profile.value.month;
    let adj;
    let term_check;
    
    if (month == 4 || month == '') {
      const termMap = new Map([
        ['4月試験',   1],
        ['7月試験',   2],
        ['夏スク',    3],
        ['10月試験',  4],
        ['1月試験',   5],
        ['秋スク',    6],
      ]);
      term_check = termMap.get(examNameLast) || 0;
      adj = 0;             
    } else if (month == 10) {
      const termMap = new Map([
        ['4月試験',   4],
        ['7月試験',   5],
        ['夏スク',    6],
        ['10月試験',  1],
        ['1月試験',   2],
        ['秋スク',    3],
      ]);
      term_check = termMap.get(examNameLast) || 0;
      adj = term_check < 3 ? 0 : 1;             
    }
    const currentYear = parsedYear - year + 1 - adj;
    const i = (currentYear - 1)*eventPerYear + term_check -1;
    const groupMap = new Map([
      ['A群',   0],
      ['B群',   1],
      ['C群',   2],
      ['D群',   3],
      ['E群',   4],
      ['F群',   5],
    ]);
    const j = groupMap.get(groupName) || 0;
    return [i, j];
  }

  console.log(entries);
  entries.forEach(entry => {
    const [i, j] = getIndex(entry.examName, entry.groupName);
    inputName(i, j, entry.name);
  });
  refresh('byPlan');
  entries.forEach(entry => {
    const [i, j] = getIndex(entry.examName, entry.groupName);
    console.log(entry.name, entry.grade, entry.reportResult,entry.unitCount,entry.category,entry.form);
    inputGrade(i, j, entry.name, entry.grade, entry.reportResult,entry.unitCount,entry.category,entry.form);
  });
  refresh('byActual');
};

function writeUnitTable() {
  let result;
  let headerText;
  let commentText;
  let footerText;
  const unitsTexts = [];
  const titleList = ['認定:', '人文:', '社会:', '科学:', '統計:', '必語:', '他語:', '保体:', '必修:', '選必:', '選択:', '卒論:'];
  //getUnitsTable(); //更新してから書き出したい
  for (i = 0; i < 12; i++) {
      unitsTexts[i] = [];
      for (j = 1; j < 4; j++) {
      if(units[i][j-1] == 0) {
          unitsTexts[i][j] = '--';
      } else if (units[i][j-1] < 10) {
          unitsTexts[i][j] = '0' + units[i][j-1];
      } else {
          unitsTexts[i][j] = units[i][j-1];
      }
      }
      unitsTexts[i][0] = titleList[i];
      unitsTexts[i][4] = '\n';
  }

  let commentBox = document.getElementById('commentText');
  commentText = commentBox.value;
  if(commentText.length > 27) { commentText = ''; }

  headerText = '慶應通信履修状況(学部:' + labels.dept + labels.sect + '/' + labels.course +')\n';
  footerText = 'コメント:' + commentText + '\n';
  result = unitsTexts.join("");
  result = result.replace(/:,/g, ":");
  result = result.replace(/認定:(\d{2}|--),(\d{2}|--),(\d{2}|--)/g, "認定:$1");
  result = result.replace(/保体:(\d{2}|--),(\d{2}|--),(\d{2}|--)/g, "保体:$1,$2");
  result = result.replace(/卒論:(\d{2}|--),(\d{2}|--),(\d{2}|--)/g, "卒論:$1");
  result = result.replace(/,\n/g, "\n");
  result = result.replace(/,/g, "/");
  result = headerText + '分類:T/S/M\n' + result + footerText;
  let textarea = document.getElementById('textarea');
  textarea.value = result;
};

function readUnitTable() {
  const inputText = document.getElementById('textarea').value;
  const textLines = inputText.split('\n');
  const departmentId = $('#department');
  const sectionId = $('#section');
  const courseId = $('#course');

  // 更新処理の関数
  function updateDepartmentAndSection(line) {
    if (line.includes('文')) {
      departmentId.val('文学部');
      refresh('byDepartment');
      sectionId.val(line.includes('1') ? '第1類' :
                      line.includes('2') ? '第2類' :
                      line.includes('3') ? '第3類' : '');
    } else if (line.includes('経')) {
      departmentId.val('経済学部');
      refresh('byDepartment');
    } else if (line.includes('法')) {
      departmentId.val('法学部');
      refresh('byDepartment');
      sectionId.val(line.includes('法甲') ? '甲類' :
                      line.includes('法乙') ? '乙類' : '');
    } else {
      departmentId.val('学部');
    }
  }

  // コース更新処理の関数
  function updateCourse(line) {
    courseId.val(line.includes('/普') ? '普通課程' :
                  line.includes('/特') ? '特別課程' :
                  line.includes('/学') ? '学士入学' : '入学課程');
  }

  // データの読み込み処理の関数
  function updateUnitsFromTexts(lines) {
    lines.slice(3, 14).forEach((line, i) => {
      const [key, values] = line.split(':');
      const data = values.replace(/--/g, "00").split('/').map(v => parseInt(v, 10)).map(v => (v<0 ||isNaN(v)) ? 0 : v);
      switch (key) {
        case '保体':
          units[i + 1][0] = data[0];
          units[i + 1][1] = data[1];
          break;
        case '卒論':
          units[i + 1][0] = data[0];
          break;
        default:
          units[i + 1][0] = data[0];
          units[i + 1][1] = data[1];
          units[i + 1][2] = data[2];
          break;
      }
    });
  }
  updateDepartmentAndSection(textLines[0]);
  updateCourse(textLines[0]);
  updateUnitsFromTexts(textLines);

  //ここは refresh 関数に任せる
  //updateUnitsTable();
  //changeValue();
  refresh('byCourse');
}

function initializeTables() {
  function createInputTable() {
    const inputTableRows = [
      { major: '総', minor: '認定', id: 'Apply', cols: ['', '', '', '']},
      { major: '', minor: '人文', id: 'Arts1', cols: [, , , ]},
      { major: '', minor: '社会', id: 'Arts2', cols: [, , , ]},
      { major: '', minor: '科学', id: 'Arts3', cols: [, , , ]},
      { major: '', minor: '統計', id: 'Stat', cols: [,,,'']},
      { major: '', minor: '必語', id: 'FL1', cols: [,,,'']},
      { major: '', minor: '他語', id: 'FL2', cols: [,,,'']},
      { major: '', minor: '保体', id: 'Sports', cols: [,,'', ''] },
      { major: '専', minor: '必修', id: 'Required', cols: [,,,'']},
      { major: '', minor: '選必', id: 'Elective1' , cols: [,,,'']},
      { major: '', minor: '選択', id: 'Elective2' , cols: [,,,'']},
      { major: '論', minor: '卒論', id: 'Thesis', cols: [,'','',''] }
    ];
    
    const tableBody = document.getElementById('inputTableBody');
  
    inputTableRows.forEach(row => {
      const tr = document.createElement('tr');
  
      const majorTd = document.createElement('td');
      majorTd.classList.add('major');
      majorTd.textContent = row.major;
      tr.appendChild(majorTd);
  
      const minorTd = document.createElement('td');
      minorTd.classList.add('minor');
      minorTd.textContent = row.minor;
      tr.appendChild(minorTd);
  
      ['text', 'school', 'media', 'subjNum'].forEach((cls, idx) => {
        const td = document.createElement('td');
        td.classList.add(cls);
        if (row.cols && row.cols[idx] !== undefined) {
          td.textContent = row.cols[idx];
          td.id = `${row.id}-${cls}`;
        } else {
          const input = document.createElement('input');
          input.type = 'number';
          input.size = 3;
          input.id = `${row.id}-${cls}`;
          input.value = 0;
          input.min = 0;
          input.max = cls === 'subjNum' ? 9 : 99;
          td.appendChild(input);
        }
        tr.appendChild(td);
        });  
  
      tableBody.appendChild(tr);
    });
  }

  function createSummaryTable() {
    const tableBody = document.getElementById('gradeTableBody');
    Object.entries(decisions)
      .filter(([key, value]) => value.id <= 15) // id が 15 以下のものだけフィルタリング
      .forEach(([key, item]) => {
        const tr = document.createElement('tr');
        const properties = ['major', 'minor', 'total', 'entry', 'approve', 'submit', 'graduate', 'prog'];
  
        properties.forEach(property => {
          const td = document.createElement('td');
          td.classList.add(property);
          td.id = `${key}-${property}`;
          td.textContent = item[property] !== undefined ? item[property] : ''; // プロパティが存在する場合は値、存在しない場合は空欄
          tr.appendChild(td);
        });
  
        tableBody.appendChild(tr);
      });
  }

  createInputTable();
  createSummaryTable();
}

function refresh(mode) {
  var subjCategories = [""];

  function checkSubcategory(subcategory) {
    const language = profile.value.language;
    const department = profile.value.department;
    const section = profile.value.section;
    let result = [];
    const categoryMap = {
      'any': ['人文', '社会', '科学', '統計', '必語', '他語', '保体', '必修', '選必', '選択', '自由'],
      '人文': [subcategory],
      '社会': [subcategory],
      '科学': [subcategory],
      '統計': [subcategory],
      '他語': [subcategory],
      '保体': [subcategory],
      '必修': [subcategory],
      '選必': [subcategory],
      '選択': [subcategory],
      '英': [language === '英語' ? '必語' : '他語'],
      '独': [language === 'ドイツ語' ? '必語' : '他語'],
      '仏': [language === 'フランス語' ? '必語' : '他語'],
      '1類': [section === '第1類' ? '必修' : '選択'],
      '2類': [section === '第2類' ? '必修' : '選択'],
      '3類': [section === '第3類' ? '必修' : '選択'],
      '共通': [department === '文学部' ? '必修' : '選択']
    };    
    result = categoryMap[subcategory] || [];
    return JSON.stringify(result);
  }

  // Profile が変更された時の更新処理 
  function updateProfile (mode) {
    const sections = {
      '文学部': ['第1類', '第2類', '第3類'],
      '経済学部': [''],
      '法学部': ['甲類', '乙類'],
    };
    const dept = document.getElementById('department').value;
    const sects = sections[dept] || [];
    const html = sects.map(function(sct) {
      return '<option value="' + sct + '">' + sct + '</option>';
    }).join('');
    if (mode === 'byDepartment'){
      profile.Element1.section.innerHTML = html;
      profile.Element2.section.innerHTML = html;
    }

    const applyStat = document.getElementById('apply_stat').checked ? 4 : null;
    const applyFl1 = document.getElementById('apply_fl1').checked ? 8 : null;

    if (applyStat !== null){
        $('#stat-text').val(applyStat);
        units[4][0] = applyStat;
    }
    if (applyFl1 !== null){
       $('#fl1-text').val(applyFl1);
       units[5][0] = applyFl1;
    }

    const selectSect = $('#section option:selected').val() || '';
    const departmentConfig = {
      '文学部': {deptLabel: '文', sectLabel: selectSect.charAt(1) },
      '経済学部': {deptLabel: '経', sectLabel: '' },
      '法学部': {deptLabel: '法', sectLabel: selectSect.charAt(0) }
    };    
    const selectedDept = $('#department option:selected').val();
    const deptConfig = departmentConfig[selectedDept] || {deptLabel: '-', sectLabel: '' };
        
    const courseConfig = {
      '普通課程': {applyText: 0, courseLabel: '普' },
      '特別課程': {applyText: 18, courseLabel: '特' },
      '学士入学': {
        applyText: (dept === '経済学部' && !document.getElementById('apply_stat').checked) ? 36 : 40,
        courseLabel: '学'
      }
    };
  
    const selectedCourse = $('#course option:selected').val();
    const crsConfig = courseConfig[selectedCourse] || {applyText: 0, courseLabel: '-' };
    
    labels.dept = deptConfig.deptLabel;
    labels.sect = deptConfig.sectLabel;
    labels.course = crsConfig.courseLabel;
    units[0][0] = crsConfig.applyText;
  }

  function getProfile(){
    profile.value.year = document.getElementById('year').value;
    profile.value.month = document.getElementById('month').value;
    profile.value.department = document.getElementById('department').value;
    profile.value.section = document.getElementById('section').value;
    profile.value.course = document.getElementById('course').value;
    profile.value.language = document.getElementById('language').value;
    profile.value.stat = document.getElementById('apply_stat').checked;
    profile.value.appLang = document.getElementById('apply_fl1').checked;
    profile.value.years = document.getElementById('years').value;
    profile.value.months = document.getElementById('months').value;
  }

  // 実績表のプルダウンが変更された時に合計単位数を計算、表示する処理
  function updateTotalUnit() {
    const selectedRows = document.querySelectorAll('#ActualBody tr');
    const applyText = units[0][0];
    const applyStat = document.getElementById('apply_stat').checked ? 4 : null;
    const applyFl1 = document.getElementById('apply_fl1').checked ? 8 : null;
    totalUnit = 0;
    
    for (let i = 0; i < units.length; i++) {
      for (let j = 0; j < units[i].length; j++) {
        if(i === 0 && j === 0){
          units[i][j] = applyText;
        }else if(i === 4 && j === 0 && applyStat !== null){
          units[i][j] = applyStat;
        } else if(i === 5 && j === 0 && applyFl1 !== null){
          units[i][j] = applyFl1;
        } else {
          units[i][j] = 0;
        }
      }
    }

    selectedRows.forEach(row => {
      const formOptions = ['T', 'S', 'M/B'];
      const subCateOptions = ['人文', '社会', '科学', '統計', '必語', '他語', '保体', '必修', '選必', '選択'];
      const radioChecked = row.querySelector('.radio-group input[type="radio"]:checked');
      const unitInput = row.querySelector('.unit-input');
      const dropdown = row.querySelector('.dropdown');
      const subDropdown = row.querySelector('.subDropdown');
      const formDropdown = row.querySelector('.formDropdown');
    
      if (dropdown.value !== '未' && dropdown.value !== 'D' && radioChecked?.value === '合格') {
        const unitValue = unitInput.valueAsNumber;
        totalUnit += unitValue;
    
        const subIndex = subCateOptions.indexOf(subDropdown.value);
        const formIndex = formOptions.indexOf(formDropdown.value);
    
        if (subIndex !== -1 && formIndex !== -1) {
          units[subIndex + 1][formIndex] += unitValue;
          if (subIndex === 3) {
            units[subIndex][formIndex] += unitValue;
          }
        }
      }
    });
    document.getElementById('totalUnit').textContent = totalUnit;
    //updateForm();
  }
  
  function getUnitsTable() {
    elements.forEach(({ prefix, index }) => {
      units[index][0] = parseInt(document.getElementById(`${prefix}-text`).value) || 0;
      units[index][1] = parseInt(document.getElementById(`${prefix}-school`).value) || 0;
      units[index][2] = parseInt(document.getElementById(`${prefix}-media`).value) || 0;
    });
  
    [1, 2, 3].forEach(i => {
      subjNum[i] = parseInt(document.getElementById(`Arts${i}-subjNum`).value) || 0;
    });
  }

  function setUnitsTable() {
    elements.forEach(({ prefix, index }) => {
      document.getElementById(`${prefix}-text`).value = units[index][0];
      document.getElementById(`${prefix}-school`).value = units[index][1];
      document.getElementById(`${prefix}-media`).value = units[index][2];
      
      if (prefix.startsWith('Arts')) {
        document.getElementById(`${prefix}-subjNum`).value = subjNum[index];
      }
    });
  }

  function initPlanningTable(mode) {
    function updateSubcategories() {
      // 未実装
    }
    function filterOptionsByCategories(options, categories, maxLevel, group, year, term) {
      function filterTerms(year, term, pattern) {
        const isOdd = parseInt(year) % 2 === 1;      
        switch (pattern) {
          case 'Both':
            return true;
          case 'A':
            return term === 'A';
          case 'B':
            return term === 'B';
          case 'OddA':
            return (isOdd && term === 'A') || (!isOdd && term === 'B');
          case 'OddB':
            return (isOdd && term === 'B') || (!isOdd && term === 'A');
          default:
            return false;
        }
      }  
      function filterSchedule(year, term, group, schedule) {
        const Now = 2024;
        if (year < 2019 || year > Now || !Array.isArray(schedule)) {
          return false;
        }
        const foundItem = schedule.find(item => 
          Array.isArray(item) && item.length >= 3 && item[0] === year && item[1] === term && item[2] === group
        );
        return foundItem ? true : false;
      }
    
      return options.filter(option =>
        option.category.some(cat => categories.includes(cat)) &&
        option.level <= maxLevel &&
        (option.group ? option.group === group || option.group === '' : true) &&
        (option.start ? option.start <=  year && option.end >= year : true) &&
        (option.pattern ? filterTerms(year, term, option.pattern): true) &&
        (option.schedule ? filterSchedule(year, term, group, option.schedule): true) &&
        (option.filter ? option.filter(categories, year, term) : true)&&
        (option.COVID19filter ? option.COVID19filter(year, term, group) : true)
      );
    }
  
    function createDropdown(options) {
      function checkForm(form){
        let result = [];
        switch (form) {
          case 'any':
            result = ['T', 'S', 'M/B'];
            break;
          default:
            result[0] = form;
            break;
        }
        return JSON.stringify(result);
      }
  
      const select = document.createElement('select');
      options.forEach(option => {
        const opt = document.createElement('option');
        const section = profile.value.section
        opt.value = option.value;
        opt.textContent = option.value;
        opt.dataset.unit = option.unit;
        //opt.dataset.subcategories = JSON.stringify(option.subcategory);
        let subCat;
        if (Array.isArray(option.subcategory)) {
          subCat = section === '甲類' ? option.subcategory[0] : option.subcategory[1];
          opt.dataset.subcategoriesA = option.subcategory[0];
          opt.dataset.subcategoriesB = option.subcategory[1];
        } else {
          subCat = option.subcategory;
          opt.dataset.subcategories = option.subcategory;
        }
        opt.dataset.subcategory = checkSubcategory(subCat);
        opt.dataset.form = checkForm(option.form);
        select.appendChild(opt);
      });
      return select;
    }
    
    function getSubjCategories() {
      const dept = profile.value.department;
      const crs = profile.value.course;
      const categories = {
        '文学部': ["", "A", "F", "L"],
        '経済学部': ["", "A", "F", "E"],
        '法学部': ["", "A", "F", "J"],
        '学部': [""]
      };
      if(dept){
        subjCategories = (crs === '学士入学') 
        ? categories[dept].filter(cat => cat !== 'A') 
        : categories[dept];
      }
      if (!subjCategories) {
        subjCategories = categories['学部'];
      }
      return subjCategories;
    }
  
    if(mode === 'init'){
      const tableBody = document.querySelector('#PlanningTable tbody');
      tableBody.innerHTML = '';
      for (let i = 0; i < PlanningRows; i++) {
        const crs = profile.value.course;
        const levels = {
          '普通課程': 2,
          '特別課程': 4,
          '学士入学': 5
        };
        const initLevel = levels[crs] || 0;
        const row = document.createElement('tr');
        const labelCell = document.createElement('td');
        const categoriesToFilter = getSubjCategories();
        const currentYear = Math.floor(i / eventPerYear);
        const maxLevel = initLevel + (currentYear) * 2;
        const GroupArray = ['A', 'B', 'C', 'D', 'E', 'F'];
        const term_check = i % eventPerYear;
        var term = '';
        var columnOptions;
    
        switch (term_check % 3) {
          case 0:
            columnOptions = [...optionsData.text, ...optionsData.other];
            break;
          case 1:
            columnOptions = i < 3 ? [...optionsData.text, ...optionsData.other]:[...optionsData.text, ...optionsData.media, ...optionsData.other];
            break;
          case 2:
            columnOptions = [...optionsData.school, ...optionsData.other];
            break;
        }
    
        const yearValue = parseInt(profile.value.year);
        const month = profile.value.month;
        const parsedYear = isNaN(yearValue) ? 2000 : yearValue + currentYear;
    
        if (month == 4 || month == '') {
            term = term_check < 3 ? 'A': 'B';
            adj = 0;             
        } else if (month == 10) {
            term = term_check < 3 ? 'B': 'A';
            adj = term_check < 3 ? 0 : 1;              
        }
    
        const y = parsedYear + adj;
        
        labelCell.id = `label-${i}`;
        labelCell.classList.add('label-cell');
        row.appendChild(labelCell);
    
        for (let j = 0; j < groups; j++) {        
          const filteredOptions = filterOptionsByCategories(columnOptions, categoriesToFilter, maxLevel, GroupArray[j], y, term);
          const cell = document.createElement('td');
          const select = createDropdown(filteredOptions);
    
          select.id = `subject-${i}-${j}`;
          select.addEventListener('change', () => refresh('byPlan'));
    
          cell.appendChild(select);
          row.appendChild(cell);
        }
    
        tableBody.appendChild(row);
      }
    } else if (mode === 'update'){
      updateSubcategories();
    }
  }

  // InputForm が変更された時の PlanningTable 表示範囲の更新処理
  function updatePlanningTable(){
    const years = profile.value.years;
    const months = profile.value.months;
    const displayTerm = parseInt(years * 2 + months/6)*3;
    const tableBody = document.querySelector('#PlanningTable tbody');

    // PlanningTable の時間ラベルを変更する関数
    function updateTermLabel() {
      const year = profile.value.year;
      const month = profile.value.month;
      const yearInd = isNaN(parseInt(year)) ? 1 : parseInt(year) % 100;
      const termLabels = [
        '4月試験', '7月試験', '夏スク', '10月試験', '1月試験', '秋スク'
      ];
      var termLabel = [];
      
      // 月によるラベルの順序設定
      const order = month == 10 
        ? [3, 4, 5, 0, 1, 2] 
        : [0, 1, 2, 3, 4, 5];
      
      for (let i = 0; i < 21; i++) {
        termLabels.forEach((label, idx) => {
          const yearSuffix = isNaN(parseInt(year)) ? (yearInd + i) : (yearInd + i + (month == 10 ? 1 : 0));
          termLabel[i * 6 + idx] = `${yearSuffix}年度${termLabels[order[idx]]}`;
        });
      }
      
      // ラベル要素の更新
      for (let i = 0; i < PlanningRows; i++) {
        const labelId = `label-${i}`;
        const labelEle = document.getElementById(labelId);
        if (labelEle) {
          labelEle.textContent = termLabel[i];
        }
      }
    }

    updateTermLabel();
    if (isNaN(displayTerm) || displayTerm < 0 || displayTerm > PlanningRows) return;
    const tableRows = tableBody.getElementsByTagName('tr');
    for (let i = 0; i < PlanningRows; i++) {
        tableRows[i].style.display = (i < displayTerm) ? '' : 'none';
    }
    tableRows[0].style.display = 'none';
    if(month.value == 10) {
      tableRows[2].style.display = 'none'; //10月入学は1年目の秋スクを受けられない
    }
  }

  function updateActualTable() {
    function createRadioButtons(rowId) {
      const div = document.createElement('div');
      div.className = 'radio-group';
      const radioOptions = ['未', '合格', '失効'];
    
      radioOptions.forEach((value, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `radio-group-${rowId}`;
        input.value = value;
        if (value === '合格') {
          input.checked = true; // 「合格」を既定でチェック
        }
        label.appendChild(input);
        label.appendChild(document.createTextNode(value));
        div.appendChild(label);
      });
      return div;
    }
  
    const ActualBody = document.getElementById('ActualBody');
    ActualBody.innerHTML = '';
    const filterCriteria = ['--',' '];
    let totalUnit = 0;
  
    for (let i = 0; i < PlanningRows; i++) {
      for (let j = 0; j < groups; j++) {
        function createDropdown2(options) {
          if(!Array.isArray(options)) {return};
          //console.log(options);
          const select = document.createElement('select');
          options.forEach(value => {
            const opt = document.createElement('option');
            opt.value = value;
            opt.textContent = value;
            select.appendChild(opt);
          });
          return select;
        }
  
        function createInput(type, min, max, value, className, eventListener) {
          const input = document.createElement('input');
          input.type = type;
          if (min !== undefined) input.min = min;
          if (max !== undefined) input.max = max;
          input.value = value;
          if (className) input.classList.add(className);
          if (eventListener) input.addEventListener('change', eventListener);
          return input;
        }
  
        function createTableCell(content, className = '') {
          const cell = document.createElement('td');
          if (content instanceof Node) {
            cell.appendChild(content);
          } else {
            cell.textContent = content;
          }
          if (className) cell.classList.add(className);
          return cell;
        }

        const selectLabel = document.getElementById(`label-${i}`);
        const selectedLabelVal = selectLabel ? selectLabel.textContent : null;
        const select = document.getElementById(`subject-${i}-${j}`);
        const selectedValue = select ? select.value : null;
        if (!selectedLabelVal || !selectedValue) return; 

        const selectedOption = Array.from(select.options).find(opt => opt.value === selectedValue);
        const shouldExclude = filterCriteria.some(criteria => selectedValue.includes(criteria));
        const radioButtonsDiv = createRadioButtons(i * groups + j);
        
        const rowId = `actual-${i}-${j}`
        const row = document.createElement('tr');
        row.id = rowId;
        //console.log(row.id);
        row.appendChild(createTableCell(selectedLabelVal, 'examName'));
        row.appendChild(createTableCell(selectedValue, 'subjectName'));
        
        const gradeOptions = ['未', 'S', 'A', 'B', 'C', 'D'];
        const dropdown = createDropdown2(gradeOptions);
        dropdown.classList.add('dropdown');
        const optionsCell1 = createTableCell(dropdown, 'dropdown-cell');
        optionsCell1.addEventListener('change', () => refresh('byActual'));
        row.appendChild(optionsCell1);
  
        const optionsCell2 = createTableCell(radioButtonsDiv, 'radio-buttons-cell');
        optionsCell2.addEventListener('change', () => refresh('byActual'));
        row.appendChild(optionsCell2);
  
        const unitInput = createInput('number', 0, 8, selectedOption ? parseInt(selectedOption.dataset.unit, 10) : 0, 'unit-input', () => refresh('byActual'));
        const unitCell = createTableCell(unitInput);
        row.appendChild(unitCell);
        //console.log(selectedOption.dataset.subcategories,selectedOption.dataset.subcategoriesA,selectedOption.dataset.subcategoriesB);

        function getSubCategories(dataset){
          switch (profile.value.section) {
            case '甲類':
              result = dataset.subcategoriesA ? checkSubcategory(dataset.subcategoriesA):checkSubcategory(dataset.subcategories);
              break;
            case '乙類':
              result = dataset.subcategoriesB ? checkSubcategory(dataset.subcategoriesB):checkSubcategory(dataset.subcategories);             break;
            default:
              result = checkSubcategory(dataset.subcategories);
              break;
          }
          return JSON.parse(result);
        }        
        const subcategories = getSubCategories(selectedOption.dataset);
        const subDropdown = createDropdown2(subcategories);
        subDropdown.classList.add('subDropdown');
        const subCateCell = createTableCell(subDropdown);
        subCateCell.addEventListener('change', () => refresh('byActual'));
        row.appendChild(subCateCell);
  
        const forms = JSON.parse(selectedOption.dataset.form);
        const formDropdown = createDropdown2(forms);
        formDropdown.classList.add('formDropdown');
        const formCell = createTableCell(formDropdown);
        formCell.addEventListener('change', () => refresh('byActual'));
        row.appendChild(formCell);
  
        ActualBody.appendChild(row);
  
        if (shouldExclude) row.classList.add('hidden');
  
        const radioChecked = radioButtonsDiv.querySelector('input[type="radio"]:checked');
        if ((dropdown.value !== '未' && dropdown.value !== 'D') && radioChecked && radioChecked.value === '合格') {
          totalUnit += unitInput.valueAsNumber;
        }
      }
    }
  
    document.getElementById('totalUnit').textContent = totalUnit;
  
  }
  
  const actions = {
    byProfile: [
      () => updateProfile('byOther'),
      getProfile,
      updatePlanningTable,
      updateActualTable,
      updateTotalUnit,
      showCharts,
      setUnitsTable
    ],
    byDepartment: [
      () => updateProfile('byDepartment'),
      getProfile,
      () => initPlanningTable('init'),
      updatePlanningTable,
      updateActualTable,
      updateTotalUnit,
      showCharts,
      setUnitsTable
    ],
    bySect: [
      getProfile,
      //() => initPlanningTable('init'),
      updatePlanningTable,
      updateActualTable,
      updateTotalUnit,
      showCharts,
      setUnitsTable
    ],
    byLang: [
      () => updateProfile('byOther'),
      getProfile,
      //() => initPlanningTable('init'),
      updatePlanningTable,
      updateActualTable,
      updateTotalUnit,
      showCharts,
      setUnitsTable
    ],
    byCourse: [
      () => updateProfile('byCourse'),
      getProfile,
      () => initPlanningTable('init'),
      updatePlanningTable,
      updateActualTable,
      updateTotalUnit,
      showCharts,
      setUnitsTable
    ],
    byPlan: [
      updateActualTable
    ],
    byActual: [
      updateTotalUnit,
      showCharts,
      setUnitsTable
    ],
    byTable: [
      getUnitsTable,
      showCharts
    ],
  };
  const functionsToRun = actions[mode] || [];
  functionsToRun.forEach(func => func());
}

function setupEventListeners() {
  function setProfile(){
    profile.Element1.year = document.getElementById('year_1');
    profile.Element1.month = document.getElementById('month_1');
    profile.Element1.department = document.getElementById('department_1');
    profile.Element1.section = document.getElementById('section_1');
    profile.Element1.course = document.getElementById('course_1');
    profile.Element1.language = document.getElementById('language_1');
    profile.Element1.stat = document.getElementById('apply_stat_1');
    profile.Element1.appLang = document.getElementById('apply_fl1_1');
    profile.Element2.year = document.getElementById('year');
    profile.Element2.month = document.getElementById('month');
    profile.Element2.department = document.getElementById('department');
    profile.Element2.section = document.getElementById('section');
    profile.Element2.course = document.getElementById('course');
    profile.Element2.language = document.getElementById('language');
    profile.Element2.stat = document.getElementById('apply_stat');
    profile.Element2.appLang = document.getElementById('apply_fl1');
    profile.Element2.years = document.getElementById('years');
    profile.Element2.months = document.getElementById('months');
  }

  function createSyncs() {
    function syncInputs(input1, input2, eventType) {
      input1.addEventListener(eventType, function() {
        input2.value = input1.value;
      });
      input2.addEventListener(eventType, function() {
        input1.value = input2.value;
      });
    }
    function syncCheckboxes(checkbox1, checkbox2) {
      checkbox1.addEventListener('change', function() {
        checkbox2.checked = checkbox1.checked;
      });
      checkbox2.addEventListener('change', function() {
        checkbox1.checked = checkbox2.checked;
      });
    }
    syncInputs(profile.Element1.year, profile.Element2.year, 'input');
    syncInputs(profile.Element1.month, profile.Element2.month, 'change');
    syncInputs(profile.Element1.department, profile.Element2.department, 'change');
    syncInputs(profile.Element1.section, profile.Element2.section, 'change');
    syncInputs(profile.Element1.course, profile.Element2.course, 'change');
    syncInputs(profile.Element1.language, profile.Element2.language, 'change');
    syncCheckboxes(profile.Element1.stat, profile.Element2.stat);
    syncCheckboxes(profile.Element1.appLang, profile.Element2.appLang);
  }

  function setListenersToProfile() {
    profile.Element1.year.addEventListener('change', () => refresh('byProfile'));
    profile.Element1.month.addEventListener('change', () => refresh('byProfile'));
    profile.Element1.department.addEventListener('change', () => refresh('byDepartment'));
    profile.Element1.section.addEventListener('change', () => refresh('bySect'));
    profile.Element1.course.addEventListener('change', () => refresh('byCourse'));
    profile.Element1.language.addEventListener('change', () => refresh('byLang'));
    profile.Element1.stat.addEventListener('change', () => refresh('byProfile'));
    profile.Element1.appLang.addEventListener('change', () => refresh('byProfile'));
    profile.Element2.year.addEventListener('change', () => refresh('byProfile'));
    profile.Element2.month.addEventListener('change', () => refresh('byProfile'));
    profile.Element2.department.addEventListener('change', () => refresh('byDepartment'));
    profile.Element2.section.addEventListener('change', () => refresh('bySect'));
    profile.Element2.course.addEventListener('change', () => refresh('byCourse'));
    profile.Element2.language.addEventListener('change', () => refresh('byLang'));
    profile.Element2.stat.addEventListener('change', () => refresh('byProfile'));
    profile.Element2.appLang.addEventListener('change', () => refresh('byProfile'));
    profile.Element2.years.addEventListener('change', () => refresh('byProfile'));
    profile.Element2.months.addEventListener('change', () => refresh('byProfile'));
  }

  function setListenersToTable() {
    elements.forEach(({ prefix, index }) => {
      document.getElementById(`${prefix}-text`).addEventListener('change', () => refresh('byTable'));
      document.getElementById(`${prefix}-school`).addEventListener('change', () => refresh('byTable'));
      document.getElementById(`${prefix}-media`).addEventListener('change', () => refresh('byTable'));
    });
  
    [1, 2, 3].forEach(i => {
      document.getElementById(`Arts${i}-subjNum`).addEventListener('change', () => refresh('byTable'));
    });
  }
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const csvData = e.target.result;
      entries = parseCSV(csvData);
      console.log(entries);
    };
    reader.readAsText(file);
  }
  // CSVデータのパースとマッピング処理
  function parseCSV(csvContent) {
    const headerMap = {
      '受講時期': 'examName',
      '群': 'groupName',
      '科目名': 'name',
      '評価': 'grade',
      'レポ合否': 'reportResult',
      '単位数': 'unitCount',
      '区分': 'category',
      '形態': 'form'
    };
    const lines = csvContent.split('\n');
    const headers = lines[0].split(','); // ヘッダー行を取得
    const data = lines.slice(1); // ヘッダー以外のデータ行を取得

    return data.map(line => {
      const values = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(value => value.replace(/^"(.*)"$/, '$1').trim());
      const entry = {};
      headers.forEach((header, index) => {
        const mappedKey = headerMap[header];
        if (mappedKey) {
          entry[mappedKey] = values[index];
        }
      });
      return entry;
    });
  }

  document.getElementById('csvFileInput').addEventListener('change', handleFileSelect);
  document.getElementById('csvFileInput2').addEventListener('change', handleFileSelect);
  setProfile();
  createSyncs();
  setListenersToProfile();
  setListenersToTable();
}