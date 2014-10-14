/**
 * 参数说明
 * @param {type}    g           全局变量
 * @param {Object}  params      查询参数：属性url-请求的接口地址，属性names-接口返回的参数变量集合【依次是pid, id, name】，非必填
 * @param {Array}   selectors   格式如下：
 *                            {
 *                              id: '#xxx', //select元素的id,必填
 *                              name: 'xxx',//传递select描述的选项，会在select后面追加一个值的隐藏域，name是该值，value是select选中值描述【select后面存相同dom元素，则只修改value】，非必填
 *                              onChange: '', //额外change事件，非必填
 *                              callback: '', //回调函数，请求完成后执行
 *                            }
 *  Example：
    var demo = new Selector();
    var selectors = [
    {id: '#district_id',onChange: '', callback: ''},
    {id: '#center_id',onChange: ''},
    {id: '#area_id',onChange: ''}
    ];
    demo.render(selectors);
 */
/**
 * 
 * @param {type} g
 * @returns {undefined}
 */
!(function(g) {
    /**
     * 构造函数
     * @param {type} params 查询出参数
     * @returns {_L21.Selector}
     */
    function Selector(params) {
        this.params = $.extend({
            url: '/agent/query.json?action=filter_company',
            names: ['p_company_id', 'company_id', 'company_name']
        }, params);
    }
    Selector.prototype = {
        construct: Selector,
        default_change: function(self, _this, target, names, callbacks) {
            var $this = $(self), id = $this.val(), tlen = target.length, index = $this.data('index');
            if (id) {
                //默认回调函数
                $.get(_this.params.url + '&' + _this.params.names[0] + '=' + id, {}, function(ret) {
                    var html = '<option value="">请选择</option>';
                    if (ret.retcode === 0) {
                        var data = ret.result_rows, len = data.length;
                        for (var di = 0; di < len; di++) {
                            html += '<option value="' + data[di][_this.params.names[1]] + '">' + data[di][_this.params.names[2]] + '</option>';
                        }
                        target.eq(index + 1).html(html);
                        for (var si = index + 2; si < tlen; si++) {
                            target.eq(si).html('<option value="">请选择</option>');
                        }
                        _this.append_remark($this, names);
                        //是否需要执行回调函数
                        if ($.isFunction(callbacks[index])) {
                            callbacks[index](self);
                        }
                    }
                });
            } else {
                for (var si = index + 1; si < tlen; si++) {
                    target.eq(si).html('<option value="">请选择</option>');
                }
                _this.append_remark($this, names);
            }

        },
        /**
         * 追加描述dom元素
         * @param {type} obj
         * @param {type} names
         * @returns {undefined}
         */
        append_remark: function(obj, names) {
            var $this = obj;
            if (names[$this.data('index')]) {
                var name = names[$this.data('index')], hidden = $this.next('input[name="' + name + '"]'), text = $this.find(':checked').text();
                !$this.val() && (text = '');
                if (hidden.length) {
                    hidden[0].value = text;
                } else {
                    $this.after('<input type="hidden" name="' + name + '" value="' + text + '" />');
                }
            }
        },
        /**
         * 初始化select的值
         * @param {type} _this  全局对象
         * @param {type} self   select自身对象
         * @param {type} pid    select的data-pid值
         * @param {type} id     select的data-id值
         * @param {type} names  要追加描述元素的name
         * @returns {undefined}
         */
        initSelect: function(_this, self, pid, id, names) {
            $.get(_this.params.url + '&' + _this.params.names[0] + '=' + pid, {}, function(ret) {
                var html = '<option value="">请选择</option>';
                if (ret.retcode === 0) {
                    var data = ret.result_rows, len = data.length;
                    for (var i = 0; i < len; i++) {
                        html += '<option value="' + data[i][_this.params.names[1]] + '">' + data[i][_this.params.names[2]] + '</option>';
                    }
                    self.html(html);
                    self.val(id);
                    _this.append_remark(self, names);
                }
            });
        },
        /**
         * 渲染select组件
         * @param {object} selectors
         * @returns {Boolean}
         */
        render: function(selectors) {
            selectors = selectors || [];
            var slen = selectors.length, ids = [], names = [], onChanges = [], callbacks = [];
            if (!slen) {
                return false;
            }
            for (var si = 0; si < slen; si++) {
                ids.push(selectors[si].id);
                names.push(selectors[si].name);
                onChanges.push(selectors[si].onChange);
            }
            var _this = this, target = $(ids.join(',')), tlen = target.size();
            if (target.size()) {
                for (var i = 0; i < tlen; i++) {
                    target.eq(i).data('index', i);
                    target.eq(i).on('change', function() {
                        _this.default_change(this, _this, target, names, callbacks);
                        //附加回调函数
                        if ($.isFunction(onChanges[$(this).data('index')])) {
                            onChanges[$(this).data('index')]();
                        }
                    });
                }
                var obj_0 = target.eq(0), pid_0 = obj_0.data('pid') || 0, id_0 = obj_0.data('id'),
                        obj_1 = target.eq(1), pid_1 = obj_1.data('pid'), id_1 = obj_1.data('id'),
                        obj_2 = target.eq(2), pid_2 = obj_2.data('pid'), id_2 = obj_2.data('id'),
                        obj_3 = target.eq(3), pid_3 = obj_3.data('pid'), id_3 = obj_3.data('id');
                _this.initSelect(_this, obj_0, pid_0, id_0, names);
                if (obj_1.size() && pid_1) {
                    _this.initSelect(_this, obj_1, pid_1, id_1, names);
                }
                if (obj_2.size() && pid_2) {
                    _this.initSelect(_this, obj_2, pid_2, id_2, names);
                }
                if (obj_3.size() && pid_3) {
                    _this.initSelect(_this, obj_3, pid_3, id_3, names);
                }
            }
            return true;
        }
    };

    if (typeof define === 'function') {
        define('selector/1.0.2/selector', function(require, exports, module) {
            module.exports = Selector;
        });
    }

    g.Selector = Selector;

})(this);