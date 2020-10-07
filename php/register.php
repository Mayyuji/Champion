<?php
    header('content-type:text/html;charset="utf-8"');
    $username = $_POST['username'];
    $password = $_POST['password'];
    $rpassword = $_POST['rpassword'];

    // echo $username,$password, $rpassword;
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
    if($password!=$rpassword){
        $reback['code']=3;
        $reback['msg']="两次密码不一致";
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

    // 检测用户是否已存在
    $sql1 = "SELECT * FROM users WHERE username='{$username}'";
    $res1 = mysql_query($sql1);
    $row1 = mysql_fetch_assoc($res1);

    if($row1){
        $reback['code'] = 4;
        $reback['msg'] = "用户名已存在";
        echo json_encode($reback);
        exit;
    }

    $str=md5(md5($password).'yaomouren');

    $sql="insert into users values(null,'{$username}','{$str}')";
    $res = mysql_query($sql);

    if(!$res){
        $reback['code'] = 5;
        $reback['msg'] = "注册失败";
        echo json_encode($reback);
        exit;
    }
    $reback['msg'] = "注册成功";
    echo json_encode($reback);

    mysql_close($link);
?>