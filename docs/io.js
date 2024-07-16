document.addEventListener("DOMContentLoaded", function() {
          const sections = {
              '文学部': ['第1類', '第2類', '第3類'],
              '経済学部': [''],
              '法学部': ['甲類', '乙類'],
          };

          const departmentSelect = document.getElementById('department');
          const sectionSelect = document.getElementById('section');
          const courseSelect = document.getElementById('course');

          window.updateSections = function() {
            const department = departmentSelect.value;
            const scts = sections[department] || [];
            const html = scts.map(function(sct) {
                  return '<option value="' + sct + '">' + sct + '</option>';
              }).join('');
              sectionSelect.innerHTML = html;
              changeValue();
          }

          departmentSelect.addEventListener('change', updateSections);
          courseSelect.addEventListener('change', changeValue);

          updateSections();
      });
function writeGrades() {
    let result;
    let headerText;
    let commentText;
    let footerText;
    const gradesTexts = [];
    const titleList = ['認定:', '人文:', '社会:', '科学:', '統計:', '必語:', '他語:', '保体:', '必修:', '選必:', '選択:', '卒論:'];
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
      deptLabel = '-'
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
    console.log(str1[0]);
    const str2 = str1[1].replace(/--/g, "00").split('/');
    console.log(str2[0]);
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
}