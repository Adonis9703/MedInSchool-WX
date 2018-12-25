import { create } from '../common/create';
import { button } from '../mixins/button';

create({
    mixins: [button],

    props: {
        plain: Boolean,
        block: Boolean,
        square: Boolean,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            value: 'default'
        },
        size: {
            type: String,
            value: 'normal'
        }
    },
    attached() {
        this.setCsses()
    },
    computed: {
        classes() {
            const { type, size, plain, disabled, loading, square, block } = this.data;
            return this.classNames(`van-button--${type}`, `van-button--${size}`, {
                'van-button--block': block,
                'van-button--plain': plain,
                'van-button--square': square,
                'van-button--loading': loading,
                'van-button--disabled': disabled,
                'van-button--unclickable': disabled || loading
            });
        }
    },

    methods: {
        onClick() {
            if (!this.data.disabled && !this.data.loading) {
                this.$emit('click');
            }
        },
        setCsses() {
            let { type, color, plain, height, width } = this.data
            if (type === 'custom') {
                if (plain && color) {
                    if(color=='#cdcdcd'){
                        color = `color:#999;border: 2rpx solid ${color};`
                    }else{
                        color = `color:${color};border: 2rpx solid ${color};`
                    }
                   
                } else if (!plain && color) {
                    color = `background-color:${color};`
                } else {
                    color = ''
                }
                height > 0 ? height = `height:${height * 2}rpx;line-height:${(height - 1) * 2}rpx;` : height = ''
                width > 0 ? width = `width:${width * 2}rpx;` : width = ''
                this.setData({
                    csses: color + height + width
                })
            }
        }
    }
});