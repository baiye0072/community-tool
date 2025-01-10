<template>
    <div class="mind-back">
        <div class="my-mind-map-container">
            <el-dialog title="保存模式" :visible.sync="dialogVisibleModelCreate" width="40%" :before-close="handleClose">
                <div class="input-area">
                    <span class="input-label">模型名称:</span>
                    <el-input id="input1" type="text" placeholder="请输入模型名称" v-model="mindMapNameActual" maxlength="10"
                        show-word-limit size="medium">
                    </el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose2()">取 消</el-button>
                    <el-button type="primary" @click="saveMindMap()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="现有模板" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <div class="file_view" v-for="file in fileinformation" :key="file.fileId"
                    @mouseleave="bmenushowattribute = 0">
                    <el-image class="file_image" @click="getPattern(done, file.societyPattern)" :src="img" fit="contain">
                    </el-image>
                    <p class="filename"><i class="el-icon-folder"></i>{{ file.societyPattern }}</p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
            <div class="mindmap-tools" v-show="!readonly">
                <el-button class="my-button" style="margin-right: 0.8rem" size="small" @click="dialogVisible = true">
                    <div class="my-button">
                        <svg t="1720518684993" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="29039" width="32" height="32" style="margin-right: 25%; margin-top: 1%;">
                            <path
                                d="M910.19 175.16L776.1 41.07A136.94 136.94 0 0 0 679.27 1H235A161.29 161.29 0 0 0 73.69 162.25v699.5A161.29 161.29 0 0 0 235 1023h554a161.29 161.29 0 0 0 161.31-161.25V272a136.89 136.89 0 0 0-40.12-96.84z m-148.8 459.72c-1.53 8-14.94 8.24-36.72 11.59s-95.51 17.6-103 17.6-12.56-11.31-13.4-14.66-9.35-33.24-20.53-46.92-49.74-54.17-112.86-51.66-68.14 49.57-69.82 64.65 2.52 30.16-10.89 32.67-103 19.27-109.33 19.69-11.31-4.19-10.89-20.11 6.28-45.24 31.84-65.35 93.83-48.17 100.95-52.38 10.47-7.54 8-13.82-46.54-21.76-65.39-30.18-54.45-26-71.21-54.87-17.59-42.73-15.08-46.92S274 378 274 378s125.67-23 131.53-21.78 16.76 39.37 20.94 47.33 30.16 61.58 93.42 58.64 52.78-41 49.42-53-8.16-22.44-1.46-25.8 108.28-20.52 115.4-19.68 19.27 4.47 18.71 31.83-6.56 46.92-27.93 60.32-65.48 19.55-68.13 26.39 5.58 12.43 25.41 21.36 72.88 36 88.8 51.67 46.59 56.43 41.28 79.6z"
                                p-id="29040" fill="currentColor"></path>
                        </svg>
                        <div style="text-align: center; margin-top: 8%;margin-right: 20%;">打开现有模板</div>
                    </div>
                </el-button>
                <el-button :disabled="activeNodes.length === 0" class="my-button" size="small" @click="addNode">
                    <div class="my-button">
                        <svg t="1719284042715" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="32998" width="32" height="32" style="margin-right: 25%; margin-top: 1%;">
                            <path
                                d="M510.833431 62.695924c-247.644193 0-448.406636 200.762443-448.406636 448.406636 0 247.65545 200.762443 448.416869 448.406636 448.416869 247.65545 0 448.416869-200.76142 448.416869-448.416869C959.2503 263.458367 758.488881 62.695924 510.833431 62.695924zM779.544429 562.112328 560.358381 562.112328l0 219.186048-102.008278 0L458.350103 562.112328 239.164055 562.112328l0-102.008278 219.186048 0L458.350103 240.918002l102.008278 0 0 219.186048 219.186048 0L779.544429 562.112328z"
                                fill="currentColor" p-id="32999"></path>
                        </svg>
                        <div style="text-align: center; margin-top: 8%;margin-right: 20%;">添加同级节点</div>
                    </div>
                </el-button>
                <el-button :disabled="activeNodes.length === 0" class="my-button" size="small" @click="addChildNode">
                    <div class="my-button">
                        <svg t="1719283662028" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="23087" width="32" height="32" style="margin-right: 25%; margin-top: 1%;">
                            <path
                                d="M739.555556 0a56.888889 56.888889 0 0 1 56.888888 56.888889v227.555555a56.888889 56.888889 0 0 1-56.888888 56.888889H227.555556v455.111111h170.666666v-56.888888a56.888889 56.888889 0 0 1 56.888889-56.888889h512a56.888889 56.888889 0 0 1 56.888889 56.888889v227.555555a56.888889 56.888889 0 0 1-56.888889 56.888889H455.111111a56.888889 56.888889 0 0 1-56.888889-56.888889v-56.888889H170.666667a56.888889 56.888889 0 0 1-56.888889-56.888889V341.333333H56.888889a56.888889 56.888889 0 0 1-56.888889-56.888889V56.888889a56.888889 56.888889 0 0 1 56.888889-56.888889h682.666667z"
                                fill="currentColor" p-id="23088"></path>
                        </svg>
                        <div style="text-align: center; margin-top: 8%;margin-right: 20%;">添加子节点</div>
                    </div>
                </el-button>
                <el-button :disabled="activeNodes.length === 0" class="my-button" size="small" @click="dropNode">
                    <div class="my-button">
                        <svg t="1719283698787" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="24126" width="32" height="32" style="margin-right: 25%; margin-top: 1%;">
                            <path
                                d="M316.652201 74.043048L339.889115 28.356912A53.16921 53.16921 0 0 1 386.756789 0h250.486058a53.16921 53.16921 0 0 1 46.867674 28.356912l23.236914 45.686136a53.16921 53.16921 0 0 0 47.261521 28.356913h177.624547A51.987672 51.987672 0 0 1 984.615021 153.599941a51.987672 51.987672 0 0 1-52.381518 51.19998H91.766134A51.987672 51.987672 0 0 1 39.384615 153.599941a51.987672 51.987672 0 0 1 52.381519-51.19998h177.624547a53.16921 53.16921 0 0 0 47.26152-28.356913z m-118.153801 181.956854h630.153604a51.593826 51.593826 0 0 1 52.381518 51.19998v614.399764a101.218423 101.218423 0 0 1-30.719988 72.467664 105.944575 105.944575 0 0 1-74.043048 29.932296H250.879919a105.944575 105.944575 0 0 1-74.043049-29.932296 101.218423 101.218423 0 0 1-30.719988-72.467664V307.199882A51.593826 51.593826 0 0 1 196.923016 255.999902z m52.381519 153.59994v460.799823a51.987672 51.987672 0 0 0 52.775364 51.199981h419.839838a51.987672 51.987672 0 0 0 52.775365-51.199981V409.599842a51.987672 51.987672 0 0 0-52.775365-51.19998H303.655283a51.987672 51.987672 0 0 0-54.350748 51.19998z m157.538401 51.199981a51.987672 51.987672 0 0 1 52.775364 51.19998v255.999902a51.987672 51.987672 0 0 1-52.775364 51.19998 51.987672 51.987672 0 0 1-52.381519-51.19998V511.999803a51.987672 51.987672 0 0 1 50.806135-51.19998z m210.313765 0a51.987672 51.987672 0 0 1 52.381518 51.19998v255.999902a51.987672 51.987672 0 0 1-52.381518 51.19998 51.987672 51.987672 0 0 1-52.775364-51.19998V511.999803a51.987672 51.987672 0 0 1 51.19998-51.19998z"
                                p-id="24127" fill="currentColor"></path>
                        </svg>
                        <div style="text-align: center; margin-top: 8%;margin-right: 20%;">删除节点</div>
                    </div>
                </el-button>
                <el-button :disabled="activeNodes.length === 0" class="my-button" size="small" @click="addGeneralization">
                    <div class="my-button">
                        <svg t="1719283740026" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="26481" width="32" height="32" style="margin-right: 25%; margin-top: 1%;">
                            <path
                                d="M128 576h416a64 64 0 0 1 64 64v192a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64v-192a64 64 0 0 1 64-64z m32 64h352a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32v-128a32 32 0 0 1 32-32zM128 128h416a64 64 0 0 1 64 64v192a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64V192a64 64 0 0 1 64-64z m766.56 415.968A352.16 352.16 0 0 1 704 825.632c-23.68 3.52-35.52-7.2-35.52-32.224 0-15.584 11.84-29.568 35.52-41.92A287.712 287.712 0 0 0 832 512c0-99.84-50.816-187.84-128-239.488-23.68-14.848-35.52-29.536-35.52-44.064 0-25.568 11.84-35.584 35.52-30.08a352.16 352.16 0 0 1 190.56 281.664L896 480h32a32 32 0 0 1 0 64h-32l-1.44-0.032zM160 192h352a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V224a32 32 0 0 1 32-32z"
                                fill="currentColor" p-id="26482"></path>
                        </svg>
                        <div style="text-align: center; margin-top: 8%;margin-right: 20%;">添加概要</div>
                    </div>
                </el-button>
                <el-button class="my-button" size="small" @click="exportPng">
                    <div class="my-button">
                        <svg t="1719283812353" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="28576" width="32" height="32" style="margin-right: 25%; margin-top: 1%;">
                            <path
                                d="M896.341333 128c23.381333 0 42.325333 18.986667 42.325334 42.368v398.890667A255.573333 255.573333 0 0 0 853.333333 554.666667V213.333333H170.666667l0.042666 597.333334 396.458667-396.501334a42.624 42.624 0 0 1 56.32-3.584l3.968 3.626667 151.296 151.466667a256.128 256.128 0 0 0-166.826667 330.368L127.658667 896A42.368 42.368 0 0 1 85.333333 853.632V170.368A42.666667 42.666667 0 0 1 127.658667 128h768.682666zM341.333333 298.666667a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666z m512 469.333333v-128l170.666667 170.666667-170.666667 170.666666v-128h-170.666666v-85.333333h170.666666z"
                                fill="currentColor" p-id="28577"></path>
                        </svg>
                        <div style="text-align: center; margin-top: 8%;margin-right: 20%;">导出图片</div>
                    </div>
                </el-button>
                <el-button :type="activedPanel === 'layout' ? 'primary' : 'default'" class="my-button" size="small"
                    @click="saveMindMapVisable()">
                    <div class="my-button">
                        <svg t="1719283873990" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="30805" width="32" height="32" style="margin-right: 25%; margin-top: 1%;">
                            <path
                                d="M938.666667 640h-64v-42.666667c0-72.533333-55.466667-128-128-128H554.666667V384h64c46.933333 0 85.333333-38.4 85.333333-85.333333V85.333333c0-46.933333-38.4-85.333333-85.333333-85.333333h-213.333334c-46.933333 0-85.333333 38.4-85.333333 85.333333v213.333334c0 46.933333 38.4 85.333333 85.333333 85.333333H469.333333v85.333333H277.333333c-72.533333 0-128 55.466667-128 128v29.866667c0 4.266667 0 8.533333 4.266667 12.8H85.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v213.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h213.333334c46.933333 0 85.333333-38.4 85.333333-85.333333v-213.333334c0-46.933333-38.4-85.333333-85.333333-85.333333H230.4c0-4.266667 4.266667-8.533333 4.266667-12.8V597.333333c0-25.6 17.066667-42.666667 42.666666-42.666666h469.333334c25.6 0 42.666667 17.066667 42.666666 42.666666v42.666667H725.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v213.333334c0 46.933333 38.4 85.333333 85.333333 85.333333h213.333334c46.933333 0 85.333333-38.4 85.333333-85.333333v-213.333334c0-46.933333-38.4-85.333333-85.333333-85.333333zM298.666667 725.333333v213.333334H85.333333v-213.333334h213.333334zM405.333333 298.666667V85.333333h213.333334v213.333334h-213.333334zM938.666667 938.666667h-213.333334v-213.333334h213.333334v213.333334z"
                                fill="currentColor" p-id="30806"></path>
                        </svg>
                        <div style="text-align: center; margin-top: 8%;margin-right: 20%;">保存当前模型</div>
                    </div>
                </el-button>
            </div>
            <div id="mindMapContainer" @dragenter.stop.prevent @dragleave.stop.prevent @dragover.stop.prevent
                @drop.stop.prevent></div>
            <div class="active-panel" v-show="!readonly && activedPanel !== ''">
                <!-- 图标 -->
                <div class="active-panel-box" v-if="activedPanel === 'icon'">
                    <div class="title">
                        选择图标
                        <span class="close" @click="activedPanel = ''">×</span>
                    </div>
                    <div class="content icon">
                        <div class="icon-group" v-for="group of nodeIconList" :key="group.type">
                            <div class="group-title">
                                {{ group.name }}
                            </div>
                            <div class="group-content">
                                <span class="icon-item" :class="activeNodes.length === 0 ? 'disabled' : ''"
                                    v-for="icon of group.list" :key="icon.name" @click="setIcon(group.type, icon.name)"
                                    v-html="icon.icon"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 主题 -->
                <div class="active-panel-box" v-else-if="activedPanel === 'theme'">
                    <div class="title">
                        选择主题
                        <span class="close" @click="activedPanel = ''">×</span>
                    </div>
                    <div class="content">
                        <li v-for="item of themes" :key="item.value" @click="changeTheme(item.value)"
                            :class="theme === item.value ? 'active' : ''">
                            <img :src="`/pages/online-doc/icons/theme/${item.value}.jpg`" />
                            <div>{{ item.label }}</div>
                        </li>
                    </div>
                </div>
                <!-- 结构 -->
                <div class="active-panel-box" v-else-if="activedPanel === 'layout'">
                    <div class="title">
                        选择结构
                        <span class="close" @click="activedPanel = ''">×</span>
                    </div>
                    <div class="content">
                        <li v-for="item of layouts" :key="item.value" @click="changeLayout(item.value)"
                            :class="layout === item.value ? 'active' : ''">
                            <img :src="`/pages/online-doc/icons/layout/${item.value}.png`" />
                            <div>{{ item.label }}</div>
                        </li>
                    </div>
                </div>
            </div>
        </div>

        <div class="mind-map-scale">
            <el-button text @click="zoomOut">
                <span style="font-size: 1.2rem; font-weight: bold">─</span>
            </el-button>
            <el-input style="display: inline-block; width: 50px; text-align: center" v-model="showScale" disabled />
            <el-button text @click="zoomIn"><span style="font-size: 1.2rem">+</span></el-button>
        </div>
    </div>
