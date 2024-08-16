<script lang="ts" setup>
type Direction = 'top' | 'right' | 'bottom' | 'left';
const directionMap: Direction[] = ['top', 'right', 'bottom', 'left'];
const showDrawer = ref(false);
const direction = ref<Direction>(directionMap[3]);

const imgs = [
  'https://img.btstu.cn/api/images/5e699637490a3.jpg',
  'https://img.btstu.cn/api/images/5ccfc851275d7.jpg',
  'https://img.btstu.cn/api/images/5e54ceb87fea1.png',
];
const index = ref(1);
const img = computed(() => imgs[index.value]);
const handleRefresh = () => {
  index.value = (index.value + 1) % imgs.length;
  console.log(index.value, img.value);
};

const showEllipsis = ref(false);
const content = ref(
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt non architecto nulla repellendus libero vero hic accusamus, suscipit itaque, dolorum placeat nostrum laboriosam vel sapiente impedit ipsa saepe voluptatem autem?',
);
const texts = ref('ABCD'.split(''));
const showModel = ref(true);
const vertialData = ref(new Array(20).fill(0).map((_, i) => ({ value: i })));
const addData = (val: typeof vertialData) => {
  val.value.push(...(new Array(20).fill(0).map((_, i) => ({ value: i }))));
};
const load = () => {
  addData(vertialData);
};
const infinityOption = computed(() => [load, { rootMargin: '0px 0px 100px 0px' }]);
const clickHandler = (e: MouseEvent) => {
  console.log('click', e);
};
</script>

<template>
  <div
    v-same-click-target="clickHandler"
    style="height: 200px; border: 1px solid; overflow: auto;"
  >
    <div style="width: 100px; height: 100px;  border: 1px solid;" />
  </div>
  <div
    v-infinity-scroll="infinityOption"
    style="height: 200px; border: 1px solid; overflow: auto;"
  >
    <p v-for="i in vertialData" :key="i.value">
      {{ i.value }}
    </p>
  </div>
  <div
    v-ripple
    style="height: 200px; border: 1px solid;"
  />

  <div>
    <label
      v-for="d in directionMap"
      :key="d"
      style="margin-right: 4px"
    >
      <input
        v-model="direction"
        type="radio"
        :value="d"
      >
      {{ d }}
    </label>
  </div>
  <CdxDrawer
    v-model="showDrawer"
    :direction="direction"
  >
    <template #swipe>
      <div class="swipe_content">
        向 {{ direction }} 滑动
      </div>
    </template>
    <div>drawer content</div>
  </CdxDrawer>

  <CdxCaptcha
    type="slider"
    :image="img"
    :canvas-size="[500, 300]"
    :on-refresh="handleRefresh"
  />

  <div style="position: relative; height: 200px">
    <CdxLoading
      :visible="true"
      text="loading..."
      background="rgba(0, 0, 0, 0.5)"
    />
  </div>

  <CdxCaptcha
    type="pointer"
    :image="img"
    :texts="texts"
    :canvas-size="[500, 300]"
    :on-refresh="handleRefresh"
    :tip-duration="3000"
  />

  <button v-tooltip:left="'tip text'">
    hover
  </button>
  <div v-resize.right.bottom.top.left style="width: 100px; height: 100px; background-color: #333;" />

  <CdxTextEllipsis
    v-model="showEllipsis"
    :content="content"
    :lines="1"
    ellipsis-text="..."
    expand-text="展开"
    collapse-text="收起"
  />
</template>

<style scoped>
.swipe_content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
}
</style>
