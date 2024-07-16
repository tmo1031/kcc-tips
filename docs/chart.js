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