</template>
  
<script>
import MindMap from 'simple-mind-map'
import MiniMap from 'simple-mind-map/src/plugins/MiniMap.js'
import Watermark from 'simple-mind-map/src/plugins/Watermark.js'
import KeyboardNavigation from 'simple-mind-map/src/plugins/KeyboardNavigation.js'
import ExportPDF from 'simple-mind-map/src/plugins/ExportPDF.js'
import ExportXMind from 'simple-mind-map/src/plugins/ExportXMind.js'
import Export from 'simple-mind-map/src/plugins/Export.js'
import Drag from 'simple-mind-map/src/plugins/Drag.js'
import Select from 'simple-mind-map/src/plugins/Select.js'
import AssociativeLine from 'simple-mind-map/src/plugins/AssociativeLine.js'
import TouchEvent from 'simple-mind-map/src/plugins/TouchEvent.js'
import NodeImgAdjust from 'simple-mind-map/src/plugins/NodeImgAdjust.js'
import SearchPlugin from 'simple-mind-map/src/plugins/Search.js'
import Painter from 'simple-mind-map/src/plugins/Painter.js'
import Formula from 'simple-mind-map/src/plugins/Formula.js'
import RainbowLines from 'simple-mind-map/src/plugins/RainbowLines.js'
import Demonstrate from 'simple-mind-map/src/plugins/Demonstrate.js'
import OuterFrame from 'simple-mind-map/src/plugins/OuterFrame.js'
import { nodeIconList } from 'simple-mind-map/src/svg/icons'
import xmind from 'simple-mind-map/src/parse/xmind.js'
import { reqMindMapInformation, restoreMindMapInformation } from '@/api/index'
// 注册插件
MindMap.usePlugin(MiniMap)
    .usePlugin(Watermark)
    .usePlugin(Drag)
    .usePlugin(KeyboardNavigation)
    .usePlugin(ExportPDF)
    .usePlugin(ExportXMind)
    .usePlugin(Export)
    .usePlugin(Select)
    .usePlugin(AssociativeLine)
    .usePlugin(NodeImgAdjust)
    .usePlugin(TouchEvent)
    .usePlugin(SearchPlugin)
    .usePlugin(Painter)
    .usePlugin(Formula)
    .usePlugin(RainbowLines)
    .usePlugin(Demonstrate)
    .usePlugin(OuterFrame)

