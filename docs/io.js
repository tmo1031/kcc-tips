/* ToDo
-[] スクーリングの処理作成
-[] スクーリングマスター作成
-[] スクーリングの際にレポ合否を判定しない処理を追加
*/
const grades = Array.from({ length: 12 }, () => Array(3).fill(0));
var subjNum = new Array(5).fill(0);
var deptLabel = '-';
var sectLabel = '-';
var courseLabel = '-';
var termLabel = [];
const maxYear = 21;
const cols = 6;
const rows = maxYear*cols;
const reptRow = 6;
const Now = 2024;
const subCateOptions = ['人文', '社会', '科学', '統計', '必語', '他語', '保体', '必修', '選必', '選択'];
const formOptions = ['T', 'S', 'M/B'];

document.addEventListener("DOMContentLoaded", function() {
          const sections = {
              '文学部': ['第1類', '第2類', '第3類'],
              '経済学部': [''],
              '法学部': ['甲類', '乙類'],
          };
          var depCategories = [""];
          var initLevel = 0;

          const year1 = document.getElementById('year_1');
          const month1 = document.getElementById('month_1');
          const departmentSelect1 = document.getElementById('department_1');
          const sectionSelect1 = document.getElementById('section_1');
          const courseSelect1 = document.getElementById('course_1');
          const language1 = document.getElementById('language_1');
          const stat1 = document.getElementById('apply_stat_1');
          const aplang1 = document.getElementById('apply_fl1_1');
          const year = document.getElementById('year');
          const month = document.getElementById('month');
          const departmentSelect = document.getElementById('department');
          const sectionSelect = document.getElementById('section');
          const courseSelect = document.getElementById('course');
          const language = document.getElementById('language');
          const stat = document.getElementById('apply_stat');
          const aplang = document.getElementById('apply_fl1');
          const years = document.getElementById('years');
          const months = document.getElementById('months');
          var dispterm = 0; // 表示するドロップダウンリストの数
          const tableBody = document.querySelector('#dropdownTable tbody');

          year1.addEventListener('input', function() {
            year.value = year1.value;
            updateTermLabel();
            initPlanSheet();
          });
          year.addEventListener('input', function() {
            year1.value = year.value;
            updateTermLabel();
            initPlanSheet();
          });
          month1.addEventListener('change', function() {
            month.value = month1.value;
            updateTermLabel();
            initPlanSheet();
          });
          month.addEventListener('change', function() {
            month1.value = month.value;
            updateTermLabel();
            initPlanSheet();
          });
          departmentSelect1.addEventListener('change', function() {
            departmentSelect.value = departmentSelect1.value;
            updateSections();
            updateFilter();
            initPlanSheet();
            updateSelectedValuesTable();
          });
          departmentSelect.addEventListener('change', function() {
            departmentSelect1.value = departmentSelect.value;
            updateSections();
            updateFilter();
            initPlanSheet();
            updateSelectedValuesTable();
          });
          sectionSelect1.addEventListener('change', function() {
            sectionSelect.value = sectionSelect1.value;
            changeValue();
            updateFilter();
            initPlanSheet();
            updateSelectedValuesTable();
          });
          sectionSelect.addEventListener('change', function() {
            sectionSelect1.value = sectionSelect.value;
            changeValue();
            updateFilter();
            initPlanSheet();
            updateSelectedValuesTable();
          });
          courseSelect1.addEventListener('change', function() {
            courseSelect.value = courseSelect1.value;
            changeValue();
            updateFilter();
            initPlanSheet();
            updateSelectedValuesTable();
          });
          courseSelect.addEventListener('change', function() {
            courseSelect1.value = courseSelect.value;
            changeValue();
            updateFilter();
            initPlanSheet();
            updateSelectedValuesTable();
          });
          language1.addEventListener('change', function() {
            language.value = language1.value;
            initPlanSheet();
            updateSelectedValuesTable();
          });
          language.addEventListener('change', function() {
            language1.value = language.value;
            initPlanSheet();
            updateSelectedValuesTable();
          });
          stat1.addEventListener('change', function() {
            stat.checked = stat1.checked;
            changeValue();
          });
          stat.addEventListener('change', function() {
            stat1.checked = stat.checked;
            changeValue();
          });
          aplang1.addEventListener('change', function() {
            aplang.checked = aplang1.checked;
            changeValue();
          });
          aplang.addEventListener('change', function() {
            aplang1.checked = aplang.checked;
            changeValue();
          });
          years.addEventListener('change', function() {
            dispterm = parseInt(years.value * 2 + months.value/6)*3;
            updatePlanSheet();
          });
          months.addEventListener('change', function() {
            dispterm = parseInt(years.value * 2 + months.value/6)*3;
            updatePlanSheet();
          });

          window.updateSections = function() {
            const department = departmentSelect.value;
            const scts = sections[department] || [];
            const html = scts.map(function(sct) {
                  return '<option value="' + sct + '">' + sct + '</option>';
              }).join('');
              sectionSelect.innerHTML = html;
              sectionSelect1.innerHTML = html;
              changeValue();
          }

          function filterTerms(year, term, pattern) {
            const isOdd = parseInt(year)% 2 === 1;
            switch (pattern){
              case 'Both':
                result = true;
                break;
              case 'A':
                result = term == 'A';
                break;
              case 'B':
                result = term == 'B';
                break;
              case 'OddA':
                result = (isOdd && term == 'A')||(!isOdd && term == 'B');
                break;
              case 'OddB':
                  result = (isOdd && term == 'B')||(!isOdd && term == 'A');
                  break;
              }
              return result;
          }

          function filterSchedule(year, term, group, schedule) {
            if(year < 2019 || year > Now){
              return true;
            }
            if (!Array.isArray(schedule)) {
              return false;
            }
            const foundItem = schedule.find(item => 
              Array.isArray(item) && item.length >= 3 && item[0] === year && item[1] === term && item[2] === group
            );
            return foundItem ? true : false;
          }

          function filterOptionsByCategories(options, categories, maxLevel, group, year, term) {
            return options.filter(option =>
              option.category.some(cat => categories.includes(cat)) &&
              option.level <= maxLevel &&
              (option.group ? option.group === group || option.group === '' : true) &&
              (option.start ? option.start <=  year && option.end >= year : true) &&
              (option.pattern ? filterTerms(year, term, option.pattern): true) &&
              (option.schedule ? filterSchedule(year, term, group, option.schedule): true) &&
//              (option.term && Array.isArray(option.term) ? option.term.some(t => t === term) : true) &&
              (option.filter ? option.filter(categories, year, term) : true)&&
              (option.COVID19filter ? option.COVID19filter(year, term, group) : true)
            );
          }
      
          function checkSubcategory(subcategory){
            let result = [];
            switch (subcategory) {
              case 'any':
                result = ['人文', '社会', '科学', '統計', '必語', '他語', '保体', '必修', '選必', '選択', '自由'];
                break;
              case '人文':
              case '社会':
              case '科学':
              case '統計':
              case '他語':
              case '保体':
              case '必修':
              case '選必':
              case '選択':
                result[0] = subcategory;
                break;
              case '英':
                result[0] = (language.value == '英語') ? '必語':'他語';
                break;
              case '独':
                result[0] = (language.value == 'ドイツ語') ? '必語':'他語';
                break;
              case '仏':
                result[0] = (language.value == 'フランス語') ? '必語':'他語';
                break;
              case '1類':
                result[0] = (sectionSelect.value == '第1類') ? '必修':'選択';
                break;
              case '2類':
                result[0] = (sectionSelect.value == '第2類') ? '必修':'選択';
                break;
              case '3類':
                result[0] = (sectionSelect.value == '第3類') ? '必修':'選択';
                break;
              case '共通':
                result[0] = (departmentSelect .value == '文学部') ? '必修':'選択';
                break;
                  }
            return JSON.stringify(result);
          }

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

          function createDropdown(options) {
            const select = document.createElement('select');
            options.forEach(option => {
              const opt = document.createElement('option');
              opt.value = option.value;
              opt.textContent = option.value;
              opt.dataset.unit = option.unit;
              let subCat;
              if (Array.isArray(option.subcategory)) {
                subCat = sectionSelect.value === '甲類' ? option.subcategory[0] : option.subcategory[1]; 
              } else {
                subCat = option.subcategory;
              }
              opt.dataset.subcategory = checkSubcategory(subCat);
              opt.dataset.form = checkForm(option.form);
              select.appendChild(opt);
            });
            return select;
          }

          function createDropdown2(options) {
            const select = document.createElement('select');
            options.forEach(value => {
              const opt = document.createElement('option');
              opt.value = value;
              opt.textContent = value;
              select.appendChild(opt);
            });
        
            return select;
          }

          function initPlanSheet() {
            tableBody.innerHTML = '';
            for (let i = 0; i < rows; i++) {
              const row = document.createElement('tr');
              const labelCell = document.createElement('td');
              const categoriesToFilter = depCategories;
              const currentYear = Math.floor(i / reptRow);
              const maxLevel = initLevel + (currentYear) * 2;
              const GroupArray = ['A', 'B', 'C', 'D', 'E', 'F'];
              const term_check = i % reptRow;
              var term = '';
              var columnOptions;

              switch (term_check) {
                case 0:
                case 3:
                    columnOptions = [...optionsData.default, ...optionsData.text, ...optionsData.other];
                  break;
                case 1:
                case 4:
                    if(i < 3){
                    columnOptions = [...optionsData.default, ...optionsData.text, ...optionsData.other];
                  }else{
                    columnOptions = [...optionsData.default, ...optionsData.text, ...optionsData.media, ...optionsData.other];
                  }
                  break;
                case 2:
                case 5:
                  columnOptions = [...optionsData.default, ...optionsData.school, ...optionsData.other];
                  break;
              }

              const yearValue = parseInt(year.value);
              const parsedYear = isNaN(yearValue) ? 2000 : yearValue + currentYear;

              if (month.value == 4 || month.value == '') {
                  term = term_check < 3 ? 'A': 'B';
                  adj = 0;             
              } else if (month.value == 10) {
                  term = term_check < 3 ? 'B': 'A';
                  adj = term_check < 3 ? 0 : 1;              
              }

              const y = parsedYear + adj;

              if(i===0){
                console.log(term);
                console.log(y);
              }

              labelCell.id = `label-${i}`;
              labelCell.textContent = termLabel[i];
              row.appendChild(labelCell);
          
              for (let j = 0; j < cols; j++) {        
                const filteredOptions = filterOptionsByCategories(columnOptions, categoriesToFilter, maxLevel, GroupArray[j], y, term);
                const cell = document.createElement('td');
                const select = createDropdown(filteredOptions);
          
                select.id = `subject-${i}-${j}`;
                select.addEventListener('change', updateSelectedValuesTable);
          
                cell.appendChild(select);
                row.appendChild(cell);
              }
          
              tableBody.appendChild(row);
            }
            updatePlanSheet();
          }

          function updatePlanSheet(){
            updateTermLabel();
            if (isNaN(dispterm) || dispterm < 0 || dispterm > rows) return;
            const tableRows = tableBody.getElementsByTagName('tr');
            for (let i = 0; i < rows; i++) {
                tableRows[i].style.display = (i < dispterm) ? '' : 'none';
            }
            tableRows[0].style.display = 'none';
            if(month.value == 10) {
              tableRows[2].style.display = 'none'; //10月入学は1年目の秋スクを受けられない
            }
          }

          function updateFilter() {
            switch (courseSelect.value) {
              case '普通課程':
                initLevel = 2;
                switch (departmentSelect.value) {
                  case '文学部':
                    depCategories = ["","A","F","L"];
                    break;
                  case '経済学部':
                    depCategories = ["","A","F","E"];
                    break;
                  case '法学部':
                    depCategories = ["","A","F","J"];
                    break;
                  default:
                    depCategories = [""];
                    break;
                }
                break;
              case '特別課程':
                initLevel = 4;
                switch (departmentSelect.value) {
                  case '文学部':
                    depCategories = ["","A","F","L"];
                    break;
                  case '経済学部':
                    depCategories = ["","A","F","E"];
                    break;
                  case '法学部':
                    depCategories = ["","A","F","J"];
                    break;
                  default:
                    depCategories = [""];
                    break;
                }
                break;
              case '学士入学':
                initLevel = 5;
                switch (departmentSelect.value) {
                  case '文学部':
                    depCategories = ["","F","L"];
                    break;
                  case '経済学部':
                    depCategories = ["","F","E"];
                    break;
                  case '法学部':
                    depCategories = ["","F","J"];
                    break;
                  default:
                    depCategories = [""];
                    break;
                }
                break;
              default:
                initLevel = 0;
                depCategories = [""];
                break;
            }
          }


        
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

          function updateTotalUnit() {
            const selectedRows = document.querySelectorAll('#selectedValuesBody tr');
            totalUnit = 0;
            for (let i = 0; i < grades.length; i++) {
              for (let j = 0; j < grades[i].length; j++) {
                grades[i][j] = 0;
              }
            }
            
        
            selectedRows.forEach(row => {
              const radioChecked = row.querySelector('.radio-group input[type="radio"]:checked');
              const unitInput = row.querySelector('.unit-input');
              const dropdown = row.querySelector('.dropdown');
              const subDropdown = row.querySelector('.subDropdown');
              const formDropdown = row.querySelector('.formDropdown');

              if ((dropdown.value !== '未' && dropdown.value !== 'D') && radioChecked && radioChecked.value === '合格') {
                totalUnit += unitInput.valueAsNumber;
                for(let i = 0; i < subCateOptions.length; i++) {
                  for (let j = 0; j < formOptions.length; j++) {
                    if (subDropdown.value === subCateOptions[i] && formDropdown.value === formOptions[j] ){        
                      grades[i+1][j] += unitInput.valueAsNumber;
                      if (i == 3) {
                        grades[i][j] += unitInput.valueAsNumber;
                      }
                    }    
                  }
                }
              }
            })
            document.getElementById('totalUnit').textContent = totalUnit;
            updateForm();
            changeValue();
          }

          function updateSelectedValuesTable() {
            const selectedValuesBody = document.getElementById('selectedValuesBody');
            selectedValuesBody.innerHTML = '';
            const filterCriteria = ['----テキスト----', '----Eスク----', '--'];
            let totalUnit = 0;

            for (let i = 0; i < rows; i++) {
              for (let j = 0; j < cols; j++) {
                const selectLabel = document.getElementById(`label-${i}`);
                const selectedLabelVal = selectLabel.textContent;
                const select = document.getElementById(`subject-${i}-${j}`);
                const selectedValue = select.value;
                const selectedOption = Array.from(select.options).find(opt => opt.value === selectedValue);
                const shouldExclude = filterCriteria.some(criteria => selectedValue.includes(criteria));
                const GroupArray = ['A群', 'B群', 'C群', 'D群', 'E群', 'F群'];
                const radioButtonsDiv = createRadioButtons(i*cols+j);
                const row = document.createElement('tr');

                const labelCell = document.createElement('td');
                //labelCell.textContent = selectedLabelVal + '-' + GroupArray[j];
                labelCell.textContent = selectedLabelVal;
                row.appendChild(labelCell);

                const cell = document.createElement('td');
                cell.textContent = selectedValue;
                row.appendChild(cell);

                const optionsCell1 = document.createElement('td');
                const gradeOptions = ['未', 'S', 'A', 'B', 'C', 'D'];
                const dropdown = createDropdown2(gradeOptions);
                dropdown.classList.add('dropdown'); // クラス名を設定
                optionsCell1.appendChild(dropdown); // Pass an empty array since we're using default options
                optionsCell1.addEventListener('change', updateTotalUnit);
                row.appendChild(optionsCell1);

                const optionsCell2 = document.createElement('td');
                optionsCell2.appendChild(radioButtonsDiv);
                optionsCell2.addEventListener('change', updateTotalUnit);
                row.appendChild(optionsCell2);

                const unitCell = document.createElement('td');
                const unitInput = document.createElement('input');
                unitInput.type = 'number';
                unitInput.min = 0;
                unitInput.max = 8;
                unitInput.value = selectedOption ? parseInt(selectedOption.dataset.unit, 10) : 0;
                unitInput.classList.add('unit-input'); 
                unitInput.addEventListener('change', updateTotalUnit);
                unitCell.appendChild(unitInput);
                row.appendChild(unitCell);

                const subCateCell = document.createElement('td');
                const subcategories = JSON.parse(selectedOption.dataset.subcategory);
                const subDropdown = createDropdown2(subcategories);
                subDropdown.classList.add('subDropdown'); // クラス名を設定
                //subDropdown.value = selectedOption ? selectedOption.dataset.subcategory : 0;
                subCateCell.appendChild(subDropdown);
                subCateCell.addEventListener('change', updateTotalUnit);
                row.appendChild(subCateCell);

                const formCell = document.createElement('td');
                const forms = JSON.parse(selectedOption.dataset.form);
                const formDropdown = createDropdown2(forms);
                formDropdown.classList.add('formDropdown'); // クラス名を設定
                formCell.appendChild(formDropdown);
                formCell.addEventListener('change', updateTotalUnit);
                row.appendChild(formCell);

                selectedValuesBody.appendChild(row);

                if (shouldExclude) {
                  row.classList.add('hidden');
                }

                const radioChecked = radioButtonsDiv.querySelector('input[type="radio"]:checked');
                if ((dropdown.value !== '未' && dropdown.value !== 'D') && radioChecked && radioChecked.value === '合格') {
                  totalUnit += unitInput.valueAsNumber;
                }
                
              }
            }
            document.getElementById('totalUnit').textContent = totalUnit;
          }

          initPlanSheet();
          updateTermLabel();
          updateSections();
          updatePlanSheet();
          updateSelectedValuesTable();
      });

