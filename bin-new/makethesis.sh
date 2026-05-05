#!/bin/bash
scriptdir=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)
rootdir=$(cd "${scriptdir}/.." && pwd)
bindir="${scriptdir}"
yamlfilename="MyDefaults.yaml"

cd $bindir
# pwd
# ls -la

mdfilename="${rootdir}/20.Bin/thesis.txt"
mdfilename2="${rootdir}/21.Intro/Intro.txt"
mdfilename3="${rootdir}/22.Review/Review.txt"
mdfilename41="${rootdir}/23.Analysis/Analysis-1.txt"
mdfilename42="${rootdir}/23.Analysis/Analysis-2.txt"
mdfilename43="${rootdir}/23.Analysis/Analysis-3.txt"
mdfilename6="${rootdir}/27.Discus/Discus.txt"
mdfilename7="${rootdir}/28.Conc/Conc.txt"
mdfilenames="$mdfilename $mdfilename2 $mdfilename3 $mdfilename41 $mdfilename42 $mdfilename43 $mdfilename6 $mdfilename7"
outputext="pdf"  #docx/tex/pdf/all
env="mac" #mac/pomera
bindir="${rootdir}/20.Bin/"
bibdir="${rootdir}/99.lib/"

if [ $env = "pomera" ] ; then
  yamlfilename="MyDefaults2.yaml"
else
  yamlfilename="MyDefaults.yaml"
fi

fullname=$(basename "$mdfilename")
filename=${fullname%.*}
#if [ -e ${bibdir}${filename}.bib.txt ]; then
#  cp -f ${bibdir}${filename}.bib.txt ${bibdir}${filename}.bib
#fi
if [ $outputext = "tex" ] || [ $outputext = "pdf" ] || [ $outputext = "all" ] ; then
  pandoc -s --filter pandoc-crossref -d ${bindir}${yamlfilename} -f markdown -t latex $mdfilenames -o "${filename}.tex"
fi
if [ $outputext = "pdf" ] || [ $outputext = "all" ]|| [ $outputext = "tex2pdf" ] ; then
  uplatex "${filename}.tex"
  upbibtex $filename
  uplatex "${filename}.tex"
  uplatex "${filename}.tex"
  dvipdfmx $filename
fi
if [ $outputext = "clear" ] ; then
  rm -f "${filename}.aux"
  rm -f "${filename}.bbl"
  rm -f "${filename}.bcf"
  rm -f "${filename}.blg"
  rm -f "${filename}.ent"
  rm -f "${filename}.log"
  rm -f "${filename}.out"
  rm -f "${filename}.run.xml"
fi
