<?php
    $temp = explode(".", $_FILES["file"]["name"]);
    $extension = end($temp);     // 获取文件后缀名
    if ($_FILES["file"]["error"] > 0)
    {
        // 错误处理
    }
    else
    {
        $original_filename = unique_ID() . "." . "$extension"; // 随机文件名
        $original_filepath = "upload/";
        $process_filename = unique_ID() . "." . "$extension"; // 加解密处理后的文件名
        // 将文件上传到 upload 目录下
        move_uploaded_file($_FILES["file"]["tmp_name"], "upload/" . $original_filename);
        if ($_POST["enc-or-dec"] == "enc") {
            $encrypted_filepath = "enc/";
            $download_url = "/enc/";
            $command = "openssl sm4 -e -in " . $original_filepath . $original_filename . " -out " . $encrypted_filepath . $process_filename . " -k " . $_POST["passphrase"];
            $download_name = "e_" . $_FILES["file"]["name"];
        } else if ($_POST["enc-or-dec"] == "dec") {
            $decrypted_filepath = "dec/";
            $download_url = "/dec/";
            $command = "openssl sm4 -d -in " . $original_filepath . $original_filename . " -out " . $decrypted_filepath . $process_filename . " -k " . $_POST["passphrase"];
            $download_name = "d_" . $_FILES["file"]["name"];
        }
        exec($command);
        $response = array('name' => $download_name, 'url' => $download_url . $process_filename);
        echo json_encode($response);
    }

    // 生成随机文件名
    function unique_ID($length = 16,$prefix = '')
    {
        $id = $prefix;
        $addLength = $length - 13;
        $id .= uniqid();
        if (function_exists('random_bytes'))
        {
            $id .= substr(bin2hex(random_bytes(ceil(($addLength) / 2))),0,$addLength);
        }
        elseif (function_exists('openssl_random_pseudo_bytes'))
        {
            $id .= substr(bin2hex(openssl_random_pseudo_bytes(ceil($addLength / 2))),0,$addLength);
        }
        else
        {
            $id .= mt_rand(1*pow(10,($addLength)),9*pow(10,($addLength)));
        }
        return $id;
    }
?>
