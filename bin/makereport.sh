#!/bin/bash
mdfilename=$1
outputext=$2  #Option: docx/tex/pdf/all/clear
bindir=$(cd $(dirname $0); pwd)
yamlfilename="MyDefaults.yaml"

if [ ${mdfilename#*.} = "md" ] || [ ${mdfilename#*.} = "txt" ] ; then
  filename=${mdfilename%.*}
  if [ $outputext = "docx" ] || [ $outputext = "all" ] ; then
    pandoc -d $bindir$yamlfilename $mdfilename -o "${filename}.docx"
  fi
  if [ $outputext = "tex" ] || [ $outputext = "pdf" ] || [ $outputext = "all" ] ; then
    pandoc -s --filter pandoc-crossref -M "crossrefYaml=crossref_config.yaml" -d ${bindir}${yamlfilename} $mdfilename -o "${filename}.tex"
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