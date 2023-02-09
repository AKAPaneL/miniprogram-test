Page({
  data: {
    currentDate: new Date().getTime(),
    houseLayerVisible: false,
    repairLayerVisible: false,
    dateLayerVisible: false,
    houseList: [
      { name: '北京西三旗花园1号楼 101' },
      { name: '北京东村家园3号楼 302' },
      { name: '北京育新花园3号楼 703' },
      { name: '北京天通苑北苑8号楼 403' },
    ],
    houseSelected: '',
    repairSelected: '',
    dateSelected: '',
    mobile: '',
    description: '',
    repairItem: [{ name: '水路卫浴' }, { name: '电路灯具' }, { name: '管道疏通' }, { name: '开锁换锁' }],
    fileList: []
  },
  onLoad() {
    this.loadHouseList()
  },
  // 选择房屋
  onSelectHouse(e) {
    this.setData({
      houseSelected: e.detail.name
    })
  },
  // 选择维修项目
  onSelectRepair(e) {
    this.setData({
      repairSelected: e.detail.name
    })
  },
  // 选择时间
  onInput(e) {
    this.setData({
      currentDate: e.detail,
      dateSelected: new Date(e.detail).toLocaleString()
    });
    console.log(this.data.dateSelected);
    this.closeDateLayer()
  },
  async loadHouseList() {
    const res = await wx.http.get('/house')
    this.setData({
      houseList: res.data
    })
  },
  // 选择文件之后的回调 callback
  afterRead(e) {
    const { file } = e.detail;
    wx.uploadFile({
      url: wx.http.baseURL + '/upload',
      filePath: file.url,
      name: 'file',
      header: {
        Authorization: `Bearer ${getApp().token}`,
      },
      success: (res) => {
        const { data } = JSON.parse(res.data)
        const fileArr = this.data.fileList
        fileArr.push(data)
        this.setData({
          fileList: fileArr
        })
      }
    })
  },
  // 删除图片
  deleteFile(e) {
    const fileArr = this.data.fileList.filter(item => item.id !== e.detail.file.id)
    console.log(fileArr);
    this.setData({
      fileList: fileArr
    })
  },
  // 提交表单
  submit() {

  },
  openHouseLayer() {
    this.setData({ houseLayerVisible: true })
  },
  closeHouseLayer() {
    this.setData({ houseLayerVisible: false })
  },
  openRepairLayer() {
    this.setData({ repairLayerVisible: true })
  },
  closeRepairLayer() {
    this.setData({
      repairLayerVisible: false
    })
  },

  openDateLayer() {
    this.setData({ dateLayerVisible: true })
  },
  closeDateLayer() {
    this.setData({ dateLayerVisible: false })
  },
  goList() {
    wx.reLaunch({
      url: '/repair_pkg/pages/list/index'
    })
  }
})
