<template>
  <div class="container">
    <div class="create-adv">
      <div class="create-adv__head">
        <div class="create-adv__title-place">
          <h1 class="create-adv__title">
            Мое объявление
          </h1>
          <p class="create-adv__title-info">
            Заполните предложенные Вам поля и нажмите кнопку "Сохранить".
          </p>
        </div>
        <div class="create-adv__adv-place">
          <p class="create-adv__adv-id-title">id вашего объявления</p>
          <span class="create-adv__adv-id-number">{{getCampaignId}}</span>
        </div>
      </div>
      <div class="create-adv__body">
        <div class="create-adv__body-slot">
          <h2 class="create-adv__subtitle">
            1. Введите название вашего объявления
          </h2>
          <div class="create-adv__body-input">
              <div class="create-adv__body-status-icon">
                <font-awesome-icon class="placeholder-icon init-color" v-if="!$v.campaignTitle.$dirty" :icon="['far', 'keyboard']" />
                <font-awesome-icon class="placeholder-icon error-color" v-if="$v.campaignTitle.$error" :icon="['fas', 'exclamation-triangle']" />
                <font-awesome-icon class="placeholder-icon success-color" v-if="campaignTitleValidationSuccess" :icon="['fas', 'check']" />
              </div>
              <input
                      :class="{'validation-error': $v.campaignTitle.$error, 'validation-success': campaignTitleValidationSuccess}"
                      type="text" name="title"
                      v-model.trim="campaignTitle"
                      @input="setСampaignTitle($event.target.value)"
                      placeholder="Например: Продам кота"
                      autocomplete="off">

              <div class="create-adv__body-validation">
                <p class="create-adv__body-err-notice empty-field" v-if="!$v.campaignTitle.minLength">Минимальная длина 10 символов</p>
                <p class="create-adv__body-err-notice min-length" v-if="!$v.campaignTitle.maxLength">Максимальная длина 80 символов</p>
                <p class="create-adv__body-err-notice max-length" v-if="campaignTitleValidation">Поле не должно быть пустым</p>
                <p class="create-adv__body-success" v-if="campaignTitleValidationSuccess">Отлично!</p>
              </div>
          </div>
        </div>
        <div class="create-adv__body-slot">
          <h2 class="create-adv__subtitle">
            2. Добавьте фотографии
          </h2>
          <div class="image-upload">
            <div class="image-upload__gallery" :class="{'success': campaignImageGallery}">
              <div class="image-upload__gallery-item" v-for="(image, index) in imagesGallery.localPath">
                <div class="image-upload__gallery-item-delete">
                  <font-awesome-icon
                          class="image-upload__gallery-item-icons"
                          @click="deleteImage(index)"
                          :icon="['fas', 'trash-alt']" />
                </div>
                <div class="image-upload__gallery-item-size">
                  {{imagesGallery.size[index]}} Мб
                </div>
                <img :src="image" alt="">
              </div>

              <label
                      for="upload-gallery"
                      class="image-upload__gallery-item image-upload__button-single"
                      v-if="imagesGallery.files.length < 10">
                <font-awesome-icon class="image-upload__button-icon-middle" :icon="['fas', 'plus']" />
                <input
                        class="image-upload__input"
                        type="file"
                        @change="uploadGallery"
                        id="upload-gallery"
                        accept=".png, .jpg, .jpeg">
              </label>

              <!--{{imagesGallery}}-->
            </div>
            <p class="create-adv__body-err-notice">
              {{imagesGallery.warning}}
            </p>
            <p class="create-adv__help-text">
              *Максимальное количество изображений не должно превышать 10 штук. Размер каждого изображения должен находиться в пределах до 5 Mb.
            </p>
          </div>
          <!--<input type="file" name="file" ref="myFiles" id="file-input" multiple>-->
        </div>
        <div class="create-adv__body-slot">
          <h2 class="create-adv__subtitle">
            3. Добавьте описание
          </h2>
          <div class="create-adv__body-textarea">
            <div class="create-adv__body-status-icon">
              <font-awesome-icon class="placeholder-icon init-color" v-if="!$v.campaignDescription.$dirty" :icon="['far', 'keyboard']" />
              <font-awesome-icon class="placeholder-icon error-color" v-if="$v.campaignDescription.$error" :icon="['fas', 'exclamation-triangle']" />
              <font-awesome-icon class="placeholder-icon success-color" v-if="campaignDescriptionValidationSuccess" :icon="['fas', 'check']" />
            </div>
            <textarea
                    :class="{'validation-error': $v.campaignDescription.$error, 'validation-success': campaignDescriptionValidationSuccess}"
                    v-model.trim="campaignDescription"
                    name="description"
                    @input="textareaAutosize($event); setСampaignDescription($event.target.value)"
                    placeholder="Например: Большой пушистый кот с четырьмя лапами нуждается в вас"></textarea>
            <p class="create-adv__help-text">
              *{{campaignDescriptionSymbolsLeft}}.
            </p>
            <div class="create-adv__body-validation">
              <p class="create-adv__body-err-notice empty-field" v-if="!$v.campaignDescription.minLength">Минимальная длина 10 символов</p>
              <p class="create-adv__body-err-notice min-length" v-if="!$v.campaignDescription.maxLength">Максимальная длина 1600 символов</p>
              <p class="create-adv__body-err-notice max-length" v-if="campaignDescriptionValidation">Поле не должно быть пустым</p>
              <p class="create-adv__body-success" v-if="campaignDescriptionValidationSuccess">Отлично!</p>
            </div>
          </div>
        </div>

        <div class="create-adv__body-slot">
          <h2 class="create-adv__subtitle">
            4. Укажите местоположение
          </h2>

          <div class="create-adv__body-input with-popup country">
            <div class="create-adv__body-status-icon">
              <font-awesome-icon class="placeholder-icon init-color" :icon="['far', 'flag']" />
            </div>
            <input
                    type="text"
                    v-model="campaignCountry"
                    placeholder="Страна"
                    @input="campaignCountryKeypress"
                    :class="{'validation-success': countryCityValidation}">
            <div class="input-popup" v-if="campaignCountryPopup">
              <ul class="input-popup__list">
                <li
                        class="input-popup__item"
                        v-for="(country, index) in countryListFilter"
                        :value="country.country"
                        :class="{'active': index === popupListItemIndex}"
                        :key="country.id">
                  <div @click="chooseCountry(country.country)">
                    {{country.country}}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="create-adv__body-input with-popup city" v-if="showCity">
            <div class="create-adv__body-status-icon">
              <font-awesome-icon class="placeholder-icon init-color" :icon="['fa', 'map-marker-alt']" />
            </div>
            <input
                    type="text"
                    v-model.trim="campaignCity"
                    placeholder="Город/Населенный пункт"
                    @input="campaignCityKeypress"
                    :class="{'validation-success': countryCityValidation}">
            <div class="input-popup" v-if="campaignCityPopup">
              <ul class="input-popup__list">
                <li
                        class="input-popup__item"
                        v-for="(city, index) in cityListFilter"
                        :value="city.city"
                        :class="{'active': index === popupListItemIndex}"
                        :key="city.id">
                  <div @click="chooseCity(city.city)">
                    {{city.city}}
                  </div>
                  <p class="input-popup__subtext">{{city.region}}</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="create-adv__body-input district" v-if="showDistrictField">
            <input type="text" v-model="campaignDistrict" placeholder="Район" :class="{'validation-success': countryCityValidation}">
          </div>

        </div>

        <div class="create-adv__body-slot">
          <h2 class="create-adv__subtitle">
            5. Выберите категорию
          </h2>
          <v-select
                  v-model="campaignCategory"
                  :options="options"
                  placeholder="Например: Животные"
                  :class="{'validation-success': categoryValidation}"></v-select>
          <!--:class="{'validation-success': categoryValidation}"-->
        </div>

        <div class="create-adv__body-slot">
          <h2 class="create-adv__subtitle">
            5. Добавьте цену
          </h2>
          <!--<input v-model="campaignPrice" type="text" name="price">-->

          <div class="create-adv__body-flex-wrap price">
            <div class="create-adv__body-input price">
              <input
                      type="text"
                      name="price"
                      v-model.trim="campaignPrice"
                      placeholder="1000"
                      autocomplete="off">
            </div>
            <div class="create-adv__body-currency">
              <div class="currency__stage">
                <div class="currency__item" @click="changeCampaignCurrency">
                  <div class="currency__icon">
                    {{campaignCurrency.items[campaignCurrency.currentId].symbol}}
                  </div>
                  <p class="currency__description">
                    {{campaignCurrency.items[campaignCurrency.currentId].description}}
                  </p>
                </div>

                <div class="currency__change-btn"> </div>

              </div>

            </div>
          </div>

        </div>

        <div class="create-adv__body-slot">
          <h2 class="create-adv__subtitle">
            6. Добавьте телефонный номер для связи
          </h2>
          <div class="create-adv__body-flex-wrap phone">
            <div class="create-adv__body-input phone">
              <div class="create-adv__body-status-icon">
                <font-awesome-icon class="placeholder-icon init-color" :icon="['fas', 'phone-alt']" />
              </div>
              <input v-model="campaignPhone" ref="campaignPhone" type="text" name="phone" autocomplete="off">
            </div>
            <div class="create-adv__body-phone-country">
              <div class="phone-country__stage">
                <div class="phone-country__item" @click="changeCampaignPhoneCode">
                  <div
                          class="phone-country__flag"
                          :style="{backgroundImage: 'url('+require('../../assets/phoneCodesFlags/'+phoneCodes.items[phoneCodes.currentCode].country+'.jpg')+')'}"></div>
                </div>

                <div class="phone-country__change-btn"></div>

              </div>
            </div>

          </div>


        </div>

        <button class="button" @click="submitCampaign">Создать</button>
          <!--<button class="button" type="submit">Создать</button>-->


        <!--</form>-->
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  // input select
  import vSelect from 'vue-select'
  import 'vue-select/dist/vue-select.css';
  Vue.component('v-select', vSelect);

  // validation of input fields
  import { required, minLength, maxLength } from 'vuelidate/lib/validators';

  // vuex
  import { mapGetters, mapMutations, mapActions } from 'vuex';

  // icons
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faKeyboard, faFlag } from '@fortawesome/free-regular-svg-icons';
  import { faCheck, faExclamationTriangle, faPlus, faTrashAlt, faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
  library.add(faCheck, faKeyboard, faExclamationTriangle, faPlus, faTrashAlt, faMapMarkerAlt, faFlag, faPhoneAlt);

  // phone mask
  import Inputmask from "inputmask";

  export default {
    data(){
      return{
        campaignTitle: '',
        campaignPictures: [],
        campaignDescription: '',
        campaignPrice: '',
        campaignCategory: '',
        campaignPhone: '',
        phoneCodes: {
          currentCode: 0,
          items: [
            {
              country: 'UA',
              code: '+38'
            },
            {
              country: 'RU',
              code: '+7'
            }
          ]
        },
        options: [
          'Недвижимость',
          'Транспорт',
          'Ремонт',
          'Животные',
          'Техника(бытовая)',
          'Техника(компьютеры)',
          'Мода(одежда)',
          'Спорт',
          'Детям'
        ],
        imagesGallery: {
          files: [],
          localPath: [],
          size: [],
          warning: ''
        },
        campaignCountry: '',
        campaignCity: '',
        campaignDistrict: '',
        campaignCountryPopup: false,
        campaignCityPopup: false,
        popupListItemIndex: 0,
        popupListItemIndexMax: 0,
        campaignCurrency: {
          currentId: 0,
          items: [
            {
              symbol: '₽',
              description: 'Российский рубль',
              short: 'ruble'
            },
            {
              symbol: '₴',
              description: 'Украинская гривна',
              short: 'hryvna'
            },
            {
              symbol: '$',
              description: 'Американский доллар',
              short: 'dollar'
            }
          ]
        }
      }
    },
    methods:{
      ...mapActions(['generateCampaignId', 'countriesList', 'CreateCampaign']),
      submitCampaign(){
        let campaign ={
          campaignTitle: this.campaignTitle,
          // campaignPictures: this.$refs.myFiles.files,
          campaignPictures: this.imagesGallery.files,
          campaignDescription: this.campaignDescription,
          campaignCountry: this.campaignCountry,
          campaignCity: this.campaignCity,
          campaignDistrict: this.campaignDistrict,
          campaignPrice: this.campaignPrice,
          campaignCurrency: this.campaignCurrency.items[this.campaignCurrency.currentId].short,
          campaignId: this.getCampaignId,
          userId: this.loggedUser.uniqueId,
          campaignCategory: this.campaignCategory,
          campaignPhone: this.campaignPhone
        }

        this.CreateCampaign(campaign).then(
          success=>{
            console.log(success);
        },
          err=>{
            console.log(err);
        })
      },
      setСampaignTitle(value){
        this.campaignTitle = value;
        this.$v.campaignTitle.$touch();
      },
      setСampaignDescription(value){
        this.campaignDescription = value;
        this.$v.campaignDescription.$touch();
      },
      uploadGallery(event){
        this.imagesGallery.warning = '';

        let imageSize = event.target.files[0].size/1024/1024;

        if( imageSize > 5){
          this.imagesGallery.warning = 'Размер загружаемого изображения не должен превышать 5 Mb';

          setTimeout(()=>{
            this.imagesGallery.warning = '';
          }, 5000);
          event.target.value = null;
          return false;
        }

        this.imagesGallery.files.push(event.target.files[0]);
        this.imagesGallery.size.push(imageSize.toFixed(2));

        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = image => {
          let content = image.target.result;
          this.imagesGallery.localPath.push(content);
        }

        event.target.value=null;
      },
      deleteImage(imageIndex){
        this.imagesGallery.files.splice(imageIndex, 1);
        this.imagesGallery.localPath.splice(imageIndex, 1);
        this.imagesGallery.size.splice(imageIndex, 1);
      },
      textareaAutosize(event){
          event.target.style.height = '1px';
          event.target.style.height = (event.target.scrollHeight + 5) + 'px';
      },
      chooseCountry(country){
        this.campaignCountry = country;
        this.campaignCountryPopup = false;
      },
      chooseCity(city){
        this.campaignCity = city;
        this.campaignCityPopup = false;
      },
      campaignCountryKeypress(){
        if(this.campaignCountry.length>0){
          this.campaignCountryPopup = true;
        }else{
          this.campaignCountryPopup = false;
        }
      },
      campaignCityKeypress(){
        if(this.campaignCity.length>0){
          this.campaignCityPopup = true;
        }else{
          this.campaignCityPopup = false;
        }
      },
      popupListChoose(){
        if (event.keyCode == 38 && (this.campaignCountryPopup === true || this.campaignCityPopup === true)) {
          this.popupListItemIndex > 0 ? this.popupListItemIndex-- : this.popupListItemIndex = 0;
        } else if (event.keyCode == 40 && (this.campaignCountryPopup === true || this.campaignCityPopup === true)) {
          if(this.popupListItemIndex < this.popupListItemIndexMax-1){
            this.popupListItemIndex++
          }
        }
        if(event.keyCode == 13 && (this.campaignCountryPopup === true || this.campaignCityPopup === true)){

          if(document.querySelector('.input-popup__item.active').getAttribute('value')){
            let activeItem = document.querySelector('.input-popup__item.active').getAttribute('value');

            if(this.campaignCountryPopup){
              this.chooseCountry(activeItem);
            }
            if(this.campaignCityPopup){
              this.chooseCity(activeItem);
            }
          }
        }
      },
      initEventListeners(){
        document.addEventListener("keyup", this.popupListChoose);
      },
      changeCampaignCurrency(){
        let currencies = this.campaignCurrency.items.length;

        (this.campaignCurrency.currentId < currencies-1) ? this.campaignCurrency.currentId ++ : this.campaignCurrency.currentId = 0
      },
      initPhoneMask(countryCode){
        countryCode ? countryCode : countryCode = this.phoneCodes.items[this.phoneCodes.currentCode].code

        let im = new Inputmask(`${countryCode} ( 999 ) 999 - 99 - 99`);
        im.mask(this.$refs.campaignPhone);
      },
      changeCampaignPhoneCode(){
        this.phoneCodes.currentCode === 0 ? this.phoneCodes.currentCode = 1 : this.phoneCodes.currentCode = 0

        this.initPhoneMask(this.phoneCodes.items[this.phoneCodes.currentCode].code);
      }
    },
    validations:{
      campaignTitle: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(80)
      },
      campaignDescription: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(1600)
      }
    },
    mounted(){
      this.generateCampaignId();
      this.countriesList();
      this.initEventListeners();
      this.initPhoneMask();
    },
    computed:{
      ...mapGetters(['getCampaignId', 'getCountriesList', 'loggedUser']),
      campaignTitleValidation(){
        return this.$v.campaignTitle.$dirty && !this.$v.campaignTitle.required
      },
      campaignTitleValidationSuccess(){
        return this.$v.campaignTitle.$dirty && this.$v.campaignTitle.required && this.$v.campaignTitle.minLength && this.$v.campaignTitle.maxLength
      },
      campaignImageGallery(){
        return this.imagesGallery.files.length > 0 ? true : false;
      },
      campaignDescriptionValidation(){
        return this.$v.campaignDescription.$dirty && !this.$v.campaignDescription.required
      },
      campaignDescriptionValidationSuccess(){
        return this.$v.campaignDescription.$dirty && this.$v.campaignDescription.required && this.$v.campaignDescription.minLength && this.$v.campaignDescription.maxLength
      },
      campaignDescriptionSymbolsLeft(){
        if((1600-this.campaignDescription.length)>0){
          return `Осталось ${1600-this.campaignDescription.length} знаков`;
        } else {
          return `Превышен лимит знаков (${this.campaignDescription.length - 1600})`;
        }
      },
      countryListFilter(){
        let countriesList = this.getCountriesList.filter(country=>{
          return country.country.toLowerCase().indexOf(this.campaignCountry.toLowerCase()) > -1
        });

        this.popupListItemIndexMax = countriesList.length;

        return countriesList;
      },
      cityListFilter(){
        let countriesList = this.getCountriesList.filter(country=>{
          return country.country.toLowerCase().indexOf(this.campaignCountry.toLowerCase()) > -1
        });

        if(countriesList.length > 0 && this.campaignCountry.length>0){
          let citiesList = countriesList[0].entries.filter(city=>{
            return city.city.toLowerCase().indexOf(this.campaignCity.toLowerCase()) > -1
          });

          this.popupListItemIndexMax = citiesList.length;

          return citiesList;
        } else {
          return false;
        }
      },
      showCity(){
        if(this.campaignCountry.length>0){
          return true
        } else{
          return false
        }
      },
      showDistrictField(){
        if(this.campaignCountry.length>0 && this.campaignCity.length>0){
          return true
        }else{
          return false
        }
      },
      countryCityValidation(){
        if(this.campaignCountry.length>0 &&
          this.campaignCity.length>0 &&
          this.campaignDistrict.length>0){
          return true;
        }else{
          return false;
        }
      },
      categoryValidation(){
        if(this.campaignCategory && this.campaignCategory.length > 0){
          return true
        } else{
          return false
        }
      }
    },
    watch: {
      campaignCountry(){
        this.popupListItemIndex = 0;
        this.campaignCity = '';

        if(this.countryListFilter.length === 0){
          this.campaignCountryPopup = false;
        }
      },
      campaignCity(){
        this.popupListItemIndex = 0;

        if(this.cityListFilter.length === 0){
          this.campaignCityPopup = false;
        }
      },
      campaignCountryPopup: function(showUp){
        showUp ? this.popupListItemIndex = 0 : false
      },
      campaignCityPopup: function(showUp){
        showUp ? this.popupListItemIndex = 0 : false
      }
    }
  }