let mindMapInstance = null

window.mindMapInstance = mindMapInstance

export const defaultData = {
    data: {
        text: '根节点',
        expand: true,
        isActive: true,
    },
    children: [
        {
            data: {
                text: '二级节点',
                expand: true,
                isActive: true,
            }
        }
    ],
}

export default {
    name: 'MyMindMap',
    props: {
        readonly: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: '思维导图',
        },
        mindData: {
            type: Object,
            default() {
                return defaultData
            },
        },
        mindMapName: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            img: require('@/assets/display.jpg'),
            fileinformation: [
            ],
            file: {},
            nodeIconList,
            scale: 1,
            dialogVisible: false,
            mindMapNameActual: "",
            dialogVisibleModelCreate: false,
            //  default（默认）、classic（脑图经典）、minions（小黄人）、
            // pinkGrape（粉红葡萄）、mint（薄荷）、gold（金色vip）、vitalityOrange（活力橙）、
            // greenLeaf（绿叶）、dark2（暗色2）、skyGreen（天清绿）、classic2（脑图经典2）、
            // classic3（脑图经典3）、classic4（脑图经典4，v0.2.0+）、classicGreen（经典绿）、
            // classicBlue（经典蓝）、blueSky（天空蓝）、brainImpairedPink（脑残粉）、
            // dark（暗色）、earthYellow（泥土黄）、freshGreen（清新绿）、freshRed（清新红）、
            // romanticPurple（浪漫紫）、simpleBlack（v0.5.4+简约黑）、courseGreen（v0.5.4+课程绿）、
            // coffee（v0.5.4+咖啡）、redSpirit（v0.5.4+红色精神）、blackHumour（v0.5.4+黑色幽默）、
            // lateNightOffice（v0.5.4+深夜办公室）、blackGold（v0.5.4+黑金）、avocado（v.5.10-fix.2+牛油果）、
            // autumn（v.5.10-fix.2+秋天）、orangeJuice（v.5.10-fix.2+橙汁）
            themes: [
                { value: 'classic4', label: '脑图经典4' },
                { value: 'classic5', label: '脑图经典5' },
                { value: 'classic6', label: '脑图经典6' },
                { value: 'classic7', label: '脑图经典7' },
                { value: 'autumn', label: '秋天' },
                { value: 'cactus', label: '仙人掌' },
                { value: 'lemonBubbles', label: '柠檬气泡' },
                { value: 'coffee', label: '咖啡' },
                { value: 'courseGreen', label: '课程绿' },
                { value: 'gold', label: '金色vip' },
                { value: 'greenLeaf', label: '绿叶' },
                { value: 'minions', label: '小黄人' },
                { value: 'morandi', label: '莫兰迪' },
                { value: 'redSpirit', label: '红色精神' },
                { value: 'simpleBlack', label: '简约黑' },
                { value: 'vitalityOrange', label: '活力橙' },
                { value: 'oreo', label: '奥利奥' },
                { value: 'rose', label: '玫瑰' },
                { value: 'seaBlueLine', label: '海蓝线' },
                { value: 'shallowSea', label: '浅海' },
            ],
            layout: 'mindMap',
            layouts: [
                { value: 'mindMap', label: '思维导图' },
                { value: 'logicalStructure', label: '逻辑结构图' },
                { value: 'organizationStructure', label: '组织结构图' },
                { value: 'catalogOrganization', label: '目录组织图' },
                { value: 'timeline', label: '时间轴' },
                { value: 'timeline2', label: '时间轴2' },
                { value: 'fishbone', label: '鱼骨图' },
                { value: 'verticalTimeline', label: '垂直时间轴' },
            ],
            activeNodes: [],
            currentIconList: [],
            activedPanel: '',
        }
    },
    computed: {
        showScale() {
            return (this.scale * 100).toFixed(0)
        },
    },
    mounted() {
        this.init()
    },
    unmounted() {
        mindMapInstance.destroy()
    },
    watch: {
        mindData() {
            mindMapInstance.destroy()
            this.init()
        },
    },
    methods: {
        handleChange(file) {
        },
        saveMindMapVisable() {
            this.dialogVisibleModelCreate = true
        },
        saveMindMap() {
            if (this.mindMapNameActual != "") {
                this.dialogVisibleModelCreate = false
                var dataAll = { societyPattern: this.mindMapNameActual, data: mindMapInstance.getData().data, children: mindMapInstance.getData().children }
                restoreMindMapInformation(dataAll).then((ret) => {
                    console.log("success")
                    reqMindMapInformation().then((ret) => {
                        let returndata = ret.data
                        this.fileinformation = returndata.data
                    })
                }).catch((err) => {
                    console.log(err)
                    this.$message({
                        type: "warning",
                        message: "保存失败!"
                    })
                })
            } else {
                this.$message({
                    type: "warning",
                    message: "名称为空!"
                })
            }
        },
        handleClose2(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.dialogVisibleModelCreate = false
                    done();
                })
                .catch(_ => { });
        },
        getPattern(done, societyPattern) {
            this.file = this.fileinformation.find(file => file.societyPattern === societyPattern)
            var datatest = {
                data: this.file.data,
                children: this.file.children
            }
            this.$confirm('确认选择？')
                .then(_ => {
                    this.dialogVisible = false
                    this.mindMapNameActual = this.file.societyPattern
                    mindMapInstance.setData(datatest)
                    done();
                })
                .catch(_ => { });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        activePanel(type) {
            this.activedPanel = type === this.activedPanel ? '' : type
        },
        setIcon(type, name) {
            if (this.activeNodes.length === 0) return
            let key = type + '_' + name
            // 检查当前节点是否存在该图标
            let index = this.currentIconList.findIndex(item => {
                return item === key
            })
            // 存在则删除icon
            if (index !== -1) {
                this.currentIconList.splice(index, 1)
            } else {
                // 否则判断当前图标是否和要插入的图标是一个组的
                let typeIndex = this.currentIconList.findIndex(item => {
                    return item.split('_')[0] === type
                })
                // 是一个组的则进行替换
                if (typeIndex !== -1) {
                    this.currentIconList.splice(typeIndex, 1, key)
                } else {
                    // 否则添加icon
                    this.currentIconList.push(key)
                }
            }
            this.activeNodes.forEach(node => {
                node.setIcon([...this.currentIconList])
            })
        },
        addRelationLine() {
            mindMapInstance.createLineFromActiveNode()
        },
        addGeneralization() {
            mindMapInstance.execCommand('ADD_GENERALIZATION')
        },
        dropNode() {
            mindMapInstance.execCommand('REMOVE_NODE')
        },
        addNode() {
            mindMapInstance.execCommand('INSERT_NODE')
        },
        addChildNode() {
            mindMapInstance.execCommand('INSERT_CHILD_NODE')
        },
        changeTheme(theme) {
            this.theme = theme
            mindMapInstance.setTheme(theme)
        },
        changeLayout(layout) {
            this.layout = layout
            mindMapInstance.setLayout(layout)
        },
        zoomMap(e) {
            mindMapInstance.view.setScale(e)
        },
        zoomIn() {
            let scale = mindMapInstance.view.scale
            scale += 0.2
            if (scale > 2) scale = 2
            mindMapInstance.view.setScale(scale)
        },
        zoomOut() {
            let scale = mindMapInstance.view.scale
            scale -= 0.2
            if (scale < 0.1) scale = 0.1
            mindMapInstance.view.setScale(scale)
        },
        getData() {
            return mindMapInstance.getData(true)
        },
        setData(data) {
            mindMapInstance.setData(data)
        },
        exportPng() {
            mindMapInstance.export('png', true, this.name)
        },
        beforeCreate() {

        },
        init() {
            reqMindMapInformation().then((ret) => {
                let returndata = ret.data
                this.fileinformation = returndata.data

                const data = this.mindData || defaultData
                let mindData = data
                if (data.root) {
                    this.layout = data.layout
                    this.theme = data.theme.template
                    mindData = data.root
                }
                mindMapInstance = new MindMap({
                    enableFreeDrag: false,
                    readonly: this.readonly,
                    layout: this.layout, // 'logicalStructure',
                    theme: this.theme,
                    el: document.getElementById('mindMapContainer'),
                    mousewheelAction: 'zoom', // zoom（放大缩小）、move（上下移动）
                    data: mindData,
                    fit: true,
                    nodeTextEditZIndex: 1000,
                    nodeNoteTooltipZIndex: 1000,
                    initRootNodePosition: ['center', 'center'],
                })
                mindMapInstance.on('scale', e => {
                    this.scale = Number(e.toFixed(2))
                })
                mindMapInstance.on('node_active', (...args) => {
                    this.activeNodes = args[1]
                    if (this.activeNodes.length > 0) {
                        let firstNode = this.activeNodes[0]
                        this.currentIconList = firstNode.getData('icon') || []
                    } else {
                        this.currentIconList = []
                    }
                })
                var name = this.$route.query.societyPattern
                console.log(name)
                if (name != "") {
                    for (let i = 0; i < this.fileinformation.length; i++) {
                        if (this.fileinformation[i].societyPattern == name) {
                            var datatest = {
                                data: this.fileinformation[i].data,
                                children: this.fileinformation[i].children
                            }
                            mindMapInstance.setData(datatest)
                            this.mindMapNameActual=name
                        }
                    }
                }
            }).catch((err) => {
                console.log(err)
                this.$message({
                    type: "warning",
                    message: "文件获取失败!"
                })
            })

        },
    },
}
</script>

