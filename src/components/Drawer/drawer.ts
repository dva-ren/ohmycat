type DirectionType = 'left' | 'right' | 'top' | 'bottom'

export const drawerProps = {
  // 是否显示抽屉
  modelValue: {
    type: Boolean,
    default: false,
  },
  // 是否显示抽屉头部内容
  isShowHeader: {
    type: Boolean,
    default: true,
  },
  // 父组件传过来的抽屉标题值
  title: {
    type: String,
    default: '',
  },
  // 是否显示关闭小图标
  showCloseIcon: {
    type: Boolean,
    default: true,
  },
  // 是否开启抽屉背景遮罩层
  mask: {
    type: Boolean,
    default: true,
  },
  // 点击遮罩层关闭默认为true
  clickMaskClose: {
    type: Boolean,
    default: true,
  },
  // 校验抽屉的4个方向
  direction: {
    type: String,
    default: 'right',
  },
  // 接收父组件传递过来的关闭函数，会中断关闭抽屉的操作
  beforeClose: {
    type: Function,
  },
}
