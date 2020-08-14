<template>
  <div>
    <el-table
    :data="imagesList"
    border
    style="width: 100%">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column
        fixed
        prop="RepoTags[0]"
        label="标签"
        width="150">
      </el-table-column>

      <el-table-column
        fixed
        prop="VirtualSize"
        label="大小"
        width="150">
      </el-table-column>

      <el-table-column
        fixed
        label="创建日期"
        width="150">
          <template slot-scope="scope">
            {{scope.row.Created}}
          </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="showImageDetail(scope.row.imageId)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<script>
  import * as imagesRequest from '../../api/images'
  import {timeStampToDate} from '../../utils/time'

  export default {
    
    data() {
      return {
        imagesList: [],
      }
    },
    created(){
      this.fetchImages()
    },
    methods: {
      // 查找镜像列表
      fetchImages(){
        imagesRequest.fetchImages({
          all: false,
        }, {
          loading: true
        }).then(res => {
          var data = res.data
          console.log('fetchImages', data)
          data && data.forEach(element => {
            element.Created = timeStampToDate(element.Created)
            element.VirtualSize = (element.VirtualSize / 1024 / 1024).toFixed(2) + "MB"
            // 新增字段 
            element.imageId = element.Id.split(':')[1]
          })
          this.imagesList = data
        })
      },
      // 镜像详情
      showImageDetail(imageId){
        if(!imageId){
          this.$message.error(`imageId 为空`)
          return
        }
        imagesRequest.getImagesDetail({}, {
          imageId: imageId
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },

  }
</script>