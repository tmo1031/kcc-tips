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

var grades = [];
var subjNum = new Array(5);
var deptLabel = '-';
var sectLabel = '-';
var courseLabel = '-';


for (i = 0; i < 12; i++) {
  grades[i] = [];
  for (j = 0; j < 3; j++) {
    grades[i][j] = 0;
  }
}