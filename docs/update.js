window.changeValue = function () {
  if (document.getElementById('apply_stat').checked) { $('#stat-text').val(4); }
  if (document.getElementById('apply_fl1').checked) { $('#fl1-text').val(8); }

  switch ($('#department option:selected').val()) { //N6/S4/B0
    case '文学部':
      stat = 0;
      required = 28;
      elective = 0;
      deptLabel = '文';
      sectLabel = $('#section option:selected').val().charAt(1);
      break;
    case '経済学部':
      stat = 4;
      required = 17;
      elective = 0;
      deptLabel = '経';
      sectLabel = '';
      break;
    case '法学部':
      stat = 0;
      required = 10;
      elective = 20;
      deptLabel = '法';
      sectLabel = $('#section option:selected').val().charAt(0);
      break;
    default:
      stat = 0;
      required = 0;
      elective = 0;
      deptLabel = '-';
      break;
  }

  switch ($('#course option:selected').val()) { //N6/S4/B0
    case '普通課程':
      arts = 6;
      artsSubN = 2;
      schooling = 30;
      apply_total = grades[0][0] = 0;
      courseLabel = '普';
      break;
    case '特別課程':
      arts = 4;
      artsSubN = 1;
      schooling = 22;
      apply_total = grades[0][0] = 18;
      courseLabel = '特';
      break;
    case '学士入学':
      arts = 0;
      artsSubN = 0;
      schooling = 15;
      if ($('#department option:selected').val() == '経済学部' && !(document.getElementById('apply_stat').checked)) {
        apply_total = grades[0][0] = 36;
      } else {
        apply_total = grades[0][0] = 40;
      }
      courseLabel = '学';
      break;
    default:
      arts = 6;
      artsSubN = 2;
      schooling = 30;
      courseLabel = '-';
      break;
  }

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

  calcValue();

  $('#arts1-text').val(grades[1][0]);
  $('#arts1-school').val(grades[1][1]);
  $('#arts1-media').val(grades[1][2]);
  $('#arts2-text').val(grades[2][0]);
  $('#arts2-school').val(grades[2][1]);
  $('#arts2-media').val(grades[2][2]);
  $('#arts3-text').val(grades[3][0]);
  $('#arts3-school').val(grades[3][1]);
  $('#arts3-media').val(grades[3][2]);
  $('#stat-text').val(grades[4][0]);
  $('#stat-school').val(grades[4][1]);
  $('#stat-media').val(grades[4][2]);
  $('#fl1-text').val(grades[5][0]);
  $('#fl1-school').val(grades[5][1]);
  $('#fl1-broad').val(grades[5][2]);
  $('#fl2-text').val(grades[6][0]);
  $('#fl2-school').val(grades[6][1]);
  $('#fl2-broad').val(grades[6][2]);
  $('#sports-text').val(grades[7][0]);
  $('#sports-school').val(grades[7][1]);
  $('#required-text').val(grades[8][0]);
  $('#required-school').val(grades[8][1]);
  $('#required-media').val(grades[8][2]);
  $('#elective1-text').val(grades[9][0]);
  $('#elective1-school').val(grades[9][1]);
  $('#elective1-media').val(grades[9][2]);
  $('#elective2-text').val(grades[10][0]);
  $('#elective2-school').val(grades[10][1]);
  $('#elective2-media').val(grades[10][2]);
  $('#thesis-total').val(grades[11][0]);
  $('#arts1_SubjN').val(subjNum[1]);
  $('#arts2_SubjN').val(subjNum[2]);
  $('#arts3_SubjN').val(subjNum[3]);

}

