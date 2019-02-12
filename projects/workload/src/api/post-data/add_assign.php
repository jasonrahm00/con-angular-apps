<?php
if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $errors = [];
  require_once('../initialize.php');

  //Get contents of file being passed from ajax call and decode JSON
  $post_data = file_get_contents("php://input");
  $request = json_decode(strip_tags($post_data));

  //Assign request data to local variables
    //Assign to null if various ones are empty
  $emp_id = $request->empID ?? null;
  $course_id = $request->courseID ? (int)$request->courseID : null;
  $didactic = $request->didactic ?? null;
  $practice = $request->practice ?? null;
  $coord = $request->coord ?? null;
  $semester = $request->semester ?? null;
  $year = $request->year === '' || $request->year === null ? null : $request->year;
  $notes = $request->notes ?? null;

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

  //If there are errors, return array to factory for processing
    //Else set up params for SQL prepared statement and procedure call
      //Then call stored procedure, passing in params, to add assignment to DB
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

    $procedure_params = array(
      array(&$params["empID"], SQLSRV_PARAM_IN),
      array(&$params["courseID"], SQLSRV_PARAM_IN),
      array(&$params["hrs_didactic"], SQLSRV_PARAM_IN),
      array(&$params["hrs_practice"], SQLSRV_PARAM_IN),
      array(&$params["hrs_coord"], SQLSRV_PARAM_IN),
      array(&$params["semester"], SQLSRV_PARAM_IN),
      array(&$params["yr"], SQLSRV_PARAM_IN),
      array(&$params["notes"], SQLSRV_PARAM_IN)
    );

    $sql = "{call CreateNewRecord(?,?,?,?,?,?,?,?)}";

    $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);

    if(!$stmt) {
      echo print_r(sqlsrv_errors(SQLSRV_ERR_ERRORS));
    } else {
      sqlsrv_execute($stmt);
      echo json_encode($request);
    }

  }

  sqlsrv_close($conn);
}
?>
