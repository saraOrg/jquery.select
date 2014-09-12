+(function($) {
    $.fn.extend({
        list: function(params) {
            params = $.extend({
                url: '/agent/query.json?action=filter_company',
                names: ['p_company_id', 'company_id', 'company_name']
            }, params);
            var target = $(this), tlen = target.length;
            if (target.length) {
                for (var i = 0; i < tlen - 1; i++) {
                    target.eq(i).data('index', i);
                    target.eq(i).on('change', function() {
                        var $this = $(this), id = $this.val();
                        if (id) {
                            $.get(params.url + '&' + params.names[0] + '=' + id, {}, function(ret) {
                                var html = '<option value="">请选择</option>';
                                if (ret.retcode === 0) {
                                    var data = ret.result_rows, len = data.length;
                                    for (var di = 0; di < len; di++) {
                                        html += '<option value="' + data[di][params.names[1]] + '">' + data[di][params.names[2]] + '</option>';
                                    }
                                    target.eq($this.data('index') + 1).html(html).trigger('change');
                                }
                            });
                        } else {
                            for (var si = $this.data('index') + 1; si < tlen; si++) {
                                target.eq(si).html('<option>请选择</option>');
                            }
                        }
                    });
                }
                var obj_0 = target.eq(0), pid_0 = obj_0.data('pid') || 0, id_0 = obj_0.data('id'),
                        obj_1 = target.eq(1), pid_1 = obj_1.data('pid'), id_1 = obj_1.data('id'), 
                        obj_2 = target.eq(2), pid_2 = obj_2.data('pid'), id_2 = obj_2.data('id'),
                        obj_3 = target.eq(3), pid_3 = obj_3.data('pid'), id_3 = obj_3.data('id');
                $.get(params.url + '&' + params.names[0] + '=' + pid_0, {}, function(ret) {
                    var html = '<option value="">请选择</option>';
                    if (ret.retcode === 0) {
                        var data = ret.result_rows, len = data.length;
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + data[i][params.names[1]] + '">' + data[i][params.names[2]] + '</option>';
                        }
                        obj_0.html(html);
                        obj_0.val(id_0);
                    }
                });
                if (pid_1) {
                    $.get(params.url + '&' + params.names[0] + '=' + pid_1, {}, function(ret) {
                        var html = '<option value="">请选择</option>';
                        if (ret.retcode === 0) {
                            var data = ret.result_rows, len = data.length;
                            for (var i = 0; i < len; i++) {
                                html += '<option value="' + data[i][params.names[1]] + '">' + data[i][params.names[2]] + '</option>';
                            }
                            obj_1.html(html);
                            obj_1.val(id_1);
                        }
                    });
                }
                if (obj_2.length && pid_2) {
                    $.get(params.url + '&' + params.names[0] + '=' + pid_2, {}, function(ret) {
                        var html = '<option value="">请选择</option>';
                        if (ret.retcode === 0) {
                            var data = ret.result_rows, len = data.length;
                            for (var i = 0; i < len; i++) {
                                html += '<option value="' + data[i][params.names[1]] + '">' + data[i][params.names[2]] + '</option>';
                            }
                            obj_2.html(html);
                            obj_2.val(id_2);
                        }
                    });
                }
                if (obj_3.length && pid_3) {
                    $.get(params.url + '&' + params.names[0] + '=' + pid_3, {}, function(ret) {
                        var html = '<option value="">请选择</option>';
                        if (ret.retcode === 0) {
                            var data = ret.result_rows, len = data.length;
                            for (var i = 0; i < len; i++) {
                                html += '<option value="' + data[i][params.names[1]] + '">' + data[i][params.names[2]] + '</option>';
                            }
                            obj_3.html(html);
                            obj_3.val(id_3);
                        }
                    });
                }
            }
        }
    });
})(jQuery, 'YANGBAI.COM');