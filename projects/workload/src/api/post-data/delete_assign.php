<?php
if($_SERVER["REQUEST_METHOD"] === "POST") {
  $errors = [];
  require_once("../initialize.php");

  //Decode data from ajax call and assign inputs to variables
  $post_data = file_get_contents("php://input");
  $request = json_decode($post_data);
  $emp_id = $request[0];
  $assign_id = $request[1];

  //Verify that emp_id and assign_id are numbers before setting up and executing delete query
  if(is_numeric($emp_id) && is_numeric($assign_id)) {

    $params["empID"] = $emp_id;
    $params["caid"] = $assign_id;

    $procedure_params = array(
      array(&$params["empID"], SQLSRV_PARAM_IN),
      array(&$params["caid"], SQLSRV_PARAM_IN)
    );

    $sql = "EXEC DeleteRecord @empID = ?, @caid = ?";

    $stmt = sqlsrv_prepare($conn, $sql, $procedure_params);

    if(!$stmt) {
      $return = new stdClass;
      $return->errors = $error_msgs["sqlStmtErr"];
      echo json_encode($return);
    } else {
      sqlsrv_execute($stmt);
      $return = new stdClass;
      $return->success = "Entry deleted";
      echo json_encode($return);
    }
    sqlsrv_close($conn);

  } else {
    $return = new stdClass;
    $return->errors = "Unable to delete entry";
    echo json_encode($return);
  }

}

?>