function writeGrades() {
    let result;
    let headerText;
    let commentText;
    let footerText;
    const gradesTexts = [];
    const titleList = ['認定:', '人文:', '社会:', '科学:', '統計:', '必語:', '他語:', '保体:', '必修:', '選必:', '選択:', '卒論:'];
    getForm();
    for (i = 0; i < 12; i++) {
        gradesTexts[i] = [];
        for (j = 1; j < 4; j++) {
        if(grades[i][j-1] == 0) {
            gradesTexts[i][j] = '--';
        } else if (grades[i][j-1] < 10) {
            gradesTexts[i][j] = '0' + grades[i][j-1];
        } else {
            gradesTexts[i][j] = grades[i][j-1];
        }
        }
        gradesTexts[i][0] = titleList[i];
        gradesTexts[i][4] = '\n';
    }

    let commentbox = document.getElementById('commentText');
    commentText = commentbox.value;
    if(commentText.length > 27) { commentText = ''; }

    headerText = '慶應通信履修状況(学部:' + deptLabel + sectLabel + '/' + courseLabel +')\n';
    footerText = 'コメント:' + commentText + '\n';
    result = gradesTexts.join("");
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

function readGrades() {
  const inputText = document.getElementById('textarea').value;
  const textline = inputText.split('\n');
  const departmentid = $('#department');
  const sectionid = $('#section');
  const courseid = $('#course');

  if (textline[0].includes('文')) {
    departmentid.val('文学部');
    updateSections();
    if (textline[0].includes('1')) {
      sectionid.val('第1類');
    } else if (textline[0].includes('2')) {
      sectionid.val('第2類');
    } else if (textline[0].includes('3')) {
      sectionid.val('第3類');
    }
  } else if (textline[0].includes('経')) {
    departmentid.val('経済学部');
      updateSections();
  } else if (textline[0].includes('法')) {
    departmentid.val('法学部');
    updateSections();
    if (textline[0].includes('法甲')) {
        sectionid.val('甲類');
    }else if (textline[0].includes('法乙')) {
      sectionid.val('乙類');
    }        
  } else {
    departmentid.val('学部')
  }
  if (textline[0].includes('/普')) {
    courseid.val('普通課程');
  } else if (textline[0].includes('/特')){
    courseid.val('特別課程');
  } else if (textline[0].includes('/学')){
    courseid.val('学士入学');
  } else {
    courseid.val('入学課程');
  }

  for (i = 3; i < 14; i++) {
    const str1 = textline[i].split(':');
    const str2 = str1[1].replace(/--/g, "00").split('/');
    switch (str1[0]) {
      case '保体':
        for (j =0; j < 2; j++) {
          grades[i-2][j] = parseInt(str2[j]);
        } 
        break;
      case '卒論':
        for (j =0; j < 1; j++) {
          grades[i-2][j] = parseInt(str2[j]);
        } 
          break;
      default:
        for (j =0; j < 3; j++) {
          grades[i-2][j] = parseInt(str2[j]);
        } 
        break;
      }
  }
  updateForm();
  changeValue();
}

function getForm(){
  grades[1][0] = parseInt(document.getElementById('arts1-text').value);
  grades[1][1] = parseInt(document.getElementById('arts1-school').value);
  grades[1][2] = parseInt(document.getElementById('arts1-media').value);
  grades[2][0] = parseInt(document.getElementById('arts2-text').value);
  grades[2][1] = parseInt(document.getElementById('arts2-school').value);
  grades[2][2] = parseInt(document.getElementById('arts2-media').value);
  grades[3][0] = parseInt(document.getElementById('arts3-text').value);
  grades[3][1] = parseInt(document.getElementById('arts3-school').value);
  grades[3][2] = parseInt(document.getElementById('arts3-media').value);
  grades[4][0] = parseInt(document.getElementById('stat-text').value);
  grades[4][1] = parseInt(document.getElementById('stat-school').value);
  grades[4][2] = parseInt(document.getElementById('stat-media').value);
  grades[5][0] = parseInt(document.getElementById('fl1-text').value);
  grades[5][1] = parseInt(document.getElementById('fl1-school').value);
  grades[5][2] = parseInt(document.getElementById('fl1-broad').value);
  grades[6][0] = parseInt(document.getElementById('fl2-text').value);
  grades[6][1] = parseInt(document.getElementById('fl2-school').value);
  grades[6][2] = parseInt(document.getElementById('fl2-broad').value);
  grades[7][0] = parseInt(document.getElementById('sports-text').value);
  grades[7][1] = parseInt(document.getElementById('sports-school').value);
  grades[8][0] = parseInt(document.getElementById('required-text').value);
  grades[8][1] = parseInt(document.getElementById('required-school').value);
  grades[8][2] = parseInt(document.getElementById('required-media').value);
  grades[9][0] = parseInt(document.getElementById('elective1-text').value);
  grades[9][1] = parseInt(document.getElementById('elective1-school').value);
  grades[9][2] = parseInt(document.getElementById('elective1-media').value);
  grades[10][0] = parseInt(document.getElementById('elective2-text').value);
  grades[10][1] = parseInt(document.getElementById('elective2-school').value);
  grades[10][2] = parseInt(document.getElementById('elective2-media').value);
  grades[11][0] = parseInt(document.getElementById('thesis-total').value);
  subjNum[1] = parseInt(document.getElementById('arts1-subjNum').value);
  subjNum[2] = parseInt(document.getElementById('arts2-subjNum').value);
  subjNum[3] = parseInt(document.getElementById('arts3-subjNum').value);
}

function updateForm(){
  document.getElementById('arts1-text').value = grades[1][0];
  document.getElementById('arts1-school').value = grades[1][1];
  document.getElementById('arts1-media').value = grades[1][2];
  document.getElementById('arts2-text').value = grades[2][0];
  document.getElementById('arts2-school').value = grades[2][1];
  document.getElementById('arts2-media').value = grades[2][2];
  document.getElementById('arts3-text').value = grades[3][0];
  document.getElementById('arts3-school').value = grades[3][1];
  document.getElementById('arts3-media').value = grades[3][2];
  document.getElementById('stat-text').value = grades[4][0];
  document.getElementById('stat-school').value = grades[4][1];
  document.getElementById('stat-media').value = grades[4][2];
  document.getElementById('fl1-text').value = grades[5][0];
  document.getElementById('fl1-school').value = grades[5][1];
  document.getElementById('fl1-broad').value = grades[5][2];
  document.getElementById('fl2-text').value = grades[6][0];
  document.getElementById('fl2-school').value = grades[6][1];
  document.getElementById('fl2-broad').value = grades[6][2];
  document.getElementById('sports-text').value = grades[7][0];
  document.getElementById('sports-school').value = grades[7][1];
  document.getElementById('required-text').value = grades[8][0];
  document.getElementById('required-school').value = grades[8][1];
  document.getElementById('required-media').value = grades[8][2];
  document.getElementById('elective1-text').value = grades[9][0];
  document.getElementById('elective1-school').value = grades[9][1];
  document.getElementById('elective1-media').value = grades[9][2];
  document.getElementById('elective2-text').value = grades[10][0];
  document.getElementById('elective2-school').value = grades[10][1];
  document.getElementById('elective2-media').value = grades[10][2];
  document.getElementById('thesis-total').value = grades[11][0];
  document.getElementById('arts1-subjNum').value = subjNum[1];
  document.getElementById('arts2-subjNum').value = subjNum[2];
  document.getElementById('arts3-subjNum').value = subjNum[3];
}

function updateTermLabel(){
  const year = document.getElementById('year');
  const month = document.getElementById('month');
  yearInd = isNaN(parseInt(year.value)) ? 1 : parseInt(year.value) % 100;
  if (isNaN(parseInt(year.value))){
    if (month.value == 4 || month.value == '') {
      for (let i = 0; i < 21; i++) {
        termLabel[i*6] = String(yearInd + i) + '年目4月試験';
        termLabel[i*6+1] = String(yearInd + i) + '年目7月試験';
        termLabel[i*6+2] = String(yearInd + i) + '年目夏スク';
        termLabel[i*6+3] = String(yearInd + i) + '年目10月試験';
        termLabel[i*6+4] = String(yearInd + i) + '年目1月試験';
        termLabel[i*6+5] = String(yearInd + i) + '年目秋スク';
      }
    } else if (month.value == 10) {
      for (let i = 0; i < 21; i++) {
        termLabel[i*6] = String(yearInd + i) + '年目10月試験';
        termLabel[i*6+1] = String(yearInd + i) + '年目1月試験';
        termLabel[i*6+2] = String(yearInd + i) + '年目秋スク';
        termLabel[i*6+3] = String(yearInd + i) + '年目4月試験';
        termLabel[i*6+4] = String(yearInd + i) + '年目7月試験';
        termLabel[i*6+5] = String(yearInd + i) + '年目夏スク';
      }
    }
  } else {
    if (month.value == 4 || month.value == '') {
      for (let i = 0; i < 21; i++) {
        termLabel[i*6] = String(yearInd + i) + '年度4月試験';
        termLabel[i*6+1] = String(yearInd + i) + '年度7月試験';
        termLabel[i*6+2] = String(yearInd + i) + '年度夏スク';
        termLabel[i*6+3] = String(yearInd + i) + '年度10月試験';
        termLabel[i*6+4] = String(yearInd + i) + '年度1月試験';
        termLabel[i*6+5] = String(yearInd + i) + '年度秋スク';
      }
    } else if (month.value == 10) {
      for (let i = 0; i < 21; i++) {
        termLabel[i*6] = String(yearInd + i) + '年度10月試験';
        termLabel[i*6+1] = String(yearInd + i) + '年度1月試験';
        termLabel[i*6+2] = String(yearInd + i) + '年度秋スク';
        termLabel[i*6+3] = String(yearInd + i +1) + '年度4月試験';
        termLabel[i*6+4] = String(yearInd + i +1) + '年度7月試験';
        termLabel[i*6+5] = String(yearInd + i +1) + '年度夏スク';
      }
    }
  }
  for (let i = 0; i < rows; i++) {
    const labelId = `label-${i}`;
    const labelEle = document.getElementById(labelId);
    if (labelEle) {
        labelEle.textContent = termLabel[i];
    }
  }
}