<style lang="scss" scoped>
.mind-back {
    width: 100%;
    height: 800px;
}

.my-mind-map-container,
#mindMapContainer {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}

.my-button {
    svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    width: 6rem;
    height: 3.8rem;
    text-align: center;
    line-height: 1.5rem;
    margin-top: 0.8rem;
}

.mindmap-tools {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    align-items: center;
}

$iconSize: 1.4rem;

.active-panel {
    position: absolute;
    top: 10rem;
    right: 5px;
    bottom: 10rem;
    width: 16rem;
    background: white;
    user-select: none;

    .active-panel-box {
        height: 100%;

        .title {
            height: 3rem;
            line-height: 3rem;
            padding: 0 0.8rem;
            font-weight: bold;
            font-size: 1.1rem;
            border-bottom: 1px solid #ccc;

            .close {
                float: right;
                cursor: pointer;
                font-size: 1.3rem;
            }
        }

        .content {
            height: calc(100% - 3rem);
            overflow-y: auto;
            overflow-x: hidden;
            padding: 1rem;

            &.icon {
                padding-right: 0.5rem;
            }

            .icon-group {
                margin-top: 1rem;
                line-height: 2;

                &:first-child {
                    margin-top: 0;
                }
            }

            .group-title {
                font-weight: bold;
            }

            .group-content {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                .icon-item {
                    width: $iconSize;
                    height: $iconSize;
                    margin-right: 0.4rem;
                    margin-top: 0.4rem;
                    cursor: pointer;

                    &.disabled {
                        cursor: not-allowed;
                        opacity: 0.5;
                    }

                    svg {
                        width: $iconSize;
                        height: $iconSize;
                    }
                }
            }

            li {
                list-style: none;
                text-align: center;
                margin-top: 1rem;
                border: 1px solid #ccc;
                border-radius: 4px;

                &:first-child {
                    margin-top: 0;
                }

                &:hover {
                    cursor: pointer;
                    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
                }

                &.active {
                    border: 1px solid #67c23a;
                    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
                }

                img {
                    width: 100%;
                    height: 8rem;
                }
            }
        }
    }
}

.mind-map-scale {
    position: absolute;
    bottom: -1rem;
    right: 1rem;
    z-index: 99;
    background: #efefef;
    border-radius: 5px;
    opacity: 0.8;
}

:deep .mind-map-scale {
    .el-input__wrapper .el-input__inner {
        text-align: center !important;
    }
}

.file_area {
    position: relative;
    top: -4vh;
    display: flex;
    flex-wrap: wrap;
}

.file_view {
    position: relative;
    top: 0px;
    width: 12vw;
    height: 18vh;
    margin: 20px;
    margin-left: 100px;
    text-align: center;
    padding: 0;
    min-width: 150px;
    min-height: 120px;
    transition: top 0.3s;
    border-color: black;
}

.file_image {
    position: relative;
    width: 100%;
    border-radius: 12px;
    border-color: rgb(158, 60, 60);
    border-width: 1px;
    border-style: solid;
}

.file_view:hover .image_menu {
    opacity: 1;
}



.file_view:hover {
    top: -5px;

}

.filename {
    position: relative;
    text-align: center;
    font-size: small;
}
</style>