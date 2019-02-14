var file = $('#upload_file');

// 选择文件标签关联隐藏的file input标签
$(document).ready(function(){
    $('#choose-file').click(function(){
        $('#upload_file').click();
    });
});

// 获取已选择的文件名，替代为选择文件标签
file.on('change', function(e) {
    var name = e.currentTarget.files[0].name;
    $('#choose-file').html(name);
    document.getElementById('div-passphrase').style.display = '';
    document.getElementById('div-warning').style.display = 'none';
});

// 取消按钮取消选择文件
$(function() {
    $('#btn-cancel').click(function() {
        $('#choose-file').html('选择文件');
        document.getElementById('div-passphrase').style.display = 'none';
    });
});

$(function () {
    $('#btn-encrypt').click(function () {
        var passphrase = document.getElementById('passphrase').value;
        passphrase = passphrase.replace(/(^\s*)|(\s*$)/g, ''); // 去掉空格
        if (passphrase == '' || passphrase == undefined || passphrase == null) {
            document.getElementById('div-warning').style.display = '';
        } else {
            var formData = new FormData($('#uploadForm')[0]);
            $.ajax({
                type: 'post',
                url: "upload_file.php",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
            }).success(function (data) {
                // var $eleForm = $("<form method='get'></form>");
                // $eleForm.attr("action", download_url);
                // $(document.body).append($eleForm);
                //提交表单，实现下载
                // $eleForm.submit();
                console.log(data);
                var obj = JSON.parse(data);
                document.getElementById('download').download = obj.name;
                document.getElementById('download').href = obj.url;
                // $('#download').click();
                document.getElementById('div-warning').style.display = 'none';
                document.getElementById('div-success').style.display = '';
            }).error(function () {
                alert("上传失败");
            });
        }
    });
});
