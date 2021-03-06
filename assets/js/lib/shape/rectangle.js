/**
 * @author lbc
 */
define(['lib/shape/shape'], function(Shape) {
    var Rectangle = Shape.extend({
        //上下左右边界和响应的宽高
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        type: 'Rectangle',
        init: function(left, top, width, height) {
            this.left = left || 0;
            this.top = top || 0;
            this.width = width || 0;
            this.height = height || 0;
            this.right = left + width;
            this.bottom = top + height;
            this.pivot = {
                x: left + width / 2,
                y: top + height / 2
            };
        },
        //重新调整矩形的大小
        resize: function() {
            this.width = this.right - this.left;
            this.height = this.bottom - this.top;
            this.pivot.set(this.left + this.width / 2, this.top + this.height / 2);
        },
        //设置图片的上下左右
        set: function(left, top, right, bottom) {
            this.left = left;
            this.top = top;
            this.right = right;
            this.bottom = bottom;
            this.resize();
        },
        //获取面积
        getArea: function() {
            return this.width * this.height;
        },
        //长方形增大v的大小
        inflate: function(v) {
            this.left -= v;
            this.top -= v;
            this.right += v;
            this.bottom += v;
            this.resize();
        },
        //返回相对于某一点的矩形
        relativeTo: function(point) {
            return new Rectangle(this.left + point.x, this.top + point.y, this.width, this.height);
        },
        //判断两个长方形是否相交
        intersectsWith: function(shape) {
            switch (shape.type) {
                //矩形跟点碰撞
                case 'Vector2':
                    return shape.x >= this.left && shape.x <= this.right && shape.y >= this.top && shape.y <= this.bottom;
                    //矩形跟矩形碰撞
                case 'Rectangle':
                    return shape.right >= this.left && shape.left <= this.right && shape.top <= this.bottom && shape.bottom >= this.top;
                    //矩形跟多边形碰撞
                case 'Polygon':
                    return shape.intersectsWith(this);
                    //矩形跟圆碰撞
                case 'Circle':
                    //矩形跟线碰撞
                case 'Line':
            }
        },
        //判断矩形是否内含另一个矩形
        contains: function(shape) {
            switch (shape.type) {
                //矩形包含点
                case 'Vector2':
                    return shape.x >= this.left && shape.x <= this.right && shape.y >= this.top && shape.y <= this.bottom;
                    //矩形包含矩形
                case 'Rectangle':
                    return this.left <= shape.left && this.right >= shape.right && this.top <= shape.top && this.bottom >= shape.bottom;
                    //矩形包含多边形
                case 'Polygon':
                    shape.vertexs.forEach(function(v) {
                        if (!this.contains(v)) {
                            return false;
                        }
                    });
                    return true;
                    //矩形包含圆
                case 'Circle':
                    //矩形包含线
                case 'Line':
            }
        },
        draw: function(context) {
            context.fillStyle = '#00ff00';
            context.fillRect(this.left, this.top, this.width, this.height);
        }
    });
    return Rectangle;
});