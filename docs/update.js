var apply_total = 0;
var arts1_total = 0;
var arts2_total = 0;
var arts3_total = 0;
var arts1_SubjN = 0;
var arts2_SubjN = 0;
var arts3_SubjN = 0;
var stat_total = 0;
var fl1_total = 0;
var fl2_total = 0;
var sports_total = 0;
var required_total = 0;
var elective1_total = 0;
var elective2_total = 0;
var special_total = 0;
var thesis_total = 0;
var arts_total = apply_total + arts1_total + arts2_total + arts3_total;
var arts_text = 0;
var libarts_text = 0;
var special_text = 0;
var text_total = libarts_text + special_text;
var libarts_media = 0;
var special_media = 0;
var media_total = Math.min(10, libarts_media + special_media);
var media_exe = Math.max(0, libarts_media + special_media - 10);
var libarts_school = 0;
var special_school = 0;
var school_total = media_total + libarts_school + special_school;
var total = arts_total + fl1_total + fl2_total + sports_total + required_total + elective1_total + elective2_total + thesis_total - media_exe;
var arts = 6; //3分野科目の各分野 p.29
var artsSubN = 2; //3分野科目の各分野 p.29
var stat = 0; //経済学部の統計学(A) p.31
var required = 0; //各学部の必修科目 p.38,p.39,p.42,p.43
var elective = 0; //法学部の選択必修科目 p.42,p.43
var schooling = 0; //スクーリング p.20
var arts3sum = 32;
var arts3text = 24;
var fl1 = 8;
var otherarts = 8;
var libarts = 48;
var special = 68;
var thesis = 8;
var spetext = 40;
var textsum = 70;
var stat_text = 0;
var fl1_text = 0;
var fl2_text = 0;
var sports_text = 0;
var fl1_school = 0;
var arts_school = 0;

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

  getForm();
  calcValue();
  updateForm();

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

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  //control is here
  let larguraGraficoFora = 240;
  let alturaGraficoFora = 240;
  let furoGraficoFora = 0.75;
  let furoGraficoFora2 = 0.5;
  let furoGraficoFora3 = 0.25;
  var temp = 11;

  data1 = google.visualization.arrayToDataTable([
    ['Category', 'Units'],
    ['認定', 0],      // gray
    ['人文済', 0],    // maroon
    ['人文未', 6],    // indianred
    ['社会済', 0],    // olive
    ['社会未', 6],    // palegoldenrod
    ['自然済', 0],    // green
    ['自然未', 6],    // aquamarine
    ['3分野未', 14],  // lightsalmon
    ['必修語済', 0],  // lime
    ['必修語未', 8],  // yellowgreen
    ['総合済', 0],    // red
    ['総合未', 8],    // lightsalmon
    ['必修済', 0],    // navy
    ['必修未', 0],    // steelblue
    ['選択必済', 0],  // purple
    ['選択必未', 0],  // plum
    ['選択済', 0],    // teal
    ['選択未', 68],   // darkturquoise
    ['卒論済', 0],    // fuchsia
    ['卒論未', 8]     // pink
  ]);

  data2 = google.visualization.arrayToDataTable([
    ['Category', 'Units'],
    ['3分野済', 0],
    ['3分野未', 32],
    ['必修語済', 0],
    ['必修語未', 8],
    ['総合済', 0],
    ['総合未', 8],
    ['必修済', 0],
    ['必修未', 0],
    ['選択必済', 0],
    ['選択必未', 0],
    ['選択済', 0],
    ['選択未', 68],
    ['卒論済', 0],
    ['卒論未', 8]
  ]);

  data3 = google.visualization.arrayToDataTable([
    ['Category', 'Units'],
    ['総合済', 0],
    ['総合未', 48],
    ['専門済', 0],
    ['専門未', 68],
    ['卒論済', 0],
    ['卒論未', 8]
  ]);

  data4 = google.visualization.arrayToDataTable([
    ['Category', 'Units'],
    ['認定', 0],
    ['3分T済', 0],
    ['3分T未', 24],
    ['必語T済', 0],
    ['他総T済', 0],
    ['専テキ済', 0],
    ['専テキ未', 40],
    ['テキ未', 6],
    ['3分スク済', 0],
    ['必語スク済', 0],
    ['専スク済', 0],
    ['スク未', 30],
    ['任意未', 16],
    ['卒論済', 0],
    ['卒論未', 8]
  ]);

  data5 = google.visualization.arrayToDataTable([
    ['Category', 'Units'],
    ['テキ済', 0],
    ['テキ未', 70],
    ['スク済', 0],
    ['スク未', 30],
    ['任意未', 16],
    ['卒論済', 0],
    ['卒論未', 8]
  ]);

  var options1 = {
    width: larguraGraficoFora,
    height: alturaGraficoFora,
    chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
    pieHole: furoGraficoFora,
    colors: ['gray', 'maroon', 'indianred', 'olive', 'palegoldenrod', 'green', 'aquamarine', 'lightsalmon', 'lime', 'lightgreen', 'gray', 'silver', 'teal', 'darkturquoise', 'purple', 'plum', 'navy', 'lightsteelblue', 'fuchsia', 'pink'],
    pieSliceText: 'value',
    legend: 'none'
  };

  var options2 = {
    width: larguraGraficoFora * furoGraficoFora,
    height: alturaGraficoFora * furoGraficoFora,
    chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
    pieHole: furoGraficoFora2 / furoGraficoFora,
    colors: ['red', 'lightsalmon', 'lime', 'lightgreen', 'gray', 'silver', 'teal', 'darkturquoise', 'purple', 'plum', 'navy', 'lightsteelblue', 'fuchsia', 'pink'],
    pieSliceText: 'value',
    backgroundColor: 'transparent',
    legend: 'none'
  };

  var options3 = {
    width: larguraGraficoFora * furoGraficoFora2,
    height: alturaGraficoFora * furoGraficoFora2,
    chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
    pieHole: furoGraficoFora3 / furoGraficoFora2,
    colors: ['red', 'lightsalmon', 'navy', 'lightsteelblue', 'fuchsia', 'pink'],
    pieSliceText: 'value',
    backgroundColor: 'transparent',
    legend: 'none'
  };

  var options4 = {
    width: larguraGraficoFora,
    height: alturaGraficoFora,
    chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
    pieHole: furoGraficoFora,
    colors: ['gray', 'red', 'lightsalmon', 'lime', 'silver', 'navy', 'lightsteelblue', 'powderblue', 'red', 'lime', 'navy', 'wheat', 'white', 'fuchsia', 'pink'],
    pieSliceText: 'value',
    legend: 'none'
  };

  var options5 = {
    width: larguraGraficoFora * furoGraficoFora,
    height: alturaGraficoFora * furoGraficoFora,
    chartArea: { left: 0, top: 0, width: '100%', height: '100%' },
    pieHole: furoGraficoFora2 / furoGraficoFora,
    colors: ['aqua', 'powderblue', 'gold', 'wheat', 'white', 'fuchsia', 'pink'],
    pieSliceText: 'value',
    backgroundColor: 'transparent',
    legend: 'none'
  };

  var chart1 = new google.visualization.PieChart(document.getElementById('donutchart_1'));
  chart1.draw(data1, options1);

  var chart2 = new google.visualization.PieChart(document.getElementById('donutchart_2'));
  chart2.draw(data2, options2);

  var chart3 = new google.visualization.PieChart(document.getElementById('donutchart_3'));
  chart3.draw(data3, options3);

  var chart4 = new google.visualization.PieChart(document.getElementById('donutchart_4'));
  chart4.draw(data4, options4);

  var chart5 = new google.visualization.PieChart(document.getElementById('donutchart_5'));
  chart5.draw(data5, options5);

  var rewriteChart = function () {
    changeValue();
    calcValue();
    data1.setValue(0, 1, apply_total);
    data1.setValue(1, 1, arts1_total);
    data1.setValue(3, 1, arts2_total);
    data1.setValue(5, 1, arts3_total);
    data1.setValue(8, 1, fl1_total);
    data1.setValue(10, 1, fl2_total + sports_total);
    data1.setValue(12, 1, required_total);
    data1.setValue(14, 1, elective1_total);
    data1.setValue(16, 1, elective2_total);
    data1.setValue(18, 1, thesis_total);

    data2.setValue(0, 1, arts_total);
    data2.setValue(2, 1, fl1_total);
    data2.setValue(4, 1, fl2_total + sports_total);
    data2.setValue(6, 1, required_total);
    data2.setValue(8, 1, elective1_total);
    data2.setValue(10, 1, elective2_total);
    data2.setValue(12, 1, thesis_total);

    data3.setValue(0, 1, arts_total + fl1_total + fl2_total + sports_total);
    data3.setValue(2, 1, required_total + elective1_total + elective2_total);
    data3.setValue(4, 1, thesis_total);

    data4.setValue(0, 1, Math.max(0, apply_total));
    data4.setValue(1, 1, Math.max(0, arts_text));
    data4.setValue(3, 1, Math.max(0, fl1_text));
    data4.setValue(4, 1, Math.max(0, fl2_text + sports_text));
    data4.setValue(5, 1, Math.max(0, special_text));
    data4.setValue(8, 1, Math.max(0, arts_school));
    data4.setValue(9, 1, Math.max(0, otherarts_school));
    data4.setValue(10, 1, Math.max(0, special_school));
    data4.setValue(13, 1, Math.max(0, thesis_total));

    data5.setValue(0, 1, text_total);
    data5.setValue(2, 1, school_total);
    data5.setValue(5, 1, thesis_total);

    data1.setValue(2, 1, Math.max(0, arts - arts1_total));
    data1.setValue(4, 1, Math.max(0, arts - arts2_total));
    data1.setValue(6, 1, Math.max(0, arts - arts3_total));
    data1.setValue(7, 1, Math.max(0, arts3sum - apply_total - Math.max(arts, arts1_total) - Math.max(arts, arts2_total) - Math.max(arts, arts3_total)));
    data1.setValue(9, 1, Math.max(0, fl1 - fl1_total));
    data1.setValue(11, 1, Math.max(0, otherarts - (Math.max(0, arts_total - arts3sum) + fl2_total + sports_total)));
    data1.setValue(13, 1, Math.max(0, required - required_total));
    data1.setValue(15, 1, Math.max(0, elective - elective1_total));
    data1.setValue(17, 1, Math.max(0, special - required - Math.max(0, required_total - required) - elective - Math.max(0, elective1_total - elective) - elective2_total));
    data1.setValue(19, 1, Math.max(0, (thesis - thesis_total)));

    data2.setValue(1, 1, Math.max(0, arts3sum - arts_total));
    data2.setValue(3, 1, Math.max(0, fl1 - fl1_total));
    data2.setValue(5, 1, Math.max(0, otherarts - (Math.max(0, arts_total - arts3sum) + fl2_total + sports_total)));
    data2.setValue(7, 1, Math.max(0, required - required_total));
    data2.setValue(9, 1, Math.max(0, elective - elective1_total));
    data2.setValue(11, 1, Math.max(0, special - required - Math.max(0, required_total - required) - elective - Math.max(0, elective1_total - elective) - elective2_total));
    data2.setValue(13, 1, Math.max(0, thesis - thesis_total));

    data3.setValue(1, 1, Math.max(0, libarts - (arts_total + fl1_total + fl2_total + sports_total)));
    data3.setValue(3, 1, Math.max(0, special - (required_total + elective1_total + elective2_total)));
    data3.setValue(5, 1, Math.max(0, (thesis - thesis_total)));

    data4.setValue(2, 1, Math.max(0, (apply_total >= 36) ? 0 : (24 - arts_text - apply_total)));
    data4.setValue(6, 1, Math.max(0, 40 - special_text));
    data4.setValue(7, 1, apply_total >= 36 ? 0 : Math.max(0, 70 - (Math.max(24, arts_text) + Math.max(40, special_text) + (fl1_text + fl2_text + sports_text))));
    data4.setValue(11, 1, Math.max(0, schooling - school_total));
    data4.setValue(12, 1, Math.max(0, 116 - (Math.max(70, apply_total + 40, text_total) + Math.max(schooling, school_total))));
    data4.setValue(14, 1, Math.max(0, (thesis - thesis_total)));

    data5.setValue(1, 1, Math.max(Math.max(0, 70 - text_total), Math.max(0, 40 - special_text)));
    data5.setValue(3, 1, Math.max(0, schooling - school_total));
    data5.setValue(4, 1, Math.max(0, 116 - (Math.max(70, apply_total + 40, text_total) + Math.max(schooling, school_total))));
    data5.setValue(6, 1, Math.max(0, (thesis - thesis_total)));

    chart1.draw(data1, options1);
    chart2.draw(data2, options2);
    chart3.draw(data3, options3);
    chart4.draw(data4, options4);
    chart5.draw(data5, options5);
  }

  $('#arts1-subjNum').change(rewriteChart);
  $('#arts2-subjNum').change(rewriteChart);
  $('#arts3-subjNum').change(rewriteChart);
  $('#arts1-text').change(rewriteChart);
  $('#arts1-school').change(rewriteChart);
  $('#arts1-media').change(rewriteChart);
  $('#arts2-text').change(rewriteChart);
  $('#arts2-school').change(rewriteChart);
  $('#arts2-media').change(rewriteChart);
  $('#arts3-text').change(rewriteChart);
  $('#arts3-school').change(rewriteChart);
  $('#arts3-media').change(rewriteChart);
  $('#stat-text').change(rewriteChart);
  $('#stat-school').change(rewriteChart);
  $('#stat-media').change(rewriteChart);
  $('#fl1-text').change(rewriteChart);
  $('#fl1-school').change(rewriteChart);
  $('#fl1-broad').change(rewriteChart);
  $('#fl2-text').change(rewriteChart);
  $('#fl2-school').change(rewriteChart);
  $('#fl2-broad').change(rewriteChart);
  $('#sports-text').change(rewriteChart);
  $('#sports-school').change(rewriteChart);
  $('#required-text').change(rewriteChart);
  $('#required-school').change(rewriteChart);
  $('#required-media').change(rewriteChart);
  $('#elective1-text').change(rewriteChart);
  $('#elective1-school').change(rewriteChart);
  $('#elective1-media').change(rewriteChart);
  $('#elective2-text').change(rewriteChart);
  $('#elective2-school').change(rewriteChart);
  $('#elective2-media').change(rewriteChart);
  $('#thesis-total').change(rewriteChart);

  $('#department').change(rewriteChart);
  $('#section').change(rewriteChart);
  $('#course').change(rewriteChart);

  $('#apply_stat').change(rewriteChart);
  $('#apply_fl1').change(rewriteChart);
}