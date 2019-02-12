<?php
if($_SERVER["REQUEST_METHOD"] === "POST") {

  $post_data = file_get_contents("php://input");
  $request = json_decode(strip_tags($post_data));
  $emp_id = $request->empID ?? null;
  $comment = $request->comment ?? null;

  $errors = [];
  require_once("../initialize.php");

  //Get contents of file being passed from ajax call and decode JSON
  $post_data = file_get_contents("php://input");
  $request = json_decode(strip_tags($post_data));

  //Assign request data to local variables
    //Assign to null if various ones are empty
  $emp_id = $request->empID ?? null;
  $comment = $request->comments ?? null;


  /*******************
    Series of blank and type checks to guard against injection and maintain data integrity
    If test fails, message is pushed to errors array
  *******************/

  if(is_blank($emp_id)) {
    $errors[] = $error_msgs["noEmp"];
  } elseif(!int_check($emp_id)) {
    $errors[] = "Employee ID not an Integer";
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
    $params["comment"] = $comment;

    $procedure_params = array(
      array(&$params["empID"], SQLSRV_PARAM_IN),
      array(&$params["comment"], SQLSRV_PARAM_IN)
    );

    $sql = "{call SaveDataButton(?,?)}";

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
