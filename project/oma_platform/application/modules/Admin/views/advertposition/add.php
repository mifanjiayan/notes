<div class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-info">
                <div class="box-header with-border">
                    <h3 class="box-title">新建广告位</h3>
                </div>


<div class="box-body">
    <form class="layui-form" action="">
        <div class="layui-form-item">
            <label class="layui-form-label">选择用户</label>
            <div class="layui-input-inline">
                <select name="user_id" lay-search="">
                    <?php
                    if(isset($users)) {
                    foreach ($users as $k=>$v) {
                    ?>
                    <option value="<?php echo $v['id']; ?>"><?php echo $v['user_name']; ?></option> 
                    <?php }}?>
                </select>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">广告位名称</label>
            <div class="layui-input-inline">
                <input type="text" name="name" class="layui-input" lay-verify="required" placeholder="">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">广告位类型</label>
            <div class="layui-input-block">
                <input type="radio" lay-filter="type" name="type" value="1" title="H5直连">
                <input type="radio" lay-filter="type" name="type" value="2" title="APP拉活">
                <input type="radio" lay-filter="type" name="type" value="3" title="JS广告">
            </div>
            <div class="layui-input-block js-type-wrap" style="display: none;">
                <input type="radio" lay-filter="js_type" name="js_type" value="1" title="顶部浮窗">
                <input type="radio" lay-filter="js_type" name="js_type" value="2" title="底部浮窗">
                <input type="radio" lay-filter="js_type" name="js_type" value="3" title="左部小图标">
                <input type="radio" lay-filter="js_type" name="js_type" value="4" title="右部小图标">
                <input type="radio" lay-filter="js_type" name="js_type" value="5" title="信息流">
                <input type="radio" lay-filter="js_type" name="js_type" value="6" title="插屏">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">媒体类型</label>
            <div class="layui-input-block">
                <input type="radio" lay-filter="media_type" name="media_type" value="1" title="android">
                <input type="radio" lay-filter="media_type" name="media_type" value="2" title="ios">
                <input type="radio" lay-filter="media_type" name="media_type" value="3" title="h5">
            </div>
        </div>  
        <div class="layui-form-item">
            <label class="layui-form-label">媒体名称</label>
            <div class="layui-input-inline">
                <input type="text" name="media_name" class="layui-input" placeholder="">
            </div>
        </div>
        <div class="layui-form-item mediaTpyeApp" style="display: none;">
            <label class="layui-form-label">程序包名称</label>
            <div class="layui-input-inline">
                <input type="text" name="pkg_name" class="layui-input" placeholder="">
            </div>
        </div>
        <div class="layui-form-item mediaTpyeApp" style="display: none;">
            <label class="layui-form-label">下载地址</label>
            <div class="layui-input-inline">
                <input type="text" name="download_url" class="layui-input" placeholder="">
            </div>
        </div>
        <div class="layui-form-item mediaTpyeWeb" style="display: none;">
            <label class="layui-form-label">网站域名</label>
            <div class="layui-input-inline">
                <input type="text" name="web_url" class="layui-input" placeholder="">
            </div>
        </div>

        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn"  lay-submit lay-filter="formSubmit">立即提交</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>
</div>

            </div>
        </div>
    </div>
</div>


<script>
layui.use(['layer', 'form'],function() {
    var layer = layui.layer
        ,form = layui.form
        ;
    
    // 广告位类型
    form.on('radio(type)', function(data){
        var value = data.value;
        if(value == 1 || value == 2){
            $('.js-type-wrap').hide();
        }else{
            $('.js-type-wrap').show();
        }
    });
    // 媒体类型
    form.on('radio(media_type)', function(data){
        var value = data.value;
        if(value == 3){
            $('.mediaTpyeWeb').show();
            $('.mediaTpyeApp').hide();
        }else if(value == 2 || value == 1){
            $('.mediaTpyeWeb').hide();
            $('.mediaTpyeApp').show();
        }
    });


    //监听提交
    form.on('submit(formSubmit)', function(data){
        if( data.field.type == undefined){
            layer.msg('请选择广告位类型');
            return false;
        }
        if( data.field.type == 3 && data.field.js_type == undefined){
            layer.msg('请选择JS广告样式');
            return false;
        }
        if( data.field.media_type == undefined){
            layer.msg('请选择媒体类型');
            return false;
        }
        if( data.field.media_type == 3 ){
            if(data.field.web_url == ""){
                layer.msg('请输入网站链接');
                return false;
            }
            delete data.field.pkg_name;
            delete data.field.download_url;
        } else {
            if(data.field.pkg_name == ""){
                layer.msg('请输入程序包名称');
                return false;
            }
            if(data.field.download_url == ""){
                layer.msg('请输入下载链接');
                return false;
            }
            delete data.field.web_url;
        }
        $("button[type=submit]").attr('disabled',true);
        $.ajax({
            url: '/admin/AdvertPosition/add',
            type: 'post',
            data: data.field,
            success: function(res){
                res = JSON.parse(res);
                if (res.ret == 1) {
                    layer.msg(res.msg);
                    setTimeout(function(){//两秒后跳转
                        window.location.href = '/Admin/AdvertPosition/index';
                    },1500)
                } else {
                    layer.msg(res.msg);
                    return false;
                }
            }
        })
        return false;
    });

})
</script>