<?php

function h($string="") {
  return htmlspecialchars($string);
}

function u($string="") {
  return urlencode($string);
}

// is_blank('abcd')
// * validate data presence
// * uses trim() so empty spaces don't count
// * uses === to avoid false positives
// * better than empty() which considers "0" to be empty
function is_blank($value) {
  return !isset($value) || trim($value) === '';
}

function int_check($value) {
  return is_int((int)$value);
}

$crTotal;
function add_cr_teach($x) {
  global $crTotal;
  $crTotal += $x;
  return $x;
}

$pctTotal;
function add_pct_total($x) {
  global $pctTotal;
  $pctTotal += $x;
  return $x;
}

function get_data($sql, $params) {
  global $conn;
  $data = array();
  $get_data = sqlsrv_prepare($conn, $sql, $params);
  if(sqlsrv_execute($get_data)) {
    while($obj = sqlsrv_fetch_object($get_data)) {
      array_push($data, $obj);
    }
  }
  sqlsrv_free_stmt($get_data);
  return $data;
}

/* Value Mapping Functions */
function map_assigns($v) {
  $array = [];

  $array["courseID"] = $v->CourseID;
  $array["assignID"] = $v->Course_Assignment_ID;
  $array["courseString"] = $v->course_string;
  $array["didactic"] = $v->hrs_didactic;
  $array["practice"] = $v->hrs_practice;
  $array["coord"] = $v->hrs_coord;
  $array["semester"] = $v->semester;
  $array["year"] = $v->yr;
  $array["notes"] = $v->notes;

  return $array;
}


function map_funding($v) {
  $array = [];

  $array["category"] = $v->Category;
  $array["fundEnd"] = $v->FundingEndDate;
  $array["fundStart"] = $v->FundingStartDate;
  $array["speedType"] = $v->Speedtype;
  $array["speedTypeDescrip"] = $v->SpeedtypeDescription;
  $array["teachCredExpec"] = $v->TeachingCreditExpectations ? add_cr_teach($v->TeachingCreditExpectations) : null;
  $array["fundPct"] = $v->pct_funding ? add_pct_total($v->pct_funding) : null;

  return $array;
}

function map_courses($v) {
  $array = [];

  $array["id"] = $v->ID;
  $array["courseID"] = $v->CourseID;
  $array["courseString"] = $v->SubjectCode . " " . $v->CatalogNumber . " " . $v->CourseTitle;

  return $array;
}

function map_comments($v) {
  $array = [];

  $array["empID"] = $v->EmployeeID;
  $array["comments"] = $v->comment;

  return $array;
}

function map_fte($v) {
  $array = [];

  $array["empID"] = $v->EmployeeID;
  $array["fte"] = $v->FTE;
  $array["semester"] = $v->Semesters;
  $array["year"] = $v->Yr;
  
  return $array;
}

?>
