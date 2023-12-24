#!/bin/sh
workdir=$(dirname "$1")
mdfilename=$(basename "$1")
outputext=$2  #docx/tex/pdf/all
rootdir="/data/"
bindir="${rootdir}bin/"
yamlfilename="MyDefaults.yaml"

cd $workdir

if [ ${mdfilename#*.} = "md" ] || [ ${mdfilename#*.} = "txt" ] ; then
  filename=${mdfilename%.*}
  if [ -e ${filename}.bib.txt ]; then
    cp -f ${filename}.bib.txt ${filename}.bib
  fi
  if [ $outputext = "docx" ] || [ $outputext = "all" ] ; then
    pandoc -d $bindir$yamlfilename $mdfilename -o "${filename}.docx"
  fi
  if [ $outputext = "tex" ] || [ $outputext = "pdf" ] || [ $outputext = "all" ] ; then
    pandoc -s --filter pandoc-crossref -d ${bindir}${yamlfilename} $mdfilename -o "${filename}.tex"
  fi
  if [ $outputext = "pdf" ] || [ $outputext = "all" ] ; then
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
fi