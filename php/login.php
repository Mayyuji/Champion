<?php
     header('content-type:text/html;charset="utf-8"');
     $username = $_POST['username'];
     $password = $_POST['password'];

     if(!$username){
        $reback['code']=1;
        $reback['msg']="用户名不能为空";
        echo json_encode($reback);
        exit;
    }
    if(!$password){
        $reback['code']=2;
        $reback['msg']="密码不能为空";
        echo json_encode($reback);
        exit;
    }

    $link=mysql_connect("localhost","root",'123456');
    if(!$link){
        echo "连接失败";
        exit;
    }

    mysql_set_charset("utf8");
    mysql_select_db("champion");

    $str=md5(md5($password).'yaomouren');


    $sql= "SELECT * FROM users WHERE username='{$username}' and password='{$str}'";

    $res = mysql_query($sql);

    $row = mysql_fetch_assoc($res);
    if(!$row){
        $reback['code'] = 3;
        $reback['msg'] = "账户名或密码错误";
        echo json_encode($reback);
        exit;
    }

    $reback['msg'] = "登陆成功";
    echo json_encode($reback);

    mysql_close($link);
?>