</script>

<style lang="scss">
.create-adv{
  padding: 20px;
  background: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  &__head{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
  }
  &__title{
    margin: 0;
    margin-bottom: 0;
    font-size: 25px;
    color: #333;
    &-info{
      margin-top: 0;
      font-size: 14px;
      color: #777;
    }
  }
  &__adv-place{
    text-align: end;
  }
  &__adv-id-title{
    margin-top: 0;
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 14px;
    color: #333;
  }
  &__adv-id-number{
    font-size: 14px;
    color: #777;
  }
  &__body{
    padding: 20px 0;
    &-flex-wrap{
      display: flex;
      &.price{
        padding-bottom: 25px;
        align-items: center;
      }
      &.phone{
        margin-bottom: 30px;
        align-items: center;
      }
    }
    &-input{
      position: relative;
      width: 100%;
      padding-bottom: 30px;
      input{
        border: 1px solid #eee;
        width: 100%;
        padding: 5px 5px 5px 40px;
        border-radius: 4px;
        box-shadow: inset 0px 0px 5px rgba(0,0,0,.1);
        outline: none;
        transition: .2s;
        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
          color: #e0e0e0;
        }
        &::-moz-placeholder { /* Firefox 19+ */
          color: #e0e0e0;
        }
        &:-ms-input-placeholder { /* IE 10+ */
          color: #e0e0e0;
        }
        &:-moz-placeholder { /* Firefox 18- */
          color: #e0e0e0;
        }
        &.validation-error{
          border: 1px solid tomato;
        }
        &.validation-success{
          border: 1px solid MEDIUMSEAGREEN;
        }
      }
      &.with-popup{
        .input-popup{
          position: absolute;
          z-index: 2;
          width: 100%;
          background: #fff;
          box-shadow: 0px 2px 3px rgba(0,0,0,.2);
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          max-height: 200px;
          height: auto;
          overflow: auto;
          animation: slideInPopup .2s;
          &__list{
            margin: 0;
            padding: 0;
            list-style: none;
          }
          &__item{
            padding: 5px 0 5px 15px;
            cursor: pointer;
            &:hover{
              background: rgba(0,0,0,.05);
            }
            &.active{
              background: rgba(0,0,0,.05);
            }
          }
          &__subtext{
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      &.district{
        input{
          padding-left: 10px;
        }
      }
      &.country{
        padding-bottom: 10px;
      }
      &.city{
        padding-bottom: 10px;
      }
      &.price{
        width: 200px;
        padding-bottom: 0;
        margin-right: 20px;
        input{
          padding: 10px;
          font-size: 20px;
          font-weight: 600;
        }
      }
      &.phone{
        max-width: 400px;
        margin-right: 20px;
        padding-bottom: 0;
        input{
          padding: 8px 8px 8px 40px;
        }
        .create-adv__body-status-icon{
          top: 9px;
        }
      }
    }
    &-textarea{
      position: relative;
      padding-bottom: 25px;
      .create-adv__body-status-icon{
        top: 9px;
      }
      .create-adv__help-text{
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 0;
      }
      textarea{
        display: block;
        width: 100%;
        box-sizing: border-box;
        margin: 0 0 5px 0;
        padding: 10px 20px 10px 40px;
        border: 1px solid #eee;
        border-radius: 4px;
        box-shadow: inset 0px 0px 5px rgba(0,0,0,.1);
        background-color: #fff;
        outline: none;
        resize: none;
        min-height: 54px;
        font-size: 14px;
        line-height: 18px;
        &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
          color: #e0e0e0;
        }
        &::-moz-placeholder { /* Firefox 19+ */
          color: #e0e0e0;
        }
        &:-ms-input-placeholder { /* IE 10+ */
          color: #e0e0e0;
        }
        &:-moz-placeholder { /* Firefox 18- */
          color: #e0e0e0;
        }
        &.validation-error{
          border: 1px solid tomato;
        }
        &.validation-success{
          border: 1px solid MEDIUMSEAGREEN;
        }
      }
    }
    &-validation{
      position: absolute;
      bottom: 7px;
    }
    &-err-notice{
      margin: 0;
      font-size: 13px;
      color: tomato;
      &.empty-field{
        animation-duration: .3s;
        animation-name: slidein;
      }
      &.min-length{
        animation-duration: .3s;
        animation-name: slidein;
      }
      &.max-length{
        animation-duration: .3s;
        animation-name: slidein;
      }
    }
    &-success{
      margin: 0;
      font-size: 13px;
      animation-duration: .3s;
      animation-name: slidein;
      color: MEDIUMSEAGREEN;
    }
    &-status-icon{
      position: absolute;
      top: 6px;
      left: 10px;
      .placeholder-icon{
        animation-duration: .3s;
        animation-name: slideinIcon;
        &.init-color{
          color: #999;
        }
        &.error-color{
          color: tomato;
        }
        &.success-color{
          color: MEDIUMSEAGREEN;
        }
      }
    }
    &-currency{
      padding-bottom: 0;
      width: 200px;
      .currency__stage{
        position: relative;
      }
      .currency__item{
        padding: 2px 10px;
        position: relative;
        border-radius: 5px;
        cursor: pointer;
        transition: .2s;
        z-index: 2;
        &:hover{
          background-color: rgba(0,0,0,.2);
          .currency__description{
            color: #fff;
          }
        }
        &:hover + .currency__change-btn{
          display: block;
        }
        &:active{
          background-color: rgba(0,0,0,.25);
        }
      }
      .currency__icon{
        font-weight: 600;
        font-size: 20px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .currency__description{
        margin: 0;
        font-size: 12px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: #999;
      }
      .currency__change-btn{
        display: none;
        position: absolute;
        top: 50%;
        right: 10px;
        width: 20px;
        height: 20px;
        border-top: 1px solid rgba(0,0,0,.3);
        border-right: 1px solid rgba(0,0,0,.3);
        transform: translateY(-50%) rotate(45deg);
        z-index: 1;
        animation: slideInCurrency .2s;
      }
    }
    &-phone-country{
      padding-bottom: 0;
      width: 90px;
      .phone-country__stage{
        position: relative;
      }
      .phone-country__item{
        padding: 5px 10px;
        position: relative;
        border-radius: 5px;
        cursor: pointer;
        transition: .2s;
        z-index: 2;
        &:hover{
          background-color: rgba(0,0,0,.2);
        }
        &:hover + .phone-country__change-btn{
          display: block;
        }
        &:active{
          background-color: rgba(0,0,0,.25);
        }
      }
      .phone-country__flag{
        width: 35px;
        height: 25px;
        border-radius: 5px;
        background-position: center;
        background-size: cover;
      }
      .phone-country__change-btn{
        display: none;
        position: absolute;
        top: 50%;
        right: 10px;
        width: 10px;
        height: 10px;
        border-top: 1px solid rgba(0,0,0,.3);
        border-right: 1px solid rgba(0,0,0,.3);
        transform: translateY(-50%) rotate(45deg);
        z-index: 1;
        animation: slideInCurrency .2s;
      }
    }
  }
  &__subtitle{
    font-size: 18px;
    color: #333;
  }
  .image-upload{
    margin-bottom: 20px;
    &__gallery{
      padding: 10px 10px 5px;
      margin-bottom: 5px;
      display: flex;
      flex-wrap: wrap;
      height: auto;
      border-radius: 5px;
      background: rgba(0,0,0,.05);
      &.success{
        transition: .2s;
        border: 1px solid MEDIUMSEAGREEN;
      }
      &-item{
        margin-right: 5px;
        margin-bottom: 5px;
        width: calc(20% - 5px);
        height: 150px;
        position: relative;
        overflow: hidden;
        border-radius: 4px;
        background: rgba(0,0,0,.1);
        img{
          position: absolute;
          top: 50%;
          left: 50%;
          width: auto;
          height: 100%;
          transform: translate(-50%, -50%);
        }
      }
      &-item-delete{
        padding: 5px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 5px;
        right: 5px;
        z-index: 1;
        transition: .2s;
        border-radius: 5px;
        user-select: none;
        background: rgba(0, 0, 0, 0.7);
      }
      &-item-icons{
        font-size: 12px;
        cursor: pointer;
        color: #fff;
        &:hover{
          color: tomato;
        }
      }
      &-item-size{
        position: absolute;
        bottom: 0;
        z-index: 1;
        padding: 3px 5px;
        font-size: 10px;
        line-height: 1;
        color: #fff;
        background: rgba(0, 0, 0, 0.7);
      }
    }
    &__button-single{
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      height: 150px;
      border: 1px dashed #999;
      cursor: pointer;
      &:hover .image-upload__button-icon-middle{
        color: #777;
      }
      input{
        display: none;
      }
    }
    &__button-icon-middle{
      font-size: 30px;
      transition: .2s;
      color: #999;
    }
  }
  &__help-text{
    margin-top: 0;
    font-size: 12px;
  }
  .v-select{
    margin-bottom: 25px;
    &.validation-success .vs__dropdown-toggle{
      border: 1px solid MEDIUMSEAGREEN!important;
    }
    .vs__dropdown-toggle{
      border: 1px solid #eee;
      border-radius: 4px;
      box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);
      outline: none;
      transition: .2s;
    }
    .vs__search{
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #e0e0e0;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        color: #e0e0e0;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        color: #e0e0e0;
      }
      &:-moz-placeholder { /* Firefox 18- */
        color: #e0e0e0;
      }
    }
  }
}

@keyframes slidein {
  0% {
    transform: translateY(-5px);
  }

  80% {
    transform: translateY(3px);
  }

  100% {
    transform: translateY(0);
  }
}
@keyframes slideinIcon {
  0% {
    opacity: 0;
    transform: translateX(-5px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
  @keyframes slideInPopup{
    0% {
      transform: translateY(-5px);
    }

    80% {
      transform: translateY(3px);
    }

    100% {
      transform: translateY(0);
    }
  }

  @keyframes slideInCurrency {
    0% {
      opacity: 0;
      transform: translate(-15px, -55%) rotate(45deg);
    }

    100% {
      opacity: 1;
      transform: translateY(-50%) rotate(45deg);
    }
  }
</style>