<?php
if($_SERVER["REQUEST_METHOD"] === "GET") {

  require_once("./initialize.php");
  $data_request = h($_GET["dataset"]);
  $return = [];

  if (isset($_GET["id"])) {
    $id = h($_GET["id"]);

    if (!is_null($id)) {
      $params = array(array($id));

      if ($data_request === "assigns") {

        $sql = "EXEC CourseAssignments @EmpID = ?";
        $course_assigns = get_data($sql, $params);
        $return = array_map("map_assigns", $course_assigns);

      } elseif ($data_request === "funding") {

        $crTotal = 0;
        $pctTotal = 0;
        $sql = "EXEC MatchRecords @EmpID = ?";
        $funding = get_data($sql, $params);
        $return["data"] = array_map("map_funding", $funding);
        $return["crTotal"] = ($crTotal * 100) / 100;
        $return["pctTotal"] = $pctTotal;

      } elseif ($data_request === "comments") {

        $sql = "SELECT * FROM comment WHERE EmployeeID = ?";
        $comments = get_data($sql, $params);
        $comments = array_map("map_comments", $comments);
        $return = $comments[0];
      } elseif ($data_request === 'fte') {
        $fteTotal = 0;
        $fteCount = 0;
        $sql = "SELECT * FROM FTE WHERE EmployeeID = ?";
        $fte = get_data($sql, $params);
        $return["data"] = array_map("map_fte", $fte);

        foreach ($return["data"] as $row) {
          $fteTotal += $row["fte"];
          $fteCount++;
        }

        if ($fteTotal > 0) {
          $return["fteAvg"] = (($fteTotal/$fteCount) / 100) * 100;
        } else {
          $return["fteAvg"] = 0;
        }

      }

    }
  } else {
    $params = array();

    if ($data_request === "courses") {

      $sql = "SELECT * FROM Course_List WHERE SubjectCode IS NOT NULL ORDER BY CourseID ASC";
      $course_list = get_data($sql, $params);
      $return = array_map("map_courses", $course_list);

    } elseif ($data_request === "faculty") {

      $sql = "SELECT * FROM Faculty ORDER BY Name";
      $faculty_list = get_data($sql, $params);
      $return = $faculty_list;

    }
  }

  sqlsrv_close($conn);

  $json = json_encode($return);
  echo strip_tags($json);

}
