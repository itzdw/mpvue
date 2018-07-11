<template>
  <div class="contain">
    <canvas canvas-id="myCanvas" :style="{width: canvasWidth, height: canvasHeight,position: 'absolute',top:0,left:0, zIndex:'100'}"/>
    <block v-if="true">
      <div class="user-box">
        <img :src="userinfo.avatarUrl" mode="acceptFit"/>
        <span class="text">{{userinfo.nickName}}</span>
      </div>
      <div class="form-box">
        <textarea v-model="recommand" placeholder="请输入评论最多200个字" class="recommand" maxlength="200" :adjust-position="true"></textarea>
      </div>
      <div class="form-box">
        <input type="text" v-model="shareTitle" placeholder="请输入分享文章的标题" class="input" :adjust-position="true"/>
      </div>
      <div class="form-box">
        <input type="number" v-model="number" placeholder="请输入需要的点赞数" class="input" :adjust-position="true"/>
      </div>
      <div class="tips">上传微信分享图片</div>
      <div class="form-box">
        <div class="upload-btn" @click="chooseImg">+</div>
        <div class="img-box" v-if="shareImg">
          <img :src="shareImg" mode="acceptFit"/>
        </div>
      </div>
      <div class="btn-box">
        <button class="btn" @click="drawImg">生成图片</button>
      </div>
    </block>
  </div>
</template>

<script>
// Use Vuex
import utils from "@/utils";

export default {
  data() {
    return {
      userinfo: {},
      recommand: "",
      shareImg: "",
      shareTitle: "",
      number: 88,
      wxAvatarList: [],
      canvasWidth: "375px",
      canvasHeight: "812px"
    };
  },
  onReady() {
    const userinfo = wx.getStorageSync("userinfo");
    this.userinfo = userinfo;
  },
  methods: {
    async chooseImg() {
      const chooseImage = utils.wxPromisify(wx.chooseImage);
      const res = await chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"]
      });
      const tempFilePaths = res.tempFilePaths;
      this.shareImg = tempFilePaths[0];
    },
    async createImg() {
      // await this.getWxAvatarList();
      // this.drawImg();
    },
    async getWxAvatarList() {
      const url = "https://image.baidu.com/search/acjson";
      const data = {
        tn: "resultjson_com",
        ipn: "rj",
        ct: "201326592",
        fp: "result",
        word: "微信头像",
        rn: 60
      };
      const get = utils.wxPromisify(wx.request);
      let wxAvatarList = this.wxAvatarList;
      while (wxAvatarList.length < this.number) {
        const result = await get({ url, data });
        const res = result.data.data;
        const map = res.map(item => item.hoverURL);
        const filter = map.filter(item => {
          if (item !== undefined) {
            return item;
          }
        });
        wxAvatarList.push(...filter);
      }
      this.wxAvatarList = wxAvatarList;
    },
    async drawImg() {
      console.log(0)
      const bottomPic = "https://qiniu.qiyudc.com/201807111526120.png";
      const getImageInfo = utils.wxPromisify(wx.getImageInfo);
      const result = await getImageInfo({ src: bottomPic });
      this.canvasWidth = result.width + "px";
      this.canvasHeight = result.height + "px";

      const ctx = wx.createCanvasContext("myCanvas");
      ctx.drawImage(bottomPic, 0, 0, result.width, result.height);
      ctx.drawImage(this.userinfo.avatarUrl, 17, 105, 50, 50);
      ctx.setFillStyle("#ffffff");
      ctx.fillRect(74, 105, 360, 80);
      ctx.font = '18px 黑体'
      ctx.setFillStyle("#576a95");
      ctx.fillText(this.userinfo.nickName, 79, 123);
      let self = this
      ctx.draw(true,function(){
        self.saveImg();
      });
    },
    async saveImg() {
      const canvasToTempFilePath = utils.wxPromisify(wx.canvasToTempFilePath);
      const result = await canvasToTempFilePath(
        {
          quality:1,
          canvasId: "myCanvas"
        },
        this
      );
      console.log(result.tempFilePath)
      const saveImageToPhotosAlbum = utils.wxPromisify(wx.saveImageToPhotosAlbum);
      const response = await saveImageToPhotosAlbum({filePath: result.tempFilePath});
    }
  }
};
</script>

<style lang="stylus" scope>
.contain {
  padding: 17px;
  position: relative;

  .user-box {
    height: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 17px;

    img {
      width: 50px;
      height: 50px;
      margin-right: 14px;
    }

    .text {
      font-size: 16px;
      color: #666;
    }
  }

  .tips {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }

  .form-box {
    display: flex;
    margin-bottom: 10px;

    .recommand {
      font-size: 16px;
      border: 1px solid #dddddd;
      border-radius: 5px;
      padding: 10px;
      flex: 1;
    }

    .input {
      border: 1px solid #dddddd;
      flex: 1;
      border-radius: 5px;
      height: 40px;
      padding: 0 17px;
      font-size: 16px;
    }

    .upload-btn {
      width: 50px;
      height: 50px;
      border: 1px solid #dddddd;
      border-radius: 5px;
      text-align: center;
      line-height: 50px;
      font-size: 20px;
      margin-right: 17px;
    }

    .img-box {
      width: 50px;
      height: 50px;
      border: 1px solid #dddddd;
      border-radius: 5px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .btn-box {
    position: fixed;
    left: 0;
    bottom: 30px;
    width: 100%;

    .btn {
      margin: 0 17px;
      background: #19be6b;
      color: #fff;
    }
  }
}
</style>

