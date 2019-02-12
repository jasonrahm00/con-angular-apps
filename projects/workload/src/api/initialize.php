<?php

//Establish database connection
define("DB_SERVER", databaseServer); //Replace databaseServer with string of db location
define("DATABASE", databaseName); //Replace databaseName with string of db name

function connectToDatabase() {
  $connectionInfo = array("Database"=>DATABASE);
  $connection = sqlsrv_connect(DB_SERVER, $connectionInfo);

  if($connection === false) {
    die(print_r(sqlsrv_errors(), true));
  }

  return $connection;
}

$error_msgs = [
  "noEmp"=>"Employee not selected",
  "noCourse"=>"Course not selected",
  "idNotInt"=>"Course ID is not an integer",
  "credNotNum"=>"Credit value is not a number",
  "sqlStmtErr"=>"Error with SQL Statement"
];

/*
  https://docs.microsoft.com/en-us/sql/connect/php/how-to-handle-errors-and-warnings-using-the-sqlsrv-driver
  https://docs.microsoft.com/en-us/sql/connect/php/logging-activity
  https://docs.microsoft.com/en-us/sql/connect/php/how-to-configure-error-and-warning-handling-using-the-sqlsrv-driver
  sqlsrv error logging
  sqlsrv_configure("LogSubsystems", SQLSRV_LOG_SYSTEM_STMT);
  sqlsrv_configure("LogSeverity", SQLSRV_LOG_SEVERITY_ALL);
  sqlsrv_configure("WarningsReturnAsErrors", 0);
*/

require_once("functions.php");

$conn = connectToDatabase();

?>
