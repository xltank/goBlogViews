<template lang="pug">
a-layout
  header-bar
  a-layout
    a-layout-sider.left-nav
      left-nav
    a-layout-content
      router-view
  //a-layout-footer.footer Footer
</template>

<script setup>
import {ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {cloneDeep} from "lodash";
import {useUserStore} from "/src/store/userStore";
import SvgIcon from "/src/components/SvgIcon.vue";
import LeftNav from "./LeftNav.vue";
import consts from "../utils/consts"
import HeaderBar from "./HeaderBar.vue";


const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

// const menus = [
//   {
//     label: "",
//     value: "",
//     icon: "DesktopOutlined"
//   },
//   {
//     label: "配置",
//     value: "config",
//     icon: "SettingOutlined"
//   }
// ]

const pageName = ref(["daily"]);
pageName.value = [route.name];

function onSelect({key: name}) {
  router.push({name});
}

function toHelpCenter() {
  // router.push({ name: 'helpCenter' });
  // pageName.value = [];
}

</script>

<style lang="less" scoped>

@import "../assets/style/variables";

.ant-layout {
  min-width: 1240px;
  background-color: @color-white;
  .ant-layout-header {
    height: @header-height;
    background-color: @color-grey;
    border-radius: 8px;
    padding: 0;

    .nav-center {
      min-width: 520px;

      :deep(.ant-menu) {
        background: none;
        line-height: @header-height;
        .ant-menu-horizontal {
          background-color: @color-grey;
          color: @color-main-dark;
        }
        .ant-menu-item {
          padding: 0 25px;
          .ant-menu-title-content {
            font-size: 16px;
            color: @color-main-dark;
          }
        }
        .ant-menu-item-selected::after {
          border-bottom: 4px solid @color-main;
        }
        .ant-menu-item-selected {
          color: @color-main;
          .ant-menu-title-content {
            font-size: 16px;
            color: @color-main;
          }
        }
        .ant-menu-item-active::after {
          border-bottom: 4px solid @color-main;
        }
      }
    }

    .logo-part {
      display: flex;
      //width: 256px;
      //height: @header-height;
      //background: url("../assets/svg/vite.svg") no-repeat center;
      .logo {
        margin-left: 10px;
        width: 42px;
        height: @header-height;
        line-height: @header-height;
        //float: left;
        background: url("../assets/svg/vite.svg") no-repeat center;
      }
      .name {
        margin-left: 10px;
        font-weight: bold;
      }
    }

    .user-info {
      min-width: 256px;
      height: @header-height;
      display: flex;
      justify-content: center;
      padding: 0 20px 0 20px;
      color: @color-main;

      .info {
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 14px;
        .icon {
          margin-right: 5px;
        }
      }
      .helpCenter {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 14px;
        margin-right: 20px;
        .icon {
          margin-right: 5px;
        }
      }
      .logout {
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 14px;
        .icon {
          margin: 0 5px 0 20px;
        }
      }

    }
  }

  .left-nav {
    background: white;
  }

  .user-profile-menu {
    margin-top: 6px;
  }
}

.daily-info-icon {
  margin-left: 5px;
  margin-top: -4px;
}


</style>