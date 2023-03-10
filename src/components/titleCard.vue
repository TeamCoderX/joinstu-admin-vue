<template>
    <div class="container m-0" style="max-width: 100vw!important;">
        <div class="row mw-auto" style="font-size: 300%;">
            <div class="col-md-6 col-xxl-2 d-sm-flex d-md-flex d-lg-flex justify-content-sm-center align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-lg-end align-items-xl-center"
                style="max-width: none;width: auto;">
                <i :class="`bi ${icon}`" fill="currentColor"></i>
            </div>
            <div class="col-md-3 col-lg-2 col-xxl-10 d-sm-flex d-md-flex d-lg-flex align-items-sm-center justify-content-md-center align-items-md-center justify-content-lg-center align-items-xl-center"
                style="width: 5em;">
                <h3 class="d-lg-flex align-items-lg-center"
                    style="font-weight: bold; text-align: left; width: 55em; margin-right: 0.5em;" id="title">{{ title }}
                </h3>
            </div>
            <div
                class="col text-end d-sm-flex d-md-flex d-lg-flex justify-content-sm-end align-items-sm-center justify-content-md-end align-items-md-center justify-content-lg-end align-items-lg-center">
                <button v-if="buttonContents != false"
                    :class="`btn btn-${(buttonColor == undefined) ? 'primary' : buttonColor}`"
                    :id="`btn_${(buttonId == undefined) ? 'button' : buttonId}`" :disabled="buttonIsDisabled"
                    @click="buttonOnclick" type="button">
                    <div v-if="buttonContents == undefined">
                        <div class="spinner-border text-white" role="status"></div>
                    </div>
                    <div v-else v-if="buttonIcon == undefined">{{ buttonContents }}</div>
                    <div v-else><i :class="`bi ${buttonIcon}`"></i></div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'icon', 'buttonIsDisabled', 'buttonContents', 'buttonColor', 'buttonId', 'buttonOnclick', 'buttonIcon'],
}
</script>
