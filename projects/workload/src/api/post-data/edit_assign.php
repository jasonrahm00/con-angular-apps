<?php
if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $errors = [];
  require_once('../initialize.php');

  //Get data from input document and decode JSON
  $post_data = file_get_contents("php://input");
  $request = json_decode(strip_tags($post_data));

  //Assign data values to varibales, using null if no value present
  $emp_id = $request->empID ?? null;
  $course_id = $request->courseID ? (int)$request->courseID : null;
  $didactic = $request->didactic ?? null;
  $practice = $request->practice ?? null;
  $coord = $request->coord ?? null;
  $semester = $request->semester ?? null;
  $year = $request->year ?? null;
  $notes = $request->notes;
  $assign_id = $request->assignID ?? null;

  /*******************
    Series of blank and type checks to guard against injection and maintain data integrity
    If test fails, message is pushed to errors array
  *******************/

  if(is_blank($emp_id)) {
    $errors[] = $error_msgs["noEmp"];
  } elseif(!int_check($emp_id)) {
    $errors[] = "Employee ID not an Integer";
  }

  if($course_id === NULL) {
    $errors[] = $error_msgs["noCourse"];

  } elseif(!int_check($course_id)) {
    $errors[] = $error_msgs["idNotInt"];
  }

  if($assign_id === NULL || !int_check($assign_id)) {
    $errors[] = "Course Assignment ID not valid";
  }

  if($didactic !== NULL) {
    if(!is_numeric($didactic)) {
      $errors[] = $error_msgs["credNotNum"];
    }
  }

  if($practice !== NULL) {
    if(!is_numeric($practice)) {
      $errors[] = $error_msgs["credNotNum"];
    }
  }

  if($coord !== NULL) {
    if(!is_numeric($coord)) {
      $errors[] = $error_msgs["credNotNum"];
    }
  }

  //If there are errors, encode error array and return to factory
    //Else, create params and execute prepared statement calling stored procedure to update DB entry
  if(!empty($errors)) {
    $return = new stdClass;
    $return->errors = $errors;
    echo json_encode($return);
  } else {
    $params["empID"] = $emp_id;
    $params["courseID"] = $course_id;
    $params["hrs_didactic"] = $didactic;
    $params["hrs_practice"] = $practice;
    $params["hrs_coord"] = $coord;
    $params["semester"] = $semester;
    $params["yr"] = $year;
    $params["notes"] = $notes;
    $params["caid"] = $assign_id;

    $procedure_params = array(
      array(&$params["empID"], SQLSRV_PARAM_IN),
      array(&$params["courseID"], SQLSRV_PARAM_IN),
      array(&$params["hrs_didactic"], SQLSRV_PARAM_IN),
      array(&$params["hrs_practice"], SQLSRV_PARAM_IN),
      array(&$params["hrs_coord"], SQLSRV_PARAM_IN),
      array(&$params["semester"], SQLSRV_PARAM_IN),
      array(&$params["yr"], SQLSRV_PARAM_IN),
      array(&$params["notes"], SQLSRV_PARAM_IN),
      array(&$params["caid"], SQLSRV_PARAM_IN)
    );

    $sql = "{call UpdateRecord(?,?,?,?,?,?,?,?,?)}";

    $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);

    if(!$stmt) {
      $return = new stdClass;
      $return->errors = $error_msgs["sqlStmtErr"];
      echo json_encode($return);
    } else {
      sqlsrv_execute($stmt);
      echo json_encode($request);
    }

  }

  sqlsrv_close($conn);
}
?>