window.calcValue = function () {
  arts1_SubjN = subjNum[1];
  arts2_SubjN = subjNum[2];
  arts3_SubjN = subjNum[3];
  stat_text = Math.min(4, grades[4][0]);
  arts_text = (apply_total == 36) ? stat_text : ((courseLabel == '学') ? 0 : (grades[1][0] + grades[2][0] + grades[3][0]));
  fl1_text = (document.getElementById('apply_fl1').checked) ? 8 : Math.min(6, grades[5][0]);
  fl2_text = (courseLabel == '学') ? 0 : Math.min(4, grades[6][0]);
  sports_text = (courseLabel == '学') ? 0 : Math.min(4, grades[7][0]);
  libarts_text = Math.min(40, apply_total + arts_text) + fl1_text + fl2_text + sports_text;
  special_text = grades[8][0] + grades[9][0] + grades[10][0];
  libarts_media = Math.min(10, grades[1][2] + grades[2][2] + grades[3][2] + grades[5][2] + grades[6][2]);
  special_media = Math.min(10, grades[8][2] + grades[9][2] + grades[10][2]);
  media_total = Math.min(10, libarts_media + special_media);
  media_exe = Math.max(0, grades[1][2] + grades[2][2] + grades[3][2] + grades[5][2] + grades[6][2] + grades[8][2] + grades[9][2] + grades[10][2] - 10);
  media_max = Math.max(grades[1][2], grades[2][2], grades[3][2], grades[5][2], grades[6][2], grades[8][2], grades[9][2], grades[10][2]);
  arts_school = (courseLabel == '学') ? 0 : Math.min(12, grades[1][1] + grades[2][1] + grades[3][1] + grades[1][2] + grades[2][2] + grades[3][2]);
  artsch_exe = (courseLabel == '学') ? 0 : Math.max(0, grades[1][1] + grades[2][1] + grades[3][1] + grades[1][2] + grades[2][2] + grades[3][2] - 12);
  artsch_max = (courseLabel == '学') ? 0 : Math.max(grades[1][1], grades[2][1], grades[3][1]);
  fl1_school = Math.min(4, grades[5][1] + grades[5][2]);
  fl2_school = Math.min(4, grades[6][1] + grades[6][2]);
  sports_school = (courseLabel == '学') ? 0 : Math.min(4, grades[7][1]);
  otherarts_school = fl1_school + fl2_school + sports_school
  special_school = Math.min(28, grades[8][1] + grades[9][1] + grades[10][1] + special_media);
  if (grades[1][2] == media_max || grades[2][2] == media_max || grades[3][2] == media_max) { arts_school = arts_school - media_exe }
  else if (grades[5][2] == media_max || grades[6][2] == media_max || grades[7][2] == media_max) { otherarts_school = otherarts_school - media_exe }
  else if (grades[8][2] == media_max || grades[9][2] == media_max || grades[10][2] == media_max) { special_school = special_school - media_exe }
  libarts_school = arts_school + otherarts_school;
  arts1_total = (courseLabel == '学') ? 0 : grades[1][0] + grades[1][1] + grades[1][2];
  arts2_total = (courseLabel == '学') ? 0 : grades[2][0] + grades[2][1] + grades[2][2];
  arts3_total = (courseLabel == '学') ? ((apply_total == 36) ? stat_text:0) : grades[3][0] + grades[3][1] + grades[3][2];
  if (grades[1][1] == artsch_max) { arts1_total = arts1_total - artsch_exe }
  else if (grades[2][1] == artsch_max) { arts2_total = arts2_total - artsch_exe }
  else if (grades[3][1] == artsch_max) { arts3_total = arts3_total - artsch_exe }
  stat_total = grades[4][0] + grades[4][1] + grades[4][2];
  fl1_total = Math.min(8, fl1_text + fl1_school);
  fl2_total = (courseLabel == '学') ? 0 : Math.min(4, fl2_text + fl2_school);
  sports_total = (courseLabel == '学') ? 0 : Math.min(4, sports_text + sports_school);
  required_total = grades[8][0] + grades[8][1] + grades[8][2];
  elective1_total = grades[9][0] + grades[9][1] + grades[9][2];
  elective2_total = grades[10][0] + grades[10][1] + grades[10][2];
  thesis_total = Math.min(8, grades[11][0]);
  arts_total = Math.min(40,apply_total + arts_text + arts_school);
  libarts_total = Math.min(48,arts_total + fl1_total + fl2_total + sports_total);
  special_total = required_total + elective1_total + elective2_total;
  text_total = libarts_text + special_text;
  school_total = libarts_school + special_school;
  total = Math.min(text_total + school_total + thesis_total, libarts_total + special_total + thesis_total);

  $('#apply-text').text(apply_total);

  $('#ID11001-unit').text(arts_total);
  $('#ID11101-unit').text(arts1_total);
  $('#ID11201-unit').text(arts2_total);
  $('#ID11301-unit').text(arts3_total);
  $('#ID11311-unit').text(stat_text);
  $('#ID12001-unit').text(Math.min(40,arts_text + apply_total));
  $('#ID20001-unit').text(fl1_total);
  $('#ID30001-unit').text(libarts_total);
  $('#ID40001-unit').text(required_total + elective1_total + elective2_total);
  $('#ID41001-unit').text(required_total);
  $('#ID42001-unit').text(elective1_total);
  $('#ID43001-unit').text(special_text);
  $('#ID50001-unit').text(text_total);
  $('#ID60001-unit').text(school_total);
  $('#ID70001-unit').text(thesis_total);

  $('#ID11001-req').text(arts3sum);
  $('#ID11101-req').text(arts);
  $('#ID11201-req').text(arts);
  $('#ID11301-req').text(arts);
  $('#ID11311-req').text(stat);
  $('#ID12001-req').text(arts3text);
  $('#ID20001-req').text(fl1);
  $('#ID30001-req').text(libarts);
  $('#ID40001-req').text(special);
  $('#ID41001-req').text(required);
  $('#ID42001-req').text(elective);
  $('#ID43001-req').text(spetext);
  $('#ID50001-req').text(textsum);
  $('#ID60001-req').text(schooling);
  $('#ID70001-req').text(thesis);

  $('#ID60001-admit').text(schooling);

  $('#total_units').text(total);
  $('#total_units2').text(total);

  var arts_total_prog = Math.min(arts_total / 32, 1);
  var arts1_total_prog = (arts == 0 ? 1 : Math.min(arts1_total / arts, arts1_SubjN >= artsSubN ? 1 : 0.99));
  var arts2_total_prog = (arts == 0 ? 1 : Math.min(arts2_total / arts, arts2_SubjN >= artsSubN ? 1 : 0.99));
  var arts3_total_prog = (arts == 0 ? 1 : Math.min(arts3_total / arts, arts3_SubjN >= artsSubN ? 1 : 0.99));
  var stat_text_prog = (stat == 0 ? 1 : Math.min(stat_text / stat, 1));
  var arts_text_prog = Math.min((arts_text + apply_total) / 24, 1);
  var fl1_total_prog = Math.min(fl1_total / 8, 1);
  var libarts_total_prog = Math.min(libarts_total / 48, 1);
  var special_total_prog = Math.min(special_total / 68, 1);
  var required_total_prog = (required == 0 ? 1 : Math.min(required_total / required, 1));
  var elective_total_prog = (elective == 0 ? 1 : Math.min(elective1_total / elective, 1));
  var special_text_prog = Math.min(special_text / 40, 1);
  var text_total_prog = Math.min(text_total / 70, 1);
  var school_total_prog = Math.min(school_total / schooling, 1);
  var thesis_total_prog = Math.min(thesis_total / 8, 1);

  $('#ID11001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(arts_total_prog));
  $('#ID11101-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(arts1_total_prog));
  $('#ID11201-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(arts2_total_prog));
  $('#ID11301-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(arts3_total_prog));
  $('#ID11311-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(stat_text_prog));
  $('#ID12001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(arts_text_prog));
  $('#ID20001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(fl1_total_prog));
  $('#ID30001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(libarts_total_prog));
  $('#ID40001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(special_total_prog));
  $('#ID41001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(required_total_prog));
  $('#ID42001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(elective_total_prog));
  $('#ID43001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(special_text_prog));
  $('#ID50001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(text_total_prog));
  $('#ID60001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(school_total_prog));
  $('#ID70001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(thesis_total_prog));

  arts_total >= 28 ? document.getElementById('ID11001-entry').className = 'done' : document.getElementById('ID11001-entry').className = 'none';
  arts_total >= arts3sum ? document.getElementById('ID11001-req').className = 'done' : document.getElementById('ID11001-req').className = 'none';
  (arts1_total >= arts && arts1_SubjN >= artsSubN) ? document.getElementById('ID11101-req').className = 'done' : document.getElementById('ID11101-req').className = 'none';
  (arts2_total >= arts && arts2_SubjN >= artsSubN) ? document.getElementById('ID11201-req').className = 'done' : document.getElementById('ID11201-req').className = 'none';
  (arts3_total >= arts && arts3_SubjN >= artsSubN) ? document.getElementById('ID11301-req').className = 'done' : document.getElementById('ID11301-req').className = 'none';
  stat_text >= stat ? document.getElementById('ID11311-req').className = 'done' : document.getElementById('ID11311-req').className = 'none';
  (arts_text + apply_total) >= 18 ? document.getElementById('ID12001-entry').className = 'done' : document.getElementById('ID12001-entry').className = 'none';
  (arts_text + apply_total) >= arts3text ? document.getElementById('ID12001-req').className = 'done' : document.getElementById('ID12001-req').className = 'none';
  fl1_total >= 6 ? document.getElementById('ID20001-entry').className = 'done' : document.getElementById('ID20001-entry').className = 'none';
  fl1_total >= fl1 ? document.getElementById('ID20001-req').className = 'done' : document.getElementById('ID20001-req').className = 'none';
  fl1_total >= fl1 ? document.getElementById('ID20001-req').className = 'done' : document.getElementById('ID20001-req').className = 'none';
  libarts_total >= 36 ? document.getElementById('ID30001-entry').className = 'done' : document.getElementById('ID30001-entry').className = 'none';
  libarts_total >= libarts ? document.getElementById('ID30001-submit').className = 'done' : document.getElementById('ID30001-submit').className = 'none';
  libarts_total >= libarts ? document.getElementById('ID30001-admit').className = 'done' : document.getElementById('ID30001-admit').className = 'none';
  libarts_total >= libarts ? document.getElementById('ID30001-req').className = 'done' : document.getElementById('ID30001-req').className = 'none';
  special_total >= 7 ? document.getElementById('ID40001-entry').className = 'done' : document.getElementById('ID40001-entry').className = 'none';
  special_total >= 35 ? document.getElementById('ID40001-submit').className = 'done' : document.getElementById('ID40001-submit').className = 'none';
  special_total >= 60 ? document.getElementById('ID40001-admit').className = 'done' : document.getElementById('ID40001-admit').className = 'none';
  special_total >= special ? document.getElementById('ID40001-req').className = 'done' : document.getElementById('ID40001-req').className = 'none';
  required_total >= 10 ? document.getElementById('ID41001-submit').className = 'done' : document.getElementById('ID41001-submit').className = 'none';
  required_total >= required ? document.getElementById('ID41001-req').className = 'done' : document.getElementById('ID41001-req').className = 'none';
  elective1_total >= elective ? document.getElementById('ID42001-req').className = 'done' : document.getElementById('ID42001-req').className = 'none';
  special_text >= spetext ? document.getElementById('ID43001-req').className = 'done' : document.getElementById('ID43001-req').className = 'none';
  text_total >= textsum ? document.getElementById('ID50001-req').className = 'done' : document.getElementById('ID50001-req').className = 'none';
  school_total >= schooling ? document.getElementById('ID60001-admit').className = 'done' : document.getElementById('ID60001-admit').className = 'none';
  school_total >= schooling ? document.getElementById('ID60001-req').className = 'done' : document.getElementById('ID60001-req').className = 'none';
  thesis_total >= thesis ? document.getElementById('ID70001-req').className = 'done' : document.getElementById('ID70001-req').className = 'none';

  $('#ID30001-prog').text(new Intl.NumberFormat('ja', { style: 'percent' }).format(libarts_total_prog